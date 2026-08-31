"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children, initialUser = null }) {
  const router = useRouter();
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(true);

  // Use useSession for real-time session updates on client side
  let session = null;
  let status = "loading";
  
  try {
    const sessionResult = useSession();
    session = sessionResult.data;
    status = sessionResult.status;
  } catch (e) {
    // useSession not available (e.g., during static generation)
    session = null;
    status = "unauthenticated";
  }

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
      return;
    }

    // Prefer server-side session, then fall back to client-side session
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

      console.log("signIn result:", result);

      if (result?.error) {
        console.error("Login error:", result.error);
        return { success: false, error: result.error };
      }

      if (result?.ok) {
        router.push(redirectTo);
        router.refresh();
        return { success: true };
      }

      // If no error but not ok, treat as failure
      return { success: false, error: "Invalid email or password" };
    } catch (error) {
      console.error("Login exception:", error);
      return { success: false, error: error.message || "Login failed" };
    }
  };

  const register = async (name, email, password, redirectTo = "/dashboard") => {
    try {
      const result = await signIn("credentials", {
        name,
        email,
        password,
        redirect: false,
      });

      console.log("Register result:", result);

      if (result?.error) {
        console.error("Register error:", result.error);
        return { success: false, error: result.error };
      }

      if (result?.ok) {
        router.push(redirectTo);
        router.refresh();
        return { success: true };
      }

      return { success: false, error: "Registration failed" };
    } catch (error) {
      console.error("Register exception:", error);
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