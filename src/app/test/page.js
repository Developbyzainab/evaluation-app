"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

import ProgressBar from "../../components/ProgressBar";
import QuestionCard from "../../components/QuestionCard";
import { generateQuestionsForSkills } from "../../lib/ai-questions";
import { createCertificate, saveCertificate } from "../../lib/certificate";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getQuestions(skills, difficulty, count, language) {
  return generateQuestionsForSkills(skills, difficulty.toLowerCase(), count, language);
}

const TOTAL_QUESTIONS = 100;
const TIMER_DURATION = 200 * 60; // 200 minutes in seconds

export default function TestPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  const [assessment, setAssessment] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [timerActive, setTimerActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [testViolated, setTestViolated] = useState(false);
  const [violationReason, setViolationReason] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const timerIntervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // Auth check - redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Prevent back navigation
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      // Don't allow going back - test must be completed
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Detect tab/window focus loss - end test immediately
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && timerActive && !testEnded) {
        setTestViolated(true);
        setViolationReason("Tab switched or window minimized");
        setTimerActive(false);
        finishAssessment(true);
      }
    };

    const handleBlur = () => {
      if (timerActive && !testEnded) {
        setTestViolated(true);
        setViolationReason("Window lost focus / tab switched");
        setTimerActive(false);
        finishAssessment(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [timerActive, testEnded]);

  // Force fullscreen on test start
  useEffect(() => {
    if (timerActive && !isFullscreen && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    }

    // Exit fullscreen only while the document is active; ending can also be triggered by blur.
    if (testEnded && isFullscreen) {
      if (
        document.fullscreenElement &&
        !document.hidden &&
        document.hasFocus() &&
        document.exitFullscreen
      ) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  }, [timerActive, testEnded, isFullscreen]);

  // Prevent right-click, copy, paste, shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, Ctrl+P, Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && (e.key === "u" || e.key === "s" || e.key === "p" || e.key === "a" || e.key === "c" || e.key === "v" || e.key === "x")) ||
        (e.metaKey && (e.key === "c" || e.key === "v" || e.key === "x" || e.key === "a"))
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleContextMenu = (e) => e.preventDefault();
    const handleCopy = (e) => e.preventDefault();
    const handlePaste = (e) => e.preventDefault();
    const handleCut = (e) => e.preventDefault();
    const handleSelectStart = (e) => e.preventDefault();

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);
    document.addEventListener("cut", handleCut);
    document.addEventListener("selectstart", handleSelectStart);

    // Disable text selection
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("selectstart", handleSelectStart);
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("skilleval-assessment");

    if (!saved) {
      router.push("/evaluate");
      return;
    }

    try {
      const data = JSON.parse(saved);

      setAssessment(data);
      startTimeRef.current = new Date().toISOString();

      const generatedQuestions = getQuestions(
        data.skills || [],
        data.difficulty || "easy",
        TOTAL_QUESTIONS,
        data.language || "English"
      );

      setQuestions(generatedQuestions);
      setTimerActive(true);
    } catch (error) {
      console.error("Assessment error:", error);
      router.push("/evaluate");
    }
  }, [router]);

  // Timer logic
  useEffect(() => {
    if (!timerActive || timer <= 0) {
      if (timer <= 0 && timerActive) {
        handleTimeUp();
      }
      return;
    }

    timerIntervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setTimerActive(false);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [timerActive, timer]);

  const question = questions[currentQuestion];

  function handleAnswer(answer) {
    if (submitting || testEnded) return;

    setAnswers((previous) => ({
      ...previous,
      [question.id]: answer,
    }));
  }

  function handleNext() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    } else {
      finishAssessment();
    }
  }

  function handleTimeUp() {
    setTimerActive(false);
    finishAssessment();
  }

  function finishAssessment(violated = false) {
    if (submitting || testEnded) return;
    setSubmitting(true);
    setTestEnded(true);
    setTimerActive(false);

    let score = 0;

    const skillStats = {};

    questions.forEach((item) => {
      if (!skillStats[item.skill]) {
        skillStats[item.skill] = {
          correct: 0,
          total: 0,
        };
      }

      skillStats[item.skill].total += 1;

      const userAnswer = answers[item.id]?.trim().toLowerCase();
      const correctAnswer = item.answer?.trim().toLowerCase();

      if (userAnswer && correctAnswer && userAnswer === correctAnswer) {
        score += 1;
        skillStats[item.skill].correct += 1;
      }
    });

    Object.keys(skillStats).forEach((skill) => {
      const stats = skillStats[skill];

      stats.percentage =
        stats.total > 0
          ? Math.round((stats.correct / stats.total) * 100)
          : 0;
    });

    const percentage =
      questions.length > 0
        ? Math.round((score / questions.length) * 100)
        : 0;

    let level = "Beginner";

    if (percentage >= 80) {
      level = "Advanced";
    } else if (percentage >= 60) {
      level = "Intermediate";
    }

    const strengths = Object.entries(skillStats)
      .filter(([, stats]) => stats.percentage >= 70)
      .map(([skill]) => skill);

    const weaknesses = Object.entries(skillStats)
      .filter(([, stats]) => stats.percentage < 70)
      .map(([skill]) => skill);

    const endTime = new Date();
    const start = startTimeRef.current ? new Date(startTimeRef.current) : endTime;
    const durationMs = endTime - start;
    const durationMinutes = Math.round(durationMs / 60000);
    const duration = durationMinutes > 0 ? `${durationMinutes} min` : "< 1 min";

    const result = {
      ...assessment,
      userId: user?.id,
      userEmail: user?.email,
      userName: user?.name,

      score,
      total: questions.length,
      percentage,
      level,
      duration,

      answers,
      skillStats,

      strengths,
      weaknesses,

      completedAt: new Date().toISOString(),
      testViolated: violated,
      violationReason: violated ? violationReason : undefined,

      certificateId: null,
    };

    const certificate = createCertificate(assessment, result);
    result.certificateId = certificate.id;

    // Save to user's test history
    const testHistoryKey = `skilleval-history-${user?.id}`;
    const existingHistory = JSON.parse(localStorage.getItem(testHistoryKey) || "[]");
    existingHistory.unshift(result);
    localStorage.setItem(testHistoryKey, JSON.stringify(existingHistory));

    // Save to global results for admin
    const allResultsKey = "skilleval-all-results";
    const allResults = JSON.parse(localStorage.getItem(allResultsKey) || "[]");
    allResults.unshift(result);
    localStorage.setItem(allResultsKey, JSON.stringify(allResults));

    localStorage.setItem("skilleval-result", JSON.stringify(result));

    saveCertificate(certificate);

    setTimeout(() => {
      router.push("/result");
    }, 900);
  }

  /* ---------------- LOADING ---------------- */

  // Auth check - redirect to login if not authenticated
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#05050a] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="mt-4 text-zinc-400">Loading...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  if (!assessment) {
    const isUrdu = assessment?.language === "Urdu";
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05050a] text-white" dir={isUrdu ? "rtl" : "ltr"}>
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />

          <p className="mt-5 text-sm text-zinc-600">
            {isUrdu ? "آپ کا Assessment تیار کیا جا رہا ہے..." : "Preparing your assessment..."}
          </p>
        </div>
      </main>
    );
  }

  if (!questions.length || !question) {
    const isUrdu = assessment?.language === "Urdu";
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05050a] px-5 text-white" dir={isUrdu ? "rtl" : "ltr"}>
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-2xl">
            !
          </div>

          <h1 className="mt-6 text-2xl font-black">
            {isUrdu ? "سوال دستیاب نہیں" : "Questions not available"}
          </h1>

          <p className="mt-3 text-sm leading-7 text-zinc-600">
            {isUrdu
              ? "ہممیں منتخب کردہ ہنروں کے لئے سوالات نہیں مل سکے۔"
              : "We couldn't find questions for the selected skills yet."}
          </p>

          <Link
            href="/evaluate"
            className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-black"
          >
            {isUrdu ? "نیا Assessment بنائیں" : "Create New Assessment"}
          </Link>
        </div>
      </main>
    );
  }

  if (testViolated) {
    const isUrdu = assessment?.language === "Urdu";
    return (
      <main className="min-h-screen bg-[#05050a] flex items-center justify-center px-4 py-12" dir={isUrdu ? "rtl" : "ltr"}>
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-4xl">
            ⚠️
          </div>
          <h1 className="mt-6 text-2xl font-bold text-white">
            {isUrdu ? "ٹیسٹ ختم ہو گیا" : "Test Terminated"}
          </h1>
          <p className="mt-3 text-zinc-400">
            {isUrdu
              ? `ٹیسٹ سیکیورٹی کی وجوہ سے ختم کر دیا گیا: ${violationReason}`
              : `Test terminated due to security violation: ${violationReason}`}
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            {isUrdu
              ? "دوبارہ کوشش کرنے کے لئے نئے جائزے کا آغاز کریں۔"
              : "Start a new assessment to try again."}
          </p>
          <Link
            href="/evaluate"
            className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-black"
          >
            {isUrdu ? "نیا Assessment بنائیں" : "Create New Assessment"}
          </Link>
        </div>
      </main>
    );
  }

  if (testEnded && !testViolated) {
    return (
      <main className="min-h-screen bg-[#05050a] flex items-center justify-center px-4 py-12" dir={isUrdu ? "rtl" : "ltr"}>
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-4xl">
            ✓
          </div>
          <h1 className="mt-6 text-2xl font-bold text-white">
            {isUrdu ? "ٹیسٹ مکمل ہو گیا" : "Test Completed"}
          </h1>
          <p className="mt-3 text-zinc-400">
            {isUrdu ? "آپ کے نتائج تیار کیے جا رہے ہیں..." : "Preparing your results..."}
          </p>
          <div className="mt-7 h-1 w-48 mx-auto overflow-hidden rounded-full bg-zinc-900">
            <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
          </div>
        </div>
      </main>
    );
  }

  const isUrdu = assessment?.language === "Urdu";

  // Format timer as MM:SS
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const isLowTime = timer < 60 * 10; // Less than 10 minutes
  const isCriticalTime = timer < 60 * 5; // Less than 5 minutes

  return (
    <main className="min-h-screen bg-[#05050a] text-white" dir={isUrdu ? "rtl" : "ltr"}>
      {/* Security warning banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-amber-600/90 text-amber-50 px-4 py-2 text-center text-sm font-medium border-b border-amber-400 no-print">
        {isUrdu
          ? "⚠️ سیکیورٹی موبائل: ٹیب سوئچ کرنے، ونڈو منیمائز کرنے، یا بیک پر جانے سے ٹیسٹ ختم ہو جائے گا"
          : "⚠️ Security Active: Switching tabs, minimizing window, or leaving page will terminate test"}
      </div>

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[5%] top-[15%] h-80 w-80 rounded-full bg-violet-700/10 blur-[130px]" />
        <div className="absolute bottom-[10%] right-[5%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute left-0 top-0 h-full w-full opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)] [background-size:50px_50px]" />
      </div>

      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#05050a]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <img src="/white.png" alt="Skill Evaluator" className="h-10 w-auto object-contain" />
            <span className="text-xs font-semibold text-violet-400 tracking-wide">SECURE MODE</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-700">
                {isUrdu ? "باقی وقت" : "Time Remaining"}
              </p>
              <p className={`mt-1 text-xl font-mono font-bold ${isCriticalTime ? "text-red-400 animate-pulse" : isLowTime ? "text-yellow-400" : "text-white"}`}>
                {formattedTime}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-700">
                {isUrdu ? "سوال" : "Question"}
              </p>

              <p className="mt-1 text-sm font-bold">
                {currentQuestion + 1}
                <span className="text-zinc-700">
                  {" "}
                  / {questions.length}
                </span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-3xl px-5 py-9 sm:py-14">
        {/* Progress */}
        <div className="mb-8">
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
        </div>

        {/* Question */}
        <QuestionCard
          question={question}
          answer={answers[question.id] || ""}
          onAnswer={handleAnswer}
          showResult={false}
        />

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-3 text-sm font-medium text-zinc-400 hover:border-violet-400/30 hover:bg-white/[0.04] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUrdu ? "پچھلا" : "Previous"}
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-500">
              {currentQuestion + 1} / {questions.length}
            </span>

            {currentQuestion < questions.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-2xl bg-white px-6 py-3 font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/10"
              >
                {isUrdu ? "اگلا" : "Next"}
                <span className="ml-2 transition-all group-hover:ml-4">
                  →
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={finishAssessment}
                disabled={submitting}
                className="rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (isUrdu ? "جمع ہو رہا ہے..." : "Submitting...") : (isUrdu ? "جائزہ جمع کریں" : "Submit Assessment")}
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}