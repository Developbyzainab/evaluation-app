"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function AdminResults() {
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [levelFilter, setLevelFilter] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);

  // ✅ Controlled search input (fixes blink + focus loss)
  const [searchInput, setSearchInput] = useState("");
  const searchTimeoutRef = useRef(null);
  const isFirstLoad = useRef(true);
  const abortRef = useRef(null);

  const fetchResults = async (pageNum, append, searchTerm, level) => {
    // cancel previous request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (pageNum > 1) setLoadingMore(true);

    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: "20",
      });
      if (searchTerm) params.append("search", searchTerm);
      if (level) params.append("level", level);

      const res = await fetch(`/api/admin/results?${params}`, {
        signal: controller.signal,
      });
      if (res.ok) {
        const data = await res.json();
        if (append) {
          setResults((prev) => [...prev, ...data.results]);
        } else {
          setResults(data.results);
        }
        setTotal(data.total);
      } else {
        console.error("Failed to fetch results");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Failed to fetch results:", error);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // ✅ Initial load — only once
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      fetchResults(1, false, "", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Search — debounced, no re-render per keystroke
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setPage(1);
      fetchResults(1, false, value, levelFilter);
    }, 400);
  };

  // ✅ Level filter — single fetch
  const handleLevelFilter = (e) => {
    const value = e.target.value;
    setLevelFilter(value);
    setPage(1);
    fetchResults(1, false, searchInput, value);
  };

  const loadMore = () => {
    if (loadingMore) return;
    const next = page + 1;
    setPage(next);
    fetchResults(next, true, searchInput, levelFilter);
  };

  if (loading && results.length === 0) {
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
          <h1 className="text-2xl lg:text-3xl font-bold">All Results</h1>
          <p className="text-zinc-500 mt-1">View and manage all test results</p>
        </div>

        {/* ✅ Filters — static block, inputs never re-mount */}
        <div className="mb-5 flex flex-wrap gap-3">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search results..."
            autoComplete="off"
            spellCheck={false}
            className="flex-1 min-w-[200px] pl-4 pr-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white placeholder:text-zinc-600 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-colors"
          />
          <select
            value={levelFilter}
            onChange={handleLevelFilter}
            className="w-auto rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm font-medium text-zinc-300 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-colors"
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {results.length === 0 && !loading ? (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-zinc-500">
            No results found
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">User</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Skill</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Level</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Score</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Date</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Certificate</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result._id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-medium">{result.user?.name || "Unknown"}</p>
                          <p className="text-sm text-zinc-500">{result.user?.email || "No email"}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-medium">{result.skill || "N/A"}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(result.level)}`}>
                          {result.level}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono font-bold">{result.score}/{result.total} ({result.percentage}%)</td>
                      <td className="px-5 py-4 text-zinc-500 text-sm">{new Date(result.completedAt).toLocaleDateString()}</td>
                      <td className="px-5 py-4">
                        {result.certificate ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Issued
                          </span>
                        ) : (
                          <span className="text-zinc-500 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        {result.certificate?.verificationUrl && (
                          <a
                            href={result.certificate.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-400 hover:text-violet-300 text-sm font-medium"
                          >
                            View Certificate
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {results.length > 20 && (
              <div className="mt-5 text-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-3 text-sm font-medium text-zinc-400 hover:border-violet-400/30 hover:bg-white/[0.03] hover:text-white transition-all disabled:opacity-50"
                >
                  {loadingMore ? "Loading..." : `Load More (${results.length}/${total})`}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
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