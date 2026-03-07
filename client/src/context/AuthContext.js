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
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          setIsLoaded(true);
          return;
        }
      }

      const res = await apiFetch("/api/auth/me");
      const data = await readJsonSafe(res);

      if (res.ok && data?.success && data?.user) {
        if (typeof window !== 'undefined') {
          if (data?.token) {
            localStorage.setItem("token", data.token);
          }
        }
        setUser(data.user);
      } else {
        if (typeof window !== 'undefined') {
          localStorage.removeItem("token");
        }
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
    
    // If the backend specifically requires a phone, don't throw an error.
    if (res.ok && data?.success && data?.requires_phone) {
        return data;
    }
    
    if (!res.ok || !data?.success || !data?.user) {
      throw new Error(data?.message || "Authentication failed.");
    }
    
    if (data.token) {
      localStorage.setItem("token", data.token);
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

  const register = async ({ name, email, password, phone }) => {
    const res = await apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, phone }),
    });
    return handleAuthResponse(res);
  };

  const googleLogin = async (tokenData) => {
    const res = await apiFetch("/api/auth/google", {
      method: "POST",
      body: JSON.stringify(tokenData),
    });
    return handleAuthResponse(res);
  };

  const loginRadiusAuth = async (tokenData) => {
    const res = await apiFetch("/api/auth/loginradius", {
      method: "POST",
      body: JSON.stringify(tokenData),
    });
    return handleAuthResponse(res);
  };
  
  const completeGoogleRegistration = async (profileData) => {
    const res = await apiFetch("/api/auth/complete-google", {
      method: "POST",
      body: JSON.stringify(profileData),
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
      if (typeof window !== 'undefined') {
        localStorage.removeItem("token");
      }
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
        googleLogin,
        completeGoogleRegistration,
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

