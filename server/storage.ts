import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import {
  studentResults,
  contactInquiries,
  insertStudentResultSchema,
  insertContactInquirySchema,
  type StudentResult,
  type InsertStudentResult,
  type ContactInquiry,
  type InsertContactInquiry,
} from "@shared/schema";
import { authStorage, type IAuthStorage } from "./replit_integrations/auth/storage";

export interface IStorage extends IAuthStorage {
  // Student Results
  getStudentResults(): Promise<StudentResult[]>;
  createStudentResult(result: InsertStudentResult): Promise<StudentResult>;
  deleteStudentResult(id: number): Promise<void>;

  // Contact Inquiries
  getContactInquiries(): Promise<ContactInquiry[]>;
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  deleteContactInquiry(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Inherit auth methods from authStorage
  getUser = authStorage.getUser;
  upsertUser = authStorage.upsertUser;

  // Student Results
  async getStudentResults(): Promise<StudentResult[]> {
    return await db.select().from(studentResults).orderBy(desc(studentResults.id));
  }

  async createStudentResult(result: InsertStudentResult): Promise<StudentResult> {
    const [newResult] = await db.insert(studentResults).values(result).returning();
    return newResult;
  }

  async deleteStudentResult(id: number): Promise<void> {
    await db.delete(studentResults).where(eq(studentResults.id, id));
  }

  // Contact Inquiries
  async getContactInquiries(): Promise<ContactInquiry[]> {
    return await db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
  }

  async createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [newInquiry] = await db.insert(contactInquiries).values(inquiry).returning();
    return newInquiry;
  }

  async deleteContactInquiry(id: number): Promise<void> {
    await db.delete(contactInquiries).where(eq(contactInquiries.id, id));
  }
}

export const storage = new DatabaseStorage();
