'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, User, Mail, Lock, Phone, Save } from 'lucide-react';
import { getApiUrl } from '@/utils/api';

export default function SettingsModal({ isOpen, onClose }) {
    const { user, login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                password: ''
            });
        }
    }, [user, isOpen]);

    if (!isOpen || !user) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const apiUrl = getApiUrl();
        try {
            const res = await fetch(`${apiUrl}/api/auth/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    phone: user.phone // Phone is the key, ensure it's passed from current user state
                })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                // Update local auth context with new user data/token
                login({ ...data.user, token: data.token });
                alert('Profile updated successfully!');
                onClose();
            } else {
                alert(data.message || 'Update failed');
            }
        } catch (err) {
            console.error('Update Error:', err);
            alert('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 3000,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', p: '1rem'
        }} onClick={onClose}>
            <div style={{
                background: '#fff', width: '100%', maxWidth: '450px',
                borderRadius: '24px', padding: '2rem', position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }} onClick={e => e.stopPropagation()}>
                
                <button onClick={onClose} style={{
                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                    background: '#f3f4f6', border: 'none', borderRadius: '50%',
                    width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer'
                }}>
                    <X size={18} />
                </button>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
                    Edit Profile
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
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

                    {/* Phone (Read Only) */}
                    <div style={{ position: 'relative', opacity: 0.7 }}>
                        <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                        <input 
                            type="text" value={formData.phone || ''} disabled
                            style={{
                                width: '100%', padding: '12px 12px 12px 40px', borderRadius: '12px',
                                border: '1px solid #e5e7eb', background: '#f9fafb', fontSize: '0.95rem', cursor: 'not-allowed'
                            }}
                        />
                         <span style={{ fontSize: '0.7rem', color: '#dc2626', marginLeft: '5px' }}>Phone number cannot be changed</span>
                    </div>

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

                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                        <input 
                            type="password" name="password" placeholder="New Password (leave empty to keep current)"
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
                        {loading ? 'Saving...' : 'Save Changes'}
                        {!loading && <Save size={18} />}
                    </button>
                </form>
            </div>
        </div>
    );
}
