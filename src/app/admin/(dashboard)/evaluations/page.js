"use client";

export const dynamic = 'force-dynamic';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminEvaluations() {
  const router = useRouter();
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchEvaluations = async (pageNum = 1, append = false) => {
    setLoading(pageNum === 1);
    setLoadingMore(pageNum > 1);

    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: "20",
      });
      if (search) {
        params.append("search", search);
      }
      if (statusFilter) {
        params.append("status", statusFilter);
      }
      if (levelFilter) {
        params.append("level", levelFilter);
      }

      const res = await fetch(`/api/admin/evaluations?${params}`);
      if (res.ok) {
        const data = await res.json();
        if (append) {
          setEvaluations((prev) => [...prev, ...data.evaluations]);
        } else {
          setEvaluations(data.evaluations);
        }
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch evaluations:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchEvaluations(1);
  }, []);

  const loadMore = () => {
    if (!loadingMore) {
      fetchEvaluations(page + 1, true);
    }
  };

  const filteredEvaluations = evaluations;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#05050a] flex items-center justify-center">
        <div className="animate-pulse w-96 h-96 bg-[#0a0a10] rounded-2xl" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#05050a] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[5%] top-[5%] h-[420px] w-[420px] rounded-full bg-violet-700/15 blur-[140px]" />
        <div className="absolute right-[0%] top-[30%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-0 left-[35%] h-[350px] w-[350px] rounded-full bg-fuchsia-600/10 blur-[150px]" />
        <div className="grid-background absolute inset-0 opacity-[0.025]" />
      </div>

      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-4">
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold">All Evaluations</h1>
          <p className="text-zinc-500 mt-1">Manage and view all user evaluations</p>
        </div>

        <div className="mb-5 flex flex-wrap gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search evaluations..."
            className="form-input flex-1 min-w-[200px]"
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="form-input w-auto">
            <option value="">All Status</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="abandoned">Abandoned</option>
            <option value="violated">Violated</option>
          </select>
          <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className="form-input w-auto">
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {filteredEvaluations.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-zinc-500">
            No evaluations found
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">User</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Assessment</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Level</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Score</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Date</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvaluations.map((evaluation) => (
                    <tr key={evaluation._id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-medium">{evaluation.userId?.name || "Unknown"}</p>
                          <p className="text-sm text-zinc-500">{evaluation.userId?.email || "No email"}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium">{evaluation.assessmentData?.name || "Unknown"}</p>
                        <p className="text-sm text-zinc-500">{(evaluation.assessmentData?.skills || []).slice(0, 3).join(", ")}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(evaluation.status)}`}>
                          {evaluation.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(evaluation.level)}`}>
                          {evaluation.level}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono font-bold">{evaluation.score}/{evaluation.totalQuestions} ({evaluation.percentage}%)</td>
                      <td className="px-5 py-4 text-zinc-500 text-sm">{new Date(evaluation.completedAt || evaluation.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-4">
                        <Link href={`/admin/results?search=${evaluation.userId?.email}`} className="text-violet-400 hover:text-violet-300 text-sm font-medium">
                          View Result
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {evaluations.length > 20 && (
              <div className="mt-5 text-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-3 text-sm font-medium text-zinc-400 hover:border-violet-400/30 hover:bg-white/[0.03] hover:text-white transition-all disabled:opacity-50"
                >
                  {loadingMore ? "Loading..." : `Load More (${evaluations.length}/${total})`}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

function getStatusColor(status) {
  switch (status) {
    case "completed": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "in_progress": return "bg-violet-500/10 text-violet-400 border-violet-500/20";
    case "abandoned": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "violated": return "bg-red-500/10 text-red-400 border-red-500/20";
    default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
}

function getLevelColor(level) {
  switch (level) {
    case "Advanced": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "Intermediate": return "bg-violet-500/10 text-violet-400 border-violet-500/20";
    case "Beginner": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
}