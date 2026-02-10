'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getApiUrl } from '@/utils/api';
import { X, CreditCard, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentReminder() {
    const { user, isLoaded } = useAuth();
    const [pendingBookings, setPendingBookings] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [txnId, setTxnId] = useState('');
    const [paying, setPaying] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded || !user) return;

        fetchPending();
        const interval = setInterval(fetchPending, 30000); // Check every 30s
        return () => clearInterval(interval);
    }, [user, isLoaded]);

    const fetchPending = async () => {
        try {
            const apiUrl = getApiUrl();
            const res = await fetch(`${apiUrl}/api/bookings?phone=${encodeURIComponent(user.phone)}`);
            if (res.ok) {
                const data = await res.json();
                const pending = data.filter(b => b.transaction_id === 'PAY_AT_HOSPITAL' && b.status !== 'Completed' && b.status !== 'Cancelled');
                setPendingBookings(pending);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handlePayNow = async () => {
        if (!txnId || txnId.length < 6) {
            alert("Please enter a valid Transaction ID");
            return;
        }
        setPaying(true);
        try {
            const apiUrl = getApiUrl();
            const res = await fetch(`${apiUrl}/api/bookings/${selectedBooking.id}/pay`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transactionId: txnId })
            });

            if (res.ok) {
                alert("Payment Recorded Successfully");
                setSelectedBooking(null);
                setTxnId('');
                fetchPending(); // Refresh list
                router.refresh();
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

    if (pendingBookings.length === 0) return null;

    return (
        <>
            {/* Floating Trigger Button */}
            {!isOpen && (
                <div 
                    onClick={() => setIsOpen(true)}
                    style={{
                        position: 'fixed', bottom: '20px', right: '20px', zIndex: 999,
                        background: '#0c831f', color: '#fff', padding: '12px 20px',
                        borderRadius: '50px', boxShadow: '0 4px 15px rgba(12, 131, 31, 0.4)',
                        display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
                        fontWeight: 'bold', animation: 'bounce 2s infinite'
                    }}
                >
                    <CreditCard size={20} />
                    <span>Pay Pending ({pendingBookings.length})</span>
                </div>
            )}

            {/* Modal */}
            {isOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div style={{ background: '#fff', width: '100%', maxWidth: '440px', borderRadius: '24px', padding: '2rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative', maxHeight: '80vh', overflowY: 'auto' }}>
                        <button 
                            onClick={() => { setIsOpen(false); setSelectedBooking(null); }} 
                            style={{ position: 'absolute', top: '20px', right: '20px', background: '#f3f4f6', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer' }}
                        >
                            <X size={20} />
                        </button>

                        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.5rem', textAlign: 'center' }}>
                            {selectedBooking ? 'Complete Payment' : 'Pending Payments'}
                        </h3>

                        {!selectedBooking ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {pendingBookings.map(booking => (
                                    <div key={booking.id} style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: 'bold' }}>{booking.service_name}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{new Date(booking.booking_date).toLocaleDateString()}</div>
                                            <div style={{ color: '#0c831f', fontWeight: 'bold', fontSize: '0.9rem' }}>₹{booking.price}</div>
                                        </div>
                                        <button 
                                            onClick={() => setSelectedBooking(booking)}
                                            style={{ background: '#0c831f', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}
                                        >
                                            Pay <ChevronRight size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Scan & Pay View
                            <div>
                                <button 
                                    onClick={() => setSelectedBooking(null)}
                                    style={{ marginBottom: '1rem', background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                                >
                                    ← Back to list
                                </button>
                                
                                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                        Pay <b>₹{selectedBooking.price}</b> for {selectedBooking.service_name}
                                    </p>
                                    <div style={{ width: '220px', height: '220px', margin: '0 auto', background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '10px' }}>
                                         <img src="https://suvidha-server-4u66.onrender.com/uploads/Qr.jpg" alt="QR" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=suvidha@okaxis&pn=Suvidha&cu=INR"} />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                     <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>Transaction ID (UTR)</label>
                                     <input 
                                       type="text" 
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
                                    onClick={handlePayNow}
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
                        )}
                    </div>
                </div>
            )}
            
            <style jsx>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
            `}</style>
        </>
    );
}
