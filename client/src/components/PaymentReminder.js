'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getApiUrl } from '@/utils/api';
import { X, ChevronLeft, ChevronRight, Info, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentReminder() {
    const { user, isLoaded } = useAuth();
    const [pendingBookings, setPendingBookings] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewLink, setViewLink] = useState(null); // 'pay' | 'details' | null
    const [txnId, setTxnId] = useState('');
    const [paying, setPaying] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
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
                console.log("Fetched Bookings for Reminder:", data);
                const pending = data.filter(b => b.transaction_id === 'PAY_AT_HOSPITAL' && b.status !== 'Completed' && b.status !== 'Cancelled');
                console.log("Pending Bookings:", pending);
                setPendingBookings(pending);
                // Adjust index if out of bounds
                if (currentIndex >= pending.length && pending.length > 0) {
                    setCurrentIndex(0);
                }
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
            const currentBooking = pendingBookings[currentIndex];
            const res = await fetch(`${apiUrl}/api/bookings/${currentBooking.id}/pay`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transactionId: txnId })
            });

            if (res.ok) {
                // alert("Payment Recorded Successfully"); // Removed per request
                setTxnId('');
                setViewLink(null);
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

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % pendingBookings.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + pendingBookings.length) % pendingBookings.length);
    };

    if (pendingBookings.length === 0 || !isVisible) return null;

    const currentBooking = pendingBookings[currentIndex];

    return (
        <>
            {/* Floating Widget Card */}
            {!viewLink && (
                <div style={{
                    position: 'fixed', bottom: '90px', right: '24px', zIndex: 20000,
                    background: '#fff', width: '300px', borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)', border: '1px solid #e5e7eb',
                    overflow: 'hidden'
                }}>
                    {/* Header */}
                    <div style={{ background: '#0c831f', padding: '12px 16px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CreditCard size={16} /> Pending Payments ({pendingBookings.length})
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {pendingBookings.length > 1 && (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button onClick={prevSlide} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '2px', color: '#fff' }}><ChevronLeft size={16} /></button>
                                    <button onClick={nextSlide} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '2px', color: '#fff' }}><ChevronRight size={16} /></button>
                                </div>
                            )}
                            <button 
                                onClick={() => setIsVisible(false)} 
                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px', color: '#fff', display: 'flex', opacity: 0.8 }}
                                onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                                onMouseOut={(e) => e.currentTarget.style.opacity = 0.8}
                                title="Close"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '16px' }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 'bold', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {currentBooking.service_name}
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280', marginBottom: '12px' }}>
                            {new Date(currentBooking.booking_date).toLocaleDateString()}
                        </p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', background: '#f3f4f6', padding: '8px 12px', borderRadius: '8px' }}>
                            <span style={{ fontSize: '0.85rem', color: '#4b5563' }}>Amount Due:</span>
                            <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#0c831f' }}>₹{currentBooking.price}</span>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                onClick={() => setViewLink('details')}
                                style={{ flex: 1, padding: '8px', border: '1px solid #e5e7eb', background: '#fff', borderRadius: '8px', fontWeight: '600', color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.85rem' }}
                            >
                                <Info size={14} /> Details
                            </button>
                            <button 
                                onClick={() => setViewLink('pay')}
                                style={{ flex: 1, padding: '8px', border: 'none', background: '#0c831f', borderRadius: '8px', fontWeight: '600', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.85rem' }}
                            >
                                Pay Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Pay or Details */}
            {viewLink && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div style={{ background: '#fff', width: '100%', maxWidth: '400px', borderRadius: '24px', padding: '2rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative' }}>
                        <button 
                            onClick={() => setViewLink(null)} 
                            style={{ position: 'absolute', top: '20px', right: '20px', background: '#f3f4f6', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer' }}
                        >
                            <X size={20} />
                        </button>

                        {viewLink === 'details' && (
                            <>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.5rem', textAlign: 'center' }}>Bill Summary</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <DetailRow label="Service" value={currentBooking.service_name} />
                                    <DetailRow label="Hospital" value={currentBooking.hospital_name || 'N/A'} />
                                    <DetailRow label="Date" value={new Date(currentBooking.booking_date).toLocaleDateString()} />
                                    <DetailRow label="Time" value={currentBooking.time_slot} />
                                    <DetailRow label="Patient" value={currentBooking.patient_name} />
                                    <DetailRow label="Phone" value={currentBooking.user_phone} />
                                    <div style={{ borderTop: '1px dashed #e5e7eb', margin: '8px 0' }}></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.1rem', fontWeight: 'bold' }}>
                                        <span>Total Amount</span>
                                        <span style={{ color: '#0c831f' }}>₹{currentBooking.price}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setViewLink('pay')}
                                    style={{ width: '100%', marginTop: '24px', padding: '12px', background: '#0c831f', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                                >
                                    Proceed to Pay
                                </button>
                            </>
                        )}

                        {viewLink === 'pay' && (
                           <div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem', textAlign: 'center' }}>Complete Payment</h3>
                                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                        Scan QR to pay <b>₹{currentBooking.price}</b>
                                    </p>
                                    <div style={{ width: '200px', height: '200px', margin: '0 auto', background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '10px' }}>
                                         <img src="https://suvidha-server-4u66.onrender.com/uploads/Qr.jpg" alt="QR" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=suvidha@okaxis&pn=Suvidha&cu=INR"} />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                     <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#1f2937', marginBottom: '8px', textAlign: 'left' }}>Transaction ID (UTR)</label>
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
                                <button 
                                    onClick={() => setViewLink('details')}
                                    style={{ background: 'transparent', border: 'none', color: '#6b7280', marginTop: '12px', fontSize: '0.9rem', cursor: 'pointer', display: 'block', width: '100%' }}
                                >
                                    Back to details
                                </button>
                            </div> 
                        )}
                    </div>
                </div>
            )}
            
            <style jsx>{`
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </>
    );
}

function DetailRow({ label, value }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#6b7280', fontSize: '0.95rem' }}>{label}</span>
            <span style={{ fontWeight: '600', color: '#1f2937', textAlign: 'right' }}>{value}</span>
        </div>
    );
}
