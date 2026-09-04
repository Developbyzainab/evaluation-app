"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children, initialUser = null }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
      return;
    }

    if (session?.user) {
      setUser(session.user);
    } else if (!initialUser) {
      setUser(null);
    }
    setIsLoading(false);
  }, [session, status, initialUser]);

  const login = async (email, password, redirectTo = "/dashboard") => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        return { success: false, error: result.error };
      }

      if (result?.ok) {
        // Refresh session to get updated user data
        router.refresh();
        router.push(redirectTo);
        return { success: true };
      }

      return { success: false, error: "Invalid email or password" };
    } catch (error) {
      return { success: false, error: error.message || "Login failed" };
    }
  };

  const register = async (name, email, password, redirectTo = "/dashboard") => {
    try {
      // First create the account via API
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return { success: false, error: data.error || "Registration failed" };
      }

      // Now sign in with credentials to establish session
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        return { success: false, error: result.error };
      }

      if (result?.ok) {
        router.refresh();
        router.push(redirectTo);
        return { success: true };
      }

      return { success: false, error: "Registration succeeded but login failed" };
    } catch (error) {
      return { success: false, error: error.message || "Registration failed" };
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}