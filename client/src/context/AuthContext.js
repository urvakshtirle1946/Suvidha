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

  const initLocalAuth = useCallback(() => {
    let initialUser = null;
    const customToken = localStorage.getItem('zelp_custom_token');
    
    const fetchLatestUserData = async (token) => {
        try {
            const backendUrl = getApiUrl();
            const res = await fetch(`${backendUrl}/api/auth/me`, {
               headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success && data.user) {
                setUser((prev) => ({ ...prev, ...data.user }));
                if (data.token) {
                    localStorage.setItem('zelp_custom_token', data.token);
                }
            } else {
                setUser(null);
                localStorage.removeItem('zelp_custom_token');
            }
        } catch (e) {
            console.error("fetchLatestUserData error", e);
            setUser(null);
        } finally {
            setIsLoaded(true);
        }
    };

    if (customToken) {
        try {
            const payloadUrl = customToken.split('.')[1];
            const base64 = payloadUrl.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            initialUser = JSON.parse(jsonPayload);
            setUser(initialUser);
            setIsLoaded(true);
            fetchLatestUserData(customToken);
        } catch(e) {
            console.error("Failed to parse custom token on load", e);
            localStorage.removeItem('zelp_custom_token');
            setUser(null);
            setIsLoaded(true);
        }
    } else {
        setUser(null);
        setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    initLocalAuth();
  }, [initLocalAuth]);

  const getToken = useCallback(() => {
    if (typeof window !== "undefined") {
        const customToken = localStorage.getItem('zelp_custom_token');
        if (customToken) return customToken;
    }
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
      if (data.success && data.token) {
          localStorage.setItem('zelp_custom_token', data.token);
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

  const logout = () => {
    try {
      if (typeof window !== "undefined") {
          localStorage.removeItem('zelp_custom_token');
      }
      setUser(null);
      router.push("/");
    } catch (err) {
      console.error("Logout error", err);
      setUser(null);
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
