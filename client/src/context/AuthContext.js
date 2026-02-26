"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const authgearRef = useRef(null);

  const getAuthgear = useCallback(async () => {
    if (typeof window === "undefined") {
      return null;
    }

    if (!authgearRef.current) {
      const authgearModule = await import("@authgear/web");
      authgearRef.current = authgearModule.default;
    }

    return authgearRef.current;
  }, []);

  const initAuthgear = useCallback(async () => {
    try {
      const authgear = await getAuthgear();
      if (!authgear) {
        setUser(null);
        return;
      }

      const clientID = process.env.NEXT_PUBLIC_AUTHGEAR_CLIENT_ID;
      const endpoint = process.env.NEXT_PUBLIC_AUTHGEAR_ENDPOINT;

      if (!clientID || !endpoint || endpoint === 'missing_endpoint' || clientID === 'missing_client_id') {
        console.error("Authgear Configuration Error: NEXT_PUBLIC_AUTHGEAR_CLIENT_ID or NEXT_PUBLIC_AUTHGEAR_ENDPOINT is missing.");
        setIsLoaded(true);
        return;
      }

      let initialUser = null;
      const customToken = localStorage.getItem('zelp_custom_token');
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
              // We render UI instantly but allow Authgear to configure in background
          } catch(e) {
              console.error("Failed to parse custom token on load", e);
              localStorage.removeItem('zelp_custom_token');
              // Fallback to authgear check
          }
      }

      await authgear.configure({
        clientID,
        endpoint,
        sessionType: "refresh_token",
      });

      const sessionState = authgear.sessionState;
      if (sessionState === "AUTHENTICATED") {
        const userInfo = await authgear.fetchUserInfo();
        
        // Fetch additional data from backend
        try {
          const token = authgear.accessToken;
          const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
          
          const headers = {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          };
          
          if (customToken) {
              headers['X-Linked-Token'] = customToken;
          }

          const res = await fetch(`${backendUrl}/api/auth/sync`, {
              method: 'POST',
              headers,
              body: JSON.stringify({ userInfo })
          });
          const backendData = await res.json();
          if (backendData.success) {
            setUser({ ...userInfo, ...backendData.user, syncError: null });
          } else {
            console.warn("Backend sync failed:", backendData.message);
            setUser({ ...userInfo, syncError: backendData.message });
          }
        } catch (err) {
          console.error("Backend sync failed", err);
          setUser({ ...userInfo, syncError: "Network error during profile sync." });
        }
      } else {
         if (!initialUser) {
             setUser(null);
         }
      }
    } catch (error) {
      console.error("Failed to configure Authgear", error);
      setUser(null);
    } finally {
      setIsLoaded(true);
    }
  }, [getAuthgear]);

  useEffect(() => {
    initAuthgear();
  }, [initAuthgear]);

  // Auto-sync phone after verification redirect loops
  useEffect(() => {
    const syncPhoneToBackend = async () => {
      try {
        const token = await getToken();
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
        const res = await fetch(`${backendUrl}/api/auth/sync-phone`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
           setUser(prev => ({ ...prev, phone: prev.phone_number || prev.phone, phone_verified: true, syncError: null }));
        } else if (data.message === 'This phone number is already linked to another account.') {
           setUser(prev => ({ ...prev, syncError: data.message }));
        }
      } catch (err) {
        console.error("Auto sync phone failed:", err);
      }
    };

    // If Authgear identity has phone, but DB user object doesn't, force sync
    if (user && user.phone_number && user.phone_number_verified && !user.phone) {
      syncPhoneToBackend();
    }
  }, [user, getToken]);

  const login = async (options = {}) => {
    try {
      const authgear = await getAuthgear();
      if (!authgear || typeof window === "undefined") {
        return;
      }

      await authgear.startAuthentication({
        redirectURI: window.location.origin + "/auth/callback",
        ...options
      });
    } catch (err) {
      console.error("Login error", err);
    }
  };

  const customGoogleLogin = async (credential) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
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

  const logout = async () => {
    try {
      if (typeof window !== "undefined") {
          localStorage.removeItem('zelp_custom_token');
      }

      const authgear = await getAuthgear();
      if (!authgear || typeof window === "undefined") {
        setUser(null);
        return;
      }

      if (authgear.sessionState === "AUTHENTICATED") {
          await authgear.logout({
            redirectURI: window.location.origin + "/",
          });
      }
      setUser(null);
    } catch (err) {
      console.error("Logout error", err);
      setUser(null);
    }
  };

  const getToken = async () => {
    if (typeof window !== "undefined") {
        const customToken = localStorage.getItem('zelp_custom_token');
        if (customToken) return customToken;
    }

    const authgear = await getAuthgear();
    if (!authgear) {
      return null;
    }

    if (authgear.sessionState === "AUTHENTICATED") {
      // Refresh the token if necessary and return it.
      await authgear.refreshAccessTokenIfNeeded();
      return authgear.accessToken;
    }
    return null;
  };

  const updateUser = (data) => {
    setUser(prev => prev ? { ...prev, ...data } : data);
  };

  return (
    <AuthContext.Provider value={{ user, login, customGoogleLogin, logout, isLoaded, getToken, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
