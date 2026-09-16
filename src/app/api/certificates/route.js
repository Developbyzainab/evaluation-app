import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Certificate from "@/models/Certificate";

export async function POST(request) {
  try {
    await connectDB();

    const certificateData = await request.json();

    const certificate = await Certificate.create(certificateData);

    return NextResponse.json({
      success: true,
      certificate: certificate.toObject(),
    });
  } catch (error) {
    console.error("Create certificate error:", error);
    return NextResponse.json(
      { error: "Failed to create certificate" },
      { status: 500 }
    );
  }
}