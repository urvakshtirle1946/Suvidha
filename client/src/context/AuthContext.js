'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import authgear from '@authgear/web';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  const initAuthgear = useCallback(async () => {
    try {
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
  }, []);

  useEffect(() => {
    initAuthgear();
  }, [initAuthgear]);

  const login = async () => {
    try {
      await authgear.startAuthentication({
        redirectURI: window.location.origin + '/auth/callback',
      });
    } catch (err) {
      console.error('Login error', err);
    }
  };

  const logout = async () => {
    try {
      await authgear.logout({
        redirectURI: window.location.origin + '/',
      });
      setUser(null);
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  const getToken = async () => {
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
