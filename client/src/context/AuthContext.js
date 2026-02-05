'use client';
import { createContext, useContext } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut, openSignIn } = useClerk();

  // Map Clerk user to the shape expected by the app
  const formattedUser = isLoaded && isSignedIn ? {
    id: user.id || '',
    name: user.fullName || user.firstName || 'User',
    phone: user.primaryPhoneNumber?.phoneNumber || '',
    email: user.primaryEmailAddress?.emailAddress || '',
    // Location is not available in Clerk user by default.
    // Consumers should use LocationContext for current location.
  } : null;

  const login = () => openSignIn();
  const logout = () => signOut();

  return (
    <AuthContext.Provider value={{ user: formattedUser, login, logout, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
