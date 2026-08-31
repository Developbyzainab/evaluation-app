"use client";

export const dynamic = 'force-dynamic';

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminEvaluations() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login?redirect=/admin/evaluations");
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

  const mockEvaluations = [
    { id: 1, title: "Frontend Developer", user: "John Doe", skills: "React, TypeScript, CSS", level: "Advanced", status: "completed", created: "2024-01-15", completed: "2024-01-15" },
    { id: 2, title: "Backend Engineer", user: "Jane Smith", skills: "Node.js, PostgreSQL, Docker", level: "Intermediate", status: "in_progress", created: "2024-01-14", completed: "-" },
    { id: 3, title: "Data Scientist", user: "Bob Wilson", skills: "Python, ML, Pandas", level: "Beginner", status: "completed", created: "2024-01-10", completed: "2024-01-11" },
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
          <Link href="/admin/evaluations" className="nav-link transition-colors duration-300 hover:text-white font-medium">Evaluations</Link>
          <Link href="/admin/results" className="nav-link transition-colors duration-300 hover:text-white">Results</Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">All Evaluations</h1>
          <p className="text-zinc-500 mt-1">View and manage all skill evaluations</p>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.07] text-left text-sm text-zinc-500">
                <th className="pb-3 px-4 font-medium">Title</th>
                <th className="pb-3 px-4 font-medium">User</th>
                <th className="pb-3 px-4 font-medium">Skills</th>
                <th className="pb-3 px-4 font-medium">Level</th>
                <th className="pb-3 px-4 font-medium">Status</th>
                <th className="pb-3 px-4 font-medium">Created</th>
                <th className="pb-3 px-4 font-medium">Completed</th>
                <th className="pb-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {mockEvaluations.map((e) => (
                <tr key={e.id} className="hover:bg-white/[0.02]">
                  <td className="py-4 px-4 font-medium">{e.title}</td>
                  <td className="py-4 px-4 text-zinc-400">{e.user}</td>
                  <td className="py-4 px-4 text-zinc-400 max-w-xs truncate">{e.skills}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      e.level === "Advanced" ? "bg-emerald-500/20 text-emerald-300" :
                      e.level === "Intermediate" ? "bg-cyan-500/20 text-cyan-300" :
                      "bg-amber-500/20 text-amber-300"
                    }`}>
                      {e.level}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      e.status === "completed" ? "bg-emerald-500/20 text-emerald-300" :
                      "bg-amber-500/20 text-amber-300"
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-zinc-400">{e.created}</td>
                  <td className="py-4 px-4 text-zinc-400">{e.completed}</td>
                  <td className="py-4 px-4">
                    <button className="text-violet-400 hover:text-violet-300 text-sm">View</button>
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