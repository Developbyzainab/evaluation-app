import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    testAttemptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestAttempt",
      default: null,
    },
    userName: { type: String, default: "" },
    userEmail: { type: String, default: "" },
    skill: { type: String, default: "General" },
    score: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    issuedAt: { type: Date, default: Date.now },
    verificationUrl: { type: String, default: "" },
    pdfUrl: { type: String, default: null },
    language: { type: String, default: "English" },
    duration: { type: String, default: "—" },
  },
  { timestamps: true }
);

certificateSchema.index({ userId: 1, createdAt: -1 });
certificateSchema.index({ certificateId: 1 });

export default mongoose.models.Certificate ||
  mongoose.model("Certificate", certificateSchema);