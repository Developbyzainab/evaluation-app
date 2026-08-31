"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(ClientComponent, options = {}) {
  const { redirectTo = "/auth/login", requireAuth = true, requireAdmin = false } = options;

  return function WithAuthWrapper({ user, ...props }) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!requireAuth) return;
      if (!isLoading && !isAuthenticated) {
        router.push(`/auth/login?redirect=${window.location.pathname}`);
      }
    }, [isAuthenticated, isLoading, requireAuth, router]);

    if (isLoading) {
      return (
        <main className="min-h-screen bg-[#05050a] flex items-center justify-center">
          <div className="animate-pulse w-96 h-96 bg-[#0a0a10] rounded-2xl" />
        </main>
      );
    }

    if (requireAuth && !isAuthenticated) {
      return null;
    }

    return <ClientComponent {...props} />;
  };
}