"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: "◈",
    title: "Smart Skill Testing",
    text: "Evaluate technical and creative skills through structured assessments.",
  },
  {
    icon: "✦",
    title: "Adaptive Evaluation",
    text: "Questions can be adjusted according to the candidate's experience level.",
  },
  {
    icon: "◎",
    title: "Detailed Results",
    text: "Get scores, strengths, weaknesses and improvement recommendations.",
  },
];

import allITSkills from "@/data/all-skills";
import { getSkillIcon } from "@/lib/skill-icons";

const skills = allITSkills;

export default function HomeClient({ user }) {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleStartEvaluation = () => {
    if (!isAuthenticated) {
      window.location.href = "/auth/login?redirect=/evaluate";
    } else {
      router.push("/evaluate");
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#05050a] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[5%] top-[5%] h-[420px] w-[420px] rounded-full bg-violet-700/15 blur-[140px]" />
        <div className="absolute right-[0%] top-[30%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-0 left-[35%] h-[350px] w-[350px] rounded-full bg-fuchsia-600/10 blur-[150px]" />
        <div className="grid-background absolute inset-0 opacity-[0.025]" />
      </div>

      {/* Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center"
        >
          <img
            src="/white.png"
            alt="Skill Evaluator"
            className="h-11 w-auto object-contain transition duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="nav-link transition-colors duration-300 hover:text-white"
          >
            Features
          </a>

          <a
            href="#skills"
            className="nav-link transition-colors duration-300 hover:text-white"
          >
            Skills
          </a>

          <a
            href="#how"
            className="nav-link transition-colors duration-300 hover:text-white"
          >
            How it works
          </a>

          <Link
            href="/dashboard"
            className="nav-link transition-colors duration-300 hover:text-white"
          >
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 5" />
            </svg>
            <span className="hidden sm:inline">Login</span>
          </Link>
          <Link
            href="/auth/register"
            className="group relative overflow-hidden rounded-xl bg-white px-5 py-2 text-xs font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/20"
          >
            <span className="relative z-10">
              Sign Up
              <span className="ml-2 inline-block transition-all group-hover:ml-2">
                →
              </span>
            </span>

            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 transition-transform duration-500 group-hover:translate-x-0" />
          </Link>

          {isLoading ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-white/[0.06]" />
          ) : isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen((open) => !open)}
                aria-expanded={isProfileOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-2 py-1.5 transition hover:border-violet-400/30 hover:bg-white/[0.08]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-xs font-bold text-white">
                  {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                </span>
                <span className="hidden max-w-24 truncate text-xs font-medium text-zinc-200 sm:block">
                  {user?.name || user?.email}
                </span>
                <span className="text-xs text-zinc-500">▾</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-56 rounded-2xl border border-white/[0.08] bg-[#0a0a10] p-2 shadow-2xl shadow-black/50">
                  <div className="border-b border-white/[0.06] px-3 py-2">
                    <p className="truncate text-sm font-semibold text-white">{user?.name || "Account"}</p>
                    <p className="truncate text-xs text-zinc-500">{user?.email}</p>
                  </div>
                  <Link href="/dashboard" onClick={() => setIsProfileOpen(false)} className="mt-1 block rounded-xl px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.06] hover:text-white">
                    Profile / Account
                  </Link>
                  <Link href="/dashboard/evaluations" onClick={() => setIsProfileOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.06] hover:text-white">
                    My Evaluations
                  </Link>
                  <Link href="/dashboard/results" onClick={() => setIsProfileOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.06] hover:text-white">
                    Results & Certificates
                  </Link>
                  <button
                    type="button"
                    onClick={async () => {
                      setIsProfileOpen(false);
                      try {
                        await logout();
                      } finally {
                        window.location.assign("/");
                      }
                    }}
                    className="w-full rounded-xl px-3 py-2 text-left text-sm text-red-300 transition hover:bg-red-500/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-8 lg:px-8 lg:pb-32 lg:pt-12">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
          {/* Left */}
          <div className="animate-fade-up">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.06] px-4 py-2 text-xs text-violet-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
              AI-Powered Skill Evaluation
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Discover what
              <br />
              you can
              <span className="gradient-text"> really do.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-zinc-500 sm:text-lg">
              SkillEval helps candidates test their real-world skills,
              understand their strengths and discover exactly where they need
              to improve.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleStartEvaluation}
                className="group relative overflow-hidden rounded-2xl bg-white px-7 py-4 text-center text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/20"
              >
                <span className="relative z-10">
                  Start Your Evaluation
                  <span className="ml-2 transition-all group-hover:ml-4">
                    →
                  </span>
                </span>

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-300 via-cyan-300 to-violet-300 transition duration-500 group-hover:translate-x-0" />
              </button>

              <a
                href="#how"
                className="rounded-2xl border border-white/[0.08] bg-white/[0.025] px-7 py-4 text-center text-sm font-semibold text-zinc-300 transition hover:border-violet-400/20 hover:text-white"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs text-zinc-600">
              <span>✓ No complicated setup</span>
              <span>✓ Multiple skill categories</span>
              <span>✓ Instant evaluation</span>
            </div>
          </div>

          {/* Right Evaluation Card */}
          <div className="animate-float">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-violet-600/10 to-cyan-400/10 blur-3xl" />

              <div className="relative rounded-[30px] border border-white/[0.08] bg-[#0a0a10]/90 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl">
                {/* Top */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-700">
                      Live Evaluation
                    </p>

                    <p className="mt-1 font-bold">
                      Frontend Developer
                    </p>
                  </div>

                  <span className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-[10px] text-green-300">
                    Active
                  </span>
                </div>

                {/* Score */}
                <div className="my-9 flex justify-center">
                  <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-[conic-gradient(#8b5cf6_82%,#18181b_0)]">
                    <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-[#09090f]">
                      <span className="text-5xl font-black gradient-text">
                        82%
                      </span>

                      <span className="mt-1 text-[10px] uppercase tracking-widest text-zinc-600">
                        Skill Score
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skill bars */}
                <div className="space-y-5">
                  <SkillBar name="JavaScript" score={91} />
                  <SkillBar name="React.js" score={84} />
                  <SkillBar name="CSS" score={76} />
                </div>

                <div className="mt-7 flex items-center justify-between rounded-2xl border border-violet-400/10 bg-violet-500/[0.04] px-4 py-3">
                  <div>
                    <p className="text-[10px] text-zinc-600">
                      Current Level
                    </p>

                    <p className="mt-1 text-sm font-bold text-violet-200">
                      Advanced
                    </p>
                  </div>

                  <span className="text-xl">✦</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/[0.05] bg-white/[0.015]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/[0.05] sm:grid-cols-4">
          <Stat value="15+" label="Skill Categories" />
          <Stat value="3" label="Experience Levels" />
          <Stat value="2" label="Languages" />
          <Stat value="∞" label="Practice Attempts" />
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="mx-auto max-w-7xl px-5 py-24 lg:px-8"
      >
        <SectionHeading
          eyebrow="Why SkillEval"
          title="More than just a quiz."
          text="A complete evaluation experience designed to understand how well you actually know your skills."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-2 hover:border-violet-400/20 hover:bg-violet-500/[0.025]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-xl text-violet-300 transition group-hover:scale-110">
                {feature.icon}
              </div>

              <h3 className="mt-7 text-lg font-bold">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {feature.text}
              </p>

              <div className="mt-7 h-px w-10 bg-gradient-to-r from-violet-500 to-cyan-400 transition-all group-hover:w-20" />
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="border-y border-white/[0.05] bg-white/[0.012]"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <SectionHeading
            eyebrow="Skill Universe"
            title="Evaluate what you know."
            text="Choose the skills that matter to your career and build an assessment around them."
          />

          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
            {skills.map((skillObj, index) => (
              <span
                key={`${skillObj.name}-${skillObj.category}-${index}`}
                className={`skill-pill flex items-center gap-2 cursor-pointer ${index % 4 === 0 ? "border-violet-400/20 text-violet-200" : ""}`}
              >
                {getSkillIcon(skillObj.category)}
                {skillObj.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section
        id="how"
        className="mx-auto max-w-7xl px-5 py-24 lg:px-8"
      >
        <SectionHeading
          eyebrow="Simple Process"
          title="From skills to insights."
          text="Three simple steps turn your knowledge into a meaningful evaluation."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <Step number="01" title="Build Your Profile" text="Choose your experience level, language and the skills you want to evaluate." />
          <Step number="02" title="Take the Test" text="Answer carefully designed questions that measure your understanding." />
          <Step number="03" title="Understand Your Result" text="See your score, skill level, strengths, weaknesses and recommendations." />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-5 pb-24 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-violet-400/10 bg-gradient-to-br from-violet-500/[0.08] via-white/[0.025] to-cyan-500/[0.05] p-8 text-center sm:p-14">
          <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[90px]" />

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.3em] text-violet-400">
              Ready?
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              Find your real skill level.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-500">
              Stop guessing. Take an evaluation and get a clearer picture
              of what you know today.
            </p>

            <button
              onClick={handleStartEvaluation}
              className="mt-8 inline-block rounded-2xl bg-white px-7 py-4 text-sm font-bold text-black transition hover:-translate-y-1"
            >
              Start Evaluation →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.05]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-8 text-xs text-zinc-700 sm:flex-row lg:px-8">
          <p>
            © 2026 SkillEval AI. Built for better skill discovery.
          </p>

          <p>
            Assess · Learn · Improve
          </p>
        </div>
      </footer>
    </main>
  );
}

function SkillBar({ name, score }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs">
        <span className="text-zinc-500">{name}</span>
        <span className="font-semibold text-zinc-300">
          {score}%
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-zinc-900">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="px-4 py-8 text-center">
      <p className="text-2xl font-black sm:text-3xl">
        {value}
      </p>

      <p className="mt-2 text-[10px] uppercase tracking-widest text-zinc-700">
        {label}
      </p>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-violet-400">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-7 text-zinc-500">
        {text}
      </p>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="relative rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7">
      <span className="text-5xl font-black text-white/[0.04]">
        {number}
      </span>

      <div className="mt-3">
        <p className="text-xs text-violet-400">
          STEP {number}
        </p>

        <h3 className="mt-2 text-lg font-bold">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          {text}
        </p>
      </div>
    </div>
  );
}