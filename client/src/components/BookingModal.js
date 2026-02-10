'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import { X, Calendar, User, MapPin, CheckCircle, Home, Plus, ArrowUpDown, Clock } from 'lucide-react';
import AuthModal from './AuthModal';
import { getApiUrl, getImageUrl } from '@/utils/api';

export default function BookingModal({ isOpen, onClose, service }) {
  const { user } = useAuth();
  const { location } = useLocation();
  
  const [step, setStep] = useState(1); // 1: Selection, 2: Payment, 3: Success
  const [selectedLab, setSelectedLab] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  /* Removed showCompletionDialog state and logic */

  const finalizeBooking = async (paymentMethod = 'online') => {
        const currentTxnId = paymentMethod === 'hospital' ? 'PAY_AT_HOSPITAL' : transactionId;

        if (paymentMethod !== 'hospital' && (!currentTxnId || currentTxnId.length < 6)) {
            alert('Please enter a valid Transaction ID');
            return;
        }

        setLoading(true);
        try {
            const bookingData = {
                name: user.name || 'User',
                userPhone: user.phone || '',
                age: 0, // Should be collected in form ideally
                gender: 'Not Specified',
                date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
                time: selectedTime,
                address: location || 'India',
                serviceName: currentService.name,
                price: displayPrice,
                hospitalId: currentService.hospital_id || currentService.id,
                transactionId: currentTxnId
            };

            const apiUrl = getApiUrl();
            const res = await fetch(`${apiUrl}/api/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            });

            if (res.ok) {
                setStep(3); // Success
            } else {
                alert('Booking Failed: ' + (await res.text() || 'Unknown Error'));
            }
        } catch (err) {
            console.error(err);
            alert('Error creating booking');
        } finally {
            setLoading(false);
        }
  };

  const handlePayOnline = () => {
        if (!user) { 
            setAuthModalOpen(true);
            return; 
        }
        if (!selectedLab || !selectedTime) return;
        setPaymentMode('online');
        setStep(2); // Move to payment
  };

  const handlePayAtHospital = () => {
        if (!user) { 
            setAuthModalOpen(true);
            return; 
        }
        if (!selectedLab || !selectedTime) return;
        setPaymentMode('hospital');
        // Directly book without payment step
        finalizeBooking('hospital');
  };

  /* Removed confirmCompletion function */


  return (
    <>
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        width: '95%', maxWidth: '480px', 
        background: '#fff', borderRadius: '24px', overflow: 'hidden',
        maxHeight: '92vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative'
      }}>
        
        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827' }}>
                {step === 1 ? 'Schedule Appointment' : step === 2 ? 'Complete Payment' : 'Success'}
            </h3>
            <button onClick={onClose} style={{ background: '#f3f4f6', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer', color: '#6b7280', display: 'flex' }}>
                <X size={20} />
            </button>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>

            {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Date Picker (Static for now) */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                             <Calendar size={18} color="#ff6f61" />
                             <span style={{ fontWeight: '700', color: '#374151' }}>Date & Time</span>
                        </div>
                        <div style={{ background: '#f9fafb', padding: '10px 15px', borderRadius: '12px', marginBottom: '1rem', border: '1px solid #f3f4f6', fontSize: '0.9rem', color: '#4b5563' }}>
                             Tomorrow, {new Date(Date.now() + 86400000).toDateString()}
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '8px' }}>
                            {TIME_SLOTS.map(slot => (
                                <button 
                                    key={slot}
                                    onClick={() => setSelectedTime(slot)}
                                    style={{
                                        padding: '10px 5px', borderRadius: '10px', 
                                        border: selectedTime === slot ? '2px solid #ff6f61' : '1px solid #e5e7eb',
                                        background: selectedTime === slot ? '#fff5f4' : '#fff', 
                                        color: selectedTime === slot ? '#ff6f61' : '#4b5563',
                                        fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Hospital Selection */}
                    {!service.directBooking ? (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                 <Home size={18} color="#ff6f61" />
                                 <span style={{ fontWeight: '700', color: '#374151' }}>Select Hospital (Sorted by Discount)</span>
                            </div>

                            {fetchingLabs ? (
                                <div style={{ textAlign: 'center', padding: '1.5rem', color: '#9ca3af' }}>Finding best deals...</div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {labs.map(lab => {
                                        const isSelected = selectedLab?.id === lab.id || selectedLab?.hospital_id === lab.hospital_id;
                                        const discountPercent = Math.round(((lab.price - lab.discount_price) / lab.price) * 100);
                                        
                                        return (
                                            <div 
                                                key={lab.id} 
                                                onClick={() => setSelectedLab(lab)}
                                                style={{ 
                                                    padding: '1rem', borderRadius: '16px', border: isSelected ? '2px solid #ff6f61' : '1px solid #f3f4f6',
                                                    background: isSelected ? '#fff5f4' : '#fff', cursor: 'pointer',
                                                    display: 'flex', gap: '12px', alignItems: 'center',
                                                    boxShadow: isSelected ? '0 10px 15px -3px rgba(255, 111, 97, 0.1)' : 'none',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <div style={{ width: '50px', height: '50px', borderRadius: '10px', overflow: 'hidden', background: '#f3f4f6', flexShrink: 0 }}>
                                                     <img 
                                                        src={getImageUrl(lab.hospital_image || lab.image_url) || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=100&q=80"} 
                                                        alt={lab.hospital_name}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        onError={(e) => e.target.src = "https://images.unsplash.com/photo-1586773860418-d3b97898c75c?auto=format&fit=crop&w=100&q=80"}
                                                     />
                                                </div>

                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#111827', marginBottom: '2px' }}>{lab.hospital_name}</div>
                                                    <div style={{ fontSize: '0.8rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <MapPin size={12} /> {lab.hospital_location}
                                                    </div>
                                                    {discountPercent > 0 && (
                                                        <div style={{ marginTop: '6px', width: 'fit-content', background: '#dcfce7', color: '#166534', px: '8px', py: '2px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', padding: '2px 8px' }}>
                                                            {discountPercent}% OFF
                                                        </div>
                                                    )}
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: isSelected ? '#ff6f61' : '#111827' }}>₹{lab.discount_price || lab.price}</div>
                                                    {lab.discount_price < lab.price && (
                                                        <div style={{ fontSize: '0.85rem', textDecoration: 'line-through', color: '#9ca3af' }}>₹{lab.price}</div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={{ 
                            background: '#f0fdf4', border: '1px solid #bcf0da', 
                            padding: '1.2rem', borderRadius: '16px', display: 'flex', gap: '12px', alignItems: 'center' 
                        }}>
                             <div style={{ width: '48px', height: '48px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Home size={24} color="#059669" />
                             </div>
                             <div>
                                <div style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Selected Hospital</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#064e3b' }}>{service.hospital_name}</div>
                             </div>
                        </div>
                    )}

                    {/* Bill Summary - Sticky/Fixed at bottom of scroll */}
                    {selectedLab && (
                        <div style={{ marginTop: '1rem', background: '#f8fafc', borderRadius: '16px', padding: '1rem', border: '1px solid #e2e8f0' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px', color: '#64748b' }}>
                                 <span>Service Cost</span>
                                 <span style={{ textDecoration: 'line-through' }}>₹{displayMrp}</span>
                             </div>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '10px', color: '#059669', fontWeight: '600' }}>
                                 <span>suvidha discount</span>
                                 <span>-₹{displayMrp - displayPrice}</span>
                             </div>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(0.9rem, 4vw, 1.1rem)', fontWeight: '800', borderTop: '1px dashed #cbd5e1', paddingTop: '10px', color: '#1e293b' }}>
                                 <span>Total to Pay</span>
                                 <span>₹{displayPrice}</span>
                             </div>
                        </div>
                    )}
                </div>
            )}

            {step === 2 && (
                <div style={{ padding: '1rem 0' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                            Scan QR with any UPI app to pay <b>₹{displayPrice}</b>
                        </p>
                        
                        <div style={{ 
                            width: 'clamp(180px, 60vw, 240px)', height: 'clamp(180px, 60vw, 240px)', margin: '0 auto', 
                            padding: '12px', background: '#fff', border: '2px solid #f3f4f6', 
                            borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                        }}>
                             {/* Placeholder for QR Code - User should place the actual image here */}
                             <img 
                                src={getImageUrl('/uploads/Qr.jpg')} 
                                alt="Payment QR" 
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                onError={(e) => {
                                    e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=suvidha@okaxis&pn=Suvidha&cu=INR";
                                }}
                             />
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                         <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
                            UTR / Transaction ID
                         </label>
                         <input 
                            type="text"
                            placeholder="Enter 12-digit transaction ID"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            style={{ 
                                width: '100%', padding: '1rem', borderRadius: '12px', 
                                border: '2px solid #f3f4f6', fontSize: '1rem', fontWeight: '600',
                                outline: 'none', transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#ff6f61'}
                            onBlur={(e) => e.target.style.borderColor = '#f3f4f6'}
                         />
                         <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '8px', lineHeight: '1.4' }}>
                            Enter the transaction ID after successful payment to confirm your booking.
                         </p>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ width: '80px', height: '80px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <CheckCircle size={48} color="#059669" />
                    </div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1rem', color: '#111827' }}>Confirmed!</h2>
                    <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '1rem' }}>
                        Your appointment at <b>{selectedLab?.hospital_name}</b> is scheduled for {selectedTime}, tomorrow.
                    </p>
                    <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#9ca3af' }}>
                        Transaction ID: {transactionId}
                    </p>
                    <button 
                        onClick={onClose}
                        style={{ marginTop: '2.5rem', width: '100%', background: '#111827', color: '#fff', border: 'none', padding: '1rem', borderRadius: '14px', fontWeight: '700', cursor: 'pointer' }}
                    >
                        DONE
                    </button>
                </div>
            )}

        </div>

        {/* Footer Action */}
        {step < 3 && !showCompletionDialog && (
            <div style={{ padding: '1.5rem', borderTop: '1px solid #f3f4f6', background: '#fff' }}>
                {step === 1 ? (
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button 
                            onClick={handlePayAtHospital}
                            disabled={loading || !selectedTime || !selectedLab}
                            style={{ 
                                flex: 1,
                                background: '#fff',
                                color: (selectedTime && selectedLab) ? '#ff6f61' : '#e5e7eb', 
                                border: `2px solid ${(selectedTime && selectedLab) ? '#ff6f61' : '#e5e7eb'}`, 
                                padding: '1rem', 
                                borderRadius: '16px', 
                                fontWeight: '800', 
                                fontSize: '1rem', 
                                cursor: (selectedTime && selectedLab) ? 'pointer' : 'not-allowed',
                                transition: 'all 0.3s'
                            }}
                        >
                            Pay at Hospital
                        </button>
                        <button 
                            onClick={handlePayOnline}
                            disabled={loading || !selectedTime || !selectedLab}
                            style={{ 
                                flex: 1,
                                background: (selectedTime && selectedLab) ? '#ff6f61' : '#e5e7eb', 
                                color: '#fff', 
                                border: 'none', 
                                padding: '1rem 0.5rem', 
                                borderRadius: '16px', 
                                fontWeight: '800', 
                                fontSize: 'clamp(0.8rem, 3.5vw, 1rem)', 
                                cursor: (selectedTime && selectedLab) ? 'pointer' : 'not-allowed',
                                boxShadow: (selectedTime && selectedLab) ? '0 10px 15px -3px rgba(255, 111, 97, 0.3)' : 'none',
                                transition: 'all 0.3s'
                            }}
                        >
                            Pay Online
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={finalizeBooking}
                        disabled={loading || !transactionId}
                        style={{ 
                            width: '100%', 
                            background: transactionId ? '#ff6f61' : '#e5e7eb', 
                            color: '#fff', 
                            border: 'none', 
                            padding: '1rem', 
                            borderRadius: '16px', 
                            fontWeight: '800', 
                            fontSize: '1.1rem', 
                            cursor: transactionId ? 'pointer' : 'not-allowed',
                            boxShadow: transactionId ? '0 10px 15px -3px rgba(255, 111, 97, 0.3)' : 'none',
                            transition: 'all 0.3s'
                        }}
                    >
                        {loading ? 'Processing...' : 'Confirm Payment & Book'}
                    </button>
                )}
                
                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af', marginTop: '12px' }}>
                    {step === 1 ? 'Select payment method to proceed' : 'Step 2 of 2 • Secure payment verification'}
                </p>
            </div>
        )}

        {/* Completion Check Overlay */}
        {showCompletionDialog && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.98)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
                <div style={{ background: '#fff5f4', p: '2rem', borderRadius: '24px', border: '1px solid #ffd1cd' }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem', color: '#111827' }}>Confirmation</h4>
                    <p style={{ color: '#4b5563', marginBottom: '2rem', lineHeight: '1.5' }}>
                        Is your service that you booked completed?
                    </p>
                    <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                        <button 
                            onClick={() => confirmCompletion(false)}
                            style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', border: '1px solid #e5e7eb', background: '#fff', fontWeight: '700', cursor: 'pointer' }}
                        >
                            No
                        </button>
                        <button 
                            onClick={() => confirmCompletion(true)}
                            style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', border: 'none', background: '#ff6f61', color: '#fff', fontWeight: '700', cursor: 'pointer' }}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
    <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
