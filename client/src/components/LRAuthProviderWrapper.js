"use client";

import { LRAuthProvider } from 'loginradius-react';

export default function LRAuthProviderWrapper({ children, appName }) {
  return (
    <LRAuthProvider appName={appName}>
      {children}
    </LRAuthProvider>
  );
}
