'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import { Calendar, Clock, MapPin, CheckCircle, ChevronRight, Package, Lock, X, User as UserIcon, Phone, Hash } from 'lucide-react';
import { getApiUrl } from '@/utils/api';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Bookings() {
  const { user, isLoaded } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentBooking, setPaymentBooking] = useState(null);
  const [txnId, setTxnId] = useState('');
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (isLoaded && !user) {
        setLoading(false); // Not logged in
        return;
    }
    
    if (user?.phone) {
        fetchBookings();

        const interval = setInterval(fetchBookings, 15000); // Poll every 15s
        return () => clearInterval(interval);
    } else if (isLoaded) {
        setLoading(false);
    }
  }, [user, isLoaded]);

  const fetchBookings = async () => {
      try {
          const apiUrl = getApiUrl();
          const res = await fetch(`${apiUrl}/api/bookings?phone=${encodeURIComponent(user.phone)}`);
          if (res.ok) {
              const data = await res.json();
              setBookings(data);
          }
      } catch (err) {
          console.error("Failed to fetch bookings:", err);
      } finally {
          setLoading(false);
      }
  };

  const openDetails = (booking) => {
    setSelectedBooking(booking);
    setDetailsModalOpen(true);
  };

  const handlePayNow = (e, booking) => {
      e.stopPropagation();
      setPaymentBooking(booking);
      setTxnId('');
      setPaymentModalOpen(true);
  };

  const confirmPayment = async () => {
      if (!txnId || txnId.length < 6) {
          alert("Please enter a valid Transaction ID");
          return;
      }
      setPaying(true);
      try {
          const apiUrl = getApiUrl();
          const res = await fetch(`${apiUrl}/api/bookings/${paymentBooking.id}/pay`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ transactionId: txnId })
          });

          if (res.ok) {
              alert("Payment Recorded Successfully");
              setPaymentModalOpen(false);
              fetchBookings(); // Refresh list
          } else {
              alert("Payment Failed: " + await res.text());
          }
      } catch (err) {
          console.error(err);
          alert("Error processing payment");
      } finally {
          setPaying(false);
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
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '1rem'
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

                <div style={{ textAlign: 'right', flex: 1, minWidth: '100px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                   <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>₹{booking.price}</div>
                   
                   <div style={{ display: 'flex', gap: '8px' }}>
                        {/* Pay Now Button for Pay at Hospital pending bookings */}
                        {booking.transaction_id === 'PAY_AT_HOSPITAL' && booking.status !== 'Completed' && (
                            <button
                                onClick={(e) => handlePayNow(e, booking)}
                                style={{
                                    background: '#0c831f', color: '#fff', border: 'none',
                                    padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600',
                                    cursor: 'pointer', boxShadow: '0 2px 4px rgba(12, 131, 31, 0.2)'
                                }}
                            >
                                Pay Now
                            </button>
                        )}
                        <button 
                            onClick={() => openDetails(booking)}
                            style={{ 
                                background: 'transparent', border: '1px solid #e5e7eb', 
                                padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                            }}
                            >
                            Details <ChevronRight size={14} />
                        </button>
                   </div>
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

      {/* Details Modal */}
      {detailsModalOpen && selectedBooking && (
          <div style={{
              position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
          }}>
              <div style={{
                  width: '95%', maxWidth: '500px', background: '#fff', borderRadius: '24px', overflow: 'hidden',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', animation: 'zoomIn 0.2s ease-out',
                  maxHeight: '90vh', overflowY: 'auto'
              }}>
                  <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Booking Details</h2>
                      <button onClick={() => setDetailsModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                          <X size={24} />
                      </button>
                  </div>
                  
                  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Hash size={20} color="#0c831f" />
                          </div>
                          <div>
                              <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Booking ID</div>
                              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>#ZELP-{selectedBooking.id}</div>
                          </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <div>
                              <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '4px' }}>Patient Name</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                                  <UserIcon size={16} /> {selectedBooking.patient_name}
                              </div>
                          </div>
                          <div>
                              <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '4px' }}>Phone Number</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                                  <Phone size={16} /> {selectedBooking.user_phone}
                              </div>
                          </div>
                      </div>

                      <div style={{ padding: '1.2rem', background: '#f9fafb', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                          <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '8px' }}>Service Requested</div>
                          <div style={{ fontWeight: '800', fontSize: '1.2rem', color: '#111827', marginBottom: '4px' }}>{selectedBooking.service_name}</div>
                          <div style={{ fontSize: '0.9rem', color: '#0c831f', fontWeight: '600' }}>At {selectedBooking.hospital_name || 'Clinic'}</div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'start' }}>
                              <Calendar size={18} color="#6b7280" />
                              <div>
                                  <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Date</div>
                                  <div style={{ fontWeight: '600' }}>{new Date(selectedBooking.booking_date).toLocaleDateString(undefined, { dateStyle: 'long' })}</div>
                              </div>
                          </div>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'start' }}>
                              <Clock size={18} color="#6b7280" />
                              <div>
                                  <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Time Slot</div>
                                  <div style={{ fontWeight: '600' }}>{selectedBooking.booking_time}</div>
                              </div>
                          </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', alignItems: 'start' }}>
                          <MapPin size={18} color="#6b7280" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <div>
                              <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Installation / Service Address</div>
                              <div style={{ fontWeight: '500', lineHeight: '1.4' }}>{selectedBooking.address}</div>
                          </div>
                      </div>
                  </div>

                  <div style={{ padding: '1.5rem 2rem 2rem', background: '#fff', borderTop: '1px dashed #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                          <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Total Amount Paid</div>
                          <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#111827' }}>₹{selectedBooking.price}</div>
                      </div>
                      <div style={{ 
                          padding: '8px 16px', borderRadius: '8px', 
                          background: selectedBooking.status === 'Completed' ? '#dcfce7' : '#dbeafe',
                          color: selectedBooking.status === 'Completed' ? '#166534' : '#1e40af',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                      }}>
                          <CheckCircle size={16} /> {selectedBooking.status}
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Payment Modal */}
      {paymentModalOpen && paymentBooking && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
              <div style={{ background: '#fff', width: '100%', maxWidth: '440px', borderRadius: '24px', padding: '2rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative' }}>
                  <button 
                    onClick={() => setPaymentModalOpen(false)} 
                    style={{ position: 'absolute', top: '20px', right: '20px', background: '#f3f4f6', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer' }}
                  >
                        <X size={20} />
                  </button>

                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.5rem', textAlign: 'center' }}>Scan & Pay</h3>
                  
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                            Pay <b>₹{paymentBooking.price}</b> to confirm your booking at {paymentBooking.hospital_name || 'Clinic'}
                        </p>
                        <div style={{ width: '220px', height: '220px', margin: '0 auto', background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '10px' }}>
                             <img src="https://suvidha-server-4u66.onrender.com/uploads/Qr.jpg" alt="QR" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=suvidha@okaxis&pn=Suvidha&cu=INR"} />
                        </div>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                       <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>Transaction ID (UTR)</label>
                       <input 
                         type="text" 
                         className="payment-input"
                         placeholder="12-digit transaction ID" 
                         value={txnId}
                         onChange={(e) => setTxnId(e.target.value)}
                         style={{ 
                            width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #f3f4f6', 
                            fontSize: '1.1rem', fontWeight: '600', outline: 'none'
                         }}
                       />
                  </div>

                  <button 
                    onClick={confirmPayment}
                    disabled={paying || !txnId}
                    style={{ 
                        width: '100%', padding: '1rem', background: txnId ? '#0c831f' : '#e5e7eb', 
                        color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem',
                        cursor: txnId ? 'pointer' : 'not-allowed'
                    }}
                  >
                        {paying ? 'Verifying...' : 'Confirm Payment'}
                  </button>
              </div>
          </div>
      )}

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      <style jsx>{`
          @keyframes zoomIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
          }
      `}</style>
    </main>
  );
}
