import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import DocumentUpload from "@/schema/DocumentUpload";

// Force dynamic -> disable caching on Vercel
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const documents = await DocumentUpload.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, documents });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch documents" }, { status: 500 });
  }
}
