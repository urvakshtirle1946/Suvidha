'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, User, Mail, Lock, Save, Phone } from 'lucide-react';
import { apiFetch } from '@/utils/api';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SettingsModal({ isOpen, onClose }) {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
      setError('');
      setSuccess('');
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!name) return 'Username is required.';
    if (name.length < 2) return 'Username must be at least 2 characters.';
    if (!email) return 'Email is required.';
    if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email address.';
    if (password && password.length < 8) return 'Password must be at least 8 characters.';
    return '';
  };

  const readJsonSafe = async (res) => {
    try {
      return await res.json();
    } catch (_) {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setSuccess('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase()
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      const res = await apiFetch('/api/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(payload)
      });

      const data = await readJsonSafe(res);

      if (!res.ok || !data?.success) {
        setError(data?.message || 'Profile update failed. Please try again.');
        return;
      }

      updateUser(data.user);
      setFormData((prev) => ({ ...prev, password: '' }));
      setSuccess(data.message || 'Profile updated successfully.');
    } catch (err) {
      console.error('Update Profile Error:', err);
      setError('Failed to update profile. Please check your connection and try again.');
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
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          width: '100%',
          maxWidth: '450px',
          borderRadius: '24px',
          padding: '2rem',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: '#f3f4f6',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              name="name"
              placeholder="Username"
              required
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                outline: 'none',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                outline: 'none',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="tel"
              value={user?.phone || 'No mobile number'}
              disabled
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                background: '#f9fafb',
                color: '#9ca3af',
                outline: 'none',
                fontSize: '0.95rem',
                cursor: 'not-allowed'
              }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="password"
              name="password"
              placeholder="New Password (optional)"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                outline: 'none',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {error && (
            <div style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', borderRadius: '10px', padding: '10px 12px', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '10px 12px', fontSize: '0.85rem' }}>
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              border: 'none',
              background: loading ? '#9ca3af' : '#000000',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
            {!loading && <Save size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}
