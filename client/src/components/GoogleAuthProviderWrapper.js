'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function GoogleAuthProviderWrapper({ children, clientId }) {
  if (!clientId) {
    console.warn('NEXT_PUBLIC_GOOGLE_CLIENT_ID is missing. Google OAuth is disabled.');
    return children;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
