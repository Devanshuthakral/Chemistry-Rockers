import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStudentResultSchema, insertContactInquirySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {

  // ==========================
  // Student Results API
  // ==========================

  app.get("/api/results", async (req, res) => {
    try {
      const results = await storage.getStudentResults();
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch results" });
    }
  });

  app.post("/api/results", async (req, res) => {
    try {
      const data = insertStudentResultSchema.parse(req.body);
      const result = await storage.createStudentResult(data);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.delete("/api/results/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      await storage.deleteStudentResult(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete result" });
    }
  });

  // ==========================
  // Contact Inquiries API
  // ==========================

  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(data);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const inquiries = await storage.getContactInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  app.delete("/api/contact/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      await storage.deleteContactInquiry(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete inquiry" });
    }
  });

  return httpServer;
}
