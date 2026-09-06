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
    <nav className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-xl">
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
                    className="hidden sm:block text-sm text-slate-500 hover:text-brand-600 transition"
                  >
                    Dashboard
                  </Link>
                  {user?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="hidden sm:block text-sm text-purple-600 hover:text-purple-700 transition"
                    >
                      Admin
                    </Link>
                  )}
                  
                  {/* User Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white/80 px-3 py-2 transition hover:border-brand-400/30 hover:bg-white hover:text-brand-600"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-xs font-bold text-white">
                        {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                      </div>
                      <span className="hidden sm:block text-sm font-medium text-slate-700 truncate max-w-[150px]">
                        {user?.name || user?.email}
                      </span>
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl shadow-slate-200/50 animate-in fade-in-0 zoom-in-95 duration-200">
                        <div className="border-b border-neutral-200 px-3 py-2">
                          <p className="truncate text-sm font-semibold text-slate-900">{user?.name || "Account"}</p>
                          <p className="truncate text-xs text-slate-500">{user?.email}</p>
                        </div>
                        <Link href="/dashboard" onClick={() => setIsProfileOpen(false)} className="mt-1 block rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-neutral-100 hover:text-slate-900">
                          Profile / Account
                        </Link>
                        <Link href="/dashboard/evaluations" onClick={() => setIsProfileOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-neutral-100 hover:text-slate-900">
                          My Evaluations
                        </Link>
                        <Link href="/dashboard/results" onClick={() => setIsProfileOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-neutral-100 hover:text-slate-900">
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
                          className="w-full rounded-xl px-3 py-2 text-left text-sm text-rose-600 transition hover:bg-rose-50"
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
                    className="text-sm text-slate-500 hover:text-brand-600 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-brand-700 hover:-translate-y-0.5"
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