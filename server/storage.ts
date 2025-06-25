import { users, type User, type InsertUser, type FormSubmission, type Admin, type VisitCounter, type VisitReset } from "@shared/schema";
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
  
  // Visit counter methods
  getVisitCounter(): Promise<VisitCounter>;
  incrementVisitCounter(sessionId: string): Promise<VisitCounter>;
  resetVisitCounter(resetData: VisitReset, adminUsername: string): Promise<VisitCounter>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private formSubmissions: Map<string, FormSubmission>;
  private admin: Admin;
  private usersDir: string;
  private visitCounter: VisitCounter;
  private visitCounterFile: string;
  private sessionIds: Set<string>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.formSubmissions = new Map();
    this.currentId = 1;
    this.usersDir = path.join(process.cwd(), "users");
    this.visitCounterFile = path.join(this.usersDir, "visit_counter.json");
    this.sessionIds = new Set();
    
    // Create users directory if it doesn't exist
    this.ensureUsersDirectory();
    
    // Load existing submissions from files
    this.loadSubmissionsFromFiles();
    
    // Initialize visit counter
    this.loadVisitCounter();
    
    // Default admin credentials
    this.admin = {
      username: "admin",
      password: "smartbuilders2025"
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
        const files = fs.readdirSync(this.usersDir).filter(file => 
          file.startsWith('form_') && file.endsWith('.json')
        );
        
        for (const file of files) {
          const filePath = path.join(this.usersDir, file);
          try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const submission: FormSubmission = JSON.parse(content);
            
            // Validate submission has required fields
            if (submission.id && submission.formType && submission.timestamp && submission.data) {
              this.formSubmissions.set(submission.id, submission);
            } else {
              console.warn(`Invalid submission structure in file ${file}, skipping`);
            }
          } catch (fileError) {
            console.error(`Error parsing file ${file}:`, fileError);
          }
        }
        
        console.log(`Loaded ${this.formSubmissions.size} valid form submissions from users directory`);
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

  private loadVisitCounter() {
    try {
      if (fs.existsSync(this.visitCounterFile)) {
        const content = fs.readFileSync(this.visitCounterFile, 'utf-8');
        this.visitCounter = JSON.parse(content);
        
        // Reset daily counter if it's a new day
        const today = new Date().toISOString().split('T')[0];
        const lastResetDate = this.visitCounter.lastResetDate.split('T')[0];
        
        if (today !== lastResetDate) {
          this.visitCounter.dailyVisits = 0;
          this.visitCounter.lastResetDate = new Date().toISOString();
          this.saveVisitCounter();
        }
      } else {
        // Initialize new visit counter
        this.visitCounter = {
          totalVisits: 0,
          dailyVisits: 0,
          lastResetDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        this.saveVisitCounter();
      }
    } catch (error) {
      console.error("Error loading visit counter:", error);
      // Fallback to default
      this.visitCounter = {
        totalVisits: 0,
        dailyVisits: 0,
        lastResetDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
  }

  private saveVisitCounter() {
    try {
      this.visitCounter.updatedAt = new Date().toISOString();
      fs.writeFileSync(this.visitCounterFile, JSON.stringify(this.visitCounter, null, 2));
    } catch (error) {
      console.error("Error saving visit counter:", error);
    }
  }

  async getVisitCounter(): Promise<VisitCounter> {
    return { ...this.visitCounter };
  }

  async incrementVisitCounter(sessionId: string): Promise<VisitCounter> {
    // Only increment if this session hasn't been counted yet
    if (!this.sessionIds.has(sessionId)) {
      this.sessionIds.add(sessionId);
      this.visitCounter.totalVisits += 1;
      this.visitCounter.dailyVisits += 1;
      this.saveVisitCounter();
    }
    
    return { ...this.visitCounter };
  }

  async resetVisitCounter(resetData: VisitReset, adminUsername: string): Promise<VisitCounter> {
    const resetTo = resetData.resetTo || 0;
    
    this.visitCounter.totalVisits = resetTo;
    this.visitCounter.dailyVisits = 0;
    this.visitCounter.lastResetDate = new Date().toISOString();
    this.visitCounter.lastResetBy = adminUsername;
    this.visitCounter.lastResetReason = resetData.reason || "Manual reset";
    
    // Clear session tracking
    this.sessionIds.clear();
    
    this.saveVisitCounter();
    
    console.log(`Visit counter reset to ${resetTo} by ${adminUsername}: ${resetData.reason || "Manual reset"}`);
    
    return { ...this.visitCounter };
  }
}

export const storage = new MemStorage();
