"use client";

export const dynamic = 'force-dynamic';

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Results() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login?redirect=/dashboard/results");
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
        <div>
          <h1 className="text-3xl font-bold">Results & Certificates</h1>
          <p className="text-zinc-500 mt-1">View your test results and earned certificates</p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 text-center text-zinc-500">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} className="w-12 h-12 mx-auto text-zinc-700 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.015" />
          </svg>
          <p className="text-lg mb-4">No results yet</p>
          <p className="mb-6 max-w-md mx-auto">Complete an evaluation to see your results and earn certificates</p>
          <Link href="/evaluate" className="inline-block rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5">
            Start Evaluation
          </Link>
        </div>
      </section>
    </main>
  );
}