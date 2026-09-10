import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import TestAttempt from "@/models/TestAttempt";
import Certificate from "@/models/Certificate";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 30;

    const skip = (page - 1) * limit;

    // Fetch recent activities from all three collections
    const [recentUsers, recentEvaluations, recentCertificates] = await Promise.all([
      User.find()
        .select("name email role createdAt")
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean(),
      TestAttempt.find({ status: "completed" })
        .populate("userId", "name email")
        .select("assessmentData score percentage level completedAt createdAt")
        .sort({ completedAt: -1 })
        .limit(limit)
        .lean(),
      Certificate.find()
        .populate("userId", "name email")
        .select("certificateId userName userEmail skill score percentage level issuedAt")
        .sort({ issuedAt: -1 })
        .limit(limit)
        .lean(),
    ]);

    // Combine and sort all activities
    const activities = [
      ...recentUsers.map((u) => ({
        type: "user_registration",
        title: "New user registered",
        description: `${u.name} (${u.email}) joined`,
        user: { name: u.name, email: u.email },
        timestamp: u.createdAt,
        metadata: { role: u.role },
      })),
      ...recentEvaluations.map((e) => ({
        type: "evaluation_completed",
        title: "Evaluation completed",
        description: `${e.userId?.name || "User"} finished ${e.assessmentData?.name || "an evaluation"}`,
        user: e.userId ? { name: e.userId.name, email: e.userId.email } : null,
        timestamp: e.completedAt || e.createdAt,
        metadata: {
          score: e.score,
          percentage: e.percentage,
          level: e.level,
          status: e.status,
        },
      })),
      ...recentCertificates.map((c) => ({
        type: "certificate_issued",
        title: "Certificate issued",
        description: `${c.userName} earned ${c.skill} certificate (${c.percentage}%)`,
        user: { name: c.userName, email: c.userEmail },
        timestamp: c.issuedAt,
        metadata: {
          certificateId: c.certificateId,
          skill: c.skill,
          level: c.level,
          percentage: c.percentage,
        },
      })),
    ];

    // Sort by timestamp descending
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Apply pagination
    const total = activities.length;
    const paginatedActivities = activities.slice(skip, skip + limit);

    return NextResponse.json({
      activities: paginatedActivities,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Admin activity error:", error);
    return NextResponse.json(
      { error: "Failed to fetch activity" },
      { status: 500 }
    );
  }
}