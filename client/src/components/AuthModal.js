'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Phone, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { getApiUrl } from '@/utils/api';

import { GoogleLogin } from '@react-oauth/google';

export default function AuthModal({ isOpen, onClose }) {
    const { login } = useAuth();
    // ... existing state ...
    const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setLoading(true);
            const apiUrl = getApiUrl();
            const res = await fetch(`${apiUrl}/api/auth/google-login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: credentialResponse.credential })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                login({ ...data.user, token: data.token });
                onClose();
            } else {
                alert(data.message || 'Google Login Failed');
            }
        } catch (err) {
            console.error('Google Auth Error:', err);
            alert('Google Login Failed');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const apiUrl = getApiUrl();

        try {
            const res = await fetch(`${apiUrl}/api/auth/phone-login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    is_login: activeTab === 'login'
                })
            });

            let data;
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await res.json();
            } else {
                const text = await res.text();
                throw new Error(`Server error: ${res.status}`);
            }

            if (res.ok && data.success) {
                login({ ...data.user, token: data.token });
                onClose(); // Close modal on success
            } else {
                alert(data.message || "Authentication Failed");
            }
        } catch (err) {
            console.error("Auth Error:", err);
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 3000,
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem'
        }} onClick={onClose}>
            <div 
                style={{
                    width: '100%', maxWidth: '400px',
                    background: '#fff', borderRadius: '24px',
                    padding: '2rem', position: 'relative',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    animation: 'modalSlideUp 0.3s ease-out'
                }} 
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: '1.5rem', right: '1.5rem',
                        background: '#f3f4f6', border: 'none', borderRadius: '50%',
                        width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#6b7280'
                    }}
                >
                    <X size={18} />
                </button>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                        {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                        {activeTab === 'login' ? 'Sign in to access your bookings' : 'Join Zelp for premium healthcare'}
                    </p>
                </div>

                <div style={{ 
                    display: 'flex', background: '#f3f4f6', padding: '4px', borderRadius: '12px', marginBottom: '1.5rem' 
                }}>
                    <button 
                        onClick={() => setActiveTab('login')}
                        style={{
                            flex: 1, padding: '8px', border: 'none', borderRadius: '8px',
                            background: activeTab === 'login' ? '#fff' : 'transparent',
                            color: activeTab === 'login' ? '#111827' : '#6b7280',
                            fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
                            boxShadow: activeTab === 'login' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                        }}
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => setActiveTab('register')}
                        style={{
                            flex: 1, padding: '8px', border: 'none', borderRadius: '8px',
                            background: activeTab === 'register' ? '#fff' : 'transparent',
                            color: activeTab === 'register' ? '#111827' : '#6b7280',
                            fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
                            boxShadow: activeTab === 'register' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                        }}
                    >
                        Register
                    </button>
                </div>

                {/* Google Login Button */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => {
                            console.log('Login Failed');
                            alert('Google Login Failed');
                        }}
                        theme="filled_blue"
                        shape="pill"
                        text={activeTab === 'login' ? "signin_with" : "signup_with"}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.8rem' }}>
                    <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
                    <span style={{ padding: '0 10px' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {activeTab === 'register' && (
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input 
                                type="text" name="name" placeholder="Full Name" required
                                value={formData.name} onChange={handleChange}
                                style={{
                                    width: '100%', padding: '12px 12px 12px 40px', borderRadius: '12px',
                                    border: '1px solid #e5e7eb', outline: 'none', fontSize: '0.95rem'
                                }}
                            />
                        </div>
                    )}

                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                        <input 
                            type="email" name="email" placeholder="Email Address" required
                            value={formData.email} onChange={handleChange}
                            style={{
                                width: '100%', padding: '12px 12px 12px 40px', borderRadius: '12px',
                                border: '1px solid #e5e7eb', outline: 'none', fontSize: '0.95rem'
                            }}
                        />
                    </div>

                    {activeTab === 'register' && (
                        <div style={{ position: 'relative' }}>
                            <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input 
                                type="tel" name="phone" placeholder="Phone Number" required
                                value={formData.phone} onChange={handleChange}
                                style={{
                                    width: '100%', padding: '12px 12px 12px 40px', borderRadius: '12px',
                                    border: '1px solid #e5e7eb', outline: 'none', fontSize: '0.95rem'
                                }}
                            />
                        </div>
                    )}

                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                        <input 
                            type="password" name="password" placeholder="Password" required
                            value={formData.password} onChange={handleChange}
                            style={{
                                width: '100%', padding: '12px 12px 12px 40px', borderRadius: '12px',
                                border: '1px solid #e5e7eb', outline: 'none', fontSize: '0.95rem'
                            }}
                        />
                    </div>

                    <button 
                        type="submit" disabled={loading}
                        style={{
                            width: '100%', padding: '12px', borderRadius: '12px', border: 'none',
                            background: '#0c831f', color: '#fff', fontWeight: 'bold', fontSize: '1rem',
                            cursor: 'pointer', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                        }}
                    >
                        {loading ? 'Processing...' : (activeTab === 'login' ? 'Sign In' : 'Create Account')}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#6b7280' }}>
                    {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <span 
                        onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                        style={{ color: '#0c831f', fontWeight: '600', cursor: 'pointer' }}
                    >
                        {activeTab === 'login' ? 'Register Now' : 'Login'}
                    </span>
                </p>
            </div>
            <style jsx>{`
                @keyframes modalSlideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
