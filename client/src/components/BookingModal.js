'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import { X, Calendar, User, MapPin, CheckCircle, Home, Plus, ArrowUpDown, Clock } from 'lucide-react';
import AuthModal from './AuthModal';
import { getApiUrl } from '@/utils/api';

export default function BookingModal({ isOpen, onClose, service }) {
  const { user } = useAuth();
  const { location } = useLocation();
  
  const [step, setStep] = useState(1); // 1: Select Time, 2: Checkout, 3: Success
  const [selectedLab, setSelectedLab] = useState(service);
  const [selectedTime, setSelectedTime] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
     if (isOpen) {
         setStep(1);
         setSelectedTime(null);
     }
  }, [isOpen]);

  if (!isOpen || !service) return null;

  const displayPrice = service.price; 
  const displayMrp = service.price * 1.5; 
  
  const TIME_SLOTS = [
      "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
      "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"
  ];

  const handleBooking = async () => {
        if (!user) { 
            setAuthModalOpen(true);
            return; 
        }
        
        setLoading(true);
        try {
            const bookingData = {
                name: user.name || 'User',
                userPhone: user.phone || '',
                age: 0,
                gender: 'Not Specified',
                date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                time: selectedTime,
                address: location || 'India',
                serviceName: service.name,
                price: displayPrice,
                hospitalId: service.hospitalId || service.id || 1 
            };

            const apiUrl = getApiUrl();
            const res = await fetch(`${apiUrl}/api/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            });

            if (res.ok) {
                setStep(3);
            } else {
                alert('Booking Failed');
            }
        } catch (err) {
            console.error(err);
            alert('Error creating booking');
        } finally {
            setLoading(false);
        }
  };


  return (
    <>
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        width: '100%', maxWidth: '450px', 
        background: '#fff', borderRadius: '20px', overflow: 'hidden',
        maxHeight: '90vh', display: 'flex', flexDirection: 'column'
      }}>
        
        {/* Header */}
        <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {step > 1 && step < 3 && (
                    <button onClick={() => setStep(step - 1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                        &lt;
                    </button>
                )}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {step === 1 && 'Select Time Slot'}
                    {step === 2 && 'Booking Summary'}
                    {step === 3 && 'Success'}
                </h3>
            </div>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                <X size={24} />
            </button>
        </div>

        {/* Content Area */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', background: step === 0 ? '#f9fafb' : '#fff' }}>

            {/* Step 1: Time Slot Selection */}
            {step === 1 && (
                <div>
                    <h4 style={{ marginBottom: '1rem', color: '#374151' }}>Date: Tomorrow, {new Date(Date.now() + 86400000).toDateString()}</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                        {TIME_SLOTS.map(slot => (
                            <button 
                                key={slot}
                                onClick={() => { setSelectedTime(slot); setStep(2); }}
                                style={{
                                    padding: '10px', borderRadius: '8px', border: selectedTime === slot ? '2px solid #ff6f61' : '1px solid #e5e7eb',
                                    background: selectedTime === slot ? '#fff5f4' : '#fff', color: selectedTime === slot ? '#ff6f61' : '#374151',
                                    fontWeight: '500', cursor: 'pointer'
                                }}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 2: Summary */}
            {step === 2 && (
                <>
                    <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '10px' }}>Booking for:</div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '4px' }}>{service.name}</div>
                        <div style={{ fontSize: '0.9rem', color: '#374151' }}>at {selectedLab?.name}</div>
                        <div style={{ marginTop: '10px', display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#6b7280' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14}/> Tomorrow</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14}/> {selectedTime}</div>
                        </div>
                    </div>

                    <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
                        
                        <div style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Bill Summary</h4>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', color: '#4b5563', fontSize: '0.85rem' }}>
                                <span>Item Total (MRP)</span>
                                <span style={{ textDecoration: 'line-through' }}>₹{displayMrp}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', color: '#4b5563', fontSize: '0.85rem' }}>
                                <span>Discounted Price</span>
                                <span>₹{displayPrice}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', color: '#059669', fontSize: '0.85rem', fontWeight: '500' }}>
                                <span>Total Savings</span>
                                <span>-₹{displayMrp - displayPrice}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', color: '#4b5563', fontSize: '0.85rem' }}>
                                <span>Taxes & Fees</span>
                                <span>₹0</span>
                            </div>
                            
                            <div style={{ borderTop: '1px dashed #e5e7eb', marginTop: '0.8rem', paddingTop: '0.8rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1rem', color: '#111827' }}>
                                <span>To Pay</span>
                                <span>₹{displayPrice}</span>
                            </div>
                        </div>

                        <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input 
                                    type="text" 
                                    placeholder="Enter Coupon Code" 
                                    style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', outline: 'none' }}
                                />
                                <button style={{ color: '#ec4899', fontWeight: 'bold', fontSize: '0.8rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>APPLY</button>
                            </div>
                        </div>

                        <div style={{ padding: '1rem' }}>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.8rem', color: '#374151' }}>Payment Options</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                                    <input type="radio" name="modalPayment" defaultChecked style={{ accentColor: '#0c831f' }} />
                                    <span>Pay at Hospital / Clinic</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer', opacity: 0.6 }}>
                                    <input type="radio" name="modalPayment" disabled />
                                    <span>Pay Online (Coming Soon)</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleBooking}
                        disabled={loading}
                        style={{ width: '100%', background: '#ff6f61', color: '#fff', border: 'none', padding: '1rem', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                    >
                        {loading ? 'Processing...' : (user ? `Pay ₹${displayPrice}` : 'Login to Pay')}
                    </button>
                </>
            )}

            {step === 3 && (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <CheckCircle size={64} color="#059669" style={{ margin: '0 auto 1.5rem' }} />
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Booking Confirmed!</h2>
                    <p style={{ color: '#6b7280' }}>Your appointment is successfully scheduled for {selectedTime}, tomorrow.</p>
                </div>
            )}

        </div>
      </div>
    </div>
    <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
