import { users, type User, type InsertUser, type FormSubmission, type Admin } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Form submission methods
  createFormSubmission(submission: Omit<FormSubmission, 'id' | 'timestamp'>): Promise<FormSubmission>;
  getFormSubmissions(): Promise<FormSubmission[]>;
  getFormSubmissionsByType(formType: FormSubmission['formType']): Promise<FormSubmission[]>;
  getFormSubmissionStats(): Promise<{ total: number; byType: Record<string, number>; recent: FormSubmission[] }>;
  
  // Admin methods
  validateAdmin(username: string, password: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private formSubmissions: Map<string, FormSubmission>;
  private admin: Admin;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.formSubmissions = new Map();
    this.currentId = 1;
    
    // Default admin credentials
    this.admin = {
      username: "admin",
      password: "buildmasters2025"
    };
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
    
    this.formSubmissions.set(id, formSubmission);
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

  async validateAdmin(username: string, password: string): Promise<boolean> {
    return this.admin.username === username && this.admin.password === password;
  }
}

export const storage = new MemStorage();
