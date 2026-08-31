"use client";

export const dynamic = 'force-dynamic';

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Evaluations() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login?redirect=/dashboard/evaluations");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#05050a] flex items-center justify-center">
        <div className="animate-pulse w-96 h-96 bg-[#0a0a10] rounded-2xl" />
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#05050a] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[5%] top-[5%] h-[420px] w-[420px] rounded-full bg-violet-700/15 blur-[140px]" />
        <div className="absolute right-[0%] top-[30%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-0 left-[35%] h-[350px] w-[350px] rounded-full bg-fuchsia-600/10 blur-[150px]" />
        <div className="grid-background absolute inset-0 opacity-[0.025]" />
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
        <Link href="/" className="group flex items-center">
          <img src="/white.png" alt="SkillEval" className="h-11 w-auto object-contain transition duration-300 group-hover:scale-105" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/dashboard" className="nav-link transition-colors duration-300 hover:text-white">Dashboard</Link>
          <Link href="/evaluate" className="nav-link transition-colors duration-300 hover:text-white font-medium">New Evaluation</Link>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Evaluations</h1>
            <p className="text-zinc-500 mt-1">View and manage your skill evaluations</p>
          </div>
          <Link href="/evaluate" className="group relative overflow-hidden rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5">
            <span className="relative z-10">+ New Evaluation</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 text-center text-zinc-500">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} className="w-12 h-12 mx-auto text-zinc-700 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <p className="text-lg mb-4">No evaluations yet</p>
          <p className="mb-6 max-w-md mx-auto">Start your first skill evaluation to see it here</p>
          <Link href="/evaluate" className="inline-block rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5">
            Start Evaluation
          </Link>
        </div>
      </section>
    </main>
  );
}