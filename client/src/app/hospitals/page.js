'use client';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Search, MapPin, Activity, X, Heart, Smile, Eye, Building2 } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { useCart } from '@/context/CartContext';
import { apiFetch, getImageUrl } from '@/utils/api';
import { PROVIDER_SORT_OPTIONS, getProviderRating, sortProviders } from '@/utils/providerRanking';

const INITIAL_SERVICES_LIMIT = 500;

function HospitalsContent() {
  const { city } = useLocation();
  const { addToCart, setIsCartOpen } = useCart();
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const specialtyFilter = searchParams.get('specialty');
  const querySearch = searchParams.get('search');
  const queryHospital = searchParams.get('hospital');
  const testFilter = searchParams.get('test');
  
  const [searchTerm, setSearchTerm] = useState(querySearch || testFilter || '');
  const [hospitalFilter, setHospitalFilter] = useState(queryHospital || '');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (testFilter) {
      setSearchTerm(testFilter);
    }
  }, [testFilter]);

  // Fetch SERVICES
  useEffect(() => {
    const fetchServices = async () => {
      try {
        let endpoint = `/api/services?limit=${INITIAL_SERVICES_LIMIT}`;
        if (categoryFilter) endpoint = `/api/services?category=${encodeURIComponent(categoryFilter)}&limit=${INITIAL_SERVICES_LIMIT}`;

        const res = await apiFetch(endpoint);
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

  const [sortBy, setSortBy] = useState('recommended'); 

  const filteredHospitals = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const normalizedSpecialty = specialtyFilter?.toLowerCase();
    const normalizedHospital = hospitalFilter?.toLowerCase();

    return hospitals
      .filter((hospital) => {
        const matchesSearch = hospital.name.toLowerCase().includes(normalizedSearch);
        const matchesSpecialty =
          !normalizedSpecialty ||
          hospital.name.toLowerCase().includes(normalizedSpecialty) ||
          hospital.category?.toLowerCase() === normalizedSpecialty;
        const matchesHospital = 
          !normalizedHospital || 
          (hospital.hospital_name && hospital.hospital_name.toLowerCase().includes(normalizedHospital));

        return matchesSearch && matchesSpecialty && matchesHospital;
      })
      .sort((a, b) => sortProviders([a, b], sortBy)[0] === a ? -1 : 1);
  }, [hospitals, searchTerm, specialtyFilter, hospitalFilter, sortBy]);

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
                          <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', backgroundColor: '#000', color: '#fff', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }} onClick={() => { setIsCartOpen(true); setSelectedHospital(null); }}>
                              Go to cart
                          </button>
                     </div>
                 </div>
             )}

             {/* Search Input Field */}
             <div className="search-bar-container">
                 <div className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRight: '1px solid #e5e7eb', paddingRight: '1rem', color: '#374151', minWidth: '120px' }}>
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
                        ? `Results for "${searchTerm}" ${hospitalFilter ? `at ${hospitalFilter}` : ''}` 
                        : hospitalFilter
                            ? `Services at ${hospitalFilter}`
                            : specialtyFilter 
                                ? `${specialtyFilter} Services` 
                                : categoryFilter 
                                    ? `${categoryFilter === 'Lab' ? 'Pathology' : categoryFilter === 'Scan' ? 'Radiology' : categoryFilter} Services`
                                    : 'All Available Services'
                    }
                  </h1>
                 <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                   {loading ? 'Loading services...' : `${filteredHospitals.length} result(s) found`}
                 </p>
             </div>
             <div className="filters-actions">
                  <select
                     value={sortBy}
                     onChange={(event) => setSortBy(event.target.value)}
                     style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '7px 16px', fontSize: '0.85rem', color: '#374151', outline: 'none' }}
                  >
                    {PROVIDER_SORT_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                 </select>
             </div>
        </div>

        {/* Listings Grid - Service Centric */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                style={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  minHeight: '220px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ height: '18px', width: '70%', borderRadius: '8px', marginBottom: '10px', background: 'linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
                    <div style={{ height: '14px', width: '45%', borderRadius: '8px', background: 'linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite 0.1s' }} />
                  </div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite 0.2s' }} />
                </div>
                <div style={{ height: '14px', width: '100%', borderRadius: '8px', marginBottom: '8px', background: 'linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite 0.15s' }} />
                <div style={{ height: '14px', width: '85%', borderRadius: '8px', marginBottom: '18px', background: 'linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite 0.25s' }} />
                <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
                  <div style={{ height: '24px', width: '110px', borderRadius: '8px', background: 'linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
                  <div style={{ height: '24px', width: '120px', borderRadius: '8px', background: 'linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite 0.1s' }} />
                </div>
                <div style={{ borderTop: '1px dashed #e5e7eb', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ height: '22px', width: '90px', borderRadius: '8px', background: 'linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite 0.2s' }} />
                  <div style={{ height: '38px', width: '88px', borderRadius: '8px', background: 'linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite 0.3s' }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
                         {getProviderRating(item) > 0 && (
                           <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '4px' }}>Rated {getProviderRating(item).toFixed(1)}</span>
                         )}
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
                             style={{ background: '#fff', border: '1px solid #000', color: '#000', padding: '0.6rem 1.5rem', borderRadius: '8px', fontWeight: '600', transition: 'all 0.2s' }}
                             onMouseOver={(e) => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff'; }}
                             onMouseOut={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
                         >
                             ADD
                         </button>
                     </div>
                 </div>
             </div>
          ))}
        </div>
        )}
        
        {!loading && filteredHospitals.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
                <h3>No services found matching &quot;{searchTerm}&quot;.</h3>
                <p>Try searching for &quot;MRI&quot;, &quot;CBC&quot;, &quot;X-Ray&quot;, etc.</p>
            </div>
        )}

      </div>
    </main>
  );
}

export default function Hospitals() {
  return (
    <Suspense fallback={
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem', marginTop: '2rem' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '1.5rem', minHeight: '200px' }}>
              <div style={{ height: '18px', width: '70%', borderRadius: '8px', marginBottom: '12px', background: 'linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
              <div style={{ height: '14px', width: '50%', borderRadius: '8px', marginBottom: '24px', background: 'linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite 0.1s' }} />
              <div style={{ height: '14px', width: '100%', borderRadius: '8px', marginBottom: '8px', background: 'linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite 0.2s' }} />
              <div style={{ height: '14px', width: '80%', borderRadius: '8px', background: 'linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite 0.3s' }} />
            </div>
          ))}
        </div>
      </div>
    }>
      <HospitalsContent />
    </Suspense>
  );
}

