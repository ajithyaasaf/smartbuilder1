import { users, type User, type InsertUser, type FormSubmission, type Admin } from "@shared/schema";
import * as fs from "fs";
import * as path from "path";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Form submission methods
  createFormSubmission(submission: Omit<FormSubmission, 'id' | 'timestamp'>): Promise<FormSubmission>;
  getFormSubmissions(): Promise<FormSubmission[]>;
  getFormSubmissionsByType(formType: FormSubmission['formType']): Promise<FormSubmission[]>;
  getFormSubmissionStats(): Promise<{ total: number; byType: Record<string, number>; recent: FormSubmission[] }>;
  deleteFormSubmission(id: string): Promise<boolean>;
  
  // Admin methods
  validateAdmin(username: string, password: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private formSubmissions: Map<string, FormSubmission>;
  private admin: Admin;
  private usersDir: string;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.formSubmissions = new Map();
    this.currentId = 1;
    this.usersDir = path.join(process.cwd(), "users");
    
    // Create users directory if it doesn't exist
    this.ensureUsersDirectory();
    
    // Load existing submissions from files
    this.loadSubmissionsFromFiles();
    
    // Default admin credentials
    this.admin = {
      username: "admin",
      password: "buildmasters2025"
    };
  }

  private ensureUsersDirectory() {
    if (!fs.existsSync(this.usersDir)) {
      fs.mkdirSync(this.usersDir, { recursive: true });
      console.log(`Created users directory: ${this.usersDir}`);
    }
  }

  private loadSubmissionsFromFiles() {
    try {
      if (fs.existsSync(this.usersDir)) {
        const files = fs.readdirSync(this.usersDir).filter(file => file.endsWith('.json'));
        
        for (const file of files) {
          const filePath = path.join(this.usersDir, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const submission: FormSubmission = JSON.parse(content);
          this.formSubmissions.set(submission.id, submission);
        }
        
        console.log(`Loaded ${files.length} form submissions from users directory`);
      }
    } catch (error) {
      console.error("Error loading submissions from files:", error);
    }
  }

  private saveSubmissionToFile(submission: FormSubmission) {
    try {
      const fileName = `${submission.id}.json`;
      const filePath = path.join(this.usersDir, fileName);
      fs.writeFileSync(filePath, JSON.stringify(submission, null, 2));
      console.log(`Saved submission to file: ${fileName}`);
    } catch (error) {
      console.error("Error saving submission to file:", error);
    }
  }

  private deleteSubmissionFile(id: string) {
    try {
      const fileName = `${id}.json`;
      const filePath = path.join(this.usersDir, fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted submission file: ${fileName}`);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting submission file:", error);
      return false;
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createFormSubmission(submission: Omit<FormSubmission, 'id' | 'timestamp'>): Promise<FormSubmission> {
    const id = `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();
    
    const formSubmission: FormSubmission = {
      id,
      timestamp,
      ...submission
    };
    
    // Store in memory for fast access
    this.formSubmissions.set(id, formSubmission);
    
    // Save to JSON file for persistence
    this.saveSubmissionToFile(formSubmission);
    
    return formSubmission;
  }

  async getFormSubmissions(): Promise<FormSubmission[]> {
    return Array.from(this.formSubmissions.values()).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  async getFormSubmissionsByType(formType: FormSubmission['formType']): Promise<FormSubmission[]> {
    return Array.from(this.formSubmissions.values())
      .filter(submission => submission.formType === formType)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async getFormSubmissionStats(): Promise<{ total: number; byType: Record<string, number>; recent: FormSubmission[] }> {
    const submissions = Array.from(this.formSubmissions.values());
    const byType: Record<string, number> = {};
    
    submissions.forEach(submission => {
      byType[submission.formType] = (byType[submission.formType] || 0) + 1;
    });
    
    const recent = submissions
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
    
    return {
      total: submissions.length,
      byType,
      recent
    };
  }

  async deleteFormSubmission(id: string): Promise<boolean> {
    try {
      // Delete from memory
      const deleted = this.formSubmissions.delete(id);
      
      // Delete file
      if (deleted) {
        this.deleteSubmissionFile(id);
      }
      
      return deleted;
    } catch (error) {
      console.error("Error deleting form submission:", error);
      return false;
    }
  }

  async validateAdmin(username: string, password: string): Promise<boolean> {
    return this.admin.username === username && this.admin.password === password;
  }
}

export const storage = new MemStorage();
