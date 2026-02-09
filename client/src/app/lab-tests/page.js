'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';
import { Search, MapPin, Star, Filter, Activity, Clock, SlidersHorizontal, TestTube } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getApiUrl, getImageUrl } from '@/utils/api';

function LabTestsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const querySearch = searchParams.get('search');
  
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState(querySearch || '');
  const [selectedTest, setSelectedTest] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Services (Real Lab Tests)
  useEffect(() => {
     const fetchData = async () => {
         try {
             const apiUrl = getApiUrl();
             const res = await fetch(`${apiUrl}/api/services?category=Lab`);
             if (res.ok) {
                 const rawData = await res.json();
                 // Handle both formats
                 const data = Array.isArray(rawData) ? rawData : (rawData?.data || []);
                 
                 const enhancedData = data.map(s => ({
                     ...s,
                     reportTime: 'Report within 24 hours',
                     price: parseFloat(s.discount_price || s.price),
                     marketPrice: parseFloat(s.price),
                     discount: s.discount_price ? Math.round(((s.price - s.discount_price) / s.price) * 100) : 0,
                     image: getImageUrl(s.hospital_image || s.image_url) || null,
                     location: s.hospital_location || 'Suvidha Partner'
                 }));
                 setTests(enhancedData);
             }
         } catch (err) {
             console.error(err);
         } finally {
             setLoading(false);
         }
     };
     fetchData();
  }, []);

  const filteredTests = tests.filter(h => {
        const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              h.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

  return (
    <main style={{ paddingBottom: '100px', background: '#f4f6fb', minHeight: '100vh' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
        
        <div style={{ marginBottom: '1.5rem' }}>
             <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.5rem' }}>Home &gt; Lab Tests</div>
             <h1 style={{ fontSize: '1.8rem', color: '#111827' }}>
                {searchTerm ? `Results for "${searchTerm}"` : 'Popular Lab Tests'}
             </h1>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <button className="btn" style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                Sort By <SlidersHorizontal size={14} style={{ marginLeft: '6px' }} />
            </button>
            <button className="btn" style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                Fasting Required
            </button>
            <button className="btn" style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                Home Collection
            </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredTests.map((test) => (
             <div key={test.id} className="glass" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', border: '1px solid #e5e7eb' }}>
                
                <div style={{ height: '160px', background: '#e0f2fe', position: 'relative', overflow: 'hidden' }}>
                   {test.image ? (
                       <img src={test.image} alt={test.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   ) : (
                       <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <div style={{ width: '60px', height: '60px', background: '#bae6fd', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                               <TestTube size={32} color="#0284c7" />
                           </div>
                       </div>
                   )}
                </div>
                
                <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#111827', lineHeight: '1.4', height: '44px', overflow: 'hidden' }}>{test.name}</h3>
                    
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} /> {test.reportTime}
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                         <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                             ₹{test.price}
                             {test.marketPrice && (
                                 <span style={{ fontSize: '0.9rem', color: '#9ca3af', textDecoration: 'line-through', marginLeft: '8px', fontWeight: 'normal' }}>
                                     {test.marketPrice}
                                 </span>
                             )}
                             <span style={{ fontSize: '0.8rem', color: '#059669', marginLeft: '8px', fontWeight: '600' }}>
                                 {test.discount}% off
                             </span>
                         </div>

                         <button 
                             className="btn" 
                             style={{ 
                                 width: '100%', 
                                 border: '1px solid #ff6f61', 
                                 color: '#ff6f61', 
                                 background: '#fff', 
                                 fontWeight: '600',
                                 padding: '0.8rem'
                             }}
                             onClick={() => addToCart(test)}
                             onMouseOver={(e) => { e.currentTarget.style.background = '#ff6f61'; e.currentTarget.style.color = '#fff'; }}
                             onMouseOut={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#ff6f61'; }}
                         >
                             ADD TO CART
                         </button>
                    </div>
                </div>
             </div>
          ))}
        </div>

      </div>

      <BookingModal 
        isOpen={!!selectedTest} 
        onClose={() => setSelectedTest(null)} 
        service={selectedTest} 
      />
    </main>
  );
}

export default function LabTests() {
  return (
    <Suspense fallback={<div className="container" style={{ paddingTop: '100px' }}>Loading...</div>}>
      <LabTestsContent />
    </Suspense>
  );
}
