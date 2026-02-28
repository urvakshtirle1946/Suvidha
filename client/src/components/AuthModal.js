'use client';
import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthModal({ isOpen, onClose, mode = 'login' }) {
  const { user, login, register } = useAuth();
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

  if (!isOpen) return null;

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
      </div>
    </div>
  );
}
