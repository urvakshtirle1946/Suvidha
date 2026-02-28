"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/utils/api";

const AuthContext = createContext();

const readJsonSafe = async (res) => {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  const refreshUser = useCallback(async () => {
    try {
      const res = await apiFetch("/api/auth/me");
      const data = await readJsonSafe(res);

      if (res.ok && data?.success && data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Auth hydration failed:", err);
      setUser(null);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const handleAuthResponse = async (res) => {
    const data = await readJsonSafe(res);
    if (!res.ok || !data?.success || !data?.user) {
      throw new Error(data?.message || "Authentication failed.");
    }
    setUser(data.user);
    return data;
  };

  const login = async ({ email, password }) => {
    const res = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return handleAuthResponse(res);
  };

  const register = async ({ name, email, password }) => {
    const res = await apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    return handleAuthResponse(res);
  };

  const updateUser = useCallback((data) => {
    setUser((prev) => (prev ? { ...prev, ...data } : data));
  }, []);

  const logout = async () => {
    try {
      await apiFetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setUser(null);
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoaded,
        login,
        register,
        logout,
        refreshUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
