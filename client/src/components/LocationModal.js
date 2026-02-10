'use client';
import { useState, useEffect } from 'react';
import { Search, MapPin, X, Building2, Lock } from 'lucide-react';

const POPULAR_CITIES = [
  { name: 'Mumbai', icon: '/icons/mumbai.png' },
  { name: 'Delhi-NCR', icon: '/icons/delhi.png' },
  { name: 'Bengaluru', icon: '/icons/bangalore.png' },
  { name: 'Hyderabad', icon: '/icons/hyderabad.png' },
  { name: 'Chandigarh', icon: '/icons/chandigarh.png' },
  { name: 'Ahmedabad', icon: '/icons/ahmedabad.png' },
  { name: 'Pune', icon: '/icons/pune.png' },
  { name: 'Chennai', icon: '/icons/chennai.png' },
  { name: 'Kolkata', icon: '/icons/kolkata.png' },
  { name: 'Kochi', icon: '/icons/kochi.png' },
];

export default function LocationModal({ isOpen, onClose, onSelectLocation, onDetectLocation }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            background: '#f3f4f6',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={20} color="#000" />
        </button>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', marginTop: '1rem' }}>Select Location</h2>

        {/* Search Bar */}
        <div className="search-container" style={{ marginTop: '1rem' }}>
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search for your city"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Detect Location */}
        <button 
          onClick={() => {
            // Logic to handle detection restriction should ideally be in Context, 
            // but for now we'll just allow detection and let the user know if it's not Indore
            onDetectLocation();
            onClose();
          }}
          className="detect-btn"
        >
          <MapPin size={18} />
          <span>Detect my location</span>
        </button>

        {/* Popular Cities Section */}
        <div className="text-center">
          <h3 className="popular-cities-title">Popular Cities</h3>
          
          <div className="cities-grid">
            {POPULAR_CITIES.map((city) => (
              <button
                key={city.name}
                onClick={() => {
                  if (city.name !== 'Indore') {
                     alert('Coming Soon to ' + city.name + '!');
                     return;
                  }
                  onSelectLocation(city.name + ', India');
                  onClose();
                }}
                style={{ 
                   opacity: city.name === 'Indore' ? 1 : 0.6,
                   border: city.name === 'Indore' ? '1px solid #0c831f' : '1px solid #e5e7eb'
                }}
                className="city-item"
              >
                {/* Icon Placeholder */}
                <div className="city-icon-box">
                   {/* Lock Icon Removed */}
                   <Building2 className="city-icon" size={24} color={city.name === 'Indore' ? '#0c831f' : "#9ca3af"} />
                </div>
                <span className="city-name" style={{ fontWeight: city.name === 'Indore' ? 'bold' : 'normal', color: city.name === 'Indore' ? '#0c831f' : 'inherit' }}>
                  {city.name}
                </span>
                {city.name === 'Indore' && <div style={{ fontSize: '0.7rem', color: '#0c831f', background: '#e6f4ea', padding: '2px 6px', borderRadius: '4px', marginTop: '4px' }}>Service Available</div>}
              </button>
            ))}
          </div>

          <button className="view-all-btn">
            View All Cities
          </button>
        </div>

      </div>
    </div>
  );
}
