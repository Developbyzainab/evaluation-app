"use client";

export const dynamic = 'force-dynamic';

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Admin() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login?redirect=/admin");
    }
    if (!isLoading && isAuthenticated && user?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#05050a] flex items-center justify-center">
        <div className="animate-pulse w-96 h-96 bg-[#0a0a10] rounded-2xl" />
      </main>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
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

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8 border-b border-white/[0.05]">
        <Link href="/admin" className="group flex items-center gap-2">
          <span className="text-xl font-black gradient-text">SkillEval</span>
          <span className="text-xs uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded">Admin</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/admin" className="nav-link transition-colors duration-300 hover:text-white font-medium">Dashboard</Link>
          <Link href="/admin/users" className="nav-link transition-colors duration-300 hover:text-white">Users</Link>
          <Link href="/admin/evaluations" className="nav-link transition-colors duration-300 hover:text-white">Evaluations</Link>
          <Link href="/admin/results" className="nav-link transition-colors duration-300 hover:text-white">Results</Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-zinc-500 mt-1">Manage users, evaluations, and platform settings</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Users" value="1,234" icon="👥" color="violet" />
          <StatCard title="Evaluations" value="567" icon="📝" color="cyan" />
          <StatCard title="Tests Taken" value="890" icon="✏️" color="emerald" />
          <StatCard title="Certificates" value="234" icon="🏆" color="amber" />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Link href="/admin/users" className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition hover:border-violet-400/20 hover:bg-violet-500/[0.025]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-xl text-violet-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a5.971 5.971 0 00-.941 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold">Manage Users</h3>
                <p className="text-sm text-zinc-500">View, edit roles, delete users</p>
              </div>
            </div>
          </Link>

          <Link href="/admin/evaluations" className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition hover:border-violet-400/20 hover:bg-violet-500/[0.025]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-xl text-cyan-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold">All Evaluations</h3>
                <p className="text-sm text-zinc-500">View and manage evaluations</p>
              </div>
            </div>
          </Link>

          <Link href="/admin/results" className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition hover:border-violet-400/20 hover:bg-violet-500/[0.025]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-xl text-emerald-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.015" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold">All Results</h3>
                <p className="text-sm text-zinc-500">View and export test results</p>
              </div>
            </div>
          </Link>

          <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition hover:border-violet-400/20 hover:bg-violet-500/[0.025]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-xl text-amber-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold">Certificates</h3>
                <p className="text-sm text-zinc-500">Manage issued certificates</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ title, value, icon, color }) {
  const colors = {
    violet: "bg-violet-500/10 text-violet-300",
    cyan: "bg-cyan-500/10 text-cyan-300",
    emerald: "bg-emerald-500/10 text-emerald-300",
    amber: "bg-amber-500/10 text-amber-300",
  };

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">{title}</p>
          <p className="mt-1 text-2xl font-black">{value}</p>
        </div>
        <span className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${colors[color]}`}>{icon}</span>
      </div>
    </div>
  );
}