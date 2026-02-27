"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { getApiUrl } from "@/utils/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  const initLocalAuth = useCallback(async () => {
    try {
      const backendUrl = getApiUrl();
      const res = await fetch(`${backendUrl}/api/auth/me`, {
        credentials: "include"
      });

      if (res.status === 401 || res.status === 403) {
        setUser(null);
      } else {
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
        }
      }
    } catch (err) {
      console.error("Auth hydration failed", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    initLocalAuth();
  }, [initLocalAuth]);

  const getToken = useCallback(() => {
    // Legacy fallback, cookies are handled automatically
    return null;
  }, []);

  const updateUser = useCallback((data) => {
    setUser(prev => prev ? { ...prev, ...data } : data);
  }, []);



  const customGoogleLogin = async (credential) => {
    try {
      const backendUrl = getApiUrl();
      const res = await fetch(`${backendUrl}/api/auth/google-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: credential })
      });
      const data = await res.json();
      if (data.success) {
          setUser(data.user);
          return true;
      } else {
          console.error("Backend Google Auth Rejected:", data);
          throw new Error(data.message + (data.error ? `: ${data.error}` : ''));
      }
    } catch (err) {
      console.error("Custom Google Login error", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      const backendUrl = getApiUrl();
      await fetch(`${backendUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
      setUser(null);
      router.push("/");
    } catch (err) {
      console.error("Logout error", err);
      setUser(null);
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, customGoogleLogin, logout, isLoaded, getToken, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
