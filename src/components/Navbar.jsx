"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import FullscreenButton from "./FullscreenButton";

export default function Navbar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[#05050a]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center">
          <img src="/white.png" alt="SkillEval" className="h-10 w-auto" />
        </Link>

        <div className="flex items-center gap-3">
          {/* Fullscreen Button */}
          <FullscreenButton />

          {!isLoading && (
            <>
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="hidden sm:block text-sm text-zinc-400 hover:text-white transition"
                  >
                    Dashboard
                  </Link>
                  {user?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="hidden sm:block text-sm text-violet-400 hover:text-violet-300 transition"
                    >
                      Admin
                    </Link>
                  )}
                  
                  {/* User Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 transition hover:bg-white/[0.06] hover:border-violet-400/30 hover:text-white"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-xs font-bold text-white">
                        {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                      </div>
                      <span className="hidden sm:block text-sm font-medium text-zinc-200 truncate max-w-[150px]">
                        {user?.name || user?.email}
                      </span>
                      <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-white/[0.08] bg-[#0a0a10] p-2 shadow-2xl shadow-black/50 animate-in fade-in-0 zoom-in-95 duration-200">
                        <div className="border-b border-white/[0.06] px-3 py-2">
                          <p className="truncate text-sm font-semibold text-white">{user?.name || "Account"}</p>
                          <p className="truncate text-xs text-zinc-500">{user?.email}</p>
                        </div>
                        <Link href="/dashboard" onClick={() => setIsProfileOpen(false)} className="mt-1 block rounded-xl px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.06] hover:text-white">
                          Profile / Account
                        </Link>
                        <Link href="/dashboard/evaluations" onClick={() => setIsProfileOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.06] hover:text-white">
                          My Evaluations
                        </Link>
                        <Link href="/dashboard/results" onClick={() => setIsProfileOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.06] hover:text-white">
                          Results & Certificates
                        </Link>
                        <button
                          type="button"
                          onClick={async () => {
                            setIsProfileOpen(false);
                            try {
                              await logout();
                            } finally {
                              window.location.assign("/");
                            }
                          }}
                          className="w-full rounded-xl px-3 py-2 text-left text-sm text-red-300 transition hover:bg-red-500/10"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/auth/login"
                    className="text-sm text-zinc-400 hover:text-white transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-black transition hover:-translate-y-0.5"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;