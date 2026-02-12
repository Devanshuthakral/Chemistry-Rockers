export * from "./models/auth";
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const studentResults = pgTable("student_results", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  classGrade: text("class_grade").notNull(),
  examType: text("exam_type").notNull(), // Board, JEE, NEET
  marks: text("marks").notNull(), // "98/100" or "AIR 50"
  year: text("year").notNull(),
  imageUrl: text("image_url"),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  classInterested: text("class_interested").notNull(),
  mode: text("mode").notNull(), // Online, Offline
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertStudentResultSchema = createInsertSchema(studentResults).omit({ id: true });
export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({ id: true, createdAt: true });

export type StudentResult = typeof studentResults.$inferSelect;
export type InsertStudentResult = z.infer<typeof insertStudentResultSchema>;

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
