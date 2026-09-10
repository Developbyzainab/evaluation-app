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

    // Generate date labels for the last 30 days
    const dateLabels = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      dateLabels.push(date.toISOString().split('T')[0]);
    }

    const [
      userRegistrations,
      evaluationsCreated,
      testsCompleted,
      certificatesIssued,
      scoreTrend,
    ] = await Promise.all([
      // User registrations per day (last 30 days)
      User.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      // Evaluations created per day (last 30 days)
      TestAttempt.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      // Tests completed per day (last 30 days)
      TestAttempt.aggregate([
        { $match: { status: "completed", completedAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$completedAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      // Certificates issued per day (last 30 days)
      Certificate.aggregate([
        { $match: { issuedAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$issuedAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      // Average score trend per day (last 30 days)
      TestAttempt.aggregate([
        { $match: { status: "completed", completedAt: { $gte: thirtyDaysAgo }, percentage: { $exists: true, $ne: null } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$completedAt" } },
            avgScore: { $avg: "$percentage" },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    // Convert to maps for easy lookup
    const userMap = new Map(userRegistrations.map(d => [d._id, d.count]));
    const evalMap = new Map(evaluationsCreated.map(d => [d._id, d.count]));
    const testMap = new Map(testsCompleted.map(d => [d._id, d.count]));
    const certMap = new Map(certificatesIssued.map(d => [d._id, d.count]));
    const scoreMap = new Map(scoreTrend.map(d => [d._id, Math.round(d.avgScore)]));

    // Build time series arrays matching dateLabels
    const usersSeries = dateLabels.map(label => userMap.get(label) || 0);
    const evaluationsSeries = dateLabels.map(label => evalMap.get(label) || 0);
    const testsSeries = dateLabels.map(label => testMap.get(label) || 0);
    const certificatesSeries = dateLabels.map(label => certMap.get(label) || 0);
    const scoresSeries = dateLabels.map(label => scoreMap.get(label) || null);

    // Level distribution for donut chart
    const levelDistribution = await TestAttempt.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: "$level", count: { $sum: 1 } } },
    ]);

    // Score distribution for bar chart
    const scoreDistribution = await TestAttempt.aggregate([
      { $match: { status: "completed", percentage: { $exists: true, $ne: null } } },
      {
        $bucket: {
          groupBy: "$percentage",
          boundaries: [0, 20, 40, 60, 80, 101],
          default: "Other",
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    return NextResponse.json({
      dateLabels,
      series: {
        users: usersSeries,
        evaluations: evaluationsSeries,
        testsCompleted: testsSeries,
        certificates: certificatesSeries,
        avgScore: scoresSeries,
      },
      levelDistribution,
      scoreDistribution,
    });
  } catch (error) {
    console.error("Admin charts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch chart data" },
      { status: 500 }
    );
  }
}