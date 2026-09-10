import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TestAttempt from "@/models/TestAttempt";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const level = searchParams.get("level") || "";

    const query = {};
    if (search) {
      query.$or = [
        { "assessmentData.name": { $regex: search, $options: "i" } },
        { "userId.name": { $regex: search, $options: "i" } },
        { "userId.email": { $regex: search, $options: "i" } },
      ];
    }
    if (status) {
      query.status = status;
    }
    if (level) {
      query.level = level;
    }

    const evaluations = await TestAttempt.find(query)
      .populate("userId", "name email")
      .select("assessmentData status level score percentage duration createdAt completedAt totalQuestions")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await TestAttempt.countDocuments(query);

    return NextResponse.json({
      evaluations,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Admin evaluations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch evaluations" },
      { status: 500 }
    );
  }
}