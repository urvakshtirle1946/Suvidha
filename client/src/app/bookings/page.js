'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import { Calendar, Clock, MapPin, CheckCircle, ChevronRight, Package, Lock } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Bookings() {
  const { user, isLoaded } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && !user) {
        setLoading(false); // Not logged in
        return;
    }
    
    if (user?.phone) {
        fetchBookings();

        const interval = setInterval(fetchBookings, 15000); // Poll every 15s
        return () => clearInterval(interval);
    } else {
        setLoading(false);
    }
  }, [user, isLoaded]);

  const fetchBookings = async () => {
      try {
          const res = await fetch(`https://suvidha-server-4u66.onrender.com/api/bookings/user?phone=${encodeURIComponent(user.phone)}`);
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
    <main style={{ minHeight: '100vh', background: '#f4f6fb', paddingBottom: '3rem' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>Your Bookings</h1>

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
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#111827' }}>Login to see your bookings</h2>
                <p style={{ color: '#6b7280', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
                    Please sign in with your phone number or email to view your appointment history and upcoming services.
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
          <div style={{ textAlign: 'center', padding: '3rem' }}>Loading your history...</div>
        ) : bookings.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px' }}>
            {bookings.map((booking) => (
              <div key={booking.id} style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                padding: '1.5rem', 
                border: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                   <div style={{ 
                       width: '50px', height: '50px', borderRadius: '10px', 
                       background: booking.status === 'Completed' ? '#f0fdf4' : '#eff6ff', 
                       display: 'flex', alignItems: 'center', justifyContent: 'center' 
                   }}>
                       <Package size={24} color={booking.status === 'Completed' ? '#16a34a' : '#2563eb'} />
                   </div>
                   
                   <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                         <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#111827' }}>{booking.service_name}</h3>
                         <span style={{ 
                             fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px',
                             background: booking.status === 'Completed' ? '#dcfce7' : 
                                         booking.status === 'Cancelled' ? '#fee2e2' : '#dbeafe',
                             color: booking.status === 'Completed' ? '#166534' : 
                                    booking.status === 'Cancelled' ? '#991b1b' : '#1e40af',
                             fontWeight: '600'
                         }}>
                             {booking.status}
                         </span>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>At {booking.hospital_name || 'Clinic'}</p>
                      
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#4b5563' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={14} /> {new Date(booking.booking_date).toLocaleDateString()}
                         </div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={14} /> {booking.booking_time}
                         </div>
                      </div>
                   </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                   <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>₹{booking.price}</div>
                   <button style={{ 
                       background: 'transparent', border: '1px solid #e5e7eb', 
                       padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500',
                       cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                   }}>
                       Details <ChevronRight size={14} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '5rem', background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
             <Package size={48} color="#9ca3af" style={{ marginBottom: '1rem' }} />
             <h3>No bookings found</h3>
             <p style={{ color: '#6b7280' }}>You haven't booked any services yet.</p>
          </div>
        )}
      </div>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </main>
  );
}
