import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Certificate from "@/models/Certificate";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const userId = resolvedParams.id;

    // Validate userId is a valid ObjectId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID" },
        { status: 400 }
      );
    }

    const certificates = await Certificate.find({ userId })
      .select("certificateId skill score totalQuestions percentage level issuedAt verificationUrl pdfUrl")
      .sort({ issuedAt: -1 })
      .lean();

    return NextResponse.json({ certificates });
  } catch (error) {
    console.error("Admin user certificates error:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}