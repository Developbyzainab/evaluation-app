import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Certificate from "@/models/Certificate";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || "";
    const level = searchParams.get("level") || "";

    const query = {};
    if (search) {
      query.$or = [
        { userName: { $regex: search, $options: "i" } },
        { userEmail: { $regex: search, $options: "i" } },
        { certificateId: { $regex: search, $options: "i" } },
        { skill: { $regex: search, $options: "i" } },
      ];
    }
    if (level) {
      query.level = level;
    }

    const certificates = await Certificate.find(query)
      .populate("userId", "name email")
      .populate("testAttemptId", "assessmentData score percentage level duration completedAt")
      .sort({ issuedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Certificate.countDocuments(query);

    return NextResponse.json({
      certificates,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Admin certificates error:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}