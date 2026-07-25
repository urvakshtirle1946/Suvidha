'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Stethoscope, Sparkles, AlertCircle, ArrowRight, ExternalLink, Star, MapPin, Award } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { apiFetch } from '@/utils/api';
import { redirectToPracto, getPractoUrl } from '@/utils/practo';

const RECOMMENDED_DOCTORS = [
  {
    name: 'Dr. Anjali Sharma',
    specialty: 'Cardiologist',
    hospital: 'CHL Hospital, Indore',
    experience: '14 yrs exp',
    rating: 4.9,
    reviews: 312,
    img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80',
    tag: 'Heart Specialist',
    fee: '₹800',
  },
  {
    name: 'Dr. Rohan Mehta',
    specialty: 'Orthopedic Surgeon',
    hospital: 'Bombay Hospital, Indore',
    experience: '11 yrs exp',
    rating: 4.8,
    reviews: 278,
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    tag: 'Bone & Joint Specialist',
    fee: '₹700',
  },
  {
    name: 'Dr. Priya Nair',
    specialty: 'Neurologist',
    hospital: 'Shalby Hospital, Indore',
    experience: '9 yrs exp',
    rating: 4.7,
    reviews: 194,
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    tag: 'Brain & Spine Specialist',
    fee: '₹900',
  },
  {
    name: 'Dr. Sameer Joshi',
    specialty: 'Dermatologist',
    hospital: 'Eureka Hospital, Indore',
    experience: '7 yrs exp',
    rating: 4.8,
    reviews: 241,
    img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
    tag: 'Skin & Hair Specialist',
    fee: '₹600',
  },
  {
    name: 'Dr. Meena Gupta',
    specialty: 'Pediatrician',
    hospital: 'Gokuldas Hospital, Indore',
    experience: '16 yrs exp',
    rating: 4.9,
    reviews: 389,
    img: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80',
    tag: 'Child Specialist',
    fee: '₹500',
  },
  {
    name: 'Dr. Vikram Patel',
    specialty: 'Diabetologist',
    hospital: 'City Home Pvt. Ltd., Indore',
    experience: '12 yrs exp',
    rating: 4.6,
    reviews: 167,
    img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    tag: 'Diabetes Specialist',
    fee: '₹650',
  },
];

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  
  const [activeTab, setActiveTab] = useState('tests'); // 'tests' or 'doctors'
  const [suggestions, setSuggestions] = useState([]);
  const [symptomsQuery, setSymptomsQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookingIndex, setBookingIndex] = useState(null); // Tracks active loading state per card

  useEffect(() => {
    // Load from sessionStorage exclusively
    try {
      const storedQuery = sessionStorage.getItem('ai_query') || searchParams.get('symptoms') || '';
      const storedSuggestions = sessionStorage.getItem('ai_suggestions');
      
      setSymptomsQuery(storedQuery);
      if (storedSuggestions) {
        setSuggestions(JSON.parse(storedSuggestions));
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error('Error loading suggestions from sessionStorage:', err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  const handleComparePricesClick = async (testName, cardIndex) => {
    if (bookingIndex !== null) return;
    setBookingIndex(cardIndex);

    try {
      const res = await apiFetch(`/api/services?search=${encodeURIComponent(testName)}&limit=1`);
      if (!res.ok) throw new Error('Failed to fetch clinics');
      const data = await res.json();
      
      const serviceList = Array.isArray(data) 
        ? data 
        : (data && Array.isArray(data.data) ? data.data : []);

      if (serviceList.length > 0) {
        const service = serviceList[0];
        const price = parseFloat(service.discount_price || service.price);
        const mrp = parseFloat(service.price);
        
        addToCart({
          ...service,
          quantity: 1,
          hospitalId: service.hospital_id || service.id,
          price,
          mrp
        });
      } else {
        console.warn(`No clinics found for ${testName}. Redirecting to checkout.`);
      }
      
      router.push('/checkout');
    } catch (err) {
      console.error('Error during direct checkout booking redirect:', err);
      router.push('/checkout');
    } finally {
      setBookingIndex(null);
    }
  };

  const handleDoctorClick = (specialty) => {
    redirectToPracto(specialty);
  };

  return (
    <main style={{ paddingBottom: '100px', background: '#f4f6fb', minHeight: '100vh', fontFamily: 'var(--font-outfit)' }}>
      <Navbar />

      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 2rem)' }}>
        
        {/* Symptoms Query Header */}
        {symptomsQuery && (
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            marginBottom: '2rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <Sparkles size={16} color="#000" />
              <span style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#000', letterSpacing: '0.05em' }}>
                Zelp Diagnostic Symptom Analysis
              </span>
            </div>
            <h2 style={{ fontSize: '1.2rem', color: '#111827', margin: 0, fontWeight: '700', lineHeight: '1.4' }}>
              &ldquo;{symptomsQuery}&rdquo;
            </h2>
          </div>
        )}

        {/* Tab Selection */}
        <div style={{
          display: 'flex',
          gap: '12px',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '12px',
          marginBottom: '2rem',
        }}>
          <button
            onClick={() => setActiveTab('tests')}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: 'none',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              background: activeTab === 'tests' ? '#000' : 'transparent',
              color: activeTab === 'tests' ? '#fff' : '#6b7280',
              transition: 'all 0.2s',
            }}
          >
            Recommended Tests
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: 'none',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              background: activeTab === 'doctors' ? '#000' : 'transparent',
              color: activeTab === 'doctors' ? '#fff' : '#6b7280',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Specialist Doctors
            <span style={{ background: '#2563eb', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '10px' }}>
              Practo
            </span>
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'tests' ? (
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem' }}>
                <div style={{ display: 'inline-block', width: '30px', height: '30px', border: '3px solid #e5e7eb', borderTopColor: '#a855f7', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <p style={{ color: '#6b7280', marginTop: '1rem' }}>Loading recommendations...</p>
              </div>
            ) : suggestions.length > 0 ? (
              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '1.2rem', fontWeight: '700' }}>
                  Suggested Diagnostic Screenings
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                  {suggestions.map((item, index) => {
                    const isBookingThisCard = bookingIndex === index;

                    return (
                      <div
                        key={index}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '20px',
                          padding: '1.5rem',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                          display: 'flex',
                          flexDirection: 'column',
                          justify: 'space-between',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
                        }}
                      >
                        <div>
                          {/* AI Badge */}
                          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
                            <span style={{
                              background: '#000000',
                              color: '#ffffff',
                              fontSize: '0.7rem',
                              fontWeight: '800',
                              padding: '4px 10px',
                              borderRadius: '12px',
                              letterSpacing: '0.04em',
                              textTransform: 'uppercase',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                            }}>
                              <Sparkles size={10} fill="#fff" /> Zelp Suggested
                            </span>
                          </div>

                          {/* Title */}
                          <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827', marginBottom: '0.75rem' }}>
                            {item.test}
                          </h4>

                          {/* Description */}
                          <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                            {item.reason}
                          </p>
                        </div>

                        {/* Direct Booking Redirect Action Button */}
                        <button
                          onClick={() => handleComparePricesClick(item.test, index)}
                          disabled={bookingIndex !== null}
                          style={{
                            background: '#000',
                            color: '#fff',
                            border: 'none',
                            padding: '0.8rem 1.5rem',
                            borderRadius: '12px',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            cursor: bookingIndex !== null ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justify: 'center',
                            gap: '6px',
                            transition: 'background-color 0.2s',
                            width: '100%',
                          }}
                          onMouseEnter={e => {
                            if (bookingIndex === null) e.currentTarget.style.background = '#333';
                          }}
                          onMouseLeave={e => {
                            if (bookingIndex === null) e.currentTarget.style.background = '#000';
                          }}
                        >
                          {isBookingThisCard ? (
                            <>
                              <div style={{ width: '16px', height: '16px', border: '2px solid #fff', borderTopColor: '#a855f7', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                              Adding test...
                            </>
                          ) : (
                            <>Book Diagnostic Test <ArrowRight size={16} /></>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Graceful coming soon / empty fallback state */
              <div style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '24px',
                padding: '3rem 2rem',
                textAlign: 'center',
                maxWidth: '600px',
                margin: '2rem auto',
                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#f3f4f6',
                  color: '#a855f7',
                  marginBottom: '1.5rem',
                }}>
                  <AlertCircle size={28} />
                </div>
                
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '0.75rem' }}>
                  AI Suggestions coming soon
                </h3>
                
                <p style={{ fontSize: '0.925rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '2rem' }}>
                  We are currently polishing our AI algorithms to offer more precise suggestions. 
                  In the meantime, you can search for standard tests like <strong>MRI</strong>, <strong>X-Ray</strong>, or <strong>CBC Blood Tests</strong> directly from our homepage.
                </p>
                
                <button
                  onClick={() => router.push('/')}
                  style={{
                    background: '#000',
                    color: '#fff',
                    border: 'none',
                    padding: '0.8rem 2rem',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#333'}
                  onMouseLeave={e => e.currentTarget.style.background = '#000'}
                >
                  Go to Home Page
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Doctors Tab with Practo Specialist Cards */
          <div>
            <div style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '16px',
              padding: '1.2rem 1.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1e3a8a', margin: '0 0 4px 0' }}>
                  Consult Recommended Specialists on Practo
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#1e40af' }}>
                  Click any doctor card to open verified specialist consultations directly on Practo.
                </p>
              </div>
              <span style={{
                background: '#2563eb',
                color: '#fff',
                fontWeight: '700',
                fontSize: '0.8rem',
                padding: '6px 14px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                Practo Direct Connect <ExternalLink size={14} />
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}>
              {RECOMMENDED_DOCTORS.map((doc, idx) => (
                <div
                  key={idx}
                  onClick={() => handleDoctorClick(doc.specialty)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 99, 235, 0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
                  }}
                >
                  <div>
                    {/* Doctor Image & Badge */}
                    <div style={{ position: 'relative', height: '170px', background: '#f8fafc' }}>
                      <img
                        src={doc.img}
                        alt={doc.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                      />
                      <div style={{
                        position: 'absolute', top: '12px', left: '12px',
                        background: '#000', color: '#fff',
                        fontSize: '0.68rem', fontWeight: '700',
                        padding: '4px 10px', borderRadius: '12px',
                      }}>
                        {doc.tag}
                      </div>
                      <div style={{
                        position: 'absolute', top: '12px', right: '12px',
                        background: '#2563eb', color: '#fff',
                        fontSize: '0.65rem', fontWeight: '700',
                        padding: '3px 8px', borderRadius: '12px',
                        display: 'flex', alignItems: 'center', gap: '3px',
                      }}>
                        Practo <ExternalLink size={10} />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: '1.2rem' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827', margin: '0 0 2px 0' }}>
                        {doc.name}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: '700', margin: '0 0 6px 0' }}>
                        {doc.specialty}
                      </p>
                      <p style={{ fontSize: '0.78rem', color: '#6b7280', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} color="#9ca3af" />
                        {doc.hospital}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.8rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Star size={14} fill="#f59e0b" color="#f59e0b" />
                          <span style={{ fontWeight: '700', fontSize: '0.85rem', color: '#111827' }}>{doc.rating}</span>
                          <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>({doc.reviews})</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: '600', background: '#f1f5f9', padding: '3px 8px', borderRadius: '8px' }}>
                          {doc.experience}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Practo CTA footer */}
                  <div style={{
                    background: '#f8fafc',
                    borderTop: '1px solid #e2e8f0',
                    padding: '0.8rem 1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    fontSize: '0.85rem',
                    color: '#2563eb',
                    fontWeight: '700',
                  }}>
                    <span>Consult on Practo</span>
                    <ExternalLink size={15} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: '10rem' }}>
        <p>Loading Zelp search results...</p>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
