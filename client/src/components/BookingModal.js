'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import { X, Calendar, User, MapPin, CheckCircle, Home, Plus, ArrowUpDown, Clock } from 'lucide-react';
import { DonutChart } from './ui/donut-chart';

export default function BookingModal({ isOpen, onClose, service }) {
  const { user, login } = useAuth();
  const { location } = useLocation();
  const [step, setStep] = useState(0); // 0: Select Lab, 1: Select Time, 2: Checkout, 3: Success
  const [selectedLab, setSelectedLab] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  
  // Labs/Hospitals from API
  const [labs, setLabs] = useState([]);
  
  // Load Labs/Hospitals on mount
  useEffect(() => {
     fetch('http://localhost:5000/api/hospitals')
       .then(res => res.json())
       .then(data => setLabs(data))
       .catch(err => console.error(err));
  }, []);

  if (!isOpen || !service) return null;

  const displayPrice = selectedLab ? Math.round(service.price * (1 - (selectedLab.discount_percentage || 0)/100)) : service.price;
  const displayMrp = service.price * 1.5; // Mock MRP calculation
  
  const priceBreakdown = [
    { value: Math.round(displayPrice * 0.85), color: "#ff6f61", label: "Lab Charges" },
    { value: Math.round(displayPrice * 0.10), color: "#4ECDC4", label: "Platform Fee" },
    { value: Math.round(displayPrice * 0.05), color: "#45B7D1", label: "Taxes" },
  ];

  const TIME_SLOTS = [
      "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
      "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"
  ];



  // Handle Lab Selection
  const handleLabSelect = (lab) => {
      setSelectedLab(lab);
      setStep(1); // Move to time slot selection
  };

  const handleBooking = async () => {
       // Only require login at the final "Pay" step
       if (!user) {
           login();
           return;
       }
       
       try {
           const bookingData = {
               name: user.name || 'User',
               userPhone: user.phone || '',
               age: 0, // Default or prompt
               gender: 'Not Specified', // Default or prompt
               date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
               time: selectedTime,
               address: location || 'New Delhi, India',
               serviceName: service.name,
               price: displayPrice,
               hospitalId: selectedLab.id
           };

           const res = await fetch(`http://localhost:5000/api/bookings`, {
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
       }
  };


  return (
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
                {step > 0 && step < 3 && (
                    <button onClick={() => setStep(step - 1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                        &lt;
                    </button>
                )}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {step === 0 && 'Select a Lab'}
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
            
            {/* Step 0: Lab Selection */}
            {step === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {labs.map(lab => (
                        <div key={lab.id} onClick={() => handleLabSelect(lab)} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.2rem', cursor: 'pointer' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{lab.name}</div>
                            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '8px' }}>{lab.location}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#ff6f61', fontWeight: 'bold' }}>
                                    ₹{Math.round(service.price * (1 - (lab.discount_percentage || 0)/100))}
                                </span>
                                {lab.discount_percentage > 0 && (
                                    <span style={{ fontSize: '0.8rem', color: '#059669' }}>{lab.discount_percentage}% off</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

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

                    <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h4 style={{ marginBottom: '1rem', width: '100%' }}>Bill Summary</h4>
                        
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', width: '100%', padding: '1rem', background: '#f9fafb', borderRadius: '12px', marginBottom: '1rem' }}>
                            <DonutChart 
                                data={priceBreakdown} 
                                size={120} 
                                strokeWidth={15}
                                centerContent={
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Total</div>
                                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>₹{displayPrice}</div>
                                    </div>
                                }
                            />
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {priceBreakdown.map(item => (
                                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}></span>
                                            {item.label}
                                        </span>
                                        <span style={{ fontWeight: '500' }}>₹{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                                <span>Item Total (MRP)</span>
                                <span style={{ textDecoration: 'line-through', color: '#9ca3af' }}>₹{displayMrp}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px', color: '#059669', fontWeight: '500' }}>
                                <span>Discount</span>
                                <span>-₹{displayMrp - displayPrice}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                                <span>To be paid</span>
                                <span>₹{displayPrice}</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleBooking}
                        style={{ width: '100%', background: '#ff6f61', color: '#fff', border: 'none', padding: '1rem', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                    >
                        {user ? `Pay ₹${displayPrice}` : 'Login to Pay'}
                    </button>
                </>
            )}

            {/* Step 3: Success */}
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
  );
}
