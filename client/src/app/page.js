'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';
import HospitalProfileModal from '@/components/HospitalProfileModal';
import { 
  Activity, Stethoscope, Building2, Pill, TestTube, Truck, 
  Heart, Baby, Brain, Bone, Eye, Smile, Star, MapPin
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedHospitalForProfile, setSelectedHospitalForProfile] = useState(null);

  // State for fetched data
  // State for fetched data
  const [hospitals, setHospitals] = useState([]);
  const [popularServices, setPopularServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hospitalsRes, servicesRes] = await Promise.all([
          fetch('http://localhost:5000/api/hospitals'),
          fetch('http://localhost:5000/api/services?limit=8')
        ]);

        const hospitalsData = await hospitalsRes.json();
        const servicesData = await servicesRes.json();

        setHospitals(hospitalsData);
        setPopularServices(servicesData);
      } catch (err) {
        console.error('Failed to fetch data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleHospitalClick = async (hospital) => {
      try {
          // Visual feedback
          document.body.style.cursor = 'wait';
          const res = await fetch(`http://localhost:5000/api/hospitals/${hospital.id}`);
          if (!res.ok) throw new Error('Failed to fetch details');
          const fullData = await res.json();
          setSelectedHospitalForProfile(fullData);
      } catch (err) {
          console.error("Error fetching hospital details:", err);
          // Fallback to basic data if fetch fails, though services will be missing
          setSelectedHospitalForProfile(hospital);
      } finally {
          document.body.style.cursor = 'default';
      }
  };

  // Categories with assigned colors to match the "Promo Card" aesthetic but smaller
  const CATEGORIES = [
      { name: 'Cardiology', desc: 'Heart Care', icon: <Heart size={50} color="rgba(255,255,255,0.3)" />, color: '#ff6b6b', href: '/hospitals?specialty=Cardiac' },
      { name: 'Orthopedic', desc: 'Bone Health', icon: <Bone size={50} color="rgba(255,255,255,0.3)" />, color: '#5f27cd', href: '/hospitals?specialty=Orthopedic' },
      { name: 'Pediatric', desc: 'Child Care', icon: <Baby size={50} color="rgba(255,255,255,0.3)" />, color: '#ff9ff3', textColor: '#1f2937', href: '/hospitals?specialty=Pediatric' },
      { name: 'Neurology', desc: 'Brain Care', icon: <Brain size={50} color="rgba(255,255,255,0.3)" />, color: '#54a0ff', href: '/hospitals?specialty=Neurology' },
      { name: 'Eye Care', desc: 'Vision', icon: <Eye size={50} color="rgba(255,255,255,0.3)" />, color: '#1dd1a1', href: '/hospitals?specialty=Eye' },
      { name: 'Dental', desc: 'Oral Health', icon: <Smile size={50} color="rgba(255,255,255,0.3)" />, color: '#f368e0', href: '/hospitals?specialty=Dentist' },
      { name: 'Diabetes', desc: 'Sugar Levels', icon: <Activity size={50} color="rgba(255,255,255,0.3)" />, color: '#ee5253', href: '/hospitals?specialty=Diabetes' },
      { name: 'Skin Care', desc: 'Dermatology', icon: <Smile size={50} color="rgba(255,255,255,0.3)" />, color: '#00d2d3', href: '/hospitals?specialty=Dermatology' },
      { name: 'Ayurveda', desc: 'Natural', icon: <Stethoscope size={50} color="rgba(255,255,255,0.3)" />, color: '#10ac84', href: '/hospitals?specialty=Ayurveda' },
      { name: 'Physiotherapy', desc: 'Recovery', icon: <Activity size={50} color="rgba(255,255,255,0.3)" />, color: '#ff9f43', href: '/hospitals?specialty=Physiotherapy' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const OFFERS = [
      {
          id: 1,
          title: "Healthcare at your fingertips.",
          subtitle: "Lab Tests • Medicines • Nursing • Doctor Visits",
          bg: "linear-gradient(to right, #0c831f, #33b249)", // Green
          btnText: "Book Now",
          btnColor: "#0c831f"
      },
      {
          id: 2,
          title: "50% OFF on Full Body Checkups",
          subtitle: "Includes 80+ Tests. Home Collection Available.",
          bg: "linear-gradient(to right, #2563eb, #60a5fa)", // Blue
          btnText: "View Package",
          btnColor: "#2563eb"
      },
      {
          id: 3,
          title: "Pharmacy: Flat 20% OFF",
          subtitle: "On all prescription medicines. fast delivery.",
          bg: "linear-gradient(to right, #db2777, #f472b6)", // Pink
          btnText: "Order Now",
          btnColor: "#db2777"
      }
  ];

  useEffect(() => {
      const timer = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % OFFERS.length);
      }, 5000);
      return () => clearInterval(timer);
  }, []);

  return (
    <main style={{ paddingBottom: '100px', background: '#f4f6fb', minHeight: '100vh' }}>
      <Navbar />
      
      {loading ? (
        <div style={{ 
            height: '80vh', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '1rem',
            color: '#6b7280'
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #3498db',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }}></div>
            <p>Loading Suvidha...</p>
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
      ) : (
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>

        {/* Offers Slider */}
        <div style={{
            position: 'relative',
            borderRadius: '16px',
            marginBottom: '3rem',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0, 0.1)',
            height: '300px'
        }}>
            {OFFERS.map((offer, index) => (
                <div key={offer.id} style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: offer.bg,
                    padding: '3rem',
                    color: '#fff',
                    opacity: currentSlide === index ? 1 : 0,
                    transition: 'opacity 0.8s ease-in-out',
                    zIndex: currentSlide === index ? 2 : 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <h1 style={{ fontSize: '3rem', maxWidth: '600px', marginBottom: '1rem', color: '#fff', lineHeight: '1.2' }}>
                        {offer.title}
                    </h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
                        {offer.subtitle}
                    </p>
                    <button className="btn" style={{ background: '#fff', color: offer.btnColor, padding: '0.8rem 2rem', fontSize: '1.1rem', width: 'fit-content' }}>
                        {offer.btnText}
                    </button>
                    {/* Decorative Circles */}
                    <div style={{ position: 'absolute', right: '-50px', bottom: '-50px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', right: '150px', top: '-50px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                </div>
            ))}

            {/* Dots Indicators */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '10px',
                zIndex: 10
            }}>
                {OFFERS.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: currentSlide === index ? '#fff' : 'rgba(255,255,255,0.4)',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    />
                ))}
            </div>
        </div>

        {/* Categories Grid (Mini Promo Cards) */}
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Shop by Category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem', marginBottom: '4rem' }}>
             {CATEGORIES.map((cat, index) => (
                 <Link key={index} href={cat.href} style={{ textDecoration: 'none' }}>
                    <div style={{ 
                        background: `linear-gradient(135deg, ${cat.color}, ${cat.color}dd)`, 
                        borderRadius: '20px', 
                        padding: '1.5rem', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                        color: cat.textColor || '#fff',
                        position: 'relative',
                        overflow: 'hidden',
                        height: '180px', 
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
                    }}
                    >
                        <div style={{ zIndex: 1 }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', lineHeight: '1.2', fontWeight: 'bold' }}>{cat.name}</h3>
                            <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '1rem' }}>{cat.desc}</p>
                            
                            <span style={{ 
                                fontSize: '0.8rem', 
                                background: 'rgba(255,255,255,0.25)', 
                                backdropFilter: 'blur(4px)',
                                padding: '6px 12px', 
                                borderRadius: '10px',
                                fontWeight: '600',
                                border: '1px solid rgba(255,255,255,0.3)'
                            }}>
                                View More
                            </span>
                        </div>
                        
                        {/* Decorative Icon */}
                        <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', transform: 'rotate(-10deg)' }}>
                            {cat.icon}
                        </div>
                    </div>
                 </Link>
             ))}
        </div>

        {/* Popular Section (Horizontal Scroll) */}
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Popular Lab Tests</h2>
        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' }}>
            {popularServices.map((service) => (
                <ProductCard 
                    key={service.id}
                    title={service.name} 
                    time="Reports in 24 hrs" 
                    price={`₹${service.price}`}
                    oldPrice={service.discount_price ? `₹${service.discount_price}` : `₹${Math.round(service.price * 1.5)}`}
                    discount="Limited Offer"
                    onAdd={() => setSelectedProduct(service)}
                />
            ))}
        </div>

        <BookingModal 
             isOpen={!!selectedProduct}
             onClose={() => setSelectedProduct(null)}
             service={selectedProduct}
        />

        {/* Featured Hospitals Section */}
        <h2 style={{ marginTop: '4rem', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Featured Hospitals</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {hospitals.map((hospital) => (
              <div 
                key={hospital.id} 
                onClick={() => handleHospitalClick(hospital)}
                style={{ 
                  background: '#fff', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  cursor: 'pointer',
                  border: '1px solid #e5e7eb',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)' }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ height: '180px', background: '#f3f4f6', overflow: 'hidden' }}>
                    <img 
                        src={hospital.image_url || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"} 
                        alt={hospital.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        onError={(e) => e.target.src = "https://images.unsplash.com/photo-1586773860418-d3b97898c75c?auto=format&fit=crop&w=800&q=80"}
                    />
                </div>
                <div style={{ padding: '1.5rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>{hospital.name}</h3>
                      <div style={{ background: '#f0fdf4', color: '#166534', padding: '2px 8px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Star size={12} fill="#166534" /> {hospital.rating || '4.5'}
                      </div>
                   </div>
                   <p style={{ fontSize: '0.9rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} /> {hospital.location}
                   </p>
                   <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: '#db2777', fontWeight: '600' }}>Up to {hospital.discount_percentage || '10'}% OFF</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#111827' }}>View Services &gt;</span>
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
              setSelectedProduct({ ...service, name: `${service.name} at ${selectedHospitalForProfile.name}` });
           }}
        />

      </div>
      )}
    </main>
  );
}

function ProductCard({ title, time, price, oldPrice, discount, onAdd }) {
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
            <div style={{ height: '120px', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity size={40} color="#ccc" />
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
