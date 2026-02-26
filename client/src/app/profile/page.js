'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import { Calendar, Clock, MapPin, User, CheckCircle, Lock } from 'lucide-react';
import { getApiUrl } from '@/utils/api';

export default function Profile() {
  const { user, isLoaded } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user?.phone) {
      fetchBookings();
    } else if (isLoaded) {
      setLoading(false);
    }
  }, [user, isLoaded]);

  const fetchBookings = async () => {
    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/bookings?phone=${user.phone}`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading...</div>;

  return (
    <main style={{ paddingBottom: '100px', minHeight: '100vh', background: '#f4f6fb' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
        {user && (
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '2rem', marginBottom: '2rem',
            border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
            display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap'
          }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%', background: '#0c831f', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold'
            }}>
              {(user.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                {user.name || 'User Profile'}
              </h2>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: '#4b5563' }}>
                {user.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: '#f3f4f6', padding: '6px', borderRadius: '50%' }}><Lock size={16} color="#0c831f" /></div>
                    <span style={{ fontWeight: '500' }}>+91 {user.phone}</span>
                    {user.phone_verified && <CheckCircle size={16} color="#0c831f" />}
                  </div>
                )}
                {user.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: '#f3f4f6', padding: '6px', borderRadius: '50%' }}>
                      <User size={16} color="#0c831f" />
                    </div>
                    <span>{user.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <h1 style={{ marginBottom: '2rem', fontSize: '1.8rem', fontWeight: 'bold' }}>My Bookings</h1>
        
        {!user ? (
            <div style={{ 
                textAlign: 'center', padding: '5rem 2rem', background: '#fff', 
                borderRadius: '24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' 
            }}>
                <div style={{ 
                    width: '80px', height: '80px', borderRadius: '50%', background: '#fef2f2', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
                }}>
                    <Lock size={40} color="#ef4444" />
                </div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#111827' }}>Login to see your profile</h2>
                <p style={{ color: '#6b7280', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
                    Please sign in with your phone number or email to view your personalized profile and booking history.
                </p>
                <button 
                    onClick={() => setAuthModalOpen(true)}
                    style={{ 
                        background: '#0c831f', color: '#fff', border: 'none', 
                        padding: '1rem 2.5rem', borderRadius: '12px', fontWeight: 'bold', 
                        fontSize: '1rem', cursor: 'pointer', transition: 'transform 0.2s',
                        boxShadow: '0 4px 12px rgba(12, 131, 31, 0.2)'
                    }}
                >
                    Login / Sign Up
                </button>
            </div>
        ) : loading ? (
             <p style={{ color: '#6b7280' }}>Loading your appointments...</p>
        ) : bookings.length === 0 ? (
             <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280', background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                 <h2>No bookings yet</h2>
                 <p>Your upcoming appointments will appear here.</p>
             </div>
        ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', maxWidth: '800px' }}>
                {bookings.map((booking) => (
                    <div key={booking.id} style={{ 
                        padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb',
                        display: 'flex', gap: '1.5rem', flexWrap: 'wrap', borderLeft: '4px solid #0c831f' 
                    }}>
                        <div style={{ flex: 1, minWidth: '250px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{booking.service_name}</h3>
                                <span style={{ color: '#0c831f', fontWeight: 'bold', fontSize: '0.9rem' }}>{booking.status}</span>
                            </div>
                            <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.85rem' }}>Booking ID: #ZELP-{booking.id}</p>
                            
                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: '#374151', fontSize: '0.9rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Calendar size={14} color="#0c831f" /> {new Date(booking.booking_date).toLocaleDateString()}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Clock size={14} color="#0c831f" /> {booking.booking_time}
                                </span>
                            </div>
                        </div>

                        <div style={{ flex: 1, minWidth: '250px', borderLeft: '1px solid #f3f4f6', paddingLeft: '1.5rem' }}>
                            <div style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                                <User size={14} color="#6b7280" /> 
                                <span>{booking.patient_name}</span>
                            </div>
                            <div style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'start', gap: '8px', fontSize: '0.9rem' }}>
                                <MapPin size={14} color="#6b7280" style={{ marginTop: '2px' }} /> 
                                <span style={{ color: '#6b7280' }}>{booking.address}</span>
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginTop: '1rem', color: '#111827' }}>
                                Paid: ₹{booking.price}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </main>
  );
}
