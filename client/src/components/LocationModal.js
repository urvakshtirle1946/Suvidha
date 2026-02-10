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
  const [showAllCities, setShowAllCities] = useState(false);

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
  
  // Decide what to render: if searching, show all matches. If not, show 10 or all based on toggle.
  const citiesDisplay = searchTerm ? filteredCities : (showAllCities ? POPULAR_CITIES : POPULAR_CITIES.slice(0, 10));

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        {/* Close Button (Top Right) */}
        <button 
          onClick={onClose}
          className="modal-close"
        >
          <X size={20} color="#6b7280" />
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
             {searchTerm ? 'Search Results' : 'Popular Cities'}
          </h3>
          
          <div className="cities-grid">
            {filteredCities.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', color: '#6b7280', padding: '2rem' }}>
                    No cities found matching "{searchTerm}"
                </div>
            ) : (
                citiesDisplay.map((city) => (
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
            {!searchTerm && (
                <button 
                    className="view-all-btn" 
                    onClick={() => setShowAllCities(!showAllCities)}
                >
                    {showAllCities ? 'View Less' : 'View All Cities'}
                </button>
            )}
            
            {/* Bottom Cross Button */}
            <button 
                onClick={onClose}
                style={{ 
                    padding: '8px', 
                    borderRadius: '50%', 
                    border: '1px solid #e5e7eb',
                    background: '#fff',
                    color: '#6b7280',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                    width: '40px',
                    height: '40px'
                }}
            >
                <X size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
