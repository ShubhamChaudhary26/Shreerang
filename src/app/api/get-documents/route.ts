import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import DocumentUpload from "@/schema/DocumentUpload";

// Force dynamic -> disable caching on Vercel
export const dynamic = "force-dynamic";

// Allowed domain
const allowedOrigins = [
  "http://localhost:3000",
  "https://rentagreementwithus.com",
];
export async function GET(request: Request) {
  try {
    // ✅ Origin check
    const origin = request.headers.get("origin") || "";
    if (!allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Access denied" },
        { status: 403 }
      );
    }

    await connectDB();
    const documents = await DocumentUpload.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, documents });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}
