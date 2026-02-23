'use client';
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const authgearRef = useRef(null);

  const getAuthgear = useCallback(async () => {
    if (typeof window === 'undefined') {
      return null;
    }

    if (!authgearRef.current) {
      const authgearModule = await import('@authgear/web');
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

      await authgear.configure({
        clientID: process.env.NEXT_PUBLIC_AUTHGEAR_CLIENT_ID || 'missing_client_id',
        endpoint: process.env.NEXT_PUBLIC_AUTHGEAR_ENDPOINT || 'missing_endpoint',
        sessionType: 'refresh_token',
      });
      
      const sessionState = authgear.sessionState;
      if (sessionState === 'AUTHENTICATED') {
        const userInfo = await authgear.fetchUserInfo();
        setUser(userInfo);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to configure Authgear', error);
      setUser(null);
    } finally {
      setIsLoaded(true);
    }
  }, [getAuthgear]);

  useEffect(() => {
    initAuthgear();
  }, [initAuthgear]);

  const login = async () => {
    try {
      const authgear = await getAuthgear();
      if (!authgear || typeof window === 'undefined') {
        return;
      }

      await authgear.startAuthentication({
        redirectURI: window.location.origin + '/auth/callback',
      });
    } catch (err) {
      console.error('Login error', err);
    }
  };

  const logout = async () => {
    try {
      const authgear = await getAuthgear();
      if (!authgear || typeof window === 'undefined') {
        return;
      }

      await authgear.logout({
        redirectURI: window.location.origin + '/',
      });
      setUser(null);
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  const getToken = async () => {
    const authgear = await getAuthgear();
    if (!authgear) {
      return null;
    }

    if (authgear.sessionState === 'AUTHENTICATED') {
      // Refresh the token if necessary and return it.
      await authgear.refreshAccessTokenIfNeeded();
      return authgear.accessToken;
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoaded, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
