import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Certificate from "@/models/Certificate";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id || id === "undefined") {
      return NextResponse.json(
        { error: "Invalid certificate id" },
        { status: 400 }
      );
    }

    await connectDB();

    const certificate = await Certificate.findOne({ certificateId: id }).lean();

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(certificate);
  } catch (error) {
    console.error("Certificate detail error:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificate" },
      { status: 500 }
    );
  }
}