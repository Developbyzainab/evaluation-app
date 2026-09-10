"use client";

export const dynamic = 'force-dynamic';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminActivity() {
  const router = useRouter();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchActivity = async (pageNum = 1, append = false) => {
    setLoading(pageNum === 1);
    setLoadingMore(pageNum > 1);

    try {
      const res = await fetch(`/api/admin/activity?page=${pageNum}&limit=30`);
      if (res.ok) {
        const data = await res.json();
        if (append) {
          setActivities((prev) => [...prev, ...data.activities]);
        } else {
          setActivities(data.activities);
        }
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch activity:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchActivity(1);
  }, []);

  const loadMore = () => {
    if (!loadingMore) {
      fetchActivity(page + 1, true);
    }
  };

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
          <h1 className="text-2xl lg:text-3xl font-bold">Activity Log</h1>
          <p className="text-zinc-500 mt-1">Real-time platform activity from MongoDB records</p>
        </div>

        {activities.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-zinc-500">
            No activity recorded yet
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <ActivityItem key={`${activity.timestamp}-${index}`} activity={activity} />
              ))}
            </div>

            {activities.length > 30 && (
              <div className="mt-5 text-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-3 text-sm font-medium text-zinc-400 hover:border-violet-400/30 hover:bg-white/[0.03] hover:text-white transition-all disabled:opacity-50"
                >
                  {loadingMore ? "Loading..." : `Load More (${activities.length}/${total})`}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

function ActivityItem({ activity }) {
  const getIcon = (type) => {
    switch (type) {
      case "user_registration": return "👤";
      case "evaluation_completed": return "✏️";
      case "certificate_issued": return "🏆";
      default: return "📝";
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "user_registration": return "violet";
      case "evaluation_completed": return "cyan";
      case "certificate_issued": return "amber";
      default: return "zinc";
    }
  };

  const colors = {
    violet: "bg-violet-500/10 text-violet-300",
    cyan: "bg-cyan-500/10 text-cyan-300",
    amber: "bg-amber-500/10 text-amber-300",
    zinc: "bg-zinc-500/10 text-zinc-300",
  };

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.03] transition-colors">
      <div className="flex items-start gap-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${colors[getColor(activity.type)]}`}>
          {getIcon(activity.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-medium">{activity.title}</p>
            <p className="text-xs text-zinc-500 whitespace-nowrap">{new Date(activity.timestamp).toLocaleString()}</p>
          </div>
          <p className="mt-1 text-sm text-zinc-400">{activity.description}</p>
          {activity.user && (
            <p className="mt-1 text-xs text-zinc-500">
              User: {activity.user.name} ({activity.user.email})
            </p>
          )}
          {activity.metadata && (
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(activity.metadata).map(([key, value]) => (
                <span key={key} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-white/[0.02] text-zinc-400">
                  {key}: {value}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}