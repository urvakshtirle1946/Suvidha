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

  const handleCheckout = async () => {
    if (!user) {
        login();
        return;
    }

    setLoading(true);
    setError(null);

    try {
        // Create an array of booking promises
        const bookingPromises = cart.flatMap(item => {
            // Repeat for quantity
            const quantity = item.quantity || 1;
            const requests = [];
            for (let i = 0; i < quantity; i++) {
                const bookingData = {
                    name: user.name || 'User',
                    userPhone: user.phone || '', // Needs to be handled if empty
                    age: 0, 
                    gender: 'Not Specified',
                    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
                    time: "10:00 AM", // Default time for bulk order
                    address: location || 'New Delhi, India',
                    serviceName: item.name,
                    price: item.price,
                    hospitalId: item.hospitalId || 1 // Fallback
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
                {/* Left: Items */}
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

                {/* Right: Summary */}
                <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Bill Details</h3>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: '#4b5563' }}>
                        <span>Item Total</span>
                        <span>₹{cartTotal}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: '#4b5563' }}>
                        <span>Taxes & Fees</span>
                        <span>₹50</span>
                    </div>
                    
                    <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '2rem' }}>
                        <span>To Pay</span>
                        <span>₹{cartTotal + 50}</span>
                    </div>

                    {!user && (
                        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <AlertCircle size={16} /> Please login to complete order
                        </div>
                    )}
                    
                    {error && (
                        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}

                    <button 
                        onClick={handleCheckout}
                        disabled={loading}
                        style={{ width: '100%', background: '#0c831f', color: '#fff', border: 'none', padding: '1rem', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Processing...' : user ? 'Place Order' : 'Login to Continue'}
                    </button>
                </div>
            </div>
        )}
      </div>
    </main>
  );
}
