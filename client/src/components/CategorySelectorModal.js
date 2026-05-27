'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  { name: 'Full Body Checkup', sub: 'Starting from ₹999', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=300&q=80', path: '/lab-tests' },
  { name: 'MRI Scan', sub: 'High Precision Imaging', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300&q=80', path: '/hospitals?category=Scan&search=MRI' },
  { name: 'CT Scan', sub: 'Advanced Diagnostics', img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=300&q=80', path: '/hospitals?category=Scan&search=CT' },
  { name: 'X-Ray', sub: 'Instant Reports', img: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=300&q=80', path: '/hospitals?category=Scan&search=X-Ray' },
  { name: 'Dental Treatment', sub: 'Expert Oral Care', img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=300&q=80', path: '/hospitals?search=Dental' },
  { name: 'Cardiology', sub: 'Heart Specialists', img: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=300&q=80', path: '/hospitals?search=Cardiology' },
  { name: 'Dermatology', sub: 'Skin & Laser Care', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80', path: '/hospitals?search=Dermatology' },
  { name: 'Pathology', sub: 'Blood & Lab Tests', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=300&q=80', path: '/lab-tests' },
  { name: 'Neurology', sub: 'Brain & Nerve Care', img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=300&q=80', path: '/hospitals?search=Neurology' },
  { name: 'Orthopedics', sub: 'Bone & Joint Specialists', img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=300&q=80', path: '/hospitals?search=Orthopedics' },
  { name: 'Pediatrics', sub: 'Child Healthcare', img: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=300&q=80', path: '/hospitals?search=Pediatrics' },
  { name: 'Gynaecology', sub: 'Womens Health', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&q=80', path: '/hospitals?search=Gynaecology' },
];

export default function CategorySelectorModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            style={{ 
              position: 'relative', width: '100%', maxWidth: '800px', background: '#fff', 
              borderRadius: '32px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              display: 'flex', flexDirection: 'column', maxHeight: '90vh'
            }}
          >
            {/* Header */}
            <div style={{ padding: '2rem 2.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#000', marginBottom: '4px' }}>What you need?</h2>
                <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>Select a category to explore premium healthcare services</p>
              </div>
              <button 
                onClick={onClose}
                style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#f3f4f6', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#000'}
                onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Grid */}
            <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1.5rem' }}>
                {CATEGORIES.map((cat, i) => (
                  <motion.a
                    key={cat.name}
                    href={cat.path}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{ 
                      textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '12px', 
                      padding: '12px', borderRadius: '24px', border: '1px solid #f3f4f6',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: '#fff'
                    }}
                    whileHover={{ y: -5, boxShadow: '0 12px 24px rgba(0,0,0,0.08)', borderColor: '#000' }}
                  >
                    <div style={{ width: '100%', aspectRatio: '1', borderRadius: '18px', overflow: 'hidden', background: '#f9fafb' }}>
                      <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.name}</h3>
                      <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{cat.sub}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '1.5rem 2rem', background: '#f9fafb', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'center' }}>
               <button 
                 onClick={onClose}
                 style={{ 
                   background: '#000', color: '#fff', border: 'none', padding: '0.8rem 2.5rem', 
                   borderRadius: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                 }}
               >
                 View All Services <ChevronRight size={18} />
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
