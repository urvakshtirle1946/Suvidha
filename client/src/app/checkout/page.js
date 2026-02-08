'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, AlertCircle, Calendar as CalendarIcon, Clock } from 'lucide-react';
import Link from 'next/link';
import { getApiUrl } from '@/utils/api';

export default function Checkout() {
  const { cart, clearCart, cartTotal } = useCart();
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

  const handleCheckoutCallback = async () => {
    if (!user) {
        setAuthModalOpen(true);
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
                    fetch(`${getApiUrl()}/api/bookings`, {
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
                                <span>Item Total</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="bill-row">
                                <span>Taxes & Fees</span>
                                <span>₹50</span>
                            </div>
                            <div className="bill-row discount">
                                <span>Discount</span>
                                <span>-₹0</span>
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
                                    <input type="radio" name="payment" defaultChecked style={{ width: '18px', height: '18px', accentColor: '#0c831f' }} />
                                    <span style={{ fontWeight: '500' }}>Pay at Hospital / Clinic</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', cursor: 'pointer', opacity: 0.5 }}>
                                    <input type="radio" name="payment" disabled style={{ width: '18px', height: '18px' }} />
                                    <span style={{ fontWeight: '500' }}>Pay Online (Coming Soon)</span>
                                </label>
                            </div>
                        </div>

                        <div className="hide-on-mobile" style={{ padding: '0 1.5rem 1.5rem' }}>
                            {!user && (
                                <div style={{ background: '#fef2f2', color: '#991b1b', padding: '0.8rem 1rem', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #fee2e2' }}>
                                    <AlertCircle size={18} /> Login required to place order
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
                                <span>{loading ? 'Processing...' : user ? `Place Order` : 'Login to Continue'}</span>
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
                      {loading ? '...' : user ? 'Place Order' : 'Login'}
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
