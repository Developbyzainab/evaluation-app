import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import TestAttempt from "@/models/TestAttempt";
import Certificate from "@/models/Certificate";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      totalEvaluations,
      totalTests,
      totalCertificates,
      newUsers30d,
      newUsers7d,
      completedTests,
      avgScoreResult,
      violationsCount,
      recentUsers,
      recentEvaluations,
      recentCertificates,
    ] = await Promise.all([
      User.countDocuments(),
      TestAttempt.countDocuments(),
      TestAttempt.countDocuments({ status: "completed" }),
      Certificate.countDocuments(),
      User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      TestAttempt.countDocuments({ status: "completed" }),
      TestAttempt.aggregate([
        { $match: { status: "completed", percentage: { $exists: true, $ne: null } } },
        { $group: { _id: null, avgScore: { $avg: "$percentage" } } },
      ]),
      TestAttempt.countDocuments({
        $or: [
          { status: "terminated" },
          { status: "expired" },
          { "violations.0": { $exists: true } },
        ],
      }),
      User.find()
        .select("name email role provider testsCompleted lastLoginAt createdAt")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
      TestAttempt.find()
        .populate("userId", "name email")
        .select("assessmentData status level score percentage duration createdAt completedAt")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
      Certificate.find()
        .populate("userId", "name email")
        .select("certificateId userName userEmail skill score percentage level issuedAt")
        .sort({ issuedAt: -1 })
        .limit(5)
        .lean(),
    ]);

    const avgScore = avgScoreResult.length > 0 ? Math.round(avgScoreResult[0].avgScore) : 0;

    return NextResponse.json({
      totalUsers,
      totalEvaluations,
      totalTests,
      totalCertificates,
      newUsers30d,
      newUsers7d,
      completedTests,
      avgScore,
      violationsCount,
      recentUsers,
      recentEvaluations,
      recentCertificates,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin stats" },
      { status: 500 }
    );
  }
}