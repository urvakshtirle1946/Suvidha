"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { getApiUrl, apiFetch } from "@/utils/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  const initLocalAuth = useCallback(async () => {
    try {
      const res = await apiFetch("/api/auth/me");

      if (res.status === 401 || res.status === 403) {
        setUser(null);
      } else {
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      }
    } catch (err) {
      console.error("Auth hydration failed. Note: If backend isn't deployed yet, cookies will fail.", err);
      setUser(null);
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
      const res = await apiFetch("/api/auth/google-login", {
          method: 'POST',
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
      await apiFetch("/api/auth/logout", {
        method: "POST"
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
