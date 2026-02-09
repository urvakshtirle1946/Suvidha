'use client';
import { Fragment } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { getImageUrl } from '@/utils/api';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const router = useRouter();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 3000,
          animation: 'fadeIn 0.2s'
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, 
        width: '100%', 
        maxWidth: '420px',
        background: '#fff', zIndex: 3001, boxShadow: '-5px 0 15px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column',
        animation: 'slideInRight 0.3s ease-out'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '1.5rem', borderBottom: '1px solid #e5e7eb',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} /> My Cart ({cart.length})
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            style={{ padding: '0.5rem', borderRadius: '50%', border: 'none', background: '#f3f4f6', cursor: 'pointer' }}
          >
            <X size={20} color="#374151" />
          </button>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af', gap: '1rem' }}>
              <div style={{ padding: '2rem', background: '#f9fafb', borderRadius: '50%' }}>
                <ShoppingBag size={48} />
              </div>
              <p style={{ fontSize: '1.1rem' }}>Your cart is empty</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                style={{ padding: '0.8rem 1.5rem', background: '#0c831f', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                   {/* Item Image */}
                   <div style={{ 
                     width: '70px', height: '70px', borderRadius: '8px', overflow: 'hidden', background: '#f3f4f6',
                     flexShrink: 0
                   }}>
                      {item.image_url ? (
                        <img src={getImageUrl(item.image_url)} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>No Img</div>
                      )}
                   </div>

                   {/* Item Details */}
                   <div style={{ flex: 1 }}>
                     <h3 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.25rem', color: '#1f2937' }}>{item.name}</h3>
                     <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>{item.hospital_name || 'Service'}</p>
                     
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div style={{ fontWeight: 'bold', color: '#1f2937' }}>₹{item.price * (item.quantity || 1)}</div> {/* Should be multiplied by quantity */}
                       
                       {/* Quantity Controls */}
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#0c831f', color: '#fff', borderRadius: '6px', padding: '2px 4px' }}>
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                          >
                             <Minus size={14} />
                          </button>
                          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', minWidth: '16px', textAlign: 'center' }}>{item.quantity || 1}</span>
                          <button 
                             onClick={() => updateQuantity(item.id, 1)}
                             style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                          >
                             <Plus size={14} />
                          </button>
                       </div>
                     </div>
                   </div>

                   {/* Remove Button */}
                   <button 
                     onClick={() => removeFromCart(item.id)}
                     style={{
                        background: 'transparent', border: 'none', color: '#ef4444', 
                        cursor: 'pointer', alignSelf: 'flex-start', padding: '4px'
                     }}
                     title="Remove Item"
                   >
                      <Trash2 size={16} />
                   </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', background: '#f9fafb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
            <button 
              onClick={() => {
                setIsCartOpen(false);
                router.push('/checkout'); // We'll need to create this later or use BookingModal logic
              }}
              style={{
                width: '100%', padding: '1rem', background: '#0c831f', color: '#fff',
                border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem',
                cursor: 'pointer', boxShadow: '0 4px 6px rgba(12, 131, 31, 0.2)'
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
