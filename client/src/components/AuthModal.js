'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Phone, ArrowRight, Loader2 } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function AuthModal({ isOpen, onClose }) {
    const { user, login, customGoogleLogin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('initial');

    useEffect(() => {
        if (isOpen) {
            setStep('initial');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleAuthgearLogin = async () => {
        try {
            setLoading(true);
            await login();
            onClose();
        } catch (err) {
            console.error('Authgear Login Error:', err);
            alert('Login Failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setLoading(true);
            await customGoogleLogin(credentialResponse.credential);
            onClose();
        } catch (err) {
            console.error('Native Google Login Error:', err);
            alert('Google Sign-In Failed');
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
                                onClick={handleAuthgearLogin}
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

                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '343152469164-pafau4u4nbkljrqi5ia3shb8qb84p1bn.apps.googleusercontent.com'}>
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={() => alert('Google Sign-In Failed')}
                                        useOneTap
                                        theme="outline"
                                        size="large"
                                        text="continue_with"
                                        shape="pill"
                                        width={300}
                                    />
                                </GoogleOAuthProvider>
                            </div>
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
