import { storage } from "./storage";

async function seed() {
  console.log("Seeding database...");

  const existingResults = await storage.getStudentResults();
  if (existingResults.length === 0) {
    await storage.createStudentResult({
      name: "Riya Sharma",
      classGrade: "12",
      examType: "Board",
      marks: "98/100",
      year: "2023",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    });
    await storage.createStudentResult({
      name: "Aarav Mehta",
      classGrade: "12",
      examType: "JEE Main",
      marks: "99.5%ile",
      year: "2023",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    });
    await storage.createStudentResult({
      name: "Sneha Gupta",
      classGrade: "12",
      examType: "NEET",
      marks: "680/720",
      year: "2022",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    });
    console.log("Seeded student results");
  }

  const existingInquiries = await storage.getContactInquiries();
  if (existingInquiries.length === 0) {
    await storage.createContactInquiry({
      name: "Rahul Verma",
      email: "rahul@example.com",
      phone: "9876543210",
      message: "Interested in JEE Advanced batch.",
      classInterested: "11",
      mode: "Offline",
    });
    await storage.createContactInquiry({
      name: "Priya Singh",
      email: "priya@example.com",
      phone: "9123456780",
      message: "Do you offer demo classes for NEET?",
      classInterested: "12",
      mode: "Online",
    });
    console.log("Seeded contact inquiries");
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
