"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("skilleval-result");

    if (!saved) {
      router.push("/evaluate");
      return;
    }

    setResult(JSON.parse(saved));
  }, [router]);

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05050a] text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </main>
    );
  }

  const percentage = result.percentage;
  const isUrdu = result.language === "Urdu";

  return (
    <main className="min-h-screen bg-[#05050a] px-5 py-10 text-white" dir={isUrdu ? "rtl" : "ltr"}>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-2xl shadow-2xl shadow-violet-500/20">
            ✓
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-violet-400">
            {isUrdu ? "جائزہ مکمل" : "Assessment Complete"}
          </p>

          <h1 className="mt-3 text-4xl font-black sm:text-5xl">
            {isUrdu ? "آپ کا جائزہ تیار ہے۔" : "Your evaluation is ready."}
          </h1>

          <p className="mt-4 text-zinc-500">
            {isUrdu
              ? `بہترین کام، ${result.name}. یہ ہے آپ کی تفصیلی کارکردگی۔`
              : `Great work, ${result.name}. Here is your detailed performance.`}
          </p>
        </div>

        {/* Score */}
        <div className="mt-12 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7 text-center shadow-2xl shadow-black/20 sm:p-10">
          <p className="text-xs uppercase tracking-widest text-zinc-600">
            {isUrdu ? "کلی سکور" : "Overall Score"}
          </p>

          <div className="mt-4 text-7xl font-black gradient-text">
            {percentage}%
          </div>

          <p className="mt-3 text-sm text-zinc-600">
            {isUrdu
              ? `${result.score} درست ${result.total} میں سے`
              : `${result.score} correct out of ${result.total}`}
          </p>

          <div className="mx-auto mt-8 max-w-md overflow-hidden rounded-full bg-zinc-900">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="mx-auto mt-8 inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-5 py-2 text-sm font-semibold text-violet-300">
            {isUrdu
              ? result.level === "Advanced"
                ? "ماہر سطح"
                : result.level === "Intermediate"
                ? "درمیانہ سطح"
                : "ابتدائی سطح"
              : `${result.level} Skill Level`}
          </div>
        </div>

        {/* Strengths / Weaknesses */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-green-400/10 bg-green-500/[0.025] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-widest text-green-400">
              {isUrdu ? "مضبوط جوانب" : "Strengths"}
            </p>

            <h2 className="mt-2 text-xl font-bold">
              {isUrdu ? "ہنر جن میں آپ اچھے ہیں" : "Skills you're doing well in"}
            </h2>

            <div className="mt-6 space-y-3">
              {result.strengths?.length ? (
                result.strengths.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between rounded-xl border border-green-400/10 bg-green-500/[0.04] px-4 py-3"
                  >
                    <span className="text-sm text-zinc-300">
                      {skill}
                    </span>

                    <span className="text-green-400">
                      ✓
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-600">
                  {isUrdu
                    ? "مضبوط جوانب بنانے کے لئے مشق جاری رکھیں۔"
                    : "Keep practicing to build stronger areas."}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-orange-400/10 bg-orange-500/[0.025] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-widest text-orange-400">
              {isUrdu ? "بہتری کے جوانب" : "Focus Areas"}
            </p>

            <h2 className="mt-2 text-xl font-bold">
              {isUrdu ? "ہنر جن میں مزید مشق درکار ہے" : "Skills that need more practice"}
            </h2>

            <div className="mt-6 space-y-3">
              {result.weaknesses?.length ? (
                result.weaknesses.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between rounded-xl border border-orange-400/10 bg-orange-500/[0.04] px-4 py-3"
                  >
                    <span className="text-sm text-zinc-300">
                      {skill}
                    </span>

                    <span className="text-orange-400">
                      !
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-600">
                  {isUrdu
                    ? "بہت اچھے! کوئی بڑا کمزور علاقہ نہیں ملا۔"
                    : "Excellent! No major weak area detected."}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Skill Breakdown */}
        <div className="mt-6 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-widest text-zinc-600">
            {isUrdu ? "ہنر کا تجزیہ" : "Skill Analysis"}
          </p>

          <h2 className="mt-2 text-xl font-bold">
            {isUrdu ? "ہنر کے لحاظ سے کارکردگی" : "Performance by skill"}
          </h2>

          <div className="mt-7 space-y-6">
            {Object.entries(result.skillStats || {}).map(
              ([skill, stats]) => {
                const score =
                  stats.total > 0
                    ? Math.round(
                        (stats.correct / stats.total) * 100
                      )
                    : 0;

                return (
                  <div key={skill}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">
                          {skill}
                        </p>

                        <p className="mt-1 text-[10px] text-zinc-700">
                          {isUrdu
                            ? `${stats.correct} / ${stats.total} درست`
                            : `${stats.correct} / ${stats.total} correct`}
                        </p>
                      </div>

                      <span className="font-bold text-violet-300">
                        {score}%
                      </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-900">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-1000"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* AI Insight */}
        <div className="mt-6 rounded-3xl border border-cyan-400/10 bg-cyan-500/[0.035] p-6 sm:p-8">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
              ✦
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-400">
                {isUrdu ? "جائزہ کی بصیرت" : "Evaluation Insight"}
              </p>

              <h2 className="mt-2 font-bold">
                {isUrdu
                  ? `آپ کی موجودہ سطح ${result.level === 'Advanced' ? 'ماہر' : result.level === 'Intermediate' ? 'درمیانہ' : 'ابتدائی'} ہے۔`
                  : `Your current level is ${result.level}.`}
              </h2>

              <p className="mt-2 text-sm leading-7 text-zinc-500">
                {percentage >= 80
                  ? isUrdu
                    ? "آپ نے جانیے گئے ہنروں میں مضبوط سمجھ کا مظاہرہ کیا ہے۔ آپ کا اگلا قدم عملی پروجیکٹس اور گہرے مسئلہ حل کرنے پر ہونا چاہیے۔"
                    : "You demonstrated strong understanding across the evaluated skills. Your next step should be advanced practical projects and deeper problem-solving."
                  : percentage >= 60
                  ? isUrdu
                    ? "آپ کے پاس مضبوط بنیاد ہے۔ عملی پروجیکٹس پر توجہ دیں اور ان علاقوں کو مضبوط بنائیں جہاں آپ کا سکور کم تھا۔"
                    : "You have a solid foundation. Focus on practical projects and strengthen the areas where your score was lower."
                  : isUrdu
                    ? "آپ اپنی بنیاد بنا رہے ہیں۔ بنیادی اصولوں پر مسلسل مشق کریں اور چھوٹے حقیقی پروجیکٹس پر کام کریں۔"
                    : "You are building your foundation. Practice the fundamentals consistently and work on small real-world projects."}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/certificate/${result.certificateId || ''}`}
            className="flex-1 rounded-2xl bg-violet-600 px-6 py-4 text-center font-bold text-white transition hover:bg-violet-700 hover:-translate-y-1"
          >
            {isUrdu ? "سرٹیفکیٹ دیکھیں" : "View Certificate"}
          </Link>

          <Link
            href="/dashboard"
            className="flex-1 rounded-2xl bg-white px-6 py-4 text-center font-bold text-black transition hover:-translate-y-1"
          >
            {isUrdu ? "ڈیش بورڈ دیکھیں" : "View Dashboard"}
          </Link>

          <Link
            href="/evaluate"
            className="flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-4 text-center font-bold text-zinc-300 transition hover:border-violet-400/20 hover:text-white"
          >
            {isUrdu ? "نیا جائزہ" : "New Assessment"}
          </Link>
        </div>
      </div>
    </main>
  );
}