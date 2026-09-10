import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TestAttempt from "@/models/TestAttempt";
import Certificate from "@/models/Certificate";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId, ...attemptData } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Create test attempt
    const testAttempt = await TestAttempt.create({
      userId,
      ...attemptData,
    });

    // Update user's test count
    await User.findByIdAndUpdate(userId, {
      $inc: { testsCompleted: 1 },
      lastLoginAt: new Date(),
    });

    // If there's a certificate, save it
    if (attemptData.certificate) {
      await Certificate.create({
        certificateId: attemptData.certificate.id,
        userId,
        testAttemptId: testAttempt._id,
        userName: attemptData.userName,
        userEmail: attemptData.userEmail,
        skill: attemptData.assessmentData?.skills?.[0] || "General",
        score: attemptData.score,
        totalQuestions: attemptData.total,
        percentage: attemptData.percentage,
        level: attemptData.level,
        issuedAt: new Date(),
        verificationUrl: attemptData.certificate.verificationUrl,
        pdfUrl: attemptData.certificate.pdfUrl,
      });
    }

    return NextResponse.json({
      success: true,
      attemptId: testAttempt._id,
    });
  } catch (error) {
    console.error("Save test attempt error:", error);
    return NextResponse.json(
      { error: "Failed to save test attempt" },
      { status: 500 }
    );
  }
}