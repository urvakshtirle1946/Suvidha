'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function finishAuth() {
      try {
        const authgearModule = await import('@authgear/web');
        const authgear = authgearModule.default;

        // Ensure authgear is configured before finishing auth
        if (authgear.sessionState === 'UNKNOWN') {
          await authgear.configure({
            clientID: process.env.NEXT_PUBLIC_AUTHGEAR_CLIENT_ID || 'missing_client_id',
            endpoint: process.env.NEXT_PUBLIC_AUTHGEAR_ENDPOINT || 'missing_endpoint',
            sessionType: 'refresh_token',
          });
        }
        
        await authgear.finishAuthentication();
        // Redirect to home after successful auth
        router.push('/');
      } catch (err) {
        console.error('Failed to finish authentication', err);
        router.push('/');
      }
    }
    
    finishAuth();
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
        <h2 className="text-xl font-semibold text-gray-700">Completing Sign In...</h2>
        <p className="text-sm text-gray-500">Please wait while we log you in.</p>
      </div>
    </div>
  );
}
