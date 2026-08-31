"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { signIn } from "next-auth/react";

function AuthForm({ user }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, register } = useAuth();
  const redirectUrl = searchParams.get("redirect") || "/test";

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check for error from NextAuth redirect
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
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

    if (!isLogin) {
      const formData = new FormData(e.target);
      const formName = formData.get("name");
      const formEmail = formData.get("email");
      const formPassword = formData.get("password");
      const formConfirmPassword = formData.get("confirmPassword");

      if (!formName?.trim()) {
        setError("Please enter your name");
        return;
      }
      if (!formEmail || !formPassword) {
        setError("Please fill in all fields");
        return;
      }
      if (formPassword !== formConfirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (formPassword.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
    }

    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(email, password);
      } else {
        const formData = new FormData(e.target);
        const formName = formData.get("name");
        const formEmail = formData.get("email");
        const formPassword = formData.get("password");
        result = await register(formName, formEmail, formPassword);
      }

      if (!result.success) {
        // Show specific error messages based on the error
        if (result.error?.includes("already exists") || result.error?.includes("11000")) {
          setError(isLogin 
            ? "Account already exists. Please Sign In." 
            : "Account already exists. Please Sign In.");
        } else if (result.error?.includes("not found") || result.error?.includes("Invalid")) {
          setError("Account not found. Please Sign Up first.");
        } else {
          setError(result.error || "Authentication failed");
        }
        setLoading(false);
        return;
      }

      router.push(redirectUrl);
    } catch (err) {
      setError(err.message || "Authentication failed");
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const googleIcon = (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-3.57c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.09v2.84h3.72c0 3.04 2.02 5.57 4.7 6.42z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );

  const appleIcon = (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.71 19.56c-.17-.07-.35-.1-.53-.1H12v4.26h3.64c.74-.88 1.38-1.95 1.85-3.14.36-.79.55-1.64.55-2.54V9.25c0-1.22-.47-2.33-1.41-3.22-.68-.65-1.67-1.02-2.66-1.02-.9 0-1.72.3-2.4.9-.43.36-.7.8-.7 1.28V3.22h5.43c1.03.97 1.64 2.25 1.64 3.66 0 2.75-1.88 5.07-4.48 5.9-.94.31-1.93.5-2.97.5-2.75 0-5-1.5-6.09-3.75l-.56.56C14.55 15.63 17.58 17.6 19.5 18.13c.6-.31 1.18-.71 1.69-1.21.22-.2.42-.43.6-.68.02-.02.04-.03.06-.05.03-.03.05-.06.08-.1v-.03zm-3.7-7.04c-.24.35-.53.67-.86.97-.68.63-1.48 1.02-2.4 1.02-.92 0-1.73-.4-2.33-1.02C13.72 16.95 13 16.17 13 15c0-1.2.66-2.27 1.6-2.81.38-.2.78-.36 1.17-.51l.06-.04.04-.03.02-.01-.02.02-.02.01-.01 0z"/>
    </svg>
  );

  return (
    <main className="min-h-screen bg-[#05050a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <img src="/white.png" alt="SkillEval" className="h-12 w-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-zinc-500">
            {isLogin ? "Sign in to continue your skill evaluation journey" : "Start your skill evaluation journey"}
          </p>
        </div>

        <div className="bg-[#0a0a10] border border-white/[0.06] rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-400/20 rounded-xl text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="mt-1 w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-black/20 text-white placeholder:text-zinc-600 focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                  required
                  autoComplete="name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-black/20 text-white placeholder:text-zinc-600 focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                required
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-black/20 text-white placeholder:text-zinc-600 focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all pr-12"
                  required
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88a3 3 0 114.242-4.242M9.88 9.88L3 3m6.88 6.88a3 3 0 11-4.242 4.242M9.88 9.88l-2.82-2.82M15.12 15.12l-2.82-2.82" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-400 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 w-full px-4 py-3 rounded-xl border border-white/[0.07] bg-black/20 text-white placeholder:text-zinc-600 focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                  required
                  autoComplete="new-password"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-zinc-700 bg-[#05050a] text-violet-500 focus:ring-violet-500 focus:ring-2"
                />
                <span className="text-sm text-zinc-400">Remember me</span>
              </label>
              {isLogin && (
                <a href="/forgot-password" className="text-sm text-violet-400 hover:text-violet-300 font-medium">
                  Forgot password?
                </a>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-xl bg-white text-black font-bold text-base transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (isLogin ? "Signing In..." : "Creating Account...") : (isLogin ? "Sign In" : "Create Account")}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.07]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider text-zinc-600">
              <span className="bg-[#0a0a10] px-4 text-zinc-600">Or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleOAuthLogin("google")}
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 py-3.5 px-6 rounded-xl border border-white/[0.1] bg-white/[0.03] text-white font-medium transition-all hover:bg-white/[0.06] hover:border-violet-400/30 focus:outline-none focus:ring-2 focus:ring-violet-500/30 disabled:opacity-50"
            >
              {googleIcon}
              <span className="font-medium">Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleOAuthLogin("apple")}
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 py-3.5 px-6 rounded-xl border border-white/[0.1] bg-white/[0.03] text-white font-medium transition-all hover:bg-white/[0.06] hover:border-violet-400/30 focus:outline-none focus:ring-2 focus:ring-violet-500/30 disabled:opacity-50"
            >
              {appleIcon}
              <span className="font-medium">Continue with Apple</span>
            </button>
          </div>

          <p className="text-center text-sm text-zinc-500 mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-violet-400 hover:text-violet-300 font-medium"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>

          <p className="text-center text-xs text-zinc-700 mt-4">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-violet-400 hover:text-violet-300">Terms of Service</a>
            {" "}and{" "}
            <a href="/privacy" className="text-violet-400 hover:text-violet-300">Privacy Policy</a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function AuthClient({ user }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#05050a] flex items-center justify-center"><div className="animate-pulse w-96 h-96 bg-[#0a0a10] rounded-2xl" /></div>}>
      <AuthForm user={user} />
    </Suspense>
  );
}