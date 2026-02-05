'use client';
import Navbar from '@/components/Navbar';
import { Tag, Copy, scissors } from 'lucide-react';

const OFFERS = [
  { code: 'FIRST50', discount: '50% OFF', description: 'Flat 50% off on your first Lab Test booking. Max discount ₹500.', type: 'Lab Test' },
  { code: 'HEALTH20', discount: '20% OFF', description: 'Get 20% off on all Full Body Checkups.', type: 'Package' },
  { code: 'HOSP30', discount: '30% OFF', description: 'Exclusive 30% discount on OPD consultations at partner hospitals.', type: 'Hospital' },
  { code: 'SUVIDHA10', discount: '10% OFF', description: 'Extra 10% off on all services for premium members.', type: 'All' },
];

export default function Offers() {
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert('Coupon code copied: ' + code);
  };

  return (
    <main style={{ paddingBottom: '100px' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
        <h1 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Tag size={32} color="var(--accent)" /> Exclusive Offers
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Save more on your healthcare expenses with our curated coupons.</p>
        
        <div className="grid-cards">
          {OFFERS.map((offer, index) => (
            <div key={index} className="glass" style={{ 
              padding: '2rem', 
              borderLeft: '4px solid var(--accent)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <span style={{ 
                      background: 'rgba(255, 159, 67, 0.1)', 
                      color: 'var(--accent)', 
                      padding: '4px 10px', 
                      borderRadius: '4px', 
                      fontSize: '0.8rem', 
                      fontWeight: 'bold' 
                  }}>
                    {offer.type}
                  </span>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    {offer.discount}
                  </div>
               </div>
               
               <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>{offer.description}</p>
               
               <div style={{ 
                 marginTop: 'auto', 
                 background: 'rgba(255,255,255,0.05)', 
                 padding: '1rem', 
                 borderRadius: '8px', 
                 display: 'flex', 
                 justifyContent: 'space-between', 
                 alignItems: 'center',
                 border: '1px dashed var(--text-muted)'
               }}>
                  <code style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '2px' }}>{offer.code}</code>
                  <button 
                    onClick={() => copyToClipboard(offer.code)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', gap: '5px', alignItems: 'center' }}
                  >
                    <Copy size={16} /> Copy
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
