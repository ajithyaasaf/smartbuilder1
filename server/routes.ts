import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { formSubmissionSchema, adminSchema, visitResetSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Form submission endpoints
  app.post("/api/forms/submit", async (req, res) => {
    try {
      const { formType, data } = req.body;
      
      if (!formType || !data) {
        return res.status(400).json({ message: "Form type and data are required" });
      }

      const submission = await storage.createFormSubmission({ formType, data });
      res.json({ message: "Form submitted successfully", id: submission.id });
    } catch (error) {
      console.error("Form submission error:", error);
      res.status(500).json({ message: "Failed to submit form" });
    }
  });

  // Admin login endpoint
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = adminSchema.parse(req.body);
      const isValid = await storage.validateAdmin(username, password);
      
      if (isValid) {
        res.json({ success: true, message: "Login successful" });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Invalid request data" });
    }
  });

  // Admin dashboard endpoints
  app.get("/api/admin/submissions", async (req, res) => {
    try {
      const { type } = req.query;
      
      let submissions;
      if (type && typeof type === 'string') {
        submissions = await storage.getFormSubmissionsByType(type as any);
      } else {
        submissions = await storage.getFormSubmissions();
      }
      
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  app.get("/api/admin/stats", async (req, res) => {
    try {
      const stats = await storage.getFormSubmissionStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  // Delete submission endpoint
  app.delete("/api/admin/submissions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ success: false, message: "Submission ID is required" });
      }

      const deleted = await storage.deleteFormSubmission(id);
      
      if (deleted) {
        res.json({ success: true, message: "Submission deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "Submission not found" });
      }
    } catch (error) {
      console.error("Error deleting submission:", error);
      res.status(500).json({ success: false, message: "Failed to delete submission" });
    }
  });

  // Visit counter endpoints
  app.get("/api/visits", async (req, res) => {
    try {
      const counter = await storage.getVisitCounter();
      res.json(counter);
    } catch (error) {
      console.error("Error fetching visit counter:", error);
      res.status(500).json({ message: "Failed to fetch visit counter" });
    }
  });

  // Admin visit counter reset endpoint
  app.post("/api/admin/visits/reset", async (req, res) => {
    try {
      const resetData = visitResetSchema.parse(req.body);
      
      // For now, we'll use a simple admin check - in production you'd verify the session
      const { adminUsername } = req.body;
      if (!adminUsername || adminUsername !== "admin") {
        return res.status(401).json({ success: false, message: "Admin authentication required" });
      }

      const counter = await storage.resetVisitCounter(resetData, adminUsername);
      res.json({ success: true, message: "Visit counter reset successfully", counter });
    } catch (error) {
      console.error("Error resetting visit counter:", error);
      res.status(500).json({ success: false, message: "Failed to reset visit counter" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
