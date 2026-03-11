'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import { useCart } from '@/context/CartContext';
import { ChevronDown, ShoppingCart, Menu, X, MapPin, Search } from 'lucide-react';
import { TextReveal } from './ui/text-reveal-animation';
import { ZelpLogo } from './ui/zelp-text-reveal';
import LocationModal from './LocationModal';
import SettingsModal from './SettingsModal';
import ProfileDropdown from './ProfileDropdown';
import AuthModal from './AuthModal';
import SterlingGateKineticNavigation from './ui/SterlingGateKineticNavigation';
import { getApiUrl } from '@/utils/api';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { location, setLocation, detectLocation } = useLocation();
  const { setIsCartOpen, cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  // Search State
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);

  const SUGGESTED_SEARCHES = [
    { name: 'Full Body Checkup', type: 'Package' },
    { name: 'Cardiology', type: 'Specialty' },
    { name: 'Diabetes', type: 'Specialty' },
    { name: 'MRI Scan', type: 'Scan' },
    { name: 'Blood Test', type: 'Pathology' }
  ];

  useEffect(() => {
    if (user && authModalOpen) {
      setAuthModalOpen(false);
    }
  }, [user, authModalOpen]);



  const handleOpenAuth = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const fetchSearchResults = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const res = await fetch(`${getApiUrl()}/api/services?search=${encodeURIComponent(query)}&limit=5`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(Array.isArray(data) ? data : (data.data || []));
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    
    if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
        fetchSearchResults(val);
    }, 300);
  };

  const handleSearchSelect = (serviceName) => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchFocused(false);
    router.push(`/hospitals?search=${encodeURIComponent(serviceName)}`);
  };

  return (
    <>
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, 
        height: 'var(--header-height)', background: '#fff', borderBottom: '1px solid #e5e7eb',
        display: 'flex', alignItems: 'center'
      }}>
        <div className="container nav-content" style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%', padding: '0 2rem' }}>
          
          {/* Kinetic Navigation Trigger (Desktop) */}
          <div className="hide-on-mobile" style={{ marginRight: '1rem' }}>
            <SterlingGateKineticNavigation onOpenAuth={handleOpenAuth} />
          </div>

          <div className="mobile-header-stack show-on-mobile" style={{ width: '100%', flexDirection: 'column' }}>
            {/* Top Row: Logo & Profile */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '8px' }}>
                <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                        fontSize: '1.8rem', fontWeight: '800', color: '#000', 
                        letterSpacing: '-1.5px', fontFamily: 'var(--font-outfit), sans-serif', lineHeight: 1
                    }}>
                        Zelp
                    </span>
                </Link>

               <div className="show-on-mobile">
                  {user ? (
                      <div 
                        onClick={() => setSettingsModalOpen(true)}
                        style={{ 
                            fontSize: '1rem', color: '#ef4444', fontWeight: '600', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #ef4444'
                        }}
                      >
                          {(user.name || 'User').charAt(0).toUpperCase()}
                      </div>
                  ) : (
                      <button 
                          onClick={handleOpenAuth}
                          style={{ 
                              background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', 
                              padding: '4px 12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem'
                          }}
                      >
                          Sign In
                      </button>
                  )}
               </div>
            </div>

            {/* Middle Row: Location */}
            <div style={{ position: 'relative', width: '100%', marginBottom: '12px' }}>
                 <div 
                    onClick={() => setLocationModalOpen(true)}
                    style={{ 
                        display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer',
                        padding: '0.2rem 0', background: 'transparent'
                    }}
                 >
                      <MapPin size={16} color="#ef4444" />
                      <span style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#374151', maxWidth: '80%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {location || 'Select Location'}
                      </span>
                      <ChevronDown size={14} color="#374151" />
                 </div>
            </div>

            {/* Bottom Row: Search Bar */}
            <div style={{ position: 'relative', width: '100%' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: '#fff', borderRadius: '12px', padding: '10px 16px',
                    border: isSearchFocused ? '1px solid #0c831f' : '1px solid #e5e7eb', 
                    boxShadow: isSearchFocused ? '0 0 0 2px rgba(12, 131, 31, 0.1)' : '0 2px 5px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s'
                }}>
                    <Search size={18} color={isSearchFocused ? '#0c831f' : '#ef4444'} />
                    <input 
                        type="text" 
                        placeholder="Search for tests, services..." 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                        style={{
                            background: 'transparent', border: 'none', outline: 'none',
                            width: '100%', fontSize: '0.95rem', color: '#374151'
                        }}
                    />
                </div>

                {/* Search Dropdown */}
                {isSearchFocused && (
                    <div style={{
                        position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
                        background: '#fff', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb', zIndex: 1001, overflow: 'hidden'
                    }}>
                        {!searchQuery ? (
                            <div style={{ padding: '0.5rem 0' }}>
                                <div style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>
                                    Suggested Searches
                                </div>
                                {SUGGESTED_SEARCHES.map((item, idx) => (
                                    <div 
                                        key={idx}
                                        onClick={() => handleSearchSelect(item.name)}
                                        style={{
                                            padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between',
                                            alignItems: 'center', cursor: 'pointer', borderBottom: idx < SUGGESTED_SEARCHES.length - 1 ? '1px solid #f3f4f6' : 'none'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <span style={{ fontSize: '0.9rem', color: '#374151' }}>{item.name}</span>
                                        <span style={{ fontSize: '0.75rem', background: '#f3f4f6', padding: '2px 8px', borderRadius: '12px', color: '#6b7280' }}>
                                            {item.type}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ padding: '0.5rem 0' }}>
                                {isSearching ? (
                                    <div style={{ padding: '1rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                                        Searching...
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    searchResults.map((result) => (
                                        <div 
                                            key={result.id}
                                            onClick={() => handleSearchSelect(result.name)}
                                            style={{
                                                padding: '0.8rem 1rem', display: 'flex', flexDirection: 'column', gap: '4px',
                                                cursor: 'pointer', borderBottom: '1px solid #f3f4f6'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1f2937' }}>{result.name}</span>
                                                <span style={{ fontSize: '0.85rem', color: '#0c831f', fontWeight: 'bold' }}>₹{result.discount_price || result.price}</span>
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                                {result.hospital_name || result.category}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ padding: '1rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                                        No results found for "{searchQuery}"
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
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
                        <MapPin size={18} color="#0c831f" />
                        <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#1f2937', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {location || 'Select Location'}
                        </span>
                        <ChevronDown size={16} color="#1f2937" />
                   </div>
              </div>
          </div>

          {/* Nav Links - Desktop */}
          <div className="hide-on-mobile" style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginRight: '2rem', height: '100%' }}>
             <Link href="/" style={{ fontWeight: '500', color: '#1f2937', height: '100%', display: 'flex', alignItems: 'center' }}>Home</Link>
             <Link href="/hospitals" style={{ fontWeight: '500', color: '#1f2937', height: '100%', display: 'flex', alignItems: 'center' }}>Services</Link>
          </div>
          
          {/* Right Actions (Desktop) */}
          <div className="hide-on-mobile desktop-header-elements" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', paddingRight: '1rem' }}>
              <div className="hide-on-mobile" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  {user ? (
                      <ProfileDropdown onOpenSettings={() => setSettingsModalOpen(true)} />
                  ) : (
                      <button 
                          onClick={handleOpenAuth}
                          style={{ 
                              background: 'transparent', border: '1px solid #0c831f', color: '#0c831f', 
                              padding: '8px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer',
                              transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#0c831f'; e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0c831f'; }}
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
                          background: '#fff', color: '#ff6f61', borderRadius: '50%', 
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

      {/* Profile Completion Modal removed from global navbar - moved to checkout logic */}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />

      {/* Mobile Menu Overlay - REPLACED by Kinetic Nav */}
      {/* {mobileMenuOpen && (
        <div style={{ ... }}> ... </div>
      )} */}
      {/* Kinetic Navigation is now inside .nav-content */}
    </>
  );
}
