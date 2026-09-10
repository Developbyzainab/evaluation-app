"use client";

export const dynamic = 'force-dynamic';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LineChart, DonutChart } from "@/components/admin/Charts";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvaluations: 0,
    totalTests: 0,
    totalCertificates: 0,
    newUsers30d: 0,
    newUsers7d: 0,
    completedTests: 0,
    avgScore: 0,
    violationsCount: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentEvaluations, setRecentEvaluations] = useState([]);
  const [recentCertificates, setRecentCertificates] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, chartRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/charts"),
        ]);

        if (statsRes.ok) {
          const data = await statsRes.json();
          setStats(data);
          setRecentUsers(data.recentUsers || []);
          setRecentEvaluations(data.recentEvaluations || []);
          setRecentCertificates(data.recentCertificates || []);
        }

        if (chartRes.ok) {
          const chartResult = await chartRes.json();
          setChartData(chartResult);
        }
      } catch (e) {
        console.error("Failed to fetch admin dashboard data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#05050a] flex items-center justify-center">
        <div className="animate-pulse w-96 h-96 bg-[#0a0a10] rounded-2xl" />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#05050a] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[5%] top-[5%] h-[420px] w-[420px] rounded-full bg-violet-700/15 blur-[140px]" />
        <div className="absolute right-[0%] top-[30%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-0 left-[35%] h-[350px] w-[350px] rounded-full bg-fuchsia-600/10 blur-[150px]" />
        <div className="grid-background absolute inset-0 opacity-[0.025]" />
      </div>

      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
          <p className="text-zinc-500 mt-1">Platform overview and key metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            change={stats.newUsers30d > 0 ? `+${stats.newUsers30d} last 30d` : null}
            icon="👥"
            color="violet"
          />
          <StatCard
            title="Total Evaluations"
            value={stats.totalEvaluations.toLocaleString()}
            icon="📝"
            color="cyan"
          />
          <StatCard
            title="Tests Completed"
            value={stats.completedTests.toLocaleString()}
            change={stats.avgScore > 0 ? `Avg: ${stats.avgScore}%` : null}
            icon="✏️"
            color="emerald"
          />
          <StatCard
            title="Certificates Issued"
            value={stats.totalCertificates.toLocaleString()}
            icon="🏆"
            color="amber"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard
            title="New Users (7d)"
            value={stats.newUsers7d.toLocaleString()}
            icon="🆕"
            color="violet"
            small
          />
          <StatCard
            title="Avg Score"
            value={`${stats.avgScore}%`}
            icon="📊"
            color="cyan"
            small
          />
          <StatCard
            title="Violations"
            value={stats.violationsCount.toLocaleString()}
            icon="⚠️"
            color="red"
            small
          />
          <StatCard
            title="Completion Rate"
            value={stats.totalEvaluations > 0 ? `${Math.round((stats.completedTests / stats.totalEvaluations) * 100)}%` : "0%"}
            icon="✅"
            color="emerald"
            small
          />
        </div>

        {/* Chart Section */}
        <div className="mb-6">
          {chartData && chartData.dateLabels && chartData.series ? (
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 lg:p-6">
              <h3 className="text-lg font-bold mb-5">Platform Activity (Last 30 Days)</h3>
              <div className="h-72 lg:h-80">
                <LineChart
                  data={chartData.series.testsCompleted}
                  labels={chartData.dateLabels}
                  color="violet"
                  height={280}
                />
              </div>
              <div className="flex flex-wrap gap-4 mt-4 text-sm">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-3 h-3 rounded-full bg-violet-500" />
                  Tests Completed
                </span>
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-3 h-3 rounded-full bg-cyan-500" />
                  Users Registered
                </span>
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  Certificates
                </span>
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  Evaluations Created
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 lg:p-6">
              <h3 className="text-lg font-bold mb-5">Platform Activity (Last 30 Days)</h3>
              <div className="h-72 lg:h-80 flex items-center justify-center">
                <p className="text-zinc-500">Insufficient data for chart</p>
              </div>
            </div>
          )}
        </div>

        {/* Level Distribution Chart */}
        {chartData && chartData.levelDistribution && chartData.levelDistribution.length > 0 && (
          <div className="mb-6">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 lg:p-6">
              <h3 className="text-lg font-bold mb-5">Evaluation Level Distribution</h3>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
                <div className="w-48 h-48 lg:w-56 lg:h-56">
                  <DonutChart
                    data={chartData.levelDistribution.map(d => d.count)}
                    labels={chartData.levelDistribution.map(d => d._id)}
                    size={180}
                    strokeWidth={14}
                  />
                </div>
                <div className="flex flex-col gap-3 text-center lg:text-left">
                  {chartData.levelDistribution.map((item) => (
                    <div key={item._id} className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs ${getLevelColor(item._id)}`}>
                        {item._id}
                      </span>
                      <span className="font-medium min-w-[80px]">{item._id}</span>
                      <span className="font-mono text-lg text-right w-16">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity Grid */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Recent Users */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Recent Users</h3>
              <Link href="/admin/users" className="text-sm text-violet-400 hover:text-violet-300">View All</Link>
            </div>
            <div className="space-y-3">
              {recentUsers.length === 0 ? (
                <p className="text-zinc-500 text-center py-4">No users yet</p>
              ) : (
                recentUsers.map((u) => (
                  <Link
                    key={u.id}
                    href={`/admin/users/${u.id}`}
                    className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] rounded-xl px-2 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/10 text-violet-300 text-sm font-bold">
                        {u.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{u.name}</p>
                        <p className="text-xs text-zinc-500">{u.email}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-zinc-400">{new Date(u.createdAt).toLocaleDateString()}</p>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs ${u.role === "admin" ? "bg-red-500/20 text-red-300" : "bg-violet-500/20 text-violet-300"}`}>
                        {u.role}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Recent Evaluations */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Recent Evaluations</h3>
              <Link href="/admin/evaluations" className="text-sm text-violet-400 hover:text-violet-300">View All</Link>
            </div>
            <div className="space-y-3">
              {recentEvaluations.length === 0 ? (
                <p className="text-zinc-500 text-center py-4">No evaluations yet</p>
              ) : (
                recentEvaluations.map((e) => (
                  <Link
                    key={e._id}
                    href={`/admin/evaluations/${e._id}`}
                    className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] rounded-xl px-2 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300 text-sm font-bold">
                        {e.assessmentData?.skills?.[0]?.charAt(0)?.toUpperCase() || "E"}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{e.assessmentData?.name || "Unknown"}</p>
                        <p className="text-xs text-zinc-500">{e.userId?.email || e.userId?.name || "Unknown user"}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-zinc-400">{e.status || "in_progress"}</p>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs ${getLevelColor(e.level)}`}>
                        {e.level}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Recent Certificates */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Recent Certificates</h3>
              <Link href="/admin/certificates" className="text-sm text-violet-400 hover:text-violet-300">View All</Link>
            </div>
            <div className="space-y-3">
              {recentCertificates.length === 0 ? (
                <p className="text-zinc-500 text-center py-4">No certificates yet</p>
              ) : (
                recentCertificates.map((c) => (
                  <Link
                    key={c._id}
                    href={`/admin/certificates/${c._id}`}
                    className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] rounded-xl px-2 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-300 text-sm font-bold">
                        🏆
                      </div>
                      <div>
                        <p className="font-medium text-sm">{c.userName}</p>
                        <p className="text-xs text-zinc-500">{c.skill} • {c.percentage}%</p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-zinc-400">{new Date(c.issuedAt).toLocaleDateString()}</p>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs ${getLevelColor(c.level)}`}>
                        {c.level}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, change, icon, color, small }) {
  const colors = {
    violet: "bg-violet-500/10 text-violet-300",
    cyan: "bg-cyan-500/10 text-cyan-300",
    emerald: "bg-emerald-500/10 text-emerald-300",
    amber: "bg-amber-500/10 text-amber-300",
    red: "bg-red-500/10 text-red-300",
  };

  return (
    <div className={`rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition hover:border-violet-400/20 ${small ? "p-4" : ""}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm text-zinc-500 ${small ? "text-xs" : ""}`}>{title}</p>
          <p className={`mt-1 font-black ${small ? "text-xl" : "text-2xl"}`}>{value}</p>
          {change && <p className={`mt-1 text-xs text-zinc-500`}>{change}</p>}
        </div>
        <span className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${colors[color]}`}>{icon}</span>
      </div>
    </div>
  );
}

function getLevelColor(level) {
  switch (level) {
    case "Advanced": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "Intermediate": return "bg-violet-500/10 text-violet-400 border-violet-500/20";
    case "Beginner": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
}