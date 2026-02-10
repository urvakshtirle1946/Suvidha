'use client';
import { useState } from 'react';
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

export default function Navbar() {
  const { user, logout } = useAuth();
  const { location, setLocation, detectLocation } = useLocation();
  const { setIsCartOpen, cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  return (
    <>
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, 
        height: 'var(--header-height)', background: '#fff', 
        borderBottom: '1px solid #f3f4f6', // Very subtle border
        display: 'flex', alignItems: 'center'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
              {/* Mobile Menu Button */}
              <button 
                className="show-on-mobile"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#000', padding: 0 }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <span style={{ 
                      fontSize: '1.8rem', fontWeight: '800', color: '#000', 
                      letterSpacing: '-1px', fontFamily: 'var(--font-outfit), sans-serif', lineHeight: 1
                  }}>
                      Zelp
                  </span>
              </Link>

               {/* Location Pill - Desktop */}
               <div className="hide-on-mobile" style={{ position: 'relative' }}>
                   <div 
                      onClick={() => setLocationModalOpen(true)}
                      style={{ 
                          display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
                          padding: '10px 20px', borderRadius: '50px', background: '#f3f4f6', 
                          transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                   >
                        <MapPin size={18} color="#000" />
                        <span style={{ fontWeight: '500', fontSize: '0.95rem', color: '#000', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {location || 'Select Location'}
                        </span>
                        <ChevronDown size={14} color="#000" />
                   </div>
              </div>
          </div>


          {/* Right Actions */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              
              {/* Desktop Nav Links (Minimal) */}
              <div className="hide-on-mobile" style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginRight: '1rem' }}>
                   {!user ? (
                      <button 
                          onClick={() => setAuthModalOpen(true)}
                          style={{ 
                              background: '#000', color: '#fff', border: 'none', 
                              fontWeight: '500', fontSize: '0.95rem', cursor: 'pointer',
                              padding: '10px 24px', borderRadius: '50px'
                          }}
                      >
                          Log in
                      </button>
                   ) : (
                      <ProfileDropdown onOpenSettings={() => setSettingsModalOpen(true)} />
                   )}
              </div>
              
              {/* Cart Button - Black Pill */}
              <button 
                  onClick={() => setIsCartOpen(true)}
                  style={{ 
                      borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '8px', 
                      padding: '10px 20px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer'
                  }}
              >
                  <ShoppingCart size={20} /> 
                  <span className="hide-on-mobile" style={{ fontSize: '0.95rem', fontWeight: '500' }}>Cart</span>
                  {cartCount > 0 && (
                      <span style={{ 
                          background: '#fff', color: '#000', borderRadius: '50%', 
                          width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.8rem', fontWeight: 'bold'
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
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{
            position: 'fixed',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            background: '#fff',
            borderBottom: '1px solid #e5e7eb',
            padding: '1rem',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
             {/* Mobile Location */}
             <div 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLocationModalOpen(true);
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem', background: '#f3f4f6', borderRadius: '8px', cursor: 'pointer' }}
             >
                <MapPin size={16} color="#0c831f" />
                <span style={{ fontSize: '0.9rem', color: '#374151' }}>{location || 'Select Location'}</span>
             </div>

             <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.8rem', borderBottom: '1px solid #f3f4f6', fontWeight: '500', color: '#1f2937' }}>
                Home
             </Link>
             <Link href="/hospitals" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.8rem', borderBottom: '1px solid #f3f4f6', fontWeight: '500', color: '#1f2937' }}>
                Services
             </Link>
             
             {!user ? (
                 <button 
                     onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }}
                     style={{ padding: '0.8rem', fontWeight: '600', color: '#ff6f61', background: 'transparent', border: 'none', textAlign: 'left', fontSize: '1rem', cursor: 'pointer' }}
                 >
                    Login / Sign Up
                 </button>
             ) : (
                 <>
                    <Link href="/bookings" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.8rem', fontWeight: '500', color: '#1f2937', borderBottom: '1px solid #f3f4f6' }}>
                        My Bookings
                    </Link>
                    <button
                        onClick={() => { setSettingsModalOpen(true); setMobileMenuOpen(false); }}
                        style={{ padding: '0.8rem', fontWeight: '500', color: '#1f2937', background: 'transparent', border: 'none', textAlign: 'left', borderBottom: '1px solid #f3f4f6', cursor: 'pointer', fontSize: '1rem' }}
                    >
                        Settings
                    </button>
                    <button
                        onClick={() => { logout(); setMobileMenuOpen(false); }}
                        style={{ padding: '0.8rem', fontWeight: '600', color: '#dc2626', background: 'transparent', border: 'none', textAlign: 'left', fontSize: '1rem', cursor: 'pointer' }}
                    >
                        Logout
                    </button>
                 </>
             )}
        </div>
      )}
    </>
  );
}
