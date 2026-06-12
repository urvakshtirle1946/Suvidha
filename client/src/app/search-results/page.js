'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Stethoscope, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { apiFetch } from '@/utils/api';

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
      // Find the first matching clinic offering this test (cheapest/first match)
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
        
        // Add to cart
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
      
      // Redirect directly to checkout
      router.push('/checkout');
    } catch (err) {
      console.error('Error during direct checkout booking redirect:', err);
      router.push('/checkout');
    } finally {
      setBookingIndex(null);
    }
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
            Tests
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
            }}
          >
            Doctors
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
                          justifyContent: 'space-between',
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
                            justifyContent: 'center',
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
          /* Doctors Tab Empty State */
          <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '24px',
            padding: '4rem 2rem',
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
              color: '#000000',
              marginBottom: '1.5rem',
            }}>
              <Stethoscope size={28} />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
              Doctors Coming Soon
            </h3>

            <p style={{ fontSize: '0.925rem', color: '#6b7280', lineHeight: '1.6', margin: 0 }}>
              We&apos;re onboarding top medical doctors in Indore. Stay tuned.
            </p>
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
