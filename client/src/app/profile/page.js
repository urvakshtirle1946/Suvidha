'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Calendar, Clock, MapPin, User, CheckCircle } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.phone) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`https://suvidha-server-4u66.onrender.com/api/bookings?phone=${user.phone}`);
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

  return (
    <main style={{ paddingBottom: '100px' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
        <h1 style={{ marginBottom: '2rem' }}>My Bookings</h1>
        
        {loading ? (
             <p style={{ color: 'var(--text-muted)' }}>Loading your appointments...</p>
        ) : bookings.length === 0 ? (
             <div className="glass" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                 <h2>No bookings yet</h2>
                 <p>Your upcoming appointments will appear here.</p>
             </div>
        ) : (
            <div className="grid-cards" style={{ gridTemplateColumns: '1fr' }}>
                {bookings.map((booking) => (
                    <div key={booking.id} className="glass" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', borderLeft: '4px solid var(--primary)' }}>
                        <div style={{ flex: 1, minWidth: '250px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.3rem' }}>{booking.service_name}</h3>
                                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{booking.status}</span>
                            </div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Booking ID: #ZELP-{booking.id}</p>
                            
                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: '#fff', fontSize: '0.95rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Calendar size={16} color="var(--primary)" /> {new Date(booking.booking_date).toLocaleDateString()}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Clock size={16} color="var(--primary)" /> {booking.booking_time}
                                </span>
                            </div>
                        </div>

                        <div style={{ flex: 1, minWidth: '250px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1.5rem' }}>
                            <div style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <User size={16} color="var(--text-muted)" /> 
                                <span>{booking.patient_name} ({booking.patient_age}, {booking.patient_gender})</span>
                            </div>
                            <div style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'start', gap: '8px' }}>
                                <MapPin size={16} color="var(--text-muted)" style={{ marginTop: '2px' }} /> 
                                <span style={{ color: 'var(--text-muted)' }}>{booking.address}</span>
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginTop: '1rem', color: 'var(--accent)' }}>
                                Paid: ₹{booking.price}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </main>
  );
}
