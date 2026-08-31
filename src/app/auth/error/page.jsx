"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    const redirectUrl = error 
      ? `/auth/login?error=${encodeURIComponent(error)}`
      : "/auth/login";
    window.location.href = redirectUrl;
  }, [searchParams]);

  // Fallback meta refresh for immediate redirect
  const error = searchParams.get("error");
  const redirectUrl = error 
    ? `/auth/login?error=${encodeURIComponent(error)}`
    : "/auth/login";

  return (
    <div>
      <meta httpEquiv="refresh" content={`0;url=${redirectUrl}`} />
      <div className="min-h-screen bg-[#05050a] flex items-center justify-center px-4 py-12">
        <div className="animate-pulse w-96 h-96 bg-[#0a0a10] rounded-2xl" />
      </div>
    </div>
  );
}