'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import { useCart } from '@/context/CartContext';
import { ChevronDown, ShoppingCart, MapPin, Search, X } from 'lucide-react';
import LocationModal from './LocationModal';
import SettingsModal from './SettingsModal';
import ProfileDropdown from './ProfileDropdown';
import AuthModal from './AuthModal';
import SterlingGateKineticNavigation from './ui/SterlingGateKineticNavigation';
import PartnerModal from './PartnerModal';
import { apiFetch } from '@/utils/api';

export default function Navbar() {
  const { user } = useAuth();
  const { location, setLocation, detectLocation } = useLocation();
  const { setIsCartOpen, cartCount } = useCart();
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    const handler = () => setPartnerModalOpen(true);
    window.addEventListener('open-partner-modal', handler);
    return () => window.removeEventListener('open-partner-modal', handler);
  }, []);

  // Search State
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const navbarSearchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarSearchRef.current && !navbarSearchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);


  const SUGGESTED_SEARCHES = [
    { name: 'Full Body Checkup', type: 'Package' },
    { name: 'Cardiology', type: 'Specialty' },
    { name: 'Diabetes', type: 'Specialty' },
    { name: 'MRI Scan', type: 'Scan' },
    { name: 'X-Ray', type: 'Scan' },
    { name: 'Blood Test', type: 'Pathology' }
  ];

  const TALLY_URL = "https://tally.so/embed/Y5OjLz?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1";

  useEffect(() => {
    if (user && authModalOpen) {
      setAuthModalOpen(false);
    }
  }, [user, authModalOpen]);

  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return undefined;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      setIsSearching(true);

      try {
        const res = await apiFetch(
          `/api/services?search=${encodeURIComponent(searchQuery)}&limit=5`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        setSearchResults(Array.isArray(data) ? data : (data.data || []));
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Search error:', error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  const handleOpenAuth = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSelect = (serviceName) => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchFocused(false);
    router.push(`/hospitals?search=${encodeURIComponent(serviceName)}`);
  };

  const handleAISearchClick = async (query) => {
    if (!query || !query.trim()) return;
    setIsSearching(true);
    try {
      const response = await apiFetch('/api/symptoms/suggest', {
        method: 'POST',
        body: JSON.stringify({ symptoms: query }),
      });
      if (!response.ok) throw new Error('Failed to fetch symptom suggestions');
      const data = await response.json();
      const suggestions = data.suggestions || [];
      sessionStorage.setItem('ai_suggestions', JSON.stringify(suggestions));
      sessionStorage.setItem('ai_query', query);
      router.push(`/search-results?symptoms=${encodeURIComponent(query.trim())}`);
    } catch (err) {
      console.error('Error fetching symptom suggestions:', err);
      sessionStorage.setItem('ai_suggestions', JSON.stringify([]));
      sessionStorage.setItem('ai_query', query);
      router.push(`/search-results?symptoms=${encodeURIComponent(query.trim())}`);
    } finally {
      setIsSearching(false);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  return (
    <>
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, 
        height: 'var(--header-height)', background: '#fff', borderBottom: '1px solid #e5e7eb',
        display: 'flex', alignItems: 'center'
      }}>
        <div className="container nav-content" style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
          
          {/* Kinetic Navigation Trigger (Desktop) */}
          <div className="hide-on-mobile" style={{ marginRight: '1rem' }}>
            <SterlingGateKineticNavigation onOpenAuth={handleOpenAuth} onOpenPartner={() => setPartnerModalOpen(true)} />
          </div>

          <div className="mobile-header-stack show-on-mobile" style={{ 
              width: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '8px 0',
              gap: '8px'
          }}>
            {/* 1. Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <span style={{ 
                    fontSize: '1.4rem', fontWeight: '800', color: '#000', 
                    letterSpacing: '-1px', fontFamily: 'var(--font-outfit), sans-serif', lineHeight: 1
                }}>
                    Zelp
                </span>
            </Link>

            {/* 2. Location Selector (Compact) */}
            <div 
                onClick={() => setLocationModalOpen(true)}
                style={{ 
                    display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer',
                    flexShrink: 0, background: 'transparent'
                }}
            >
                <MapPin size={14} color="#000" />
                <span style={{ 
                    fontWeight: 'bold', fontSize: '0.78rem', color: '#374151', 
                    maxWidth: '60px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' 
                }}>
                    {location ? location.split(',')[0] : 'Location'}
                </span>
                <ChevronDown size={12} color="#374151" />
            </div>

            {/* 3. Search Bar */}
            <div ref={navbarSearchRef} style={{ position: 'relative', flex: 1, minWidth: 0 }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: '#f3f4f6', borderRadius: '20px', padding: '6px 10px',
                    border: isSearchFocused ? '1px solid #000' : '1px solid transparent', 
                    transition: 'all 0.2s'
                }}>
                    <Search size={14} color="#6b7280" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setIsSearchFocused(true)}
                        style={{
                            background: 'transparent', border: 'none', outline: 'none',
                            width: '100%', fontSize: '0.8rem', color: '#374151'
                        }}
                    />
                </div>

                {/* Dropdown for search suggestions */}
                {isSearchFocused && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      left: '-40px',
                      right: '-40px',
                      background: '#ffffff',
                      borderRadius: '16px',
                      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.15)',
                      border: '1px solid #e5e7eb',
                      zIndex: 2000,
                      overflow: 'hidden',
                      maxHeight: '320px',
                      overflowY: 'auto',
                    }}
                  >
                    {isSearching ? (
                      <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '0.8rem' }}>
                        <div style={{ width: '14px', height: '14px', border: '2px solid #e5e7eb', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                        Searching...
                      </div>
                    ) : (
                      <>
                        {searchQuery.length < 2 ? (
                          <div>
                            <div style={{ padding: '8px 12px 4px 12px', fontSize: '0.65rem', fontWeight: '800', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Suggested
                            </div>
                            {SUGGESTED_SEARCHES.map((item, idx) => (
                              <div
                                key={idx}
                                onMouseDown={() => handleSearchSelect(item.name)}
                                style={{ padding: '8px 12px', fontSize: '0.8rem', color: '#374151', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                              >
                                <span>{item.name}</span>
                                <span style={{ fontSize: '0.65rem', background: '#f3f4f6', color: '#6b7280', padding: '1px 5px', borderRadius: '3px' }}>{item.type}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div>
                            {searchResults.length > 0 ? (
                              <div>
                                <div style={{ padding: '8px 12px 4px 12px', fontSize: '0.65rem', fontWeight: '800', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                  Services
                                </div>
                                {searchResults.map((item, idx) => (
                                  <div
                                    key={idx}
                                    onMouseDown={() => handleSearchSelect(item.name)}
                                    style={{ padding: '8px 12px', fontSize: '0.8rem', color: '#374151', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                  >
                                    <span>{item.name}</span>
                                    <span style={{ fontSize: '0.65rem', color: '#9ca3af' }}>{item.category}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div style={{ padding: '10px 12px', fontSize: '0.8rem', color: '#6b7280' }}>
                                No results.
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}

                    {searchQuery.trim().length > 0 && (
                      <div
                        onMouseDown={() => handleAISearchClick(searchQuery)}
                        style={{
                          padding: '10px 12px',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)',
                          borderTop: '1px solid #f3f4f6',
                          color: '#7c3aed',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <span>✨ Ask AI: &ldquo;{searchQuery}&rdquo;</span>
                      </div>
                    )}
                  </div>
                )}
            </div>

            {/* 4. Profile Button */}
            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {user ? (
                  <div 
                    onClick={() => setSettingsModalOpen(true)}
                    style={{ 
                        fontSize: '0.9rem', color: '#ef4444', fontWeight: '600', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '30px', height: '30px', borderRadius: '50%', border: '2px solid #ef4444'
                    }}
                  >
                      {(user.name || 'User').charAt(0).toUpperCase()}
                  </div>
              ) : (
                  <button 
                      onClick={handleOpenAuth}
                      style={{ 
                          background: 'transparent', border: '1px solid #000000', color: '#000000', 
                          padding: '4px 10px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.78rem'
                      }}
                  >
                      Sign In
                  </button>
              )}
            </div>
          </div>

          {/* Logo & Location (Desktop) */}
          <div className="hide-on-mobile desktop-header-elements" style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1, paddingLeft: '1rem', height: '100%' }}>
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', height: '100%' }}>
                  <span style={{ 
                      fontSize: '1.8rem', fontWeight: '800', color: '#000', 
                      letterSpacing: '-1.5px', fontFamily: 'var(--font-outfit), sans-serif', 
                      lineHeight: 'var(--header-height)', display: 'inline-block'
                  }}>
                      Zelp
                  </span>
              </Link>
              
              <div className="hide-on-mobile" style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%' }}>
                   <div 
                      onClick={() => setLocationModalOpen(true)}
                      style={{ 
                          display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer',
                          padding: '0.5rem', borderRadius: '8px', background: 'transparent', transition: 'background 0.2s',
                          height: 'fit-content'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                   >
                        <MapPin size={18} color="#000" />
                        <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#1f2937', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {location || 'Select Location'}
                        </span>
                        <ChevronDown size={16} color="#1f2937" />
                   </div>
              </div>
          </div>

          {/* Nav Links - Desktop */}
          <div className="hide-on-mobile" style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginRight: '1rem', height: '100%' }}>
             <Link href="/" style={{ fontWeight: '500', color: '#1f2937', height: '100%', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>Home</Link>
             <Link href="/hospitals" style={{ fontWeight: '500', color: '#1f2937', height: '100%', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>Services</Link>
             <span onClick={() => setPartnerModalOpen(true)} style={{ fontWeight: '500', color: '#1f2937', height: '100%', display: 'flex', alignItems: 'center', textDecoration: 'none', cursor: 'pointer' }}>Partner with Us</span>
          </div>
          
          {/* Right Actions (Desktop) */}
          <div className="hide-on-mobile desktop-header-elements" style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingRight: '1rem' }}>


              <div className="hide-on-mobile" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  {user ? (
                      <ProfileDropdown onOpenSettings={() => setSettingsModalOpen(true)} />
                  ) : (
                      <button 
                          onClick={handleOpenAuth}
                          style={{ 
                              background: 'transparent', border: '1px solid #000000', color: '#000000', 
                              padding: '8px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer',
                              transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#000000'; e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#000000'; }}
                      >
                          Login / Sign Up
                      </button>
                  )}
              </div>
              
              {/* Desktop Cart */}
              <button 
                  className="btn btn-primary hide-on-mobile" 
                  onClick={() => setIsCartOpen(true)}
                  style={{ borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem' }}
              >
                  <ShoppingCart size={18} /> 
                  <span>My Cart</span>
                  {cartCount > 0 && (
                      <span style={{ 
                          background: '#fff', color: '#000', borderRadius: '50%', 
                          width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.75rem', fontWeight: 'bold'
                      }}>
                          {cartCount}
                      </span>
                  )}
              </button>
          </div>
        </div>
      </nav>

      {/* Location Modal */}
      <LocationModal 
        isOpen={locationModalOpen} 
        onClose={() => setLocationModalOpen(false)}
        onDetectLocation={detectLocation}
        onSelectLocation={(city) => setLocation(city)}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        mode={authMode}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />

      {/* Partner Modal */}
      <PartnerModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />

    </>
  );
}
