"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function AdminCertificates() {
  const router = useRouter();
  const [certificates, setCertificates] = useState([]);
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

  const fetchCertificates = async (pageNum, append, searchTerm, level) => {
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

      const res = await fetch(`/api/admin/certificates?${params}`, {
        signal: controller.signal,
      });
      if (res.ok) {
        const data = await res.json();
        if (append) {
          setCertificates((prev) => [...prev, ...data.certificates]);
        } else {
          setCertificates(data.certificates);
        }
        setTotal(data.total);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Failed to fetch certificates:", error);
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
      fetchCertificates(1, false, "", "");
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
      fetchCertificates(1, false, value, levelFilter);
    }, 400);
  };

  // ✅ Level filter — single fetch, no double trigger
  const handleLevelFilter = (e) => {
    const value = e.target.value;
    setLevelFilter(value);
    setPage(1);
    fetchCertificates(1, false, searchInput, value);
  };

  const loadMore = () => {
    if (loadingMore) return;
    const next = page + 1;
    setPage(next);
    fetchCertificates(next, true, searchInput, levelFilter);
  };

  if (loading && certificates.length === 0) {
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
          <h1 className="text-2xl lg:text-3xl font-bold">Certificates</h1>
          <p className="text-zinc-500 mt-1">View and manage all issued certificates</p>
        </div>

        {/* ✅ Filters — static block, input never re-mounts */}
        <div className="mb-5 flex flex-wrap gap-3">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search certificates..."
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

        {certificates.length === 0 && !loading ? (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-zinc-500">
            No certificates found
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Certificate ID</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">User</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Skill</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Score</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Level</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Issued</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((cert) => (
                    <tr key={cert._id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="px-5 py-4 font-mono text-sm">{cert.certificateId}</td>
                      <td className="px-5 py-4">
                        <p className="font-medium">{cert.userName}</p>
                        <p className="text-sm text-zinc-500">{cert.userEmail}</p>
                      </td>
                      <td className="px-5 py-4 font-medium">{cert.skill}</td>
                      <td className="px-5 py-4 font-mono font-bold">{cert.score}/{cert.totalQuestions} ({cert.percentage}%)</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(cert.level)}`}>
                          {cert.level}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-zinc-500 text-sm">{new Date(cert.issuedAt).toLocaleDateString()}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/certificates/${cert._id}`} className="text-violet-400 hover:text-violet-300 text-sm font-medium">
                            Details
                          </Link>
                          {cert.verificationUrl && (
                            <a
                              href={cert.verificationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                            >
                              Verify
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {certificates.length > 20 && (
              <div className="mt-5 text-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-3 text-sm font-medium text-zinc-400 hover:border-violet-400/30 hover:bg-white/[0.03] hover:text-white transition-all disabled:opacity-50"
                >
                  {loadingMore ? "Loading..." : `Load More (${certificates.length}/${total})`}
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