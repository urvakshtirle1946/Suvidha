'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';
import { Search, MapPin, Filter, Activity, Clock, SlidersHorizontal, ArrowUpDown, X, Lock, ChevronDown, Heart, Smile, Eye, Building2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import { useCart } from '@/context/CartContext';
import { getApiUrl, getImageUrl } from '@/utils/api';

function HospitalsContent() {
  const router = useRouter();
  const { city } = useLocation();
  const { user } = useAuth();
  const { addToCart, setIsCartOpen } = useCart();
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const specialtyFilter = searchParams.get('specialty');
  const querySearch = searchParams.get('search');
  
  const [searchTerm, setSearchTerm] = useState(querySearch || '');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null); 

  // Fetch SERVICES
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiUrl = getApiUrl();
        let url = `${apiUrl}/api/services`;
        if (categoryFilter) url += `?category=${categoryFilter}`;
        
        const res = await fetch(url);
        const data = await res.json();
        
        // Handle both flattened array and paginated object formats
        const servicesArray = Array.isArray(data) 
          ? data 
          : (data && Array.isArray(data.data) ? data.data : []);
          
        setHospitals(servicesArray);
        setLoading(false);
      } catch (err) {
         console.error(err);
         setLoading(false);
      }
    };
    
    fetchServices();
  }, [categoryFilter]);

  const [sortOrder, setSortOrder] = useState(null); 

  const filteredHospitals = hospitals
    .filter(h => {
        const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = !specialtyFilter || 
                                 h.name.toLowerCase().includes(specialtyFilter.toLowerCase()) ||
                                 (h.category && h.category.toLowerCase() === specialtyFilter.toLowerCase());
        return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
        if (!sortOrder) return 0;
        const priceA = a.discount_price || a.price;
        const priceB = b.discount_price || b.price;
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

  const toggleSort = () => {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

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
                     background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '10px 0', marginBottom: '20px',
                     flexWrap: 'wrap', gap: '10px'
                 }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f3f4f6', padding: '6px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>
                         {selectedHospital.name} <X size={14} style={{ cursor: 'pointer' }} onClick={() => setSelectedHospital(null)} />
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, justifyContent: 'flex-end', minWidth: '200px' }}>
                         <div style={{ textAlign: 'right' }}>
                             <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>1 item added</div>
                             <div style={{ fontWeight: 'bold' }}>₹{selectedHospital.price}</div>
                         </div>
                         <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', background: '#ff6f61', border: 'none' }} onClick={() => { setIsCartOpen(true); setSelectedHospital(null); }}>
                             Go to cart
                         </button>
                     </div>
                 </div>
             )}

             {/* Search Input Field */}
             <div className="search-bar-container">
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRight: '1px solid #e5e7eb', paddingRight: '1rem', color: '#374151', minWidth: '120px' }}>
                    <MapPin size={18} color="#db2777" /> {city || 'Detecting'}
                 </div>
                 <Search size={20} color="#9ca3af" />
                 <input 
                     type="text" 
                     placeholder="Search for MRI, Blood Test, etc." 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem', color: '#374151' }} 
                 />
             </div>
        </div>

        {/* Categories Grid */}
        {!searchTerm && !specialtyFilter && (
            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#374151' }}>Popular Categories</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.8rem' }}>
                    {[
                        { name: 'Cardiology', icon: <Heart size={24} color="#ff6b6b"/> },
                        { name: 'X-Ray', icon: <Activity size={24} color="#54a0ff"/> },
                        { name: 'MRI', icon: <Activity size={24} color="#5f27cd"/> },
                        { name: 'Blood Test', icon: <Activity size={24} color="#ff9f43"/> },
                        { name: 'Dental', icon: <Smile size={24} color="#10ac84"/> },
                        { name: 'Eye Check', icon: <Eye size={24} color="#2e86de"/> },
                    ].map((cat, idx) => (
                        <div 
                            key={idx}
                            onClick={() => setSearchTerm(cat.name)}
                            style={{ 
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                                padding: '1rem', background: '#f9fafb', borderRadius: '12px', cursor: 'pointer',
                                border: '1px solid #f3f4f6', transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#db2777'; e.currentTarget.style.background = '#fff0f5'; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.background = '#f9fafb'; }}
                        >
                            <div style={{ background: '#fff', padding: '10px', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                {cat.icon}
                            </div>
                            <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#4b5563', textAlign: 'center' }}>{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Title & Filters */}
        <div className="filters-container" style={{ marginBottom: '1.5rem' }}>
             <div>
                  <h1 style={{ fontSize: '1.4rem', color: '#111827', fontWeight: 'bold' }}>
                    {searchTerm 
                        ? `Results for "${searchTerm}"` 
                        : specialtyFilter 
                            ? `${specialtyFilter} Services` 
                            : categoryFilter 
                                ? `${categoryFilter === 'Lab' ? 'Pathology' : categoryFilter === 'Scan' ? 'Radiology' : categoryFilter} Services`
                                : 'All Available Services'
                    }
                  </h1>
                 <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{filteredHospitals.length} result(s) found</p>
             </div>

             <div className="filters-actions">
                 <button 
                    className="btn" 
                    onClick={toggleSort}
                    style={{ background: sortOrder ? '#f0fdf4' : '#fff', border: sortOrder ? '1px solid #0c831f' : '1px solid #e5e7eb', borderRadius: '20px', padding: '6px 16px', fontSize: '0.85rem', color: sortOrder ? '#0c831f' : '#374151' }}
                 >
                     Sort By Price {sortOrder === 'asc' ? '(Low to High)' : sortOrder === 'desc' ? '(High to Low)' : ''} <ArrowUpDown size={12} style={{ marginLeft: '6px' }} />
                 </button>
             </div>
        </div>

        {/* Listings Grid - Service Centric */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
          {filteredHospitals.map((item) => (
             <div key={item.uniqueId || item.id} style={{ 
                 background: '#fff', 
                 border: '1px solid #e5e7eb', 
                 borderRadius: '16px', 
                 overflow: 'hidden',
                 transition: 'all 0.3s ease',
                 display: 'flex', flexDirection: 'column'
             }}>
                 <div style={{ padding: '1.5rem', flex: 1 }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                         <div>
                             <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', marginBottom: '4px' }}>
                                 {item.name}
                             </h3>
                             <p style={{ fontSize: '0.85rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                 <Building2 size={12}/> {item.hospital_name || 'Hospital'}
                             </p>
                         </div>
                         <div style={{ 
                            width: '40px', height: '40px', borderRadius: '8px', 
                            background: `url('${getImageUrl(item.image_url) || ''}') center/cover no-repeat`,
                            backgroundColor: '#f3f4f6'
                         }}></div>
                     </div>
                     
                     {item.description && (
                         <p style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '1rem', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {item.description}
                         </p>
                     )}

                     <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                         <span style={{ background: '#f3f4f6', padding: '4px 8px', borderRadius: '4px' }}>Reports in 24hrs</span>
                         <span style={{ background: '#f3f4f6', padding: '4px 8px', borderRadius: '4px' }}>E-Report Available</span>
                     </div>
                     
                     <div style={{ borderTop: '1px dashed #e5e7eb', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <div>
                             {item.discount_price && item.discount_price < item.price ? (
                                 <div>
                                     <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>₹{item.discount_price}</span>
                                     <span style={{ fontSize: '0.9rem', textDecoration: 'line-through', color: '#9ca3af', marginLeft: '6px' }}>₹{item.price}</span>
                                 </div>
                             ) : (
                                 <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>₹{item.price}</div>
                             )}
                         </div>
                         <button 
                             onClick={() => {
                                 const price = parseFloat(item.discount_price || item.price);
                                 const mrp = parseFloat(item.price);
                                 addToCart({ ...item, quantity: 1, hospitalId: item.hospital_id || item.id, price, mrp }); 
                                 setSelectedHospital({ ...item, name: item.name, price, mrp, directBooking: true });
                             }}
                             className="btn"
                             style={{ background: '#fff', border: '1px solid #ff6f61', color: '#ff6f61', padding: '0.6rem 1.5rem', borderRadius: '8px', fontWeight: '600', transition: 'all 0.2s' }}
                             onMouseOver={(e) => { e.currentTarget.style.background = '#ff6f61'; e.currentTarget.style.color = '#fff'; }}
                             onMouseOut={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#ff6f61'; }}
                         >
                             ADD
                         </button>
                     </div>
                 </div>
             </div>
          ))}
        </div>
        
        {filteredHospitals.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
                <h3>No services found matching "{searchTerm}".</h3>
                <p>Try searching for "MRI", "CBC", "X-Ray", etc.</p>
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
