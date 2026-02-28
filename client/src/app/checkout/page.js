'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, AlertCircle, Calendar as CalendarIcon, Clock, MapPin, X, User } from 'lucide-react';
import Link from 'next/link';
import { getImageUrl, apiFetch } from '@/utils/api';
import { useEffect } from 'react';

function ProviderList({ serviceName, currentHospitalId, onSelect }) {
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const cleanName = (serviceName || '').split(' at ')[0];
                const res = await apiFetch(`/api/services?search=${encodeURIComponent(cleanName)}`);
                if (res.ok) {
                    const data = await res.json();
                    const list = Array.isArray(data) ? data : (data.data || []);
                    
                    // Deduplicate by hospital_id (keep lowest price if duplicates exist)
                    const uniqueProviders = [];
                    const seenHospitals = new Set();
                    
                    // Sort by price first so we keep the cheapest version of a service at a hospital
                    const sortedByPrice = [...list].sort((a,b) => (a.discount_price || a.price) - (b.discount_price || b.price));
                    
                    for (const item of sortedByPrice) {
                        const hId = item.hospital_id || item.id;
                        if (!seenHospitals.has(hId)) {
                            uniqueProviders.push(item);
                            seenHospitals.add(hId);
                        }
                    }

                    // Now sort the unique list by highest discount percentage
                    const sorted = uniqueProviders.sort((a,b) => {
                        const discA = ((a.price - a.discount_price) / a.price) || 0;
                        const discB = ((b.price - b.discount_price) / b.price) || 0;
                        return discB - discA;
                    });
                    setLabs(sorted);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProviders();
    }, [serviceName]);

    if (loading) return <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Finding providers...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {labs.map(lab => {
                const isSelected = (lab.hospital_id || lab.id) === currentHospitalId;
                const discountPercent = Math.round(((lab.price - lab.discount_price) / lab.price) * 100);
                
                return (
                    <div 
                        key={lab.id} 
                        onClick={() => onSelect(lab)}
                        style={{ 
                            padding: '8px 12px', border: isSelected ? '2px solid #0c831f' : '1px solid #e5e7eb',
                            borderRadius: '10px', background: isSelected ? '#f0fdf4' : '#fff', cursor: 'pointer',
                            display: 'flex', gap: '10px', alignItems: 'center',
                            transition: 'all 0.2s'
                        }}
                    >
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', background: '#f3f4f6', flexShrink: 0 }}>
                             <img 
                                src={getImageUrl(lab.hospital_image || lab.image_url) || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=100&q=80"} 
                                alt={lab.hospital_name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => e.target.src = "https://images.unsplash.com/photo-1586773860418-d3b97898c75c?auto=format&fit=crop&w=100&q=80"}
                             />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '700', fontSize: '0.85rem', color: isSelected ? '#0c831f' : '#1f2937' }}>{lab.hospital_name}</div>
                            {discountPercent > 0 && (
                                <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 'bold' }}>{discountPercent}% SAVING</span>
                            )}
                        </div>
                        <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '0.9rem' }}>₹{lab.discount_price || lab.price}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default function Checkout() {
  const { cart, clearCart, cartTotal, cartMrpTotal, cartDiscount, updateCartItem } = useCart();
  const { user } = useAuth();
  const { location } = useLocation();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  // Schedule State
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMode, setPaymentMode] = useState('hospital'); // 'hospital' or 'online'
  const [bookingIds, setBookingIds] = useState([]);

  // Patient Details State
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientPhone, setPatientPhone] = useState('');

  useEffect(() => {
    if (user) {
        if (!patientName) setPatientName(user.name || '');
        if (!patientPhone) setPatientPhone('');
    }
  }, [user, patientName, patientPhone]);

  const updateCartWithProvider = (index, newItem) => {
    updateCartItem(index, newItem);
  };

  const handleCheckoutCallback = async () => {
    if (!user) {
        setError('Please login to continue with your order.');
        setAuthModalOpen(true);
        return;
    }

    if (!selectedDate || !selectedTime) {
        setError("Please select a date and time slot for your appointment.");
        return;
    }

    if (!patientName || !patientAge || !patientGender || !patientPhone || patientPhone.length < 10) {
        setError("Please fill out all patient details correctly.");
        return;
    }

    // Check if every item has a provider
    const missingProvider = cart.find(item => !item.hospitalId);
    if (missingProvider) {
        setError(`Please select a hospital provider for ${missingProvider.name}`);
        return;
    }

    if (paymentMode === 'online') {
        setShowPayment(true); 
    } else {
        // Pay at Hospital - finalize immediately
        finalizeCheckout(); 
    }
  };

  /* Removed handleCompletionConfirm */

  const finalizeCheckout = async () => {
    const isHospitalPay = paymentMode === 'hospital';
    const currentTxnId = isHospitalPay ? 'PAY_AT_HOSPITAL' : transactionId;

    if (!isHospitalPay && (!currentTxnId || currentTxnId.length < 6)) {
        alert('Please enter a valid Transaction ID');
        return;
    }

    setLoading(true);
    setError(null);

    try {
        if (bookingIds.length > 0 && paymentMode === 'online') {
            // Bulk update payments for existing bookings
            const updatePromises = bookingIds.map((id) =>
              apiFetch(`/api/bookings/${id}/pay`, {
                    method: 'PATCH',
                    body: JSON.stringify({ transactionId: currentTxnId })
                })
            );
            await Promise.all(updatePromises);
            setSuccess(true);
            setTimeout(() => {
                router.push('/bookings');
            }, 3000);
        } else {
            // Simulate Payment Delay for new bookings
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Create an array of booking promises
            const createdIds = [];
            const bookingPromises = cart.flatMap(item => {
                const quantity = item.quantity || 1;
                const requests = [];
                for (let i = 0; i < quantity; i++) {
                    const bookingData = {
                        name: patientName || user?.name || 'Unknown',
                        userPhone: patientPhone || 'Unknown',
                        userEmail: user?.email,
                        age: parseInt(patientAge) || 0, 
                        gender: patientGender || 'Not Specified',
                        date: selectedDate,
                        time: selectedTime,
                        address: location || 'New Delhi, India',
                        serviceName: item.name,
                        price: item.price,
                        hospitalId: item.hospitalId,
                        transactionId: currentTxnId
                    };

                    requests.push(
                        apiFetch(`/api/bookings`, {
                            method: 'POST',
                            body: JSON.stringify(bookingData)
                        }).then(async res => {
                            if (res.ok) {
                                const data = await res.json();
                                if (data.bookingId) createdIds.push(data.bookingId);
                            }
                            return res;
                        })
                    );
                }
                return requests;
            });

            await Promise.all(bookingPromises);
            setBookingIds(createdIds);
            setSuccess(true);
            clearCart();
            
            // If they paid online immediately, redirect after 3s
            if (!isHospitalPay) {
                setTimeout(() => {
                    router.push('/bookings');
                }, 3000);
            }
        }
    } catch (err) {
        console.error(err);
        setError("Failed to process some items. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  if (success) {
      const isHospitalUpdate = bookingIds.length > 0 && paymentMode === 'hospital' && transactionId === '';

      return (
        <main style={{ minHeight: '100vh', background: '#f4f6fb' }}>
            <Navbar />
            <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 4rem)', textAlign: 'center', maxWidth: '600px' }}>
                <CheckCircle size={64} color="#059669" style={{ margin: '0 auto 1.5rem' }} />
                <h1 style={{ marginBottom: '1rem', fontWeight: '900' }}>Order Placed!</h1>
                
                <div style={{ background: '#fff', padding: '2rem', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                    <p style={{ color: '#4b5563', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                        Your services have been scheduled for <b>{selectedDate}</b>.
                    </p>

                    {isHospitalUpdate ? (
                        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1.5rem' }}>
                            <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1.5rem' }}>
                                Would you like to complete your payment online now using QR?
                            </p>
                            <button 
                                onClick={() => {
                                    setSuccess(false);
                                    setPaymentMode('online');
                                    setShowPayment(true);
                                }}
                                style={{ background: '#0c831f', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(12, 131, 31, 0.2)' }}
                            >
                                Pay Online Now
                            </button>
                        </div>
                    ) : (
                         <p style={{ color: '#6b7280' }}>Redirecting you to view your bookings...</p>
                    )}
                </div>

                <button 
                   onClick={() => router.push('/bookings')}
                   style={{ background: 'transparent', border: 'none', color: '#6b7280', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    View All Bookings
                </button>
            </div>
        </main>
      );
  }

  return (
    <main className="checkout-page" style={{ minHeight: '100vh', background: '#f4f6fb', paddingBottom: '100px' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
        <Link href="/" className="back-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', color: '#6b7280', textDecoration: 'none' }}>
            <ArrowLeft size={18} /> Continue Shopping
        </Link>
        
        <h1 className="page-title" style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>Checkout</h1>

        {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
                <h2>Your cart is empty</h2>
                <Link href="/hospitals" style={{ color: '#0c831f', textDecoration: 'underline' }}>Browse Services</Link>
            </div>
        ) : (
            <div className="checkout-grid">
                {/* Left: Items & Schedule */}
                <div className="checkout-left">
                    
                    {/* Items List */}
                    <div className="card item-list-card" style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '1rem' }}>Order Items ({cart.length})</h3>
                        {cart.map((item, idx) => (
                            <div key={idx} style={{ marginBottom: '1.5rem', borderBottom: '1px dashed #f3f4f6', paddingBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <div>
                                        <div style={{ fontWeight: '700', color: '#111827', fontSize: '1.1rem' }}>{item.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                                             <MapPin size={14} color="#ff6f61" /> {item.hospital_name || 'No Hospital Selected'}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>₹{item.price * (item.quantity || 1)}</div>
                                        {item.mrp > item.price && (
                                            <div style={{ fontSize: '0.85rem', textDecoration: 'line-through', color: '#9ca3af' }}>
                                                ₹{item.mrp * (item.quantity || 1)}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                     <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Select Provider (Best Price First)</div>
                                     <ProviderList 
                                        serviceName={item.name} 
                                        currentHospitalId={item.hospitalId} 
                                        onSelect={(newProvider) => {
                                            // Update cart item with new provider details
                                            const updatedItem = {
                                                ...item,
                                                hospitalId: newProvider.hospital_id || newProvider.id,
                                                hospital_name: newProvider.hospital_name,
                                                price: parseFloat(newProvider.discount_price || newProvider.price),
                                                mrp: parseFloat(newProvider.price)
                                            };
                                            // We need a way to update specific item in cart
                                            updateCartWithProvider(idx, updatedItem);
                                        }}
                                     />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Patient Details Section */}
                    <div className="card patient-card" style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', marginBottom: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', color: '#111827' }}>
                             <User size={18} color="#0c831f" /> Patient Details
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 'bold', color: '#374151' }}>Patient Name</label>
                                <input type="text" placeholder="Full Name" value={patientName} onChange={e => setPatientName(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', background: '#f9fafb' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 'bold', color: '#374151' }}>Age</label>
                                    <input type="number" placeholder="Age" value={patientAge} onChange={e => setPatientAge(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', background: '#f9fafb' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 'bold', color: '#374151' }}>Gender</label>
                                    <select value={patientGender} onChange={e => setPatientGender(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', background: '#f9fafb' }}>
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 'bold', color: '#374151' }}>Mobile Number</label>
                                <input type="tel" placeholder="10-digit Mobile Number" value={patientPhone} onChange={e => setPatientPhone(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', background: '#f9fafb' }} />
                            </div>
                        </div>
                    </div>

                    {/* Schedule Section */}
                    <div className="card schedule-card" style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                             <CalendarIcon size={18} color="#0c831f" /> Select Schedule
                        </h3>
                        
                        <div className="schedule-grid">
                            <div className="schedule-field">
                                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500', fontSize: '0.9rem', color: '#374151' }}>Preferred Date</label>
                                <input 
                                    type="date" 
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', background: '#f9fafb' }}
                                />
                            </div>
                            <div className="schedule-field">
                                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500', fontSize: '0.9rem', color: '#374151' }}>Pick a Time Slot</label>
                                 <div className="time-slots-grid">
                                    {[
                                        "09:00 AM", "10:00 AM", "11:00 AM",
                                        "12:00 PM", "04:00 PM", "05:00 PM"
                                    ].map(slot => (
                                        <div 
                                            key={slot}
                                            onClick={() => setSelectedTime(slot)}
                                            style={{ 
                                                padding: '12px 8px', 
                                                textAlign: 'center',
                                                border: selectedTime === slot ? '2px solid #0c831f' : '1px solid #e5e7eb',
                                                background: selectedTime === slot ? '#f0fdf4' : '#fff',
                                                color: selectedTime === slot ? '#0c831f' : '#374151',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {slot}
                                        </div>
                                    ))}
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Bill Summary */}
                <div className="checkout-right">
                    <div className="bill-card" style={{ background: '#fff', borderRadius: '16px', padding: '0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden', position: 'sticky', top: 'calc(var(--header-height) + 2rem)' }}>
                        
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Bill Summary</h3>
                            
                            <div className="bill-row">
                                <span>Item Total (MRP)</span>
                                <span>₹{cartMrpTotal}</span>
                            </div>
                            <div className="bill-row">
                                <span>Taxes & Fees</span>
                                <span>₹50</span>
                            </div>
                            <div className="bill-row discount">
                                <span>Your Savings</span>
                                <span>-₹{cartDiscount}</span>
                            </div>
                            
                            <div className="total-row">
                                <span>To Pay</span>
                                <span>₹{cartTotal + 50}</span>
                            </div>
                        </div>

                        {/* Coupons */}
                        <div className="coupon-section" style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input 
                                    type="text" 
                                    placeholder="Enter Coupon Code" 
                                    style={{ flex: 1, padding: '0.7rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none' }}
                                />
                                <button style={{ color: '#0c831f', fontWeight: 'bold', fontSize: '0.9rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>APPLY</button>
                            </div>
                        </div>

                        {/* Payment Mode */}
                        <div style={{ padding: '1.5rem' }}>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '1.2rem', color: '#374151' }}>Payment Options</h4>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', cursor: 'pointer' }}>
                                    <input 
                                      type="radio" 
                                      name="payment" 
                                      checked={paymentMode === 'hospital'} 
                                      onChange={() => setPaymentMode('hospital')}
                                      style={{ width: '18px', height: '18px', accentColor: '#0c831f' }} 
                                    />
                                    <span style={{ fontWeight: '500' }}>Pay at Hospital / Clinic</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', cursor: 'pointer' }}>
                                    <input 
                                      type="radio" 
                                      name="payment" 
                                      checked={paymentMode === 'online'}
                                      onChange={() => setPaymentMode('online')}
                                      style={{ width: '18px', height: '18px', accentColor: '#0c831f' }} 
                                    />
                                    <span style={{ fontWeight: '500' }}>Pay Online</span>
                                </label>
                            </div>
                        </div>

                        <div className="hide-on-mobile" style={{ padding: '0 1.5rem 1.5rem' }}>
                            {!user && (
                                <div style={{ marginBottom: '1.5rem', background: '#fef2f2', padding: '1rem', borderRadius: '12px', border: '1px solid #fca5a5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                         <AlertCircle size={18} color="#dc2626" />
                                         <span style={{ fontWeight: '600', color: '#991b1b', fontSize: '0.9rem' }}>Login required to checkout</span>
                                     </div>
                                     <button 
                                        onClick={() => setAuthModalOpen(true)}
                                        style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}
                                     >
                                        Login
                                     </button>
                                </div>
                            )}
                            
                            {error && (
                                <div style={{ background: '#fef2f2', color: '#991b1b', padding: '0.8rem 1rem', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.85rem', border: '1px solid #fee2e2' }}>
                                    {error}
                                </div>
                            )}

                            <button 
                                onClick={handleCheckoutCallback}
                                disabled={loading}
                                style={{ 
                                    width: '100%', background: '#0c831f', color: '#fff', border: 'none', 
                                    padding: '1.2rem', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', 
                                    cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, 
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    boxShadow: '0 4px 12px rgba(12, 131, 31, 0.2)'
                                }}
                            >
                                <span>{loading ? 'Processing...' : user ? `Place Order` : 'Login required'}</span>
                                {!loading && user && <span>₹{cartTotal + 50} &gt;</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* Mobile Sticky CTA */}
      {cart.length > 0 && (
          <div className="mobile-cta show-on-mobile">
              <div className="mobile-cta-content container">
                  <div className="cta-price">
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#111827' }}>₹{cartTotal + 50}</div>
                      <div className="view-summary" onClick={() => {
                          const el = document.querySelector('.bill-card');
                          el?.scrollIntoView({ behavior: 'smooth' });
                      }}>View Detailed Bill</div>
                  </div>
                  <button 
                    onClick={handleCheckoutCallback}
                    disabled={loading}
                    className="cta-button"
                  >
                      {loading ? '...' : user ? 'Place Order' : 'Login required'}
                  </button>
              </div>
          </div>
      )}

      {showPayment && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
              <div style={{ background: '#fff', width: '100%', maxWidth: '440px', borderRadius: '24px', padding: '2rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative' }}>
                  <button 
                    onClick={() => setShowPayment(false)} 
                    style={{ position: 'absolute', top: '20px', right: '20px', background: '#f3f4f6', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer' }}
                  >
                        <X size={20} />
                  </button>

                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.5rem', textAlign: 'center' }}>Scan & Pay</h3>
                  
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                            Pay <b>₹{cartTotal + 50}</b> to confirm your home booking.
                        </p>
                        <div style={{ width: '220px', height: '220px', margin: '0 auto', background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '10px' }}>
                             <img src={getImageUrl('/uploads/Qr.jpg')} alt="QR" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=suvidha@okaxis&pn=Suvidha&cu=INR"} />
                        </div>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                       <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>Transaction ID (UTR)</label>
                       <input 
                         type="text" 
                         className="payment-input"
                         placeholder="12-digit transaction ID" 
                         value={transactionId}
                         onChange={(e) => setTransactionId(e.target.value)}
                         style={{ 
                            width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #f3f4f6', 
                            fontSize: '1.1rem', fontWeight: '600', outline: 'none'
                         }}
                       />
                  </div>

                  <button 
                    onClick={finalizeCheckout}
                    disabled={loading || !transactionId}
                    style={{ 
                        width: '100%', padding: '1rem', background: transactionId ? '#0c831f' : '#e5e7eb', 
                        color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem',
                        cursor: transactionId ? 'pointer' : 'not-allowed'
                    }}
                  >
                        {loading ? 'Verifying...' : 'Book Appointment'}
                  </button>
              </div>
          </div>
      )}

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      <style jsx>{`
        .checkout-grid {
            display: grid;
            grid-template-columns: 1fr 380px;
            gap: 2.5rem;
            align-items: start;
        }

        .checkout-left {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        .schedule-grid {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 2rem;
        }

        .time-slots-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
        }

        .bill-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
            color: #4b5563;
            font-size: 0.95rem;
        }

        .bill-row.discount {
            color: #059669;
            font-weight: 500;
        }

        .total-row {
            border-top: 1px dashed #e5e7eb;
            margin-top: 1.2rem;
            padding-top: 1.2rem;
            display: flex;
            justify-content: space-between;
            font-weight: 800;
            font-size: 1.25rem;
            color: #111827;
        }

        .mobile-cta {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #fff;
            padding: 1rem 0;
            box-shadow: 0 -10px 25px rgba(0,0,0,0.06);
            z-index: 100;
            display: none;
        }

        .mobile-cta-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .view-summary {
            font-size: 0.75rem;
            color: #0c831f;
            text-decoration: underline;
            font-weight: 600;
            margin-top: 2px;
        }

        .cta-button {
            background: #0c831f;
            color: #fff;
            border: none;
            padding: 0.9rem 2rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 1rem;
            box-shadow: 0 4px 10px rgba(12, 131, 31, 0.2);
        }

        .show-on-mobile {
            display: none;
        }

        @media (max-width: 1024px) {
            .checkout-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            .checkout-right {
                order: 2;
            }

            .bill-card {
                position: static !important;
            }
        }

        @media (max-width: 768px) {
            .show-on-mobile {
                display: block;
            }
            
            .hide-on-mobile {
                display: none;
            }

            .checkout-page {
                padding-bottom: 120px !important;
            }

            .page-title {
                font-size: 1.5rem !important;
                margin-bottom: 1.5rem !important;
            }

            .schedule-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }

            .time-slots-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .container {
                padding-left: 1.2rem;
                padding-right: 1.2rem;
            }

            .card {
                padding: 1.2rem !important;
            }
        }
      `}</style>
    </main>
  );
}
