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
import Script from 'next/script';
import { DeliveryScheduler } from '@/components/ui/delivery-scheduler';
import { AnimatedTicket } from '@/components/ui/ticket-confirmation-card';
import { PROVIDER_SORT_OPTIONS, getProviderRating, sortProviders } from '@/utils/providerRanking';

function loadRazorpay() {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

function ProviderList({ serviceName, currentHospitalId, onSelect }) {
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('recommended');

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const cleanName = (serviceName || '').split(' at ')[0];
                const res = await apiFetch(`/api/services?search=${encodeURIComponent(cleanName)}`);
                if (res.ok) {
                    const data = await res.json();
                    const list = Array.isArray(data) ? data : (data.data || []);
                    
                    const uniqueProviders = [];
                    const seenHospitals = new Set();
                    
                    const sortedForDeduplication = sortProviders(list, 'highest_rated');
                    
                    for (const item of sortedForDeduplication) {
                        const hId = item.hospital_id || item.id;
                        if (!seenHospitals.has(hId)) {
                            uniqueProviders.push(item);
                            seenHospitals.add(hId);
                        }
                    }

                    setLabs(uniqueProviders);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProviders();
    }, [serviceName]);

    const sortedLabs = sortProviders(labs, sortBy);

    if (loading) return <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Finding providers...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                style={{ alignSelf: 'flex-start', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '999px', padding: '7px 12px', fontSize: '0.8rem', color: '#475569', outline: 'none' }}
            >
                {PROVIDER_SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {sortedLabs.map((lab, index) => {
                const isSelected = (lab.hospital_id || lab.id) === currentHospitalId;
                const discountPercent = (lab.price && lab.discount_price && lab.price > lab.discount_price) 
                    ? Math.round(((lab.price - lab.discount_price) / lab.price) * 100) 
                    : 0;
                
                // Calculate the exact final price based on the rounded discount percentage
                const finalPrice = discountPercent > 0 
                    ? Math.round(lab.price - (lab.price * discountPercent / 100)) 
                    : (lab.discount_price || lab.price);

                const isRecommended = sortBy === 'recommended' && index === 0;
                
                return (
                    <div 
                        key={lab.id} 
                        onClick={() => onSelect({...lab, discount_price: finalPrice})}
                        style={{ 
                            position: 'relative',
                            padding: '16px', 
                            border: isSelected ? '2px solid #000' : '1px solid #e2e8f0',
                            borderRadius: '16px', 
                            background: isSelected ? '#f9fafb' : '#fff', 
                            cursor: 'pointer',
                            display: 'flex', 
                            gap: '14px', 
                            alignItems: 'center',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: isSelected ? '0 4px 14px rgba(0, 0, 0, 0.08)' : '0 2px 4px rgba(0,0,0,0.02)',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={e => { if(!isSelected) e.currentTarget.style.borderColor = '#94a3b8'; }}
                        onMouseLeave={e => { if(!isSelected) e.currentTarget.style.borderColor = '#e2e8f0'; }}
                    >
                        {isRecommended && (
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#000' }}></div>
                        )}
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', overflow: 'hidden', background: '#f3f4f6', flexShrink: 0, border: '1px solid #e5e7eb' }}>
                             <img 
                                src={getImageUrl(lab.hospital_image || lab.image_url) || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=100&q=80"} 
                                alt={lab.hospital_name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => e.target.src = "https://images.unsplash.com/photo-1586773860418-d3b97898c75c?auto=format&fit=crop&w=100&q=80"}
                             />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: isSelected ? '#000' : '#1e293b' }}>{lab.hospital_name}</div>
                                {isRecommended && (
                                    <span style={{ fontSize: '0.65rem', background: '#e5e7eb', color: '#000', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recommended</span>
                                )}
                            </div>
                            {getProviderRating(lab) > 0 && (
                                <div style={{ fontSize: '0.75rem', color: '#92400e', marginBottom: '4px' }}>Rated {getProviderRating(lab).toFixed(1)}</div>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontWeight: '800', fontSize: '1.05rem', color: '#0f172a' }}>₹{finalPrice}</span>
                                {discountPercent > 0 && (
                                    <>
                                        <span style={{ fontSize: '0.8rem', textDecoration: 'line-through', color: '#94a3b8' }}>₹{lab.price}</span>

                                    </>
                                )}
                            </div>
                        </div>
                        <div style={{ 
                            width: '22px', height: '22px', borderRadius: '50%', 
                            border: isSelected ? '6px solid #000' : '2px solid #cbd5e1', 
                            background: '#fff',
                            transition: 'all 0.2s',
                            flexShrink: 0
                        }}></div>
                    </div>
                );
            })}
        </div>
    );
}

export default function Checkout() {
  const { cart, clearCart, cartTotal, cartMrpTotal, cartDiscount, updateCartItem, removeFromCart } = useCart();
  const { user } = useAuth();
  const { location } = useLocation();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  
  // Schedule State (defaulting to today and walk-in since date/time selection is removed)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('Flexible (Walk-in)');
  const [isCalendarModalOpen, setCalendarModalOpen] = useState(false);
  const [paymentMode, setPaymentMode] = useState('online');
  const [bookingIds, setBookingIds] = useState([]);
  const [ticketData, setTicketData] = useState(null);
  const [checkoutItems, setCheckoutItems] = useState([]); // State to cache checkout items for Razorpay orders

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = () => {
      setCouponError('');
      if (!couponCode) return;
      if (couponCode.toLowerCase() === 'zelp10') {
          setAppliedCoupon({ code: 'ZELP10', discount: 10 });
          setCouponCode('');
      } else {
          setCouponError('Invalid coupon code');
      }
  };

  const handleRemoveCoupon = () => {
      setAppliedCoupon(null);
  };

  const finalCartTotal = cartTotal - (appliedCoupon ? appliedCoupon.discount : 0);
  const totalSavings = cartDiscount + (appliedCoupon ? appliedCoupon.discount : 0);

  const updateCartWithProvider = (index, newItem) => {
    updateCartItem(index, newItem);
  };

  const handleCheckoutCallback = async () => {
    if (!user) {
        setError('Please login to continue with your order.');
        setAuthModalMode('login');
        setAuthModalOpen(true);
        return;
    }

    const userPhoneDigits = String(user?.phone || '').replace(/\D/g, '');
    if (!user?.phone || userPhoneDigits.length < 10 || userPhoneDigits.length > 15) {
        setError('A valid mobile number is required in your profile to book services. Please complete your profile.');
        setAuthModalMode('complete-profile');
        setAuthModalOpen(true);
        return;
    }

    // Date and time selection removed from UI, defaulted in state.

    // Check if every item has a provider
    const missingProvider = cart.find(item => !item.hospitalId);
    if (missingProvider) {
        setError(`Please select a hospital provider for ${missingProvider.name}`);
        return;
    }

    setCheckoutItems([...cart]); // Cache current cart items for payment reference
    processRazorpayPayment();
  };

  const processRazorpayPayment = async () => {
      setLoading(true);
      setError(null);

      const resLoad = await loadRazorpay();
      if (!resLoad) {
          setError('Razorpay SDK failed to load. Are you online?');
          setLoading(false);
          return;
      }

      try {
          const itemsToProcess = checkoutItems.length > 0 ? checkoutItems : cart;
          const itemsTotal = itemsToProcess.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
          const amountToPay = itemsTotal + 50; // Total + Taxes
          
          // Get order from backend
          const orderRes = await apiFetch('/api/bookings/razorpay-order', {
              method: 'POST',
              body: JSON.stringify({
                  items: itemsToProcess.map(item => ({
                      serviceId: item.serviceId || item.id,
                      quantity: item.quantity || 1
                  }))
              })
          });
          
          if (!orderRes.ok) {
               const errorPayload = await orderRes.json().catch(() => null);
               if (orderRes.status === 401) {
                  setError('Session expired. Please login again to continue payment.');
                  setAuthModalOpen(true);
                  setLoading(false);
                  return;
               }
               const errorMessage = errorPayload?.message || errorPayload?.error || 'Could not initiate payment. Server error.';
               setError(errorMessage);
               setLoading(false);
               return;
          }

          const { order, keyId } = await orderRes.json();
          console.log('Razorpay Order:', order);
          console.log('Using Key:', keyId);
          
          const options = {
              key: keyId, // Force use the exact key backend used
              amount: order.amount,
              currency: order.currency,
              name: 'Zelp',
              image: getImageUrl('/logo.png'),
              description: 'Booking Payment',
              order_id: order.id,
              handler: async function (response) {
                  // Finalize checkout with the razorpay payment id
                  await finalizeCheckout(response.razorpay_payment_id, response);
              },
              prefill: {
                  name: user?.name || 'Customer',
                  email: user?.email || 'test@suvidha.com',
                  contact: '9999999999' // Razorpay API sometimes fails 400 if contact is entirely missing or invalid format in Test Mode
              },
              theme: {
                  color: '#000'
              },
              modal: {
                  ondismiss: function () {
                      setLoading(false);
                  }
              }
          };

          const paymentObject = new window.Razorpay(options);
          
          paymentObject.on('payment.failed', function (response){
              setError('Payment Failed. Reason: ' + response.error.description);
              setLoading(false);
          });
          
          paymentObject.open();

      } catch (err) {
          console.error(err);
          setError('Failed to initiate Razorpay payment');
          setLoading(false);
      }
  };

  const finalizeCheckout = async (currentTxnId, razorpayResponse = null) => {
    const isHospitalPay = paymentMode === 'hospital';

    setLoading(true);
    setError(null);

    try {
        if (bookingIds.length > 0 && paymentMode === 'online') {
            // Flow when user creates booking (hospital mode) then clicks 'Pay Online Now'
            
            // 1) Verify the payment on the backend first
            if (razorpayResponse) {
                const verifyRes = await apiFetch(`/api/bookings/verify-payment`, {
                    method: 'POST',
                    body: JSON.stringify({
                        razorpay_order_id: razorpayResponse.razorpay_order_id,
                        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                        razorpay_signature: razorpayResponse.razorpay_signature,
                        bookingIds
                    })
                });

                if (!verifyRes.ok) {
                     setError("Payment verification failed.");
                     setLoading(false);
                     return;
                }
            } else {
                 // For safety or fallback (should rarely happen in razorpay online mode since we need signature)
                 const updatePromises = bookingIds.map((id) =>
                    apiFetch(`/api/bookings/${id}/pay`, {
                        method: 'PATCH',
                        body: JSON.stringify({ transactionId: currentTxnId })
                    })
                 );
                 await Promise.all(updatePromises);
            }

            setSuccess(true);
            setTicketData({
                ticketId: razorpayResponse?.razorpay_payment_id || ('TXN-' + Math.floor(Math.random()*1000000)),
                amount: finalCartTotal + 50,
                date: new Date(),
                cardHolder: user?.name || 'Customer',
                last4Digits: 'XX01',
                barcodeValue: razorpayResponse?.razorpay_payment_id || '9876543210'
            });
            setTimeout(() => {
                router.push('/bookings');
            }, 6500);
        } else {
            // Simulate Payment Delay for new bookings
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Create bookings concurrently per cart item
            const itemResults = await Promise.all(
                cart.map(async (item) => {
                    const quantity = item.quantity || 1;
                    const bookingRequests = [];
                    for (let i = 0; i < quantity; i++) {
                        const bookingData = {
                            name: user?.name || 'Unknown',
                            userPhone: 'Unknown',
                            userEmail: user?.email,
                            age: 0, 
                            gender: 'Not Specified',
                            date: selectedDate instanceof Date 
                                ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
                                : selectedDate,
                            time: selectedTime,
                            address: location || 'New Delhi, India',
                            serviceId: item.serviceId || item.id,
                            transactionId: currentTxnId,
                            original_price: item.mrp || item.price,
                            coupon_code: appliedCoupon ? appliedCoupon.code : null,
                            coupon_discount: appliedCoupon ? (appliedCoupon.discount / cart.length) : 0,
                            payment_mode: currentTxnId === 'PAY_AT_HOSPITAL' ? 'Pay at Hospital' : 'Online'
                        };
                        bookingRequests.push(
                            apiFetch(`/api/bookings`, {
                                method: 'POST',
                                body: JSON.stringify(bookingData)
                            }).then(async (res) => {
                                if (res.ok) {
                                    const data = await res.json();
                                    return { success: true, bookingId: data.bookingId };
                                } else {
                                    const payload = await res.json().catch(() => null);
                                    return { success: false, error: payload?.message || 'Slot unavailable' };
                                }
                            }).catch((err) => {
                                return { success: false, error: err.message || 'Network error' };
                            })
                        );
                    }
                    
                    const resps = await Promise.all(bookingRequests);
                    const successCount = resps.filter(r => r.success).length;
                    const bookingIds = resps.filter(r => r.success).map(r => r.bookingId).filter(Boolean);
                    const firstError = resps.find(r => !r.success)?.error || null;
                    
                    return {
                        item,
                        success: successCount === quantity,
                        bookingIds,
                        error: firstError
                    };
                })
            );

            const createdIds = itemResults.flatMap(r => r.bookingIds);
            setBookingIds(createdIds);

            const failedResults = itemResults.filter(r => !r.success);
            const hasFailures = failedResults.length > 0;

            if (hasFailures) {
                if (!isHospitalPay && razorpayResponse) {
                    // Let backend handle refunding because we didn't confirm all items paid for
                    await apiFetch(`/api/bookings/verify-payment`, {
                        method: 'POST',
                        body: JSON.stringify({
                            razorpay_order_id: razorpayResponse.razorpay_order_id,
                            razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                            razorpay_signature: razorpayResponse.razorpay_signature,
                            bookingIds: createdIds
                        })
                    }).catch(() => null);
                }

                const failedNames = failedResults.map(r => r.item.name).join(', ');

                if (isHospitalPay) {
                    // Remove successfully booked items from cart
                    const successfulResults = itemResults.filter(r => r.success);
                    successfulResults.forEach(r => {
                        removeFromCart(r.item.id);
                    });

                    const successNames = successfulResults.map(r => r.item.name).join(', ');
                    setError(
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                            <div style={{ fontWeight: 'bold', color: '#991b1b' }}>Partial Booking Success</div>
                            {successNames && (
                                <div style={{ fontSize: '0.85rem' }}>
                                    <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓ Booked successfully:</span> {successNames} (Pay at Hospital)
                                </div>
                            )}
                            <div style={{ fontSize: '0.85rem' }}>
                                <span style={{ color: '#dc2626', fontWeight: 'bold' }}>✗ Failed to book:</span> {failedNames} ({failedResults[0].error || 'Slot no longer available'})
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>
                                We have kept the failed items in your cart. Please select another slot or provider for them and try booking again.
                            </div>
                        </div>
                    );
                } else {
                    // Online payment mode
                    const refundMsg = `Payment refunded because slot for ${failedNames} is no longer available. Please select another slot/provider and try again.`;
                    setError(refundMsg);
                }
                return;
            }
            
            // If they paid online directly from cart, verify payment
            if (!isHospitalPay && razorpayResponse) {
                const verifyRes = await apiFetch(`/api/bookings/verify-payment`, {
                    method: 'POST',
                    body: JSON.stringify({
                        razorpay_order_id: razorpayResponse.razorpay_order_id,
                        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                        razorpay_signature: razorpayResponse.razorpay_signature,
                        bookingIds: createdIds
                    })
                });

                if (!verifyRes.ok) {
                     const payload = await verifyRes.json().catch(() => null);
                     setError(payload?.message || "Payment was successful but verification failed during booking creation.");
                     return;
                }
            }

            setSuccess(true);
            clearCart();
            
            // If they paid online immediately, show ticket and redirect after 6.5s
            if (!isHospitalPay) {
                setTicketData({
                    ticketId: razorpayResponse?.razorpay_payment_id || ('TXN-' + Math.floor(Math.random()*1000000)),
                    amount: finalCartTotal + 50,
                    date: new Date(),
                    cardHolder: user?.name || 'Customer',
                    last4Digits: 'XX01',
                    barcodeValue: razorpayResponse?.razorpay_payment_id || '9876543210'
                });
                setTimeout(() => {
                    router.push('/bookings');
                }, 6500);
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
      if (ticketData) {
          return (
             <main style={{ minHeight: '100vh', background: '#f4f6fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <AnimatedTicket {...ticketData} />
             </main>
          );
      }

      const isHospitalUpdate = bookingIds.length > 0 && paymentMode === 'hospital';

      return (
        <main style={{ minHeight: '100vh', background: '#f4f6fb' }}>
            <Navbar />
            <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 4rem)', textAlign: 'center', maxWidth: '600px' }}>
                <CheckCircle size={64} color="#000" style={{ margin: '0 auto 1.5rem' }} />
                <h1 style={{ marginBottom: '1rem', fontWeight: '900' }}>Order Placed!</h1>
                
                <div style={{ background: '#fff', padding: '2rem', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                    <p style={{ color: '#4b5563', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                        Your booking has been created successfully. You can visit the provider at your convenience.
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
                                    processRazorpayPayment();
                                }}
                                style={{ background: '#000', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
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
                <Link href="/hospitals" style={{ color: '#000', textDecoration: 'underline' }}>Browse Services</Link>
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
                                             <MapPin size={14} color="#000" /> {item.hospital_name || 'No Hospital Selected'}
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

                                <div style={{ marginTop: '1.5rem' }}>
                                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                         <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1e293b' }}>Available Providers</div>
                                         <div style={{ fontSize: '0.75rem', color: '#64748b', background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px', fontWeight: '600' }}>Quality-first ranking</div>
                                     </div>
                                     <ProviderList 
                                        serviceName={item.name} 
                                        currentHospitalId={item.hospitalId} 
                                        onSelect={(newProvider) => {
                                            // Update cart item with new provider details
                                            const updatedItem = {
                                                ...item,
                                                serviceId: newProvider.id,
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

                    {/* Date and time selection removed */}
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
                                <span>Your Savings {cartMrpTotal > 0 && totalSavings > 0 ? `(${Math.round((totalSavings / cartMrpTotal) * 100)}%)` : ''}</span>
                                <span>-₹{totalSavings}</span>
                            </div>
                            
                            <div className="total-row">
                                <span>To Pay</span>
                                <span>₹{finalCartTotal + 50}</span>
                            </div>
                        </div>

                        {/* Coupons */}
                        <div className="coupon-section" style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
                            {appliedCoupon ? (
                                <div style={{ background: '#e5e7eb', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px dashed #16a34a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ color: '#000', fontWeight: 'bold', fontSize: '0.95rem' }}>'{appliedCoupon.code}' applied</div>
                                        <div style={{ color: '#000', fontSize: '0.8rem' }}>You saved ₹{appliedCoupon.discount}!</div>
                                    </div>
                                    <button onClick={handleRemoveCoupon} style={{ background: 'transparent', border: 'none', color: '#000', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', textDecoration: 'underline' }}>REMOVE</button>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input 
                                            type="text" 
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            placeholder="Enter Coupon Code" 
                                            style={{ flex: 1, padding: '0.7rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', outline: 'none' }}
                                        />
                                        <button onClick={handleApplyCoupon} style={{ color: '#000', fontWeight: 'bold', fontSize: '0.9rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>APPLY</button>
                                    </div>
                                    {couponError && <div style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '6px' }}>{couponError}</div>}
                                </div>
                            )}
                        </div>

                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '0.6rem', color: '#374151' }}>Payment</h4>
                            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                Online payment is required to reserve confirmed slots and avoid unpaid no-shows.
                            </p>
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
                                    width: '100%', background: '#000', color: '#fff', border: 'none', 
                                    padding: '1.2rem', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', 
                                    cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, 
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
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

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} mode={authModalMode} />

      {/* Calendar Modal Removed */}

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
            color: #000;
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
            color: #000;
            text-decoration: underline;
            font-weight: 600;
            margin-top: 2px;
        }

        .cta-button {
            background: #000;
            color: #fff;
            border: none;
            padding: 0.9rem 2rem;
            border-radius: 12px;
            font-weight: 800;
            font-size: 1rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
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
