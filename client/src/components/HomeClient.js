'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Activity, 
  TestTube, 
  Bone, 
  Baby, 
  Brain, 
  Eye, 
  Smile, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Star,
  Ambulance 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getApiUrl, getImageUrl } from '@/utils/api';
import BookingModal from './BookingModal';
import HospitalProfileModal from './HospitalProfileModal';
import PaymentReminder from './PaymentReminder';
import AmbulanceRequest from './AmbulanceRequest';

export default function HomeClient({ hospitals, popularServices }) {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedHospitalForProfile, setSelectedHospitalForProfile] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const categorySliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollCategory = (direction) => {
    if (categorySliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      categorySliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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

  const handleHospitalClick = async (hospital) => {
      try {
          const apiUrl = getApiUrl();
          // Visual feedback
          document.body.style.cursor = 'wait';
          const res = await fetch(`${apiUrl}/api/hospitals/${hospital.id}`);
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

  // Categories with assigned images to match the movie card aesthetic
  const CATEGORIES = [
      { name: 'Cardiology', desc: 'Heart & Blood Pressure Care', icon: <Heart size={50} color="rgba(255,255,255,0.3)" />, color: '#ff6b6b', href: '/hospitals?specialty=Cardiologist', img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80', rating: '4.8', votes: '1.2K' },
      { name: 'Radiology', desc: 'Detailed Scans & X-Rays', icon: <Activity size={50} color="rgba(255,255,255,0.3)" />, color: '#a55eea', href: '/hospitals?category=Scan', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80', rating: '4.7', votes: '850+' },
      { name: 'Pathology', desc: 'Precision Lab Tests', icon: <TestTube size={50} color="rgba(255,255,255,0.3)" />, color: '#fd9644', href: '/lab-tests', img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80', rating: '4.9', votes: '2K+' },
      { name: 'Orthopedic', desc: 'Bone & Joint Health', icon: <Bone size={50} color="rgba(255,255,255,0.3)" />, color: '#5f27cd', href: '/hospitals?specialty=Orthopedic', img: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=400&q=80', rating: '4.6', votes: '920+' },
      { name: 'Pediatric', desc: 'Gentle Child Care', icon: <Baby size={50} color="rgba(255,255,255,0.3)" />, color: '#ff9ff3', textColor: '#1f2937', href: '/hospitals?specialty=Pediatrician', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80', rating: '4.9', votes: '3.1K' },
      { name: 'Neurology', desc: 'Advanced Brain Care', icon: <Brain size={50} color="rgba(255,255,255,0.3)" />, color: '#54a0ff', href: '/hospitals?specialty=Neurologist', img: 'https://images.unsplash.com/photo-1559757175-9b2446f2cbec?auto=format&fit=crop&w=400&q=80', rating: '4.8', votes: '500+' },
      { name: 'Eye Care', desc: 'Vision Specialists', icon: <Eye size={50} color="rgba(255,255,255,0.3)" />, color: '#1dd1a1', href: '/hospitals?specialty=Ophthalmologist', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80', rating: '4.5', votes: '1.1K' },
      { name: 'Dermatology', desc: 'Skin & Hair Treatments', icon: <Smile size={50} color="rgba(255,255,255,0.3)" />, color: '#00d2d3', href: '/hospitals?specialty=Dermatologist', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80', rating: '4.7', votes: '640+' },
      { name: 'Diabetes', desc: 'Sugar Level Management', icon: <Activity size={50} color="rgba(255,255,255,0.3)" />, color: '#ee5253', href: '/hospitals?specialty=Diabetes', img: 'https://images.unsplash.com/photo-1505576391780-c1f1cf1a8e&auto=format&fit=crop&w=400&q=80', rating: '4.6', votes: '780+' },
      { name: 'Surgeries', desc: 'Expert Operations', icon: <Activity size={50} color="rgba(255,255,255,0.3)" />, color: '#ff9f43', href: '/hospitals?category=Surgery', img: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&w=400&q=80', rating: '4.9', votes: '1.5K' },
      { name: 'Physiotherapy', desc: 'Rehab & Recovery', icon: <Activity size={50} color="rgba(255,255,255,0.3)" />, color: '#10ac84', href: '/hospitals?specialty=Physiotherapy', img: 'https://images.unsplash.com/photo-1599552175960-b6ab71424b61?auto=format&fit=crop&w=400&q=80', rating: '4.7', votes: '430+' },
      { name: 'Counseling', desc: 'Mental Health Support', icon: <Smile size={50} color="rgba(255,255,255,0.3)" />, color: '#f368e0', href: '/hospitals?specialty=Psychotherapy', img: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=400&q=80', rating: '4.8', votes: '1.8K' },
  ];

  return (
    <main style={{ paddingBottom: '100px', background: '#f4f6fb', minHeight: '100vh' }}>
      
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>

        {/* Offers Slider */}
        <div style={{
            position: 'relative',
            borderRadius: '16px',
            marginBottom: '3rem',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0, 0.1)',
            height: 'clamp(200px, 40vh, 300px)'
        }}>
            {OFFERS.map((offer, index) => (
                <div key={offer.id} style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: offer.bg,
                    padding: 'clamp(1.5rem, 5vw, 3rem)', // Responsive padding
                    color: '#fff',
                    opacity: currentSlide === index ? 1 : 0,
                    transition: 'opacity 0.8s ease-in-out',
                    zIndex: currentSlide === index ? 2 : 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 8vw, 3rem)', maxWidth: '600px', marginBottom: '0.5rem', color: '#fff', lineHeight: '1.2' }}>
                        {offer.title}
                    </h1>
                    <p style={{ fontSize: 'clamp(0.9rem, 4vw, 1.2rem)', opacity: 0.9, marginBottom: '1.5rem' }}>
                        {offer.subtitle}
                    </p>
                    <button className="btn" style={{ background: '#fff', color: offer.btnColor, padding: '0.6rem 1.5rem', fontSize: '1rem', width: 'fit-content' }}>
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

        {/* Categories Slide Grid (Movie Cards Style) */}
        <div style={{ position: 'relative', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.2rem' }}>
                <h2 style={{ fontSize: 'clamp(1.4rem, 5vw, 1.8rem)', fontWeight: 'bold', margin: 0, color: '#111827' }}>
                    Shop by Category
                </h2>
                <Link href="/services" style={{ color: '#db2777', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    See All <span style={{ fontSize: '1.1rem' }}>›</span>
                </Link>
            </div>

            <div style={{ position: 'relative' }}>
                <div 
                    ref={categorySliderRef}
                    style={{ 
                        display: 'flex', 
                        gap: '1.2rem', 
                        overflowX: 'auto', 
                        paddingBottom: '1rem', 
                        paddingRight: '2rem',
                        scrollbarWidth: 'none',
                        scrollBehavior: 'smooth',
                        WebkitOverflowScrolling: 'touch'
                    }}
                    className="hide-scrollbar"
                >
                    {CATEGORIES.map((cat, index) => (
                        <Link key={index} href={cat.href} style={{ textDecoration: 'none', display: 'block' }}>
                            <div 
                                style={{ 
                                    width: '180px', 
                                    flexShrink: 0, 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease-out'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                {/* Image Card with Gradient & Rating Overlay */}
                                <div style={{ 
                                    position: 'relative', 
                                    width: '180px', 
                                    height: '260px', 
                                    borderRadius: '12px', 
                                    overflow: 'hidden',
                                    backgroundColor: cat.color,
                                    marginBottom: '0.8rem',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                }}>
                                    {cat.img ? (
                                        <img 
                                            src={cat.img} 
                                            alt={cat.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {cat.icon}
                                        </div>
                                    )}
                                    <div style={{ 
                                        position: 'absolute', 
                                        bottom: 0, 
                                        left: 0, 
                                        right: 0, 
                                        padding: '16px 10px 8px 10px', 
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)', 
                                        color: 'white', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '6px' 
                                    }}>
                                        <Star size={14} color="#ef4444" fill="#ef4444" /> 
                                        <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{cat.rating}/5</span>
                                        <span style={{ fontSize: '0.75rem', opacity: 0.8, marginLeft: 'auto' }}>{cat.votes} Votes</span>
                                    </div>
                                </div>
                                
                                {/* Text Info Below Card */}
                                <div>
                                    <h3 style={{ 
                                        fontSize: '1rem', 
                                        fontWeight: '700', 
                                        margin: '0 0 2px 0', 
                                        color: '#1f2937', 
                                        whiteSpace: 'nowrap', 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis' 
                                    }}>
                                        {cat.name}
                                    </h3>
                                    <p style={{ 
                                        fontSize: '0.85rem', 
                                        color: '#6b7280', 
                                        margin: 0,
                                        whiteSpace: 'nowrap', 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {cat.desc}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Floating Left Arrow Overlay */}
                <button 
                    onClick={(e) => { e.preventDefault(); scrollCategory('left'); }}
                    style={{ 
                        position: 'absolute',
                        left: '-15px',
                        top: '40%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.6)', 
                        border: 'none', 
                        borderRadius: '50%', 
                        width: '40px', 
                        height: '40px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        cursor: 'pointer', 
                        color: 'white',
                        zIndex: 10,
                        backdropFilter: 'blur(4px)',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                        transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Floating Right Arrow Overlay */}
                <button 
                    onClick={(e) => { e.preventDefault(); scrollCategory('right'); }}
                    style={{ 
                        position: 'absolute',
                        right: '-15px',
                        top: '40%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.6)', 
                        border: 'none', 
                        borderRadius: '50%', 
                        width: '40px', 
                        height: '40px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        cursor: 'pointer', 
                        color: 'white',
                        zIndex: 10,
                        backdropFilter: 'blur(4px)',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                        transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>

        {/* Popular Section (Horizontal Scroll with Controls) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.2rem, 5vw, 1.5rem)', margin: 0 }}>Popular Lab Tests</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                    onClick={() => scroll('left')}
                    style={{ 
                        background: '#fff', border: '1px solid #e5e7eb', borderRadius: '50%', 
                        width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#374151'
                    }}
                >
                    <ChevronLeft size={20} />
                </button>
                <button 
                    onClick={() => scroll('right')}
                    style={{ 
                        background: '#fff', border: '1px solid #e5e7eb', borderRadius: '50%', 
                        width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#374151'
                    }}
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>

        <div 
            ref={sliderRef}
            style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                overflowX: 'auto', 
                paddingBottom: '1rem', 
                scrollbarWidth: 'none',
                scrollBehavior: 'smooth'
            }}
        >
            {popularServices.map((service) => (
                <ProductCard 
                    key={service.id}
                    title={service.name} 
                    time="Reports in 24 hrs" 
                    image={getImageUrl(service.image_url || service.hospital_image)}
                    price={`₹${service.discount_price || service.price}`}
                    oldPrice={service.discount_price ? `₹${service.price}` : `₹${Math.round(service.price * 1.5)}`}
                    discount={service.discount_price ? `${Math.round(((service.price - service.discount_price) / service.price) * 100)}% OFF` : "Limited Offer"}
                    onAdd={() => {
                        const price = parseFloat(service.discount_price || service.price);
                        const mrp = parseFloat(service.price);
                        addToCart({ ...service, quantity: 1, hospital_name: service.hospital_name || 'Popular Service', price, mrp });
                    }}
                />
            ))}
        </div>

        <BookingModal 
             isOpen={!!selectedProduct}
             onClose={() => setSelectedProduct(null)}
             service={selectedProduct}
        />

        {/* Featured Hospitals Section */}
        <h2 style={{ marginTop: '4rem', marginBottom: '1.5rem', fontSize: 'clamp(1.2rem, 5vw, 1.5rem)' }}>Featured Hospitals</h2>
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '1.5rem', 
            marginBottom: '4rem' 
        }}>
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
                          crossOrigin="anonymous"
                          src={getImageUrl(hospital.image_url) || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"} 
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
                   <p 
                      onClick={(e) => {
                         e.stopPropagation();
                         window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.location)}`, '_blank');
                      }}
                      style={{ fontSize: '0.9rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                      title="View on Google Maps"
                   >
                      <MapPin size={14} /> {hospital.location} (Get Directions)
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
              setSelectedProduct(service);
           }}
        />

      </div>
      <PaymentReminder />
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
