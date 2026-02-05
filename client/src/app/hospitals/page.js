'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';
import { Search, MapPin, Filter, Activity, Clock, SlidersHorizontal, ArrowUpDown, X, Lock, ChevronDown } from 'lucide-react';
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
  const [expandedId, setExpandedId] = useState(null); // Expansion State

  // Fetch Services from API
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/hospitals`);
        const data = await res.json();
         // Data now includes nested 'services' array
         setHospitals(data);
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
             <div className="search-bar-container">
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
        <div className="filters-container">
             <div>
                 <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    Home &gt; {specialtyFilter || 'All Services'}
                 </div>
                 <h1 style={{ fontSize: '1.5rem', color: '#111827', fontWeight: 'bold' }}>
                    {specialtyFilter || 'All Services'} in {city || 'your area'}
                 </h1>
             </div>

             <div className="filters-actions">
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
                 overflow: 'hidden',
                 transition: 'all 0.3s ease',
                 boxShadow: expandedId === hospital.id ? '0 8px 20px rgba(0,0,0,0.1)' : 'none'
             }}>
                 {/* Main Card Header - Click to Expand */}
                 <div 
                    onClick={() => setExpandedId(expandedId === hospital.id ? null : hospital.id)}
                    style={{ 
                        padding: '1.5rem', 
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}
                 >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            {/* Hospital Image/Icon */}
                            <div style={{ 
                                width: '60px', height: '60px', 
                                background: hospital.image_url 
                                    ? `url('${hospital.image_url.startsWith('/') ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + hospital.image_url : hospital.image_url}') center/cover no-repeat` 
                                    : '#ffe4e6', 
                                borderRadius: '8px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {!hospital.image_url && <Activity size={32} color="#ff6f61" />}
                            </div>
                            
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', marginBottom: '4px' }}>
                                    {hospital.name}
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#6b7280' }}>
                                    <MapPin size={14} /> {hospital.location}
                                </div>
                            </div>
                        </div>

                        {/* Rating Badge */}
                        <div style={{ 
                            background: '#0c831f', color: '#fff', 
                            padding: '4px 8px', borderRadius: '4px', 
                            fontSize: '0.85rem', fontWeight: 'bold' 
                        }}>
                             {hospital.rating || '4.5'} ★
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px dashed #e5e7eb' }}>
                        <span style={{ fontSize: '0.9rem', color: '#ff6f61', fontWeight: '500' }}>
                           {hospital.services?.length || 0} Services Available
                        </span>
                        <ChevronDown 
                            size={20} 
                            color="#9ca3af" 
                            style={{ 
                                transform: expandedId === hospital.id ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s'
                            }} 
                        />
                    </div>
                 </div>

                 {/* Dropdown Content - Expanded Details */}
                 {expandedId === hospital.id && (
                     <div className="animate-fade-in" style={{ 
                         background: '#f9fafb', 
                         borderTop: '1px solid #e5e7eb',
                         padding: '1.5rem' 
                     }}>
                         {/* Description */}
                         {hospital.discount_description && (
                             <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.5' }}>
                                 <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>About Hospital</h4>
                                 {hospital.discount_description}
                             </div>
                         )}

                         {/* Services List */}
                         <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>Available Services</h4>
                         
                         <div style={{ display: 'grid', gap: '1rem' }}>
                             {hospital.services && hospital.services.length > 0 ? (
                                 hospital.services.map((service, idx) => (
                                     <div key={idx} style={{ 
                                         background: '#fff', 
                                         padding: '1rem', 
                                         borderRadius: '8px', 
                                         border: '1px solid #e5e7eb',
                                         display: 'flex', 
                                         justifyContent: 'space-between', 
                                         alignItems: 'center',
                                         flexWrap: 'wrap',
                                         gap: '1rem'
                                     }}>
                                         <div style={{ flex: 1, minWidth: '200px' }}>
                                             <div style={{ fontWeight: '600', color: '#374151', fontSize: '1rem' }}>{service.name}</div>
                                             <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '2px' }}>{service.category}</div>
                                             {service.description && (
                                                 <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '4px' }}>{service.description}</div>
                                             )}
                                         </div>

                                         <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                             <div>
                                                 {service.discount_price && service.discount_price < service.price ? (
                                                     <>
                                                         <div style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '0.85rem' }}>₹{service.price}</div>
                                                         <div style={{ fontWeight: 'bold', color: '#111827', fontSize: '1.1rem' }}>₹{service.discount_price}</div>
                                                     </>
                                                 ) : (
                                                     <div style={{ fontWeight: 'bold', color: '#111827', fontSize: '1.1rem' }}>₹{service.price}</div>
                                                 )}
                                             </div>
                                             
                                             <button 
                                                 onClick={(e) => {
                                                     e.stopPropagation();
                                                     setSelectedHospital({ ...hospital, ...service, hospital_name: hospital.name, id: service.id, hospitalId: hospital.id });
                                                 }}
                                                 className="btn btn-primary"
                                                 style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}
                                             >
                                                 Book
                                             </button>
                                         </div>
                                     </div>
                                 ))
                             ) : (
                                 <div style={{ textAlign: 'center', color: '#9ca3af', padding: '1rem' }}>
                                     No services listed yet.
                                 </div>
                             )}
                         </div>
                     </div>
                 )}
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
