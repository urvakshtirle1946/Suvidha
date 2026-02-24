'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import { useCart } from '@/context/CartContext';
import { ChevronDown, ShoppingCart, Menu, X, MapPin } from 'lucide-react';
import { TextReveal } from './ui/text-reveal-animation';
import { ZelpLogo } from './ui/zelp-text-reveal';
import LocationModal from './LocationModal';
import SettingsModal from './SettingsModal';
import ProfileDropdown from './ProfileDropdown';
import AuthModal from './AuthModal';
import SterlingGateKineticNavigation from './ui/SterlingGateKineticNavigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { location, setLocation, detectLocation } = useLocation();
  const { setIsCartOpen, cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('auth');

  // Enforce mobile verification if logged in but not verified
  useEffect(() => {
    if (user && !user.phone_verified) {
      setAuthMode('verify');
      setAuthModalOpen(true);
    }
  }, [user]);

  const handleOpenAuth = () => {
    setAuthMode('auth');
    setAuthModalOpen(true);
  };

  return (
    <>
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, 
        height: 'var(--header-height)', background: '#fff', borderBottom: '1px solid #e5e7eb',
        display: 'flex', alignItems: 'center'
      }}>
        <div className="container nav-content">
          
          {/* Kinetic Navigation Trigger (Mobile) */}
          <div className="show-on-mobile" style={{ marginRight: '1rem' }}>
            <SterlingGateKineticNavigation onOpenAuth={handleOpenAuth} />
          </div>

          {/* Logo & Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <span style={{ 
                      fontSize: '1.8rem', fontWeight: '800', color: '#000', 
                      letterSpacing: '-1.5px', fontFamily: 'var(--font-outfit), sans-serif', lineHeight: 1
                  }}>
                      Zelp
                  </span>
              </Link>
              
              <div className="hide-on-mobile" style={{ position: 'relative' }}>
                   <div 
                      onClick={() => setLocationModalOpen(true)}
                      style={{ 
                          display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer',
                          padding: '0.5rem', borderRadius: '8px', background: 'transparent', transition: 'background 0.2s'
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
          <div className="hide-on-mobile" style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginRight: '2rem' }}>
             <Link href="/" style={{ fontWeight: '500', color: '#1f2937' }}>Home</Link>
             <Link href="/hospitals" style={{ fontWeight: '500', color: '#1f2937' }}>Services</Link>
          </div>
          
          {/* Right Actions */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="hide-on-mobile" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
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
              </div>
              
              {/* Cart is always visible but smaller on mobile */}
              <button 
                  className="btn btn-primary" 
                  onClick={() => setIsCartOpen(true)}
                  style={{ borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem' }}
              >
                  <ShoppingCart size={18} /> 
                  <span className="hide-on-mobile">My Cart</span>
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
              
              {/* Mobile User Section - Keep initial or user icon */}
               <div className="show-on-mobile">
                  {user && (
                      <div 
                        onClick={() => setMobileMenuOpen(true)}
                        style={{ fontSize: '0.9rem', color: '#0c831f', fontWeight: '500', cursor: 'pointer' }}
                      >
                          {(user.name || 'User').charAt(0).toUpperCase()}
                      </div>
                  )}
               </div>
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

      {/* Mobile Menu Overlay - REPLACED by Kinetic Nav */}
      {/* {mobileMenuOpen && (
        <div style={{ ... }}> ... </div>
      )} */}
      {/* Kinetic Navigation is now inside .nav-content */}
    </>
  );
}
