'use client';
import { useEffect, useMemo, useState } from 'react';
import { X, ArrowLeft, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthModal({ isOpen, onClose, mode = 'login' }) {
  const { user, login, register, googleLogin, completeGoogleRegistration } = useAuth();
  
  // Tabs: 'login', 'register', 'complete-profile'
  const [tab, setTab] = useState(mode === 'register' ? 'register' : 'login');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (isOpen) {
      setTab(mode === 'register' ? 'register' : 'login');
      setError('');
      setSuccess('');
      setForm({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    }
  }, [isOpen, mode]);

  useEffect(() => {
    if (isOpen && user) {
      onClose();
    }
  }, [isOpen, user, onClose]);

  const title = useMemo(() => {
    if (tab === 'complete-profile') return 'Complete Your Profile';
    return tab === 'register' ? 'Create Account' : 'Welcome to Zelp';
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
    const phone = form.phone.trim();
    
    if (!name) return 'Username is required.';
    if (name.length < 2) return 'Username must be at least 2 characters.';
    if (!email) return 'Email is required.';
    if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email address.';
    if (!phone) return 'Mobile Number is required.';
    if (phone.length < 7) return 'Please enter a valid Mobile Number.';
    if (!form.password) return 'Password is required.';
    if (form.password.length < 8) return 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    return '';
  };

  const validateCompleteProfile = () => {
    const phone = form.phone.trim();
    if (!phone) return 'Mobile Number is required.';
    if (phone.length < 7) return 'Please enter a valid Mobile Number.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setSuccess('');

    let validationError = '';
    if (tab === 'register') validationError = validateRegister();
    else if (tab === 'login') validationError = validateLogin();
    else if (tab === 'complete-profile') validationError = validateCompleteProfile();

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
          password: form.password,
          phone: form.phone.trim()
        });
        setSuccess('Registration successful.');
        onClose();
      } 
      else if (tab === 'login') {
        await login({
          email: form.email.trim().toLowerCase(),
          password: form.password
        });
        setSuccess('Login successful.');
        onClose();
      }
      else if (tab === 'complete-profile') {
        await completeGoogleRegistration({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim()
        });
        setSuccess('Profile completed successfully.');
        onClose();
      }

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
      
      const res = await googleLogin({ access_token: tokenResponse.access_token });
      
      if (res && res.requires_phone) {
          setForm(prev => ({ 
              ...prev, 
              name: res.tempUser?.name || '', 
              email: res.tempUser?.email || '' 
          }));
          setTab('complete-profile');
      } else {
          setSuccess('Google login successful.');
          onClose();
      }
      
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
      className="auth-overlay"
      onClick={onClose}
    >
      <div
        className="auth-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="auth-close-btn"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Title */}
        <h2 className="auth-title">
          {tab === 'complete-profile' && (
              <button 
                  onClick={() => { setTab('register'); setError(''); setSuccess(''); }}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
              >
                 <ArrowLeft size={20} color="#111827" style={{ marginRight: '8px' }} />
              </button>
          )}
          {title}
        </h2>

        {/* Subtitle */}
        <p className="auth-subtitle">
          {tab === 'login' ? 'Access your medical dashboard and bookings.' : tab === 'register' ? 'Join Zelp to schedule zero-wait consultations.' : 'Provide final details to secure your account.'}
        </p>

        {/* Tab switchers */}
        {tab !== 'complete-profile' && (
            <div className="auth-tab-container">
              <button
                type="button"
                onClick={() => {
                  setTab('login');
                  setError('');
                  setSuccess('');
                }}
                className={`auth-tab-btn ${tab === 'login' ? 'active' : ''}`}
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
                className={`auth-tab-btn ${tab === 'register' ? 'active' : ''}`}
              >
                Register
              </button>
            </div>
        )}

        {/* Auth form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {tab === 'register' && (
            <input
              type="text"
              placeholder="Username"
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              autoComplete="name"
              className="auth-input"
            />
          )}

          {tab !== 'complete-profile' && (
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                autoComplete="email"
                className="auth-input"
              />
          )}

          {tab === 'complete-profile' && (
              <div style={{ fontSize: '0.85rem', color: '#4b5563', marginBottom: '4px', lineHeight: '1.5' }}>
                  Please enter your mobile number to finalize your account creation for <strong>{form.email}</strong>.
              </div>
          )}

          {(tab === 'register' || tab === 'complete-profile') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <input
                type="tel"
                placeholder="Mobile Number (e.g. +91 9876543210)"
                value={form.phone}
                onChange={(e) => setField('phone', e.target.value)}
                autoComplete="tel"
                className="auth-input"
              />
              <span style={{ fontSize: '0.7rem', color: '#9ca3af', marginLeft: '4px' }}>
                Note: You will not be able to edit this mobile number in the future.
              </span>
            </div>
          )}

          {tab !== 'complete-profile' && (
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setField('password', e.target.value)}
                autoComplete={tab === 'register' ? 'new-password' : 'current-password'}
                className="auth-input"
              />
          )}

          {tab === 'register' && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) => setField('confirmPassword', e.target.value)}
              autoComplete="new-password"
              className="auth-input"
            />
          )}

          {error && (
            <div className="auth-alert auth-error">
              {error}
            </div>
          )}
          {success && (
            <div className="auth-alert auth-success">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="auth-submit-btn"
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div style={{ width: '14px', height: '14px', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                Please wait...
              </div>
            ) : (
              tab === 'login' ? 'Login' : tab === 'register' ? 'Register' : 'Complete Profile'
            )}
          </button>
        </form>

        {/* Divider / Social login */}
        {tab !== 'complete-profile' && (
            <>
                <div className="auth-divider">
                    <span>OR</span>
                </div>

                <button
                  onClick={() => loginWithGoogle()}
                  disabled={loading}
                  className="auth-google-btn"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
            </>
        )}
      </div>

      <style jsx>{`
        .auth-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999; /* Higher priority than everything else */
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .auth-card {
          width: 100%;
          max-width: 440px;
          background: #ffffff;
          border-radius: 28px;
          padding: 2.25rem 2rem;
          position: relative;
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05);
          animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .auth-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: #f3f4f6;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #6b7280;
          transition: all 0.2s;
        }

        .auth-close-btn:hover {
          background: #e5e7eb;
          color: #111827;
          transform: rotate(90deg);
        }

        .auth-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 0.25rem;
          display: flex;
          align-items: center;
          letter-spacing: -0.02em;
        }

        .auth-subtitle {
          font-size: 0.85rem;
          color: #6b7280;
          line-height: 1.4;
          margin-bottom: 1.5rem;
        }

        .auth-tab-container {
          display: flex;
          margin-bottom: 1.25rem;
          border: 1px solid #f3f4f6;
          background: #f9fafb;
          border-radius: 12px;
          padding: 4px;
        }

        .auth-tab-btn {
          flex: 1;
          padding: 0.65rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          background: transparent;
          color: #6b7280;
          font-weight: 700;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .auth-tab-btn.active {
          background: #000000;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .auth-input {
          padding: 0.8rem 0.95rem;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          font-size: 0.9rem;
          outline: none;
          width: 100%;
          transition: all 0.2s;
          background: #fafafa;
        }

        .auth-input:focus {
          border-color: #000000;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.05);
        }

        .auth-alert {
          border-radius: 10px;
          padding: 0.75rem 1rem;
          font-size: 0.825rem;
          font-weight: 500;
          line-height: 1.4;
        }

        .auth-error {
          color: #dc2626;
          background: #fef2f2;
          border: 1px solid #fee2e2;
        }

        .auth-success {
          color: #16a34a;
          background: #f0fdf4;
          border: 1px solid #dcfce7;
        }

        .auth-submit-btn {
          margin-top: 0.5rem;
          background: #000000;
          color: #ffffff;
          border: none;
          border-radius: 12px;
          padding: 0.9rem;
          font-weight: 800;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }

        .auth-submit-btn:hover {
          background: #222222;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .auth-submit-btn:active {
          transform: translateY(0);
        }

        .auth-divider {
          display: flex;
          align-items: center;
          margin: 1.5rem 0;
          gap: 0.75rem;
        }

        .auth-divider::before,
        .auth-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #f3f4f6;
        }

        .auth-divider span {
          font-size: 0.75rem;
          color: #9ca3af;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .auth-google-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 0.85rem;
          font-weight: 700;
          font-size: 0.9rem;
          color: #374151;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
          transition: all 0.2s;
        }

        .auth-google-btn:hover {
          background: #f9fafb;
          border-color: #d1d5db;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          transform: translateY(-1px);
        }

        .auth-google-btn:active {
          transform: translateY(0);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
