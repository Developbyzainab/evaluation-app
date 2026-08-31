import mongoose from "mongoose";

const testQuestionSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  skill: { type: String, required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  explanation: { type: String },
  difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "intermediate" },
});

const testAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assessmentData: {
      name: String,
      experience: String,
      language: String,
      difficulty: String,
      skills: [String],
    },
    questions: [testQuestionSchema],
    answers: [{
      questionId: String,
      selectedAnswer: Number,
      isCorrect: Boolean,
      answeredAt: Date,
    }],
    currentQuestionIndex: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["in_progress", "completed", "terminated", "expired"],
      default: "in_progress",
    },
    score: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 100 },
    percentage: { type: Number, default: 0 },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    skillStats: mongoose.Schema.Types.Mixed,
    strengths: [String],
    weaknesses: [String],
    duration: { type: Number, default: 0 },
    timerStartedAt: { type: Date },
    timerEndedAt: { type: Date },
    serverTimerEndsAt: { type: Date },
    violations: [{
      type: { type: String, enum: ["tab_switch", "fullscreen_exit", "focus_loss", "navigation", "copy_paste", "right_click", "devtools"] },
      reason: String,
      timestamp: { type: Date, default: Date.now },
      warningCount: { type: Number, default: 1 },
    }],
    warningCount: { type: Number, default: 0 },
    isTerminated: { type: Boolean, default: false },
    terminationReason: { type: String },
    certificateId: { type: String },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

testAttemptSchema.index({ userId: 1, status: 1 });
testAttemptSchema.index({ userId: 1, createdAt: -1 });
testAttemptSchema.index({ serverTimerEndsAt: 1, status: 1 });

export default mongoose.models.TestAttempt || mongoose.model("TestAttempt", testAttemptSchema);