'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import BookingModal from '@/components/BookingModal';
import HospitalProfileModal from '@/components/HospitalProfileModal';
import AmbulanceRequest from '@/components/AmbulanceRequest';
import { 
  Activity, Heart, Baby, Brain, Bone, Eye, Smile, Star, MapPin,
  ChevronLeft, ChevronRight, TestTube
} from 'lucide-react';
import { getApiUrl, getImageUrl } from '@/utils/api';

'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import BookingModal from '@/components/BookingModal';
import HospitalProfileModal from '@/components/HospitalProfileModal';
import AmbulanceRequest from '@/components/AmbulanceRequest';
import { 
  Activity, Heart, Search, MapPin, 
  ChevronRight, Car, Building2, Pill, FlaskConical, Stethoscope
} from 'lucide-react';
import { getApiUrl, getImageUrl } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';

export default function HomeClient({ hospitals, popularServices }) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedHospitalForProfile, setSelectedHospitalForProfile] = useState(null);
  const sliderRef = useRef(null);

  const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good morning';
      if (hour < 18) return 'Good afternoon';
      return 'Good evening';
  };

  const handleHospitalClick = async (hospital) => {
      try {
          const apiUrl = getApiUrl();
          document.body.style.cursor = 'wait';
          const res = await fetch(`${apiUrl}/api/hospitals/${hospital.id}`);
          if (!res.ok) throw new Error('Failed to fetch details');
          const fullData = await res.json();
          setSelectedHospitalForProfile(fullData);
      } catch (err) {
          console.error("Error fetching hospital details:", err);
          setSelectedHospitalForProfile(hospital);
      } finally {
          document.body.style.cursor = 'default';
      }
  };

  const MAIN_SERVICES = [
      { id: 'ambulance', name: 'Ambulance', icon: <Car size={32} />, color: '#000', bg: '#f3f4f6', link: '#' }, // Triggers modal contextually
      { id: 'hospital', name: 'Hospitals', icon: <Building2 size={32} />, color: '#000', bg: '#f3f4f6', link: '/hospitals' },
      { id: 'lab', name: 'Lab Tests', icon: <FlaskConical size={32} />, color: '#000', bg: '#f3f4f6', link: '/lab-tests' },
      { id: 'pharmacy', name: 'Medicines', icon: <Pill size={32} />, color: '#000', bg: '#f3f4f6', link: '/hospitals' },
  ];

  const SECONDARY_SERVICES = [
      { name: 'Cardiology', icon: <Heart size={20} />, link: '/hospitals?specialty=Cardiologist' },
      { name: 'Scan/X-Ray', icon: <Activity size={20} />, link: '/hospitals?category=Scan' },
      { name: 'Doctors', icon: <Stethoscope size={20} />, link: '/hospitals?specialty=General' },
      { name: 'Checkups', icon: <Activity size={20} />, link: '/lab-tests' },
  ];

  return (
    <main style={{ paddingBottom: '100px', background: '#fff', minHeight: '100vh', fontFamily: 'var(--font-outfit)' }}>
      
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)', maxWidth: '800px' }}>

        {/* Uber-like Header */}
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#000' }}>
            {getGreeting()}, {user?.name ? user.name.split(' ')[0] : 'Guest'}
        </h1>
        
        {/* Search Bar - Pill Shape */}
        <div style={{ 
            position: 'relative', 
            marginBottom: '2.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            borderRadius: '50px',
            background: '#f3f4f6'
        }}>
            <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }}>
                <Search size={24} color="#000" />
            </div>
            <input 
                type="text" 
                placeholder="Where to? (Find hospitals, labs...)" 
                style={{
                    width: '100%',
                    padding: '18px 20px 18px 60px',
                    borderRadius: '50px',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    outline: 'none',
                    color: '#000'
                }}
            />
        </div>

        {/* Main Service Grid (Uber Style) */}
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '12px', 
            marginBottom: '2rem' 
        }}>
            {MAIN_SERVICES.map((service, idx) => (
                <Link key={idx} href={service.link} style={{ textDecoration: 'none' }}>
                    <div style={{ 
                        background: service.bg, 
                        borderRadius: '12px', 
                        padding: '1.5rem 1rem', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', // Center content for Uber style
                        justifyContent: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        transition: 'transform 0.1s'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = '#e5e7eb'}
                    onMouseOut={e => e.currentTarget.style.background = service.bg}
                    >
                        <div style={{ 
                            marginLeft: 'auto', marginRight: 'auto' // Center icon
                        }}>
                             {service.icon}
                        </div>
                        <span style={{ fontWeight: '600', color: '#000', fontSize: '1rem' }}>{service.name}</span>
                    </div>
                </Link>
            ))}
        </div>

        {/* Secondary Horizontal List */}
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none', marginBottom: '2rem' }}>
            {SECONDARY_SERVICES.map((item, idx) => (
                <Link key={idx} href={item.link} style={{ textDecoration: 'none' }}>
                    <div style={{ 
                        display: 'flex', alignItems: 'center', gap: '8px', 
                        padding: '8px 16px', borderRadius: '30px', background: '#fff', 
                        border: '1px solid #e5e7eb', whitespace: 'nowrap', cursor: 'pointer' 
                    }}>
                        {item.icon}
                        <span style={{ fontWeight: '500', color: '#000', fontSize: '0.9rem' }}>{item.name}</span>
                    </div>
                </Link>
            ))}
        </div>


        {/* Featured Section - More Minimal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#000' }}>Featured Hospitals</h2>
        </div>

        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '20px', 
            marginBottom: '3rem' 
        }}>
            {hospitals.slice(0, 4).map((hospital) => (
              <div 
                key={hospital.id} 
                onClick={() => handleHospitalClick(hospital)}
                style={{ cursor: 'pointer' }}
              >
                  <div style={{ 
                      height: '160px', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px',
                      background: '#f3f4f6'
                  }}>
                       <img 
                          crossOrigin="anonymous"
                          src={getImageUrl(hospital.image_url)} 
                          alt={hospital.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          onError={(e) => e.target.style.display = 'none'}
                      />
                  </div>
                  <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#000', margin: 0, marginBottom: '4px' }}>{hospital.name}</h3>
                      <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>{hospital.location}</p>
                      {hospital.discount_percentage && (
                          <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: '500', display: 'flex', gap: '4px', marginTop: '4px' }}>
                             {hospital.discount_percentage}% Promo
                          </span>
                      )}
                  </div>
              </div>
            ))}
        </div>

        {/* Popular Tests - Horizontal Minimal */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 1.5rem 0', color: '#000' }}>Popular Tests</h2>
        <div 
            ref={sliderRef}
            style={{ 
                display: 'flex', 
                gap: '16px', 
                overflowX: 'auto', 
                paddingBottom: '1rem', 
                scrollbarWidth: 'none'
            }}
        >
            {popularServices.map((service) => (
                <div key={service.id} style={{ minWidth: '200px', cursor: 'pointer' }} onClick={() => setSelectedProduct(service)}>
                    <div style={{ height: '120px', background: '#f9fafb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                         <img 
                            src={getImageUrl(service.image_url || service.hospital_image)} 
                            alt={service.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                            onError={(e) => e.target.style.display = 'none'}
                        />
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#000', margin: 0 }}>{service.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '2px 0' }}>₹{service.discount_price || service.price}</p>
                </div>
            ))}
        </div>


        <HospitalProfileModal 
           isOpen={!!selectedHospitalForProfile} 
           onClose={() => setSelectedHospitalForProfile(null)}
           hospital={selectedHospitalForProfile}
           onBookService={(service) => {
              setSelectedHospitalForProfile(null);
              setSelectedProduct(service);
           }}
        />

        <BookingModal 
             isOpen={!!selectedProduct}
             onClose={() => setSelectedProduct(null)}
             service={selectedProduct}
        />

      </div>
      
      {/* Keeping Ambulance Request Floating Button but ensuring it matches theme */}
      <AmbulanceRequest />
    </main>
  );
}

function ProductCard({ title, time, price, oldPrice, discount, onAdd, image }) {
    return (
        <div style={{ 
            minWidth: '220px', 
            background: '#fff', 
            borderRadius: '12px', 
            border: '1px solid #eee', 
            padding: '0', 
            overflow: 'hidden',
            flexShrink: 0
        }}>
            <div style={{ height: '120px', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {image ? (
                    <img 
                        src={image} 
                        alt={title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => e.target.style.display = 'none'}
                    />
                ) : (
                    <Activity size={40} color="#ccc" />
                )}
            </div>
            <div style={{ padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#666', background: '#f3f4f6', width: 'fit-content', padding: '2px 6px', borderRadius: '4px', marginBottom: '8px' }}>
                    {time}
                </div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#1f2937' }}>{title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <div>
                        <span style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold' }}>{price}</span>
                        <span style={{ fontSize: '0.8rem', textDecoration: 'line-through', color: '#9ca3af' }}>{oldPrice}</span>
                    </div>
                    <button 
                        onClick={onAdd}
                        style={{ border: '1px solid #ff6f61', color: '#ff6f61', background: '#fff', borderRadius: '6px', padding: '6px 16px', fontWeight: '600', cursor: 'pointer' }}
                    >
                        ADD
                    </button>
                </div>
            </div>
        </div>
    );
}
