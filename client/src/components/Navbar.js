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
import AuthModal from './AuthModal';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { location, setLocation, detectLocation } = useLocation();
  const { setIsCartOpen, cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <nav style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000, 
        height: 'var(--header-height)',
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container nav-content">
          
          {/* Mobile Menu Button */}
          <button 
            className="show-on-mobile"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'transparent', border: 'none', marginRight: '1rem', cursor: 'pointer', color: '#374151' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo & Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <span style={{ 
                      fontSize: '1.8rem', 
                      fontWeight: '800', 
                      color: '#000', 
                      letterSpacing: '-1.5px', 
                      fontFamily: 'var(--font-outfit), sans-serif',
                      lineHeight: 1
                  }}>
                      Zelp
                  </span>
              </Link>
              
              <div className="hide-on-mobile" style={{ position: 'relative' }}>
                   <div 
                      onClick={() => setLocationModalOpen(true)}
                      style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '5px', 
                          cursor: 'pointer',
                          padding: '0.5rem',
                          borderRadius: '8px',
                          background: 'transparent',
                          transition: 'background 0.2s'
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
                  {!user ? (
                      <button 
                          onClick={() => setAuthModalOpen(true)}
                          style={{ background: 'transparent', border: 'none', fontWeight: '500', fontSize: '1.1rem', cursor: 'pointer', color: '#374151' }}
                      >
                          Login
                      </button>
                  ) : (
                     <>
                         <Link href="/bookings" style={{ textDecoration: 'none', color: '#374151', fontSize: '1rem', fontWeight: '500' }}>
                            My Bookings
                         </Link>
                         <div style={{ fontWeight: '500', color: '#0c831f' }}>Hi, {user.name.split(' ')[0]}</div>
                         <button 
                             onClick={logout}
                             style={{ background: 'transparent', border: 'none', fontSize: '0.9rem', color: '#dc2626', cursor: 'pointer', fontWeight: '500' }}
                         >
                             Logout
                         </button>
                     </>
                  )}
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
              
              {/* Mobile User Section */}
               <div className="show-on-mobile">
                  {user && (
                      <div style={{ fontSize: '0.9rem', color: '#0c831f', fontWeight: '500' }}>
                          {user.name.charAt(0)}
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
                 <Link href="/bookings" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.8rem', fontWeight: '500', color: '#1f2937' }}>
                    My Bookings
                 </Link>
             )}
        </div>
      )}
    </>
  );
}
