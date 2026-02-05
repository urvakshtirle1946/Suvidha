'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';
import { Search, MapPin, Filter, Activity, Clock, SlidersHorizontal, ArrowUpDown, X, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';

function HospitalsContent() {
  const router = useRouter();
  const { city } = useLocation();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const specialtyFilter = searchParams.get('specialty');
  const querySearch = searchParams.get('search');
  
  const [searchTerm, setSearchTerm] = useState(querySearch || '');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  // Fetch Services from API
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/hospitals`);
        const data = await res.json();
         // Map API data to component format if necessary or use directly
         // API returns: { id, name, category, price, hospital_name, ... }
         // We Map 'category' to 'specialty' for filtering to work
         const mappedData = data.map(item => ({
             ...item,
             specialty: item.category, 
             reportTime: '24-48 hrs' // Default as not in DB
         }));
         setHospitals(mappedData);
         setLoading(false);
      } catch (err) {
         console.error(err);
         setLoading(false);
      }
    };
    
    fetchHospitals();
  }, []);

  const filteredHospitals = hospitals.filter(h => {
        const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = !specialtyFilter || h.specialty?.toLowerCase() === specialtyFilter.toLowerCase();
        return matchesSearch && matchesSpecialty;
    });

  return (
    <main style={{ paddingBottom: '100px', background: '#fff', minHeight: '100vh', fontFamily: 'var(--font-outfit)' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
        
        {/* Top Search Bar with Cart Reminder */}
        <div style={{ marginBottom: '2rem' }}>
             {/* Small Item Added Notification ... */}
             {selectedHospital && (
                 <div style={{ 
                     display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                     background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '10px 0', marginBottom: '20px' 
                 }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f3f4f6', padding: '6px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>
                         {selectedHospital.name} <X size={14} style={{ cursor: 'pointer' }} onClick={() => setSelectedHospital(null)} />
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                         <div style={{ textAlign: 'right' }}>
                             <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>1 item added</div>
                             <div style={{ fontWeight: 'bold' }}>₹{selectedHospital.price}</div>
                         </div>
                         <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', background: '#ff6f61', border: 'none' }}>
                             Go to cart
                         </button>
                     </div>
                 </div>
             )}

             {/* Search Input Field */}
             <div style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 border: '1px solid #e5e7eb', 
                 borderRadius: '8px', 
                 padding: '0.8rem 1rem',
                 background: '#fff',
                 boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                 gap: '1rem'
             }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRight: '1px solid #e5e7eb', paddingRight: '1rem', color: '#374151' }}>
                    <MapPin size={18} color="#db2777" /> {city || 'Local'}
                 </div>
                 <Search size={20} color="#9ca3af" />
                 <input 
                     type="text" 
                     placeholder="Search tests or full body checkups" 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem', color: '#374151' }} 
                 />
             </div>
        </div>

        {/* Title & Filters */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
             <div>
                 <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    Home &gt; {specialtyFilter || 'All Services'}
                 </div>
                 <h1 style={{ fontSize: '1.5rem', color: '#111827', fontWeight: 'bold' }}>
                    {specialtyFilter || 'All Services'} in {city || 'your area'}
                 </h1>
             </div>

             <div style={{ display: 'flex', gap: '0.8rem' }}>
                 <button className="btn" style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '6px 16px', fontSize: '0.85rem', color: '#374151' }}>
                     Sort By <ArrowUpDown size={12} style={{ marginLeft: '6px' }} />
                 </button>
                 <button className="btn" style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '6px 16px', fontSize: '0.85rem', color: '#374151' }}>
                     All filters <SlidersHorizontal size={12} style={{ marginLeft: '6px' }} />
                 </button>
                 <button className="btn" style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '6px 16px', fontSize: '0.85rem', color: '#374151' }}>
                     Same day report
                 </button>
             </div>
        </div>

        {/* Listings Grid - Exact 1mg Replica */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredHospitals.map((hospital) => (
             <div key={hospital.id} style={{ 
                 background: '#fff', 
                 border: '1px solid #e5e7eb', 
                 borderRadius: '12px', 
                 padding: '1.5rem', 
                 display: 'flex', 
                 flexDirection: 'column',
                 transition: 'box-shadow 0.2s',
                 cursor: 'pointer'
             }}
             onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'}
             onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
             >
                {/* Icon Box */}
                <div style={{ 
                    width: '60px', height: '60px', 
                    background: '#ffe4e6', 
                    borderRadius: '8px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1rem' 
                }}>
                    <Activity size={32} color="#ff6f61" />
                </div>
                
                {/* Title */}
                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                    {hospital.name}
                </h3>
                
                {/* Subtitle / Report Time */}
                <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.2rem' }}>
                    Report within 12-48 hours
                </p>

                {/* Price */}
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>
                    ₹{hospital.price}
                </div>

                {/* Bottom Action */}
                <div style={{ marginTop: 'auto' }}>
                     {selectedHospital?.id === hospital.id ? (
                         <button style={{ 
                             width: '100%', 
                             padding: '0.6rem', 
                             background: '#fff', 
                             border: '1px solid #e5e7eb', 
                             borderRadius: '6px', 
                             color: '#ff6f61', 
                             fontWeight: '600'
                         }}>
                             Added
                         </button>
                     ) : (
                         <button 
                             onClick={() => setSelectedHospital(hospital)}
                             style={{ 
                                 width: 'fit-content', 
                                 padding: '0.4rem 1.5rem', 
                                 background: '#fff', 
                                 border: '1px solid #ff6f61', 
                                 borderRadius: '4px', 
                                 color: '#ff6f61', 
                                 fontWeight: '600',
                                 fontSize: '0.9rem',
                                 cursor: 'pointer'
                             }}
                             onMouseOver={(e) => { e.currentTarget.style.background = '#ff6f61'; e.currentTarget.style.color = '#fff' }}
                             onMouseOut={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#ff6f61' }}
                         >
                             BOOK
                         </button>
                     )}
                </div>
             </div>
          ))}
        </div>
        
        {filteredHospitals.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
                <h3>No services found matching your criteria.</h3>
            </div>
        )}

      </div>

      <BookingModal 
        isOpen={!!selectedHospital} // For now, this just opens modal, in future could be "Go to Cart"
        onClose={() => setSelectedHospital(null)} 
        service={selectedHospital} 
      />
    </main>
  );
}

export default function Hospitals() {
  return (
    <Suspense fallback={<div className="container" style={{ paddingTop: '100px' }}>Loading...</div>}>
      <HospitalsContent />
    </Suspense>
  );
}
