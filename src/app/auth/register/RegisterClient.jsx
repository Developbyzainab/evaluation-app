"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

function RegisterForm({ user }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Check for error from NextAuth redirect
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Google SVG Icon - Clean Google "G" logo
  const googleIcon = (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M12.545,10.239v3.821h5.445c-.236,1.846-1.567,3.461-3.754,3.906v3.316h2.788C20.931,19.891,24,16.201,24,11.993c0-4.716-3.188-8.732-7.455-10.156z"
      />
      <path
        fill="#34A853"
        d="M12.545,21.782c3.164,0,5.845-1.178,7.739-3.294l-2.982-2.854C17.514,18.981,15.296,19.576,12.545,19.576c-3.415,0-6.328-2.153-7.361-5.152H1.722v3.165h3.403C7.979,20.217,10.876,22.621,12.545,22.621c5.303,0,9.498-3.583,10.541-8.128z"
      />
      <path
        fill="#FBBC05"
        d="M5.78,14.342c-.209-.62-.315-1.276-.315-1.955s.106-1.33.315-1.955V8.109H2.18C1.43,8.55,1,10.22,1,12s.43,3.45,1.18,4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12.545,6.288c2.002,0,3.778,.739,5.121,2.044l3.15-3.15C17.45,2.09,14.97,1,12,1,7.7,1,3.99,3.47,2.18,7.07l3.66,2.84c.87-2.6,3.3-4.53,6.16-4.53z"
      />
    </svg>
  );

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Now sign in with credentials to establish session and redirect
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: redirectUrl,
        });

        if (result?.ok) {
          router.push(redirectUrl);
          router.refresh();
          return;
        }

        if (result?.error) {
          setError(result.error);
        } else {
          setError("Registration succeeded but auto-login failed. Please sign in manually.");
        }
      } else {
        if (data.error) {
          setError(data.error);
        } else {
          setError("Registration failed");
        }
      }
    } catch (err) {
      console.error("Register exception:", err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <img src="/white.png" alt="SkillEval" className="h-12 w-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-zinc-400">Start your skill evaluation journey</p>
        </div>

        <div className="bg-[#161622] border border-[#2a2a4a] rounded-2xl p-8 backdrop-blur-sm">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-400/20 rounded-xl text-red-300 text-sm animate-in slide-in-from-top-2 duration-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 w-full px-4 py-3 rounded-xl border border-[#2a2a4a] bg-[#0f0f1a] text-white placeholder:text-zinc-600 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                placeholder="Full Name"
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-3 rounded-xl border border-[#2a2a4a] bg-[#0f0f1a] text-white placeholder:text-zinc-600 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-3 rounded-xl border border-[#2a2a4a] bg-[#0f0f1a] text-white placeholder:text-zinc-600 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all pr-12"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
<button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88a3 3 0 114.242-4.242M9.88 9.88L3 3m6.88 6.88a3 3 0 11-4.242 4.242M9.88 9.88L3 3m6.88 6.88a3 3 0 11-4.242 4.242M9.88 9.88l-2.82-2.82M15.12 15.12l-2.82-2.82" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-400 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-3 rounded-xl border border-[#2a2a4a] bg-[#0f0f1a] text-white placeholder:text-zinc-600 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all pr-12"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
<button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542 7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88a3 3 0 114.242-4.242M9.88 9.88L3 3m6.88 6.88a3 3 0 11-4.242 4.242M9.88 9.88L3 3m6.88 6.88a3 3 0 11-4.242 4.242M9.88 9.88L3 3m6.88 6.88a3 3 0 11-4.242 4.242M9.88 9.88l-2.82-2.82M15.12 15.12l-2.82-2.82" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-base transition-all hover:from-violet-600 hover:to-cyan-600 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-violet-400 hover:text-violet-300 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function RegisterClient({ user }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] flex items-center justify-center"><div className="animate-pulse w-96 h-96 bg-[#161622] rounded-2xl" /></div>}>
      <RegisterForm user={user} />
    </Suspense>
  );
}