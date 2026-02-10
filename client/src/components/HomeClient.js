'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import BookingModal from '@/components/BookingModal';
import HospitalProfileModal from '@/components/HospitalProfileModal';
import AmbulanceRequest from '@/components/AmbulanceRequest';
import { 
  Activity, Heart, Baby, Brain, Bone, Eye, Smile, Star, MapPin,
  ChevronLeft, ChevronRight, TestTube, ArrowRight, Clock
} from 'lucide-react';
import { getApiUrl, getImageUrl } from '@/utils/api';

export default function HomeClient({ hospitals, popularServices }) {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedHospitalForProfile, setSelectedHospitalForProfile] = useState(null);
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
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

  // Uber-style categories: Clean, simple icons, minimal colors
  const CATEGORIES = [
      { name: 'Cardiology', icon: <Heart size={28} />, href: '/hospitals?specialty=Cardiologist' },
      { name: 'Radiology', icon: <Activity size={28} />, href: '/hospitals?category=Scan' },
      { name: 'Pathology', icon: <TestTube size={28} />, href: '/lab-tests' },
      { name: 'Orthopedic', icon: <Bone size={28} />, href: '/hospitals?specialty=Orthopedic' },
      { name: 'Pediatric', icon: <Baby size={28} />, href: '/hospitals?specialty=Pediatrician' },
      { name: 'Neurology', icon: <Brain size={28} />, href: '/hospitals?specialty=Neurologist' },
      { name: 'Eye Care', icon: <Eye size={28} />, href: '/hospitals?specialty=Ophthalmologist' },
      { name: 'Dermatology', icon: <Smile size={28} />, href: '/hospitals?specialty=Dermatologist' },
  ];

  return (
    <main style={{ paddingBottom: '100px', background: '#fff', minHeight: '100vh', color: '#000' }}>
      
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>

        {/* Hero Section - Uber Style */}
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem', 
            alignItems: 'center', 
            marginBottom: '4rem',
            background: '#f6f6f6',
            borderRadius: '12px',
            overflow: 'hidden'
        }}>
             <div style={{ padding: '3rem' }}>
                 <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                     Healthcare, <br/> simplified.
                 </h1>
                 <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '2rem', lineHeight: '1.6' }}>
                     Book appointments, lab tests, and ambulance services with a single tap. Reliable care, right when you need it.
                 </p>
                 <button className="btn-black" style={{ 
                     background: '#000', color: '#fff', padding: '12px 24px', borderRadius: '8px', 
                     fontSize: '1rem', fontWeight: '600', border: 'none', cursor: 'pointer',
                     display: 'inline-flex', alignItems: 'center', gap: '8px'
                 }}>
                     Get Started <ArrowRight size={18} />
                 </button>
             </div>
             <div style={{ height: '400px', background: '#e5e7eb', position: 'relative' }}>
                 <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80" 
                    alt="Healthcare" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                 />
             </div>
        </div>

        {/* Suggestions / Categories */}
        <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem', color: '#000' }}>Suggestions</h2>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', 
                gap: '12px' 
            }}>
                {CATEGORIES.map((cat, index) => (
                    <Link key={index} href={cat.href} style={{ textDecoration: 'none' }}>
                        <div style={{ 
                            background: '#f6f6f6', 
                            borderRadius: '12px', 
                            padding: '1.5rem 1rem', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                            height: '110px'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#eeeeee'}
                        onMouseOut={(e) => e.currentTarget.style.background = '#f6f6f6'}
                        >
                            <div style={{ color: '#000' }}>{cat.icon}</div>
                            <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#000', textAlign: 'center' }}>{cat.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

        {/* Popular Services - Horizontal Scroll */}
        <div style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '700', margin: 0, color: '#000' }}>Popular Tests</h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => scroll('left')} className="nav-btn"><ChevronLeft size={20} /></button>
                    <button onClick={() => scroll('right')} className="nav-btn"><ChevronRight size={20} /></button>
                </div>
            </div>

            <div 
                ref={sliderRef}
                style={{ 
                    display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', 
                    scrollbarWidth: 'none', scrollBehavior: 'smooth' 
                }}
            >
                {popularServices.map((service) => (
                    <ProductCard 
                        key={service.id}
                        title={service.name} 
                        time="24h Report" 
                        image={getImageUrl(service.image_url || service.hospital_image)}
                        price={`₹${service.discount_price || service.price}`}
                        onAdd={() => addToCart({ ...service, quantity: 1, hospital_name: service.hospital_name || 'Popular Service' })}
                    />
                ))}
            </div>
        </div>

        <BookingModal 
             isOpen={!!selectedProduct}
             onClose={() => setSelectedProduct(null)}
             service={selectedProduct}
        />

        {/* Featured Hospitals - Large Cards */}
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem', color: '#000' }}>Nearby Hospitals</h2>
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '2rem', 
            marginBottom: '4rem' 
        }}>
            {hospitals.map((hospital) => (
              <div 
                key={hospital.id} 
                onClick={() => handleHospitalClick(hospital)}
                style={{ cursor: 'pointer', background: 'transparent' }}
              >
                  <div style={{ 
                      height: '200px', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px',
                      background: '#f3f4f6', position: 'relative'
                  }}>
                       <img 
                          crossOrigin="anonymous"
                          src={getImageUrl(hospital.image_url) || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"} 
                          alt={hospital.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          onError={(e) => e.target.src = "https://images.unsplash.com/photo-1586773860418-d3b97898c75c?auto=format&fit=crop&w=800&q=80"}
                      />
                      {hospital.discount_percentage && (
                          <div style={{ 
                              position: 'absolute', top: '12px', left: '12px', 
                              background: '#0c831f', color: '#fff', padding: '4px 12px', 
                              borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' 
                          }}>
                              {hospital.discount_percentage}% OFF
                          </div>
                      )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#000', marginBottom: '4px' }}>{hospital.name}</h3>
                          <p style={{ fontSize: '0.9rem', color: '#555', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              {hospital.location}
                          </p>
                      </div>
                      <div style={{ 
                          background: '#f6f6f6', padding: '6px 10px', borderRadius: '20px', 
                          fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' 
                      }}>
                          {hospital.rating || '4.5'} <Star size={12} fill="#000" strokeWidth={0} />
                      </div>
                  </div>
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

      </div>
      <AmbulanceRequest />

      <style jsx>{`
          .nav-btn {
              background: #f6f6f6;
              border: none;
              border-radius: 50%;
              width: 36px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: background 0.2s;
              color: #000;
          }
          .nav-btn:hover {
              background: #e5e5e5;
          }
      `}</style>
    </main>
  );
}

function ProductCard({ title, time, price, onAdd, image }) {
    return (
        <div style={{ 
            minWidth: '200px', 
            background: 'transparent', 
            cursor: 'pointer',
            flexShrink: 0
        }} onClick={onAdd}>
            <div style={{ 
                height: '140px', background: '#f6f6f6', borderRadius: '12px', 
                marginBottom: '10px', overflow: 'hidden', position: 'relative' 
            }}>
                {image ? (
                    <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                ) : (
                    <Activity size={40} color="#ccc" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                )}
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#000', marginBottom: '4px' }}>{title}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#555' }}>
                 <span>{price}</span>
                 <span style={{ width: '4px', height: '4px', background: '#ccc', borderRadius: '50%' }}></span>
                 <span><Clock size={12} style={{ display: 'inline', marginRight: '4px' }}/>{time}</span>
            </div>
        </div>
    );
}
