"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

function LoginForm({ user }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check for error from NextAuth redirect
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }
    const registered = searchParams.get("registered");
    if (registered === "true") {
      setSuccess("Account created successfully. Please sign in.");
    }
  }, [searchParams]);

  const handleOAuthLogin = async (provider) => {
    setError("");
    setLoading(true);
    try {
      await signIn(provider, { callbackUrl: redirectUrl });
    } catch (err) {
      setError(err.message || `${provider} login failed`);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
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
        const errorMsg = result.error;
        if (errorMsg.includes("Account not found") || errorMsg.includes("User not found")) {
          setError("Account not found. Please Sign Up first.");
        } else if (errorMsg.includes("Invalid email or password") || errorMsg.includes("Invalid")) {
          setError("Invalid email or password");
        } else {
          setError(errorMsg);
        }
      } else if (result?.url) {
        if (result.url.includes("/auth/error")) {
          const errorUrl = new URL(result.url, window.location.origin);
          const errorParam = errorUrl.searchParams.get("error");
          if (errorParam) {
            setError(decodeURIComponent(errorParam));
          } else {
            setError("Account not found. Please Sign Up first.");
          }
        } else if (result.url.includes("/auth/login")) {
          setError("Invalid email or password");
        } else {
          setError("Login failed");
        }
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Google SVG Icon - Original
  const googleIcon = (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-3.57c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.09v2.84h3.72c0 3.04 2.02 5.57 4.7 6.42z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );

  

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <img src="/white.png" alt="SkillEval" className="h-12 w-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-zinc-400">Sign in to your SkillEval account</p>
        </div>

        <div className="bg-[#161622] border border-[#2a2a4a] rounded-2xl p-8 backdrop-blur-sm">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-400/20 rounded-xl text-red-300 text-sm animate-in slide-in-from-top-2 duration-300">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-400/20 rounded-xl text-green-300 text-sm animate-in slide-in-from-top-2 duration-300">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-3 rounded-xl border border-[#2a2a4a] bg-[#0f0f1a] text-white placeholder:text-zinc-600 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                placeholder="you@company.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-3 rounded-xl border border-[#2a2a4a] bg-[#0f0f1a] text-white placeholder:text-zinc-600 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all pr-12"
                  placeholder="••••••••"
                  autoComplete="current-password"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-base transition-all hover:from-violet-600 hover:to-cyan-600 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2a2a4a]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider text-zinc-600">
              <span className="bg-[#161622] px-4 text-zinc-600">Or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleOAuthLogin("google")}
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 py-3.5 px-6 rounded-xl border border-[#2a2a4a] bg-[#0f0f1a] text-white font-medium transition-all hover:bg-[#1a1a2e] hover:border-violet-400/30 focus:outline-none focus:ring-2 focus:ring-violet-500/30 disabled:opacity-50"
            >
              {googleIcon}
              <span className="font-medium">Continue with Google</span>
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-violet-400 hover:text-violet-300 font-medium">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginClient({ user }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] flex items-center justify-center"><div className="animate-pulse w-96 h-96 bg-[#161622] rounded-2xl" /></div>}>
      <LoginForm user={user} />
    </Suspense>
  );
}