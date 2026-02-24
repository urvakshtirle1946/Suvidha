'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Phone, ArrowRight, Loader2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, mode = 'auth' }) { // mode can be 'auth' or 'verify'
    const { user, login, getToken, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(mode === 'verify' ? 'phone' : 'initial');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (mode === 'verify') {
                setStep('phone');
            } else {
                setStep('initial');
            }
        }
    }, [isOpen, mode]);

    if (!isOpen) return null;

    const handleAuthgearLogin = async (social = false) => {
        try {
            setLoading(true);
            const authgearModule = await import("@authgear/web");
            const authgear = authgearModule.default;
            
            await authgear.startAuthentication({
                redirectURI: window.location.origin + "/auth/callback",
                ...(social ? { prompt: 'login' } : {}) // Example if social needs prompt
            });
            onClose();
        } catch (err) {
            console.error('Authgear Login Error:', err);
            alert('Login Failed');
        } finally {
            setLoading(false);
        }
    };

    const handleRequestOtp = async () => {
        if (!phone || phone.length < 10) {
            alert('Please enter a valid phone number');
            return;
        }
        try {
            setLoading(true);
            const token = await getToken();
            const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
            const res = await fetch(`${backendUrl}/api/auth/request-verification-otp`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ phone })
            });
            const data = await res.json();
            if (data.success) {
                setStep('otp');
            } else {
                alert(data.message || 'Failed to send OTP');
            }
        } catch (err) {
            console.error('OTP Request Error:', err);
            alert('Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp || otp.length < 6) {
            alert('Please enter the 6-digit OTP');
            return;
        }
        try {
            setLoading(true);
            const token = await getToken();
            const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
            const res = await fetch(`${backendUrl}/api/auth/verify-phone`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ phone, otp })
            });
            const data = await res.json();
            if (data.success) {
                updateUser({ phone_verified: true, phone });
                onClose();
            } else {
                alert(data.message || 'Verification failed');
            }
        } catch (err) {
            console.error('OTP Verification Error:', err);
            alert('Verification failed');
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        switch (step) {
            case 'initial':
                return (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem' }}>
                                Welcome to Zelp
                            </h2>
                            <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: '1.5' }}>
                                Experience premium healthcare simplified.<br/>Sign in securely.
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                            <button
                                onClick={() => handleAuthgearLogin(false)}
                                disabled={loading}
                                style={{
                                    width: '100%', padding: '16px', borderRadius: '16px', border: 'none',
                                    background: '#0c831f', color: '#fff', fontWeight: 'bold', size: '1.1rem',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                                    cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(12, 131, 31, 0.2)'
                                }}
                            >
                                <Phone size={20} />
                                <span>Continue with Mobile OTP</span>
                            </button>
                            <button
                                onClick={() => handleAuthgearLogin(true)}
                                disabled={loading}
                                style={{
                                    width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #e5e7eb',
                                    background: '#fff', color: '#111827', fontWeight: 'bold', size: '1.1rem',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                                    cursor: 'pointer', transition: 'all 0.2s'
                                }}
                            >
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '20px' }} />
                                <span>Continue with Google</span>
                            </button>
                        </div>
                    </>
                );
            case 'phone':
                return (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Verify Mobile Number</h2>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Please provide your mobile number for verification.</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
                            <div style={{ position: 'relative' }}>
                                <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                <input 
                                    type="tel" 
                                    placeholder="Mobile Number" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '14px', border: '1px solid #e5e7eb', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>
                            <button
                                onClick={handleRequestOtp}
                                disabled={loading}
                                style={{
                                    width: '100%', padding: '16px', borderRadius: '14px', border: 'none',
                                    background: '#0c831f', color: '#fff', fontWeight: 'bold', fontSize: '1rem',
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                }}
                            >
                                {loading && <Loader2 className="animate-spin" size={20} />}
                                <span>{loading ? 'Sending OTP...' : 'Send OTP'}</span>
                                {!loading && <ArrowRight size={18} />}
                            </button>
                        </div>
                    </>
                );
            case 'otp':
                return (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Enter OTP</h2>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Verification code sent to {phone}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
                            <input 
                                type="text" 
                                placeholder="6-digit OTP" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                                style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid #e5e7eb', fontSize: '1.5rem', textAlign: 'center', letterSpacing: '0.5rem', outline: 'none' }}
                            />
                            <button
                                onClick={handleVerifyOtp}
                                disabled={loading}
                                style={{
                                    width: '100%', padding: '16px', borderRadius: '14px', border: 'none',
                                    background: '#0c831f', color: '#fff', fontWeight: 'bold', fontSize: '1rem',
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                }}
                            >
                                {loading && <Loader2 className="animate-spin" size={20} />}
                                <span>{loading ? 'Verifying...' : 'Verify & Continue'}</span>
                            </button>
                            <button 
                                onClick={() => setStep('phone')}
                                style={{ background: 'none', border: 'none', color: '#0c831f', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
                            >
                                Change Number
                            </button>
                        </div>
                    </>
                );
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
                    padding: '2.5rem', position: 'relative',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    animation: 'modalSlideUp 0.3s ease-out'
                }} 
                onClick={(e) => e.stopPropagation()}
            >
                {mode !== 'verify' && (
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
                )}

                {renderContent()}

                <p style={{ fontSize: '0.8rem', color: '#9ca3af', textAlign: 'center', marginTop: '2rem' }}>
                    Securely powered by Authgear
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
