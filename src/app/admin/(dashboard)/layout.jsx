"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/users", label: "Users", icon: "👥" },
  { href: "/admin/evaluations", label: "Evaluations", icon: "📝" },
  { href: "/admin/results", label: "Results & Analytics", icon: "📈" },
  { href: "/admin/certificates", label: "Certificates", icon: "🏆" },
  { href: "/admin/activity", label: "Activity", icon: "🕐" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read username from non-HttpOnly cookie
    const usernameCookie = document.cookie.split("; ").find((row) => row.startsWith("admin_username="));
    if (usernameCookie) {
      const username = decodeURIComponent(usernameCookie.split("=")[1]);
      setAdminName(username);
    }
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (e) {
      // Ignore errors
    }
    document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/admin/login";
  };

  const initials = adminName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05050a] flex items-center justify-center">
        <div className="animate-pulse w-96 h-96 bg-[#0a0a10] rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05050a] text-white overflow-x-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 border-r border-white/[0.04] bg-[#05050a]/95 backdrop-blur-xl transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center px-5 border-b border-white/[0.04]">
            <Link href="/admin" className="flex items-center">
              <img src="/white.png" alt="SkillEval" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-violet-500/15 to-cyan-500/15 text-violet-300"
                      : "text-zinc-400 hover:bg-white/[0.02] hover:text-white"
                  }`}
                >
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                  {isActive && <span className="ml-auto w-2 h-2 rounded-full bg-violet-400 animate-pulse" />}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-white/[0.04]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-400 hover:bg-white/[0.02] hover:text-white transition-all"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/[0.04] bg-[#05050a]/80 backdrop-blur-xl px-4 py-3 lg:px-6">
          <button
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex-1" />

          {/* Admin profile */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-base font-semibold text-white">{adminName}</span>
              <span className="text-[10px] uppercase tracking-wider text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">Super Admin</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white font-mono">
              {initials}
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-6 pt-4">{children}</div>
      </main>
    </div>
  );
}