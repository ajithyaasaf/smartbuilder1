import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Form submission schemas
export const formSubmissionSchema = z.object({
  id: z.string(),
  formType: z.enum(["contact", "quickInquiry", "siteVisit", "emiCalculator", "newsletter"]),
  timestamp: z.string(),
  data: z.record(z.any()),
});

export type FormSubmission = z.infer<typeof formSubmissionSchema>;

// Admin user schema
export const adminSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type Admin = z.infer<typeof adminSchema>;
