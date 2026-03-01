'use client';
import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import { useLRAuth } from 'loginradius-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthModal({ isOpen, onClose, mode = 'login' }) {
  const { user, login, register, googleLogin, loginRadiusAuth } = useAuth();
  const { loginWithPopup, getAccessTokenSilently } = useLRAuth();
  const [tab, setTab] = useState(mode === 'register' ? 'register' : 'login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (isOpen) {
      setTab(mode === 'register' ? 'register' : 'login');
      setError('');
      setSuccess('');
      setForm({ name: '', email: '', password: '', confirmPassword: '' });
    }
  }, [isOpen, mode]);

  useEffect(() => {
    if (isOpen && user) {
      onClose();
    }
  }, [isOpen, user, onClose]);

  const title = useMemo(() => {
    return tab === 'register' ? 'Create Account' : 'Login to Continue';
  }, [tab]);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateLogin = () => {
    const email = form.email.trim().toLowerCase();
    if (!email) return 'Email is required.';
    if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email address.';
    if (!form.password) return 'Password is required.';
    return '';
  };

  const validateRegister = () => {
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    if (!name) return 'Username is required.';
    if (name.length < 2) return 'Username must be at least 2 characters.';
    if (!email) return 'Email is required.';
    if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email address.';
    if (!form.password) return 'Password is required.';
    if (form.password.length < 8) return 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setSuccess('');

    const validationError = tab === 'register' ? validateRegister() : validateLogin();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      if (tab === 'register') {
        await register({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password
        });
        setSuccess('Registration successful.');
      } else {
        await login({
          email: form.email.trim().toLowerCase(),
          password: form.password
        });
        setSuccess('Login successful.');
      }

      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      setLoading(true);
      setError('');
      await googleLogin({ access_token: tokenResponse.access_token });
      setSuccess('Google login successful.');
      onClose();
    } catch (err) {
      setError(err.message || 'Google authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setError('Google login popup failed to open or was closed.'),
  });

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#fff',
          borderRadius: '20px',
          padding: '2rem',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: '#f3f4f6',
            border: 'none',
            borderRadius: '999px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#6b7280'
          }}
        >
          <X size={16} />
        </button>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
          {title}
        </h2>

        <div style={{ display: 'flex', marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '10px' }}>
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setError('');
              setSuccess('');
            }}
            style={{
              flex: 1,
              padding: '0.65rem',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              background: tab === 'login' ? '#0c831f' : '#fff',
              color: tab === 'login' ? '#fff' : '#374151',
              fontWeight: '600'
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setError('');
              setSuccess('');
            }}
            style={{
              flex: 1,
              padding: '0.65rem',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              background: tab === 'register' ? '#0c831f' : '#fff',
              color: tab === 'register' ? '#fff' : '#374151',
              fontWeight: '600'
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {tab === 'register' && (
            <input
              type="text"
              placeholder="Username"
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              autoComplete="name"
              style={{
                padding: '0.8rem 0.9rem',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            autoComplete="email"
            style={{
              padding: '0.8rem 0.9rem',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setField('password', e.target.value)}
            autoComplete={tab === 'register' ? 'new-password' : 'current-password'}
            style={{
              padding: '0.8rem 0.9rem',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />

          {tab === 'register' && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) => setField('confirmPassword', e.target.value)}
              autoComplete="new-password"
              style={{
                padding: '0.8rem 0.9rem',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
          )}

          {error && (
            <div style={{ color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '0.6rem 0.75rem', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ color: '#166534', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.6rem 0.75rem', fontSize: '0.85rem' }}>
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '0.5rem',
              background: loading ? '#9ca3af' : '#0c831f',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '0.85rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Please wait...' : tab === 'register' ? 'Register' : 'Login'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', gap: '0.75rem' }}>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
            <span style={{ fontSize: '0.85rem', color: '#9ca3af', fontWeight: '500' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={async () => {
              try {
                setLoading(true);
                setError('');
                await loginWithPopup();
                const token = await getAccessTokenSilently();
                if (token) {
                   await loginRadiusAuth({ access_token: token });
                   setSuccess('Mobile authentication successful.');
                   onClose();
                } else {
                   setError('No access token returned from LoginRadius.');
                }
              } catch (err) {
                console.error('LoginRadius Auth Error:', err);
                setError('Mobile authentication failed.');
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              padding: '0.85rem',
              fontWeight: '600',
              color: '#374151',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => { if (!loading) e.currentTarget.style.background = '#f9fafb' }}
            onMouseOut={(e) => { if (!loading) e.currentTarget.style.background = '#fff' }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
            Continue with Mobile Number
          </button>

          <button
            onClick={() => loginWithGoogle()}
            disabled={loading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              padding: '0.85rem',
              fontWeight: '600',
              color: '#374151',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => { if (!loading) e.currentTarget.style.background = '#f9fafb' }}
            onMouseOut={(e) => { if (!loading) e.currentTarget.style.background = '#fff' }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                <path d="M1 1h22v22H1z" fill="none"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
