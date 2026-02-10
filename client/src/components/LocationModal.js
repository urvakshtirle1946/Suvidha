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
  { name: 'Jaipur', icon: '/icons/jaipur.png' },
  { name: 'Lucknow', icon: '/icons/lucknow.png' },
  { name: 'Indore', icon: '/icons/indore.png' },
  { name: 'Bhopal', icon: '/icons/bhopal.png' },
  { name: 'Surat', icon: '/icons/surat.png' },
  { name: 'Nagpur', icon: '/icons/nagpur.png' },
  { name: 'Patna', icon: '/icons/patna.png' },
  { name: 'Ludhiana', icon: '/icons/ludhiana.png' },
  { name: 'Kanpur', icon: '/icons/kanpur.png' },
  { name: 'Agra', icon: '/icons/agra.png' },
  { name: 'Varanasi', icon: '/icons/varanasi.png' },
  { name: 'Visakhapatnam', icon: '/icons/vizag.png' },
  { name: 'Coimbatore', icon: '/icons/coimbatore.png' },
  { name: 'Thiruvananthapuram', icon: '/icons/trivandrum.png' },
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

  // Filter logic
  const filteredCities = POPULAR_CITIES.filter(city => city.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        
        {/* Close Button (Top Right) */}
        <button 
          onClick={onClose}
          className="modal-close"
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10 }}
        >
          <X size={24} color="#6b7280" />
        </button>

        {/* Search Bar */}
        <div className="search-container">
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
            onDetectLocation();
            onClose();
          }}
          className="detect-btn"
        >
          <MapPin size={18} />
          <span>Detect my location</span>
        </button>

        {/* Popular Cities / Search Results */}
        <div className="text-center">
          <h3 className="popular-cities-title">
             {searchTerm ? 'Search Results' : 'All Cities'}
          </h3>
          
          <div className="cities-grid">
            {filteredCities.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', color: '#6b7280', padding: '2rem' }}>
                    No cities found matching "{searchTerm}"
                </div>
            ) : (
                filteredCities.map((city) => (
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
                    {city.name !== 'Indore' && <div style={{ position: 'absolute', top: 5, right: 5 }}><Lock size={12} color="#9ca3af"/></div>}
                    <Building2 className="city-icon" size={24} color={city.name === 'Indore' ? '#0c831f' : "#9ca3af"} />
                    </div>
                    <span className="city-name" style={{ fontWeight: city.name === 'Indore' ? 'bold' : 'normal', color: city.name === 'Indore' ? '#0c831f' : 'inherit' }}>
                    {city.name}
                    </span>
                    {city.name === 'Indore' && <div style={{ fontSize: '0.7rem', color: '#0c831f', background: '#e6f4ea', padding: '2px 6px', borderRadius: '4px', marginTop: '4px' }}>Service Available</div>}
                </button>
                ))
            )}
          </div>
          
           {/* No bottom buttons needed as requested */}
        </div>

      </div>
    </div>
  );
}
