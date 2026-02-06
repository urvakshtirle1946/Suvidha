'use client';
import { useEffect, useState } from 'react';
import { useSignIn, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const { signIn, isLoaded } = useSignIn();
  const { setActive } = useClerk();
  const router = useRouter(); 
  const [verifying, setVerifying] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  // Phone.Email credentials
  const API_URL = 'https://suvidha-server-4u66.onrender.com'; 
  const PE_CLIENT_ID = process.env.NEXT_PUBLIC_PE_CLIENT_ID;

  useEffect(() => {
    // RESET any potential overflow locks from previous modals or scripts
    document.body.style.overflow = 'auto';
    document.body.style.pointerEvents = 'auto';

    if (!PE_CLIENT_ID) {
        console.warn("⚠️ Phone.Email Client ID is missing. Check your .env setup.");
    }

    // 1. Load Phone.Email Script
    const script = document.createElement('script');
    script.src = "https://www.phone.email/sign_in_button_v1.js";
    script.async = true;
    document.body.appendChild(script);

    // 2. Define Listener
    window.phoneEmailListener = async (userObj) => {
        const { user_json_url } = userObj;
        setVerifying(true);

        try {
            // Verify with Backend (Hardcoded to localhost for validation)
            const res = await fetch(`https://suvidha-server-4u66.onrender.com/api/auth/phone-login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_json_url }),
            });
            const data = await res.json();

            if (data.success && data.ticket) {
                if (!isLoaded) return;
                
                // Sign in with Clerk Ticket
                const signInAttempt = await signIn.create({
                    strategy: 'ticket',
                    ticket: data.ticket,
                });

                if (signInAttempt.status === 'complete') {
                    await setActive({ session: signInAttempt.createdSessionId });
                    router.push('/');
                } else {
                    console.error("SignIn incomplete", signInAttempt);
                    alert('Login failed to complete.');
                }
            } else {
                alert(data.message || 'Verification failed');
            }
        } catch (error) {
            console.error(error);
            alert('Error: ' + error.message);
        } finally {
            setVerifying(false);
        }
    };

    return () => {
        if (document.body.contains(script)) {
            document.body.removeChild(script);
        }
        delete window.phoneEmailListener;
    };
  }, [isLoaded, signIn, setActive, router]);

  const handleGoogleLogin = async () => {
    if (!isLoaded) return;
    setLoadingGoogle(true);
    try {
        await signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/"
        });
    } catch (err) {
        console.error("Google Login Error:", err);
        setLoadingGoogle(false);
    }
  };

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' }}>
      <div style={{ 
          position: 'relative', zIndex: 10,
          background: '#fff', padding: '2.5rem', borderRadius: '20px', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          width: '100%', maxWidth: '420px', textAlign: 'center'
      }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '50%' }}>
                  <ShieldCheck size={32} color="#2563eb" />
              </div>
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
              Welcome to Zelp
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              Sign in to manage bookings & more
          </p>

          {/* Google Login */}
          <button 
            onClick={handleGoogleLogin}
            disabled={loadingGoogle}
            style={{ 
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                padding: '0.75rem', borderRadius: '10px', border: '1px solid #d1d5db', background: '#fff',
                fontSize: '1rem', fontWeight: '500', color: '#374151', cursor: 'pointer', marginBottom: '1.5rem',
                transition: 'background 0.2s'
            }}
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" height="20" />
            {loadingGoogle ? 'Redirecting...' : 'Continue with Google'}
          </button>

          {/* Divider Removed */}
          <div style={{ marginBottom: '1rem' }}></div>

          {/* Phone.Email Widget Container */}
          <div style={{ 
              display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50px',
              position: 'relative' 
          }}>
              {verifying && <span style={{ fontSize: '0.9rem', color: '#4b5563' }}>Verifying...</span>}
              <div 
                  className="pe_signin_button" 
                  data-client-id={PE_CLIENT_ID}
                  style={{ display: verifying ? 'none' : 'block' }} 
              />
          </div>

          <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2rem' }}>
              By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
      </div>
      <div id="clerk-captcha"></div>
      
      {/* CSS Override to force Widget Inline */}
      <style>{`
        .pe_signin_button {
            width: 100%;
            display: flex !important;
            justify-content: center !important;
            position: relative !important;
        }
        /* Target common elements injected by the widget and force them inline */
        .pe_signin_button img, 
        .pe_signin_button button, 
        .pe_signin_button iframe,
        .pe_signin_button svg {
            position: static !important;
            bottom: auto !important;
            left: auto !important;
            right: auto !important;
            margin: 0 auto !important;
            transform: none !important;
        }
      `}</style>
    </div>
  );
}
