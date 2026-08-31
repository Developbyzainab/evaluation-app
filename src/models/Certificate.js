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
      required: true,
    },
    testAttemptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestAttempt",
      required: true,
    },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    skill: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    percentage: { type: Number, required: true },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
    issuedAt: { type: Date, default: Date.now },
    verificationUrl: { type: String, required: true },
    pdfUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

certificateSchema.index({ userId: 1, createdAt: -1 });
certificateSchema.index({ certificateId: 1 });

export default mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);