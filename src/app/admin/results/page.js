"use client";

export const dynamic = 'force-dynamic';

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminResults() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login?redirect=/admin/results");
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

  const mockResults = [
    { id: 1, user: "John Doe", skill: "React.js", score: 92, level: "Expert", time: "12m 34s", date: "2024-01-15", cert: true },
    { id: 2, user: "Jane Smith", skill: "Node.js", score: 78, level: "Advanced", time: "15m 22s", date: "2024-01-14", cert: true },
    { id: 3, user: "Bob Wilson", skill: "Python", score: 65, level: "Intermediate", time: "18m 45s", date: "2024-01-10", cert: false },
  ];

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
          <Link href="/admin" className="nav-link transition-colors duration-300 hover:text-white">Dashboard</Link>
          <Link href="/admin/users" className="nav-link transition-colors duration-300 hover:text-white">Users</Link>
          <Link href="/admin/evaluations" className="nav-link transition-colors duration-300 hover:text-white">Evaluations</Link>
          <Link href="/admin/results" className="nav-link transition-colors duration-300 hover:text-white font-medium">Results</Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">All Test Results</h1>
          <p className="text-zinc-500 mt-1">View and manage all test results and certificates</p>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.07] text-left text-sm text-zinc-500">
                <th className="pb-3 px-4 font-medium">User</th>
                <th className="pb-3 px-4 font-medium">Skill</th>
                <th className="pb-3 px-4 font-medium">Score</th>
                <th className="pb-3 px-4 font-medium">Level</th>
                <th className="pb-3 px-4 font-medium">Time</th>
                <th className="pb-3 px-4 font-medium">Date</th>
                <th className="pb-3 px-4 font-medium">Certificate</th>
                <th className="pb-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {mockResults.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.02]">
                  <td className="py-4 px-4 font-medium">{r.user}</td>
                  <td className="py-4 px-4 text-zinc-400">{r.skill}</td>
                  <td className="py-4 px-4 font-bold text-lg gradient-text">{r.score}%</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      r.level === "Expert" ? "bg-violet-500/20 text-violet-300" :
                      r.level === "Advanced" ? "bg-emerald-500/20 text-emerald-300" :
                      "bg-cyan-500/20 text-cyan-300"
                    }`}>
                      {r.level}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-zinc-400">{r.time}</td>
                  <td className="py-4 px-4 text-zinc-400">{r.date}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${r.cert ? "bg-emerald-500/20 text-emerald-300" : "bg-zinc-500/20 text-zinc-400"}`}>
                      {r.cert ? "Issued" : "Not Eligible"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="text-violet-400 hover:text-violet-300 text-sm">View</button>
                      {r.cert && <button className="text-amber-400 hover:text-amber-300 text-sm">Regenerate</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}