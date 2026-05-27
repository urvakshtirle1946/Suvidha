'use client';
import { useState } from 'react';
import { Tag, Plus, Trash2, Calendar } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function OffersManagement() {
  const [offers, setOffers] = useState([
     { id: 1, code: 'WELCOME50', discount: '50%', description: 'Flat 50% OFF on first booking', validTill: '2026-12-31', active: true },
     { id: 2, code: 'HEALTH20', discount: '20%', description: '20% OFF on all health checkups', validTill: '2026-06-30', active: true },
     { id: 3, code: 'SUMMER30', discount: '30%', description: 'Summer Special Discount', validTill: '2026-05-01', active: false },
  ]);

  const { addToast } = useToast();

  const toggleStatus = (id) => {
      setOffers(prev => prev.map(o => o.id === id ? { ...o, active: !o.active } : o));
      addToast('Offer status updated', 'success');
  };

  const deleteOffer = (id) => {
      if (confirm('Are you sure you want to delete this offer?')) {
          setOffers(prev => prev.filter(o => o.id !== id));
          addToast('Offer deleted successfully', 'success');
      }
  };

  // Light & Clean Styles
  const cardStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
  };

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
                <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>Discount & Offers</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Create and manage promotional campaigns.</p>
            </div>
            <button className="btn" style={{ 
                background: 'var(--accent)', 
                color: 'var(--accent-text)', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '8px',
                borderRadius: '12px', fontSize: '1rem', fontWeight: '600',
                cursor: 'pointer'
            }}>
                <Plus size={20} /> Create Offer
            </button>
        </div>

        <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {offers.map((offer) => (
                <div key={offer.id} style={{ 
                    ...cardStyle, padding: '1.5rem', position: 'relative', 
                    border: offer.active ? '1px solid var(--accent)' : '1px solid var(--border)',
                    transition: 'all 0.3s ease'
                }} className="hover:transform hover:scale-[1.02]">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div style={{ 
                            background: offer.active ? 'rgba(204, 255, 0, 0.1)' : 'var(--bg-primary)', 
                            color: offer.active ? 'var(--accent)' : 'var(--text-secondary)', 
                            padding: '6px 12px', 
                            borderRadius: '8px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.9rem',
                            border: offer.active ? '1px solid rgba(204, 255, 0, 0.2)' : '1px solid transparent'
                        }}>
                            <Tag size={16} /> {offer.code}
                        </div>
                        <div onClick={() => toggleStatus(offer.id)} style={{ 
                            cursor: 'pointer', 
                            background: offer.active ? 'rgba(46, 204, 113, 0.15)' : 'var(--bg-primary)',
                            color: offer.active ? '#2ecc71' : 'var(--text-secondary)',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            {offer.active ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                    
                    <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-1px' }}>{offer.discount}</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: '1.5' }}>{offer.description}</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                             <Calendar size={16} style={{ color: 'var(--text-secondary)' }} /> Valid till: <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{new Date(offer.validTill).toLocaleDateString()}</span>
                         </div>
                         <button onClick={() => deleteOffer(offer.id)} style={{ 
                             background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', 
                             color: '#F87171', cursor: 'pointer', padding: '8px', borderRadius: '8px',
                             transition: 'background 0.2s'
                         }}>
                             <Trash2 size={18} />
                         </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
