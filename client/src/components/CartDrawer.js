'use client';
import { Fragment } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowLeft, ChevronDown, ChevronRight, Percent, Zap, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { getImageUrl } from '@/utils/api';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartMrpTotal, cartDiscount, isCartOpen, setIsCartOpen } = useCart();
  const router = useRouter();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40000,
          animation: 'fadeIn 0.2s'
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, 
        width: '100%', 
        maxWidth: '440px',
        background: '#f4f6fb', zIndex: 40001, boxShadow: '-5px 0 25px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column',
        animation: 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '1.2rem 1.5rem', background: '#fff', borderBottom: '1px solid #f3f4f6',
          display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, zIndex: 10
        }}>
          <button 
            onClick={() => setIsCartOpen(false)}
            style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
             <ArrowLeft size={18} />
          </button>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Cart</h2>
        </div>

        {/* Saved Banner */}
        {cartDiscount > 0 && (
            <div style={{ background: '#f9fafb', padding: '12px', textAlign: 'center', borderBottom: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', position: 'sticky', top: '73px', zIndex: 10 }}>
                 <p style={{ color: '#000', fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    Yay! You <span style={{ color: '#000' }}>saved ₹{cartDiscount}</span> on this order
                 </p>
            </div>
        )}

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          
          {/* Benefits Card */}
          <div style={{ background: 'linear-gradient(135deg, #fff, #f9fafb)', borderRadius: '20px', padding: '1.5rem', marginBottom: '1.2rem', display: 'flex', gap: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #f3f4f6' }}>
              <div style={{ background: 'linear-gradient(135deg, #f3f4f6, #f9fafb)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#000', fontWeight: '900', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
                  ₹0
              </div>
              <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#000', marginBottom: '8px' }}>NO FEES</h3>
                  <div style={{ fontSize: '0.8rem', color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={14} color="#000" /> ₹0 Handling fee</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={14} color="#000" /> No Hidden & Surge fee</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={14} color="#000" /> Early access to reports</span>
                  </div>
              </div>
          </div>

          {/* Coupon Section */}


          {/* ETA Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', padding: '0 8px' }}>
              <div style={{ background: '#f3f4f6', padding: '8px', borderRadius: '10px' }}>
                  <Zap size={18} color="#000" />
              </div>
              <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>Fast Booking in <span style={{ color: '#111827' }}>6 mins</span></div>
          </div>

          {/* Items Section */}
          <div style={{ background: '#fff', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>Your cart is empty</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                       {/* Item Image */}
                       <div style={{ 
                         width: '60px', height: '60px', borderRadius: '12px', overflow: 'hidden', background: '#f3f4f6', border: '1px solid #f3f4f6', flexShrink: 0
                       }}>
                          <img 
                            src={getImageUrl(item.image_url) || "https://images.unsplash.com/photo-1579152276506-407a10be697f?auto=format&fit=crop&w=100&q=80"} 
                            alt={item.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            onError={(e) => e.target.src = "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=100&q=80"}
                          />
                       </div>

                       {/* Item Details */}
                       <div style={{ flex: 1 }}>
                         <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#111827', lineHeight: '1.2', marginBottom: '2px' }}>{item.name}</h3>
                         <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '8px' }}>{item.hospital_name || '1 service'}</p>
                         
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/* Quantity Selector */}
                            <div style={{ 
                                display: 'flex', alignItems: 'center', gap: '8px'
                            }}>
                                <div style={{ 
                                    display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', border: '1px solid #fee2e2', borderRadius: '10px', padding: '4px 10px',
                                    boxShadow: '0 2px 4px rgba(239, 68, 68, 0.05)'
                                }}>
                                    <button 
                                        onClick={() => updateQuantity(item.id, -1)}
                                        style={{ background: 'transparent', border: 'none', color: '#000', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                                    >
                                        <Minus size={14} strokeWidth={3} />
                                    </button>
                                    <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#111827', minWidth: '12px', textAlign: 'center' }}>{item.quantity || 1}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, 1)}
                                        style={{ background: 'transparent', border: 'none', color: '#000', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                                    >
                                        <Plus size={14} strokeWidth={3} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    style={{
                                        background: '#fee2e2', border: 'none', borderRadius: '8px', padding: '8px',
                                        color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}
                                    title="Remove Item"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Price */}
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: '900', fontSize: '1rem', color: '#111827' }}>₹{item.price * (item.quantity || 1)}</div>
                                {(item.mrp || item.price) > item.price && (
                                    <div style={{ fontSize: '0.8rem', color: '#9ca3af', textDecoration: 'line-through' }}>₹{(item.mrp || item.price) * (item.quantity || 1)}</div>
                                )}
                            </div>
                         </div>
                       </div>
                    </div>
                  ))}

                  {/* Missed something? / Add More Items */}
                  <div style={{ borderTop: '1px dashed #e5e7eb', paddingTop: '1.2rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>Missed something?</span>
                      <button 
                         onClick={() => { setIsCartOpen(false); router.push('/hospitals'); }}
                         style={{ 
                            background: '#000', color: '#fff', border: 'none', borderRadius: '12px', padding: '10px 18px', fontWeight: '800', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.95rem'
                         }}
                      >
                         <Plus size={16} strokeWidth={3} /> Add More Items
                      </button>
                  </div>
                </div>
              )}
          </div>

        <div style={{ height: '40px' }} /> {/* Spacing */}
        </div>

        {/* Sticky Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '1.2rem', background: '#fff', borderTop: '1px solid #f3f4f6', boxShadow: '0 -10px 30px rgba(0,0,0,0.06)' }}>
            <button 
              onClick={() => {
                setIsCartOpen(false);
                router.push('/checkout');
              }}
              style={{
                width: '100%', padding: '1.2rem 1.5rem', background: '#000', color: '#fff',
                border: 'none', borderRadius: '18px', fontWeight: '900', fontSize: '1.2rem',
                cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>{cart.length} Item{cart.length > 1 ? 's' : ''}</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Proceed to checkout</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.3rem' }}>₹{cartTotal + 50}</span>
                  <ChevronRight size={22} strokeWidth={3} />
              </div>
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
