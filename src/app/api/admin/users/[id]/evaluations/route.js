import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TestAttempt from "@/models/TestAttempt";
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

    const evaluations = await TestAttempt.find({ userId })
      .select("assessmentData status level score percentage duration createdAt completedAt totalQuestions")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ evaluations });
  } catch (error) {
    console.error("Admin user evaluations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch evaluations" },
      { status: 500 }
    );
  }
}