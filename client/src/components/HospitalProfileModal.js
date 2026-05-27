'use client';
import { X, Activity, Star, MapPin } from 'lucide-react';

export default function HospitalProfileModal({ isOpen, onClose, hospital, onBookService }) {
  if (!isOpen || !hospital) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 3000,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        width: '100%', maxWidth: '600px', 
        background: '#fff', 
        borderRadius: '20px',
        overflow: 'hidden',
        maxHeight: '90vh',
        display: 'flex', flexDirection: 'column',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', padding: '5px', cursor: 'pointer', zIndex: 10 }}
        >
          <X size={20} />
        </button>

        {/* Header/Profile Info */}
        <div style={{ background: '#000', padding: '2.5rem 2rem', color: '#fff', borderBottom: '1px solid #333' }}>
           <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{hospital.name}</h2>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', opacity: 0.9 }}>
              <MapPin size={16} /> {hospital.location}
           </div>
           <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#fff', color: '#000', padding: '4px 8px', borderRadius: '6px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                 <Star size={14} fill="#000" /> {hospital.rating}
              </div>
              <span style={{ fontSize: '0.85rem' }}>Verified Partner</span>
           </div>
        </div>

        {/* Services List */}
        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
           <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>Available Services & Offers</h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {hospital.services.map((service, index) => {
                const basePrice = parseFloat(service.price);
                const rawDiscountedPrice = parseFloat(service.discount_price || service.price);
                const discountPercent = Math.round(((basePrice - rawDiscountedPrice) / basePrice) * 100);
                
                // Calculate exact final price based on the rounded discount percent
                const discountedPrice = discountPercent > 0 
                    ? Math.round(basePrice - (basePrice * discountPercent / 100))
                    : rawDiscountedPrice;
                
                return (
                  <div key={index} style={{ 
                    padding: '1.2rem', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                     <div>
                        <div style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>{service.name}</div>
                        {service.description && (
                          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>{service.description}</div>
                        )}
                     </div>
                     <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div>
                           <div style={{ fontWeight: 'bold', color: '#111827' }}>₹{discountedPrice}</div>
                           {discountPercent > 0 && (
                             <div style={{ fontSize: '0.8rem', textDecoration: 'line-through', color: '#9ca3af' }}>₹{basePrice}</div>
                           )}
                        </div>
                        <button 
                          onClick={() => onBookService({ 
                            ...service, 
                            price: discountedPrice,
                            mrp: basePrice,
                            hospital_id: hospital.id,
                            hospital_name: hospital.name,
                            directBooking: true
                          })}
                          style={{ background: '#000', color: '#fff', border: '1px solid #333', padding: '8px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                        >
                           BOOK
                        </button>
                     </div>
                  </div>
                );
              })}
           </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid #f3f4f6', background: '#f9fafb', fontSize: '0.85rem', color: '#6b7280' }}>
            Prices are inclusive of consultation and service charges.
        </div>
      </div>
    </div>
  );
}
