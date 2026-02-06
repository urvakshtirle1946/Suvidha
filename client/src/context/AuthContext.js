'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for stored user session on mount
    const storedUser = localStorage.getItem('zelp_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoaded(true);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('zelp_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('zelp_user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
