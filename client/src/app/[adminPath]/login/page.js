'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { Outfit } from 'next/font/google';
import { useAuth } from '@/context/AuthContext'; 
import { getApiUrl } from '@/utils/api';

const outfit = Outfit({ subsets: ['latin'] });

export default function AdminLogin() {
  const router = useRouter();
  const params = useParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const adminPath = params?.adminPath || 'admin';

  useEffect(() => {
    // Auto-redirect if already logged in
    const auth = localStorage.getItem('admin_auth');
    if (auth) {
      router.push(`/${adminPath}`);
    }
  }, [router, adminPath]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const backendUrl = getApiUrl();
      const res = await fetch(`${backendUrl}/api/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password })
      });
      
      const data = await res.json();
      
      if (data.success && data.token) {
        // Set persistence for Admin layout checks and API auth
        localStorage.setItem('admin_auth', 'true');
        localStorage.setItem('admin_token', data.token);
        
        // Expiry of 1 day to match backend
        document.cookie = `admin_auth=true; path=/; max-age=86400; SameSite=Strict`;
        router.push(`/${adminPath}`);
      } else {
        setError(data.message || 'Invalid Credentials');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('Connection to server failed. Please try again.');
    }
  };

  /* Premium Login Styles */
  return (
      <main className={outfit.className} style={{ 
          height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          position: 'relative', overflow: 'hidden' 
      }}>
        {/* Background Accents */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(0, 210, 211, 0.15), transparent 70%)', filter: 'blur(40px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(46, 134, 222, 0.15), transparent 70%)', filter: 'blur(40px)' }}></div>

        <div style={{ 
            background: 'rgba(30, 41, 59, 0.4)', 
            backdropFilter: 'blur(16px)', 
            padding: '3.5rem', 
            width: '100%', maxWidth: '420px', 
            textAlign: 'center', 
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{ display: 'inline-flex', padding: '1.2rem', background: 'rgba(204, 255, 0, 0.1)', borderRadius: '50%', marginBottom: '2rem', boxShadow: '0 0 20px rgba(204, 255, 0, 0.2)' }}>
            <ShieldCheck size={48} color="#ccff00" />
          </div>
          <h1 style={{ marginBottom: '0.5rem', color: '#fff', fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.5px' }}>Admin Portal</h1>
          <p style={{ color: '#94a3b8', marginBottom: '2.5rem', fontSize: '1rem' }}>Secure Access Required</p>
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '1.2rem', 
                    background: 'rgba(15, 23, 42, 0.6)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    color: '#fff',
                    outline: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    transition: 'border-color 0.2s'
                  }} 
                  onFocus={(e) => e.target.style.borderColor = '#ccff00'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '1.2rem', 
                    background: 'rgba(15, 23, 42, 0.6)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    color: '#fff',
                    outline: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    transition: 'border-color 0.2s'
                  }} 
                  onFocus={(e) => e.target.style.borderColor = '#ccff00'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
            </div>
            
            {error && <p style={{ color: '#f87171', marginBottom: '1.5rem', fontSize: '0.9rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>{error}</p>}
            
            <button className="btn" style={{ 
                width: '100%', padding: '1.2rem', fontSize: '1.1rem', fontWeight: '700',
                background: '#ccff00', 
                color: '#000', border: 'none', borderRadius: '12px', 
                boxShadow: '0 4px 15px rgba(204, 255, 0, 0.3)', cursor: 'pointer',
                transition: 'transform 0.2s'
            }}>
                Login to Dashboard
            </button>
          </form>
        </div>
      </main>
  );
}
