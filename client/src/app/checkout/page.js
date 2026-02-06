'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Checkout() {
  const { cart, clearCart, cartTotal } = useCart();
  const { user, login } = useAuth();
  const { location } = useLocation();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  // Schedule State
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleCheckoutCallback = async () => {
    if (!user) {
        login();
        return;
    }

    if (!selectedDate || !selectedTime) {
        setError("Please select a date and time slot for your appointment.");
        return;
    }

    setLoading(true);
    setError(null);

    // Simulate Payment Delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
        // Create an array of booking promises
        const bookingPromises = cart.flatMap(item => {
            // Repeat for quantity
            const quantity = item.quantity || 1;
            const requests = [];
            for (let i = 0; i < quantity; i++) {
                const bookingData = {
                    name: user.name || 'User',
                    userPhone: user.phone || '', 
                    age: 0, 
                    gender: 'Not Specified',
                    date: selectedDate,
                    time: selectedTime,
                    address: location || 'New Delhi, India',
                    serviceName: item.name,
                    price: item.price,
                    hospitalId: item.hospitalId || 1 
                };

                requests.push(
                    fetch(`https://suvidha-server-4u66.onrender.com/api/bookings`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(bookingData)
                    })
                );
            }
            return requests;
        });

        await Promise.all(bookingPromises);
        
        setSuccess(true);
        clearCart();
        setTimeout(() => {
            router.push('/bookings');
        }, 3000);

    } catch (err) {
        console.error(err);
        setError("Failed to process some items. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  if (success) {
      return (
        <main style={{ minHeight: '100vh', background: '#f4f6fb' }}>
            <Navbar />
            <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 4rem)', textAlign: 'center' }}>
                <CheckCircle size={64} color="#059669" style={{ margin: '0 auto 1.5rem' }} />
                <h1 style={{ marginBottom: '1rem' }}>Order Placed Successfully!</h1>
                <p>Redirecting you to your bookings...</p>
            </div>
        </main>
      );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f4f6fb', paddingBottom: '3rem' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', color: '#6b7280', textDecoration: 'none' }}>
            <ArrowLeft size={18} /> Continue Shopping
        </Link>
        
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>Checkout</h1>

        {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
                <h2>Your cart is empty</h2>
                <Link href="/hospitals" style={{ color: '#0c831f', textDecoration: 'underline' }}>Browse Services</Link>
            </div>
        ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                {/* Left: Items & Schedule */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Items List */}
                    <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '1rem' }}>Order Items ({cart.length})</h3>
                        {cart.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px dashed #f3f4f6', paddingBottom: '1rem' }}>
                                <div>
                                    <div style={{ fontWeight: '600', color: '#1f2937' }}>{item.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Qty: {item.quantity || 1}</div>
                                </div>
                                <div style={{ fontWeight: 'bold' }}>₹{item.price * (item.quantity || 1)}</div>
                            </div>
                        ))}
                    </div>

                    {/* Schedule Section */}
                    <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                             Select Schedule
                        </h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Date</label>
                                <input 
                                    type="date" 
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Time Slot</label>
                                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                    {[
                                        "09:00 AM", "10:00 AM", "11:00 AM",
                                        "12:00 PM", "04:00 PM", "05:00 PM"
                                    ].map(slot => (
                                        <div 
                                            key={slot}
                                            onClick={() => setSelectedTime(slot)}
                                            style={{ 
                                                padding: '10px', 
                                                textAlign: 'center',
                                                border: selectedTime === slot ? '2px solid #0c831f' : '1px solid #e5e7eb',
                                                background: selectedTime === slot ? '#f0fdf4' : '#fff',
                                                color: selectedTime === slot ? '#0c831f' : '#374151',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                fontWeight: '500'
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

                {/* Right: Bill Summary (Zepto Style) */}
                <div style={{ background: '#fff', borderRadius: '12px', padding: '0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', height: 'fit-content', overflow: 'hidden' }}>
                    
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Bill Summary</h3>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: '#4b5563', fontSize: '0.9rem' }}>
                            <span>Item Total</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: '#4b5563', fontSize: '0.9rem' }}>
                            <span>Taxes & Fees</span>
                            <span>₹50</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#059669', fontSize: '0.9rem', fontWeight: '500' }}>
                            <span>Discount</span>
                            <span>-₹0</span>
                        </div>
                        
                        <div style={{ borderTop: '1px dashed #e5e7eb', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem', color: '#111827' }}>
                            <span>To Pay</span>
                            <span>₹{cartTotal + 50}</span>
                        </div>
                    </div>

                    {/* Coupons */}
                    <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input 
                                type="text" 
                                placeholder="Enter Coupon Code" 
                                style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none' }}
                            />
                            <button style={{ color: '#ec4899', fontWeight: 'bold', fontSize: '0.9rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>APPLY</button>
                        </div>
                    </div>

                    {/* Payment Mode */}
                    <div style={{ padding: '1.5rem' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>Payment Options</h4>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                                <input type="radio" name="payment" defaultChecked style={{ accentColor: '#0c831f' }} />
                                <span>Pay at Hospital / Clinic</span>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer', opacity: 0.6 }}>
                                <input type="radio" name="payment" disabled />
                                <span>Pay Online (Coming Soon)</span>
                            </label>
                        </div>
                    </div>

                    <div style={{ padding: '0 1.5rem 1.5rem' }}>
                        {!user && (
                            <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <AlertCircle size={16} /> Login required
                            </div>
                        )}
                        
                        {error && (
                            <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                {error}
                            </div>
                        )}

                        <button 
                            onClick={handleCheckoutCallback}
                            disabled={loading}
                            style={{ width: '100%', background: '#0c831f', color: '#fff', border: 'none', padding: '1rem', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <span>{loading ? 'Processing...' : user ? `Place Order` : 'Login to Continue'}</span>
                            {!loading && user && <span>₹{cartTotal + 50} &gt;</span>}
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </main>
  );
}
