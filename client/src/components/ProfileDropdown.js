'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Settings, LogOut, ChevronDown, Calendar } from 'lucide-react';

export default function ProfileDropdown({ onOpenSettings }) {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <div ref={dropdownRef} style={{ position: 'relative' }}>
            {/* Toggle Button */}
            <div 
                onClick={() => setIsOpen(!isOpen)}
                style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    cursor: 'pointer', padding: '4px 8px', borderRadius: '8px',
                    transition: 'background 0.2s',
                    userSelect: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
                <div style={{ 
                    width: '32px', height: '32px', borderRadius: '50%', background: '#000000', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px'
                }}>
                    {(user.name || 'User').charAt(0).toUpperCase()}
                </div>
                <div className="hide-on-mobile" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                    <span style={{ fontWeight: '600', fontSize: '0.9rem', color: '#1f2937' }}>
                        Hi, {(user.name || 'User').split(' ')[0]}
                    </span>
                </div>
                <ChevronDown size={14} color="#6b7280" />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div style={{
                    position: 'absolute', 
                    top: 'calc(100% + 10px)', 
                    right: 0,
                    width: '220px', 
                    background: '#fff', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #f3f4f6',
                    overflow: 'visible', 
                    zIndex: 9999
                }}>
                    {/* Arrow pointing up */}
                    <div style={{
                        position: 'absolute',
                        top: '-6px',
                        right: '12px',
                        width: '12px',
                        height: '12px',
                        background: '#fff',
                        transform: 'rotate(45deg)',
                        borderLeft: '1px solid #f3f4f6',
                        borderTop: '1px solid #f3f4f6',
                        zIndex: 1
                    }}></div>

                    <div style={{ position: 'relative', zIndex: 2, background: '#fff', borderRadius: '12px', overflow: 'hidden' }}>
                        <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
                            <p style={{ fontWeight: '600', color: '#111827', fontSize: '0.95rem' }}>{user.name || 'User'}</p>
                            {user.email && <p style={{ fontSize: '0.8rem', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>{user.email}</p>}
                            {user.phone && <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '2px' }}>{user.phone}</p>}
                        </div>

                    <div style={{ padding: '4px' }}>
                        <Link href="/bookings" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none' }}>
                            <div className="dropdown-item">
                                <Calendar size={16} />
                                <span>My Bookings</span>
                            </div>
                        </Link>

                        <div className="dropdown-item" onClick={() => { onOpenSettings(); setIsOpen(false); }}>
                            <Settings size={16} />
                            <span>Settings</span>
                        </div>

                        <div style={{ height: '1px', background: '#f3f4f6', margin: '4px 0' }}></div>

                        <div className="dropdown-item logout" onClick={() => { logout(); setIsOpen(false); }}>
                            <LogOut size={16} />
                            <span>Logout</span>
                        </div>
                    </div>
                  </div> {/* Closing inner content div */}
                </div>
            )}
            
            <style jsx>{`
                .dropdown-item {
                    display: flex; align-items: center; gap: 10px;
                    padding: 8px 12px; border-radius: 6px;
                    cursor: pointer; color: '#374151'; font-size: 0.9rem; font-weight: 500;
                    transition: all 0.2s;
                }
                .dropdown-item:hover {
                    background: #f3f4f6; color: #111827;
                }
                .dropdown-item.logout {
                    color: #dc2626;
                }
                .dropdown-item.logout:hover {
                    background: #fee2e2; color: #ef4444;
                }
            `}</style>
        </div>
    );
}
