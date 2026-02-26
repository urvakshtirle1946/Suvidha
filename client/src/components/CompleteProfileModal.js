'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Phone, Mail, User, ArrowRight, X } from 'lucide-react';

export default function CompleteProfileModal({ isOpen, onClose }) {
    const { user, isLoaded, getToken, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // OTP Flow (Replaced by Authgear Redirect)
    const { login } = useAuth();

    // Profile Flow
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            if (!user.name) setName('');
            if (!user.email) setEmail('');
        }
    }, [user]);

    if (!isLoaded || !user || !isOpen) return null;

    const needsPhone = !user.phone || !user.phone_verified;
    const needsDetails = (!user.name);

    // If both are satisfied, don't show modal
    if (!needsPhone && !needsDetails) return null;

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

    const handleAuthgearRedirect = async () => {
        try {
            setLoading(true);
            await login({ prompt: 'login' }); // Forces Authgear to show login screen for phone verification
        } catch (err) {
            console.error('Authgear Redirect Error:', err);
            setError('Failed to redirect to mobile authentication.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        if (!name) return setError('Full Name is required');
        setError('');
        try {
            setLoading(true);
            const token = await getToken();
            const res = await fetch(`${backendUrl}/api/auth/profile`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, email })
            });
            const data = await res.json();
            if (data.success && data.user) {
                updateUser(data.user);
                if (onClose) onClose();
            } else {
                setError(data.message || 'Failed to sync profile');
            }
        } catch (err) {
            console.error('Profile Update Error:', err);
            setError('Network error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem'
        }}>
            <div style={{
                width: '100%', maxWidth: '400px',
                background: '#fff', borderRadius: '24px',
                padding: '2.5rem', position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                animation: 'modalSlideUp 0.3s ease-out'
            }}>
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
                        Complete Your Profile
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
                        {needsPhone ? 'Please verify your mobile number to secure your account.' : 'Please provide your basic details.'}
                    </p>
                </div>

                {error && (
                    <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                {needsPhone ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <p style={{ color: '#4b5563', fontSize: '0.95rem', marginBottom: '1rem', textAlign: 'center' }}>
                            We need to securely verify your mobile number before you can continue using Zelp.
                        </p>
                        <button
                            onClick={handleAuthgearRedirect}
                            disabled={loading}
                            style={{
                                width: '100%', padding: '16px', borderRadius: '12px', border: 'none',
                                background: '#0c831f', color: '#fff', fontWeight: 'bold', fontSize: '1rem',
                                cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
                            }}
                        >
                            {loading ? <Loader2 size={20} className="spin" /> : (
                                <><span>Verify Mobile Number</span><ArrowRight size={18} /></>
                            )}
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <User size={20} color="#9ca3af" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                    width: '100%', padding: '16px 16px 16px 48px',
                                    borderRadius: '12px', border: '1px solid #e5e7eb',
                                    fontSize: '1rem', background: '#f9fafb'
                                }}
                            />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Mail size={20} color="#9ca3af" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="email"
                                placeholder="Email Address (Optional)"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%', padding: '16px 16px 16px 48px',
                                    borderRadius: '12px', border: '1px solid #e5e7eb',
                                    fontSize: '1rem', background: '#f9fafb'
                                }}
                            />
                        </div>
                        <button
                            onClick={handleUpdateProfile}
                            disabled={loading || !name}
                            style={{
                                width: '100%', padding: '16px', borderRadius: '12px', border: 'none',
                                background: name ? '#0c831f' : '#9ca3af', 
                                color: '#fff', fontWeight: 'bold', fontSize: '1rem',
                                cursor: name ? 'pointer' : 'not-allowed',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '0.5rem'
                            }}
                        >
                            {loading ? <Loader2 size={20} className="spin" /> : (
                                <><span>Save & Continue</span><ArrowRight size={18} /></>
                            )}
                        </button>
                    </div>
                )}
            </div>
            
            <style jsx>{`
                @keyframes modalSlideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
