"use client";

export const dynamic = 'force-dynamic';

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login?redirect=/dashboard");
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
          <Link href="/dashboard" className="nav-link transition-colors duration-300 hover:text-white font-medium">
            Dashboard
          </Link>
          <Link href="/evaluate" className="nav-link transition-colors duration-300 hover:text-white">
            New Evaluation
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-2 py-1.5 transition hover:border-violet-400/30 hover:bg-white/[0.08]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-xs font-bold text-white">
                {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
              </span>
              <span className="hidden max-w-24 truncate text-xs font-medium text-zinc-200 sm:block">
                {user?.name || user?.email}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Welcome back, <span className="gradient-text">{user?.name}</span>!
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-zinc-500">
            Your personal skill evaluation dashboard. Track your progress, view results, and manage your evaluations.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Link href="/evaluate" className="group glass-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-xl text-violet-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182C10.464 6.781 11.232 7 12 7c.725 0 1.45.22 2.003.659 1.172.879 1.172 2.303 0 3.182z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-bold">Start Evaluation</h3>
            <p className="mt-2 text-sm text-zinc-500">Create a new skill evaluation and test your knowledge</p>
          </Link>

          <Link href="/dashboard/evaluations" className="group glass-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-xl text-cyan-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-bold">My Evaluations</h3>
            <p className="mt-2 text-sm text-zinc-500">View and manage your past evaluations</p>
          </Link>

          <Link href="/dashboard/results" className="group glass-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-xl text-emerald-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.015" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-bold">Results & Certificates</h3>
            <p className="mt-2 text-sm text-zinc-500">View detailed results and download certificates</p>
          </Link>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="glass-card text-center text-zinc-500">
            No evaluations yet. <Link href="/evaluate" className="text-violet-400 hover:text-violet-300 font-medium ml-2">Start your first evaluation</Link>
          </div>
        </div>
      </section>
    </main>
  );
}