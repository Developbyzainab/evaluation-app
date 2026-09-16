import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Certificate from "@/models/Certificate";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const certId = resolvedParams.id;

    const certificate = await Certificate.findById(certId).lean();

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(certificate);
  } catch (error) {
    console.error("Admin certificate detail error:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificate" },
      { status: 500 }
    );
  }
}