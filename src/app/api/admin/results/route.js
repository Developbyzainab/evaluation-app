import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TestAttempt from "@/models/TestAttempt";
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
        { "userId.name": { $regex: search, $options: "i" } },
        { "userId.email": { $regex: search, $options: "i" } },
        { skill: { $regex: search, $options: "i" } },
      ];
    }
    if (level) {
      query.level = level;
    }

    const results = await TestAttempt.find(query)
      .populate("userId", "name email")
      .populate({
        path: "certificateId",
        select: "certificateId verificationUrl pdfUrl",
      })
      .select("skill score totalQuestions percentage level duration skillStats strengths weaknesses completedAt certificateId")
      .sort({ completedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await TestAttempt.countDocuments(query);

    // Fetch certificate info for each result
    const resultsWithCert = await Promise.all(
      results.map(async (result) => {
        let certInfo = null;
        if (result.certificateId) {
          const cert = await Certificate.findById(result.certificateId).select("certificateId verificationUrl pdfUrl");
          if (cert) {
            certInfo = {
              certificateId: cert.certificateId,
              verificationUrl: cert.verificationUrl,
              pdfUrl: cert.pdfUrl,
            };
          }
        }
        return {
          ...result.toObject(),
          certificate: certInfo,
        };
      })
    );

    return NextResponse.json({
      results: resultsWithCert,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Admin results error:", error);
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}