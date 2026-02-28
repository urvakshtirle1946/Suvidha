'use client';
import { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  X,
  Landmark,
  Castle,
  Church,
  School,
  Factory,
  Hotel,
  Trees,
  TentTree,
  TowerControl,
} from 'lucide-react';

const POPULAR_CITIES = [
  { name: 'Mumbai' },
  { name: 'Delhi-NCR' },
  { name: 'Bengaluru' },
  { name: 'Hyderabad' },
  { name: 'Chandigarh' },
  { name: 'Ahmedabad' },
  { name: 'Pune' },
  { name: 'Chennai' },
  { name: 'Kolkata' },
  { name: 'Kochi' },
  { name: 'Jaipur' },
  { name: 'Lucknow' },
  { name: 'Indore' },
  { name: 'Bhopal' },
  { name: 'Surat' },
  { name: 'Nagpur' },
  { name: 'Patna' },
  { name: 'Ludhiana' },
  { name: 'Kanpur' },
  { name: 'Agra' },
  { name: 'Varanasi' },
  { name: 'Visakhapatnam' },
  { name: 'Coimbatore' },
  { name: 'Thiruvananthapuram' },
];

const CITY_ICONS = {
  Mumbai: Landmark,
  'Delhi-NCR': TowerControl,
  Bengaluru: Castle,
  Hyderabad: Church,
  Chandigarh: School,
  Ahmedabad: Church,
  Pune: Hotel,
  Chennai: School,
  Kolkata: Landmark,
  Kochi: Trees,
  Jaipur: Castle,
  Lucknow: TowerControl,
  Indore: Landmark,
  Bhopal: TentTree,
  Surat: Factory,
  Nagpur: TentTree,
  Patna: Landmark,
  Ludhiana: Factory,
  Kanpur: Hotel,
  Agra: Church,
  Varanasi: School,
  Visakhapatnam: Trees,
  Coimbatore: Trees,
  Thiruvananthapuram: School,
};

export default function LocationModal({ isOpen, onClose, onSelectLocation, onDetectLocation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllCities, setShowAllCities] = useState(false);

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

  const filteredCities = POPULAR_CITIES.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const citiesDisplay = searchTerm
    ? filteredCities
    : showAllCities
      ? POPULAR_CITIES
      : POPULAR_CITIES.slice(0, 15);

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
          <button onClick={onClose} className="modal-close" aria-label="Close location modal">
            <X size={22} color="#6b7280" />
          </button>
        </div>

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

        <div className="text-center">
          <h3 className="popular-cities-title">{searchTerm ? 'Search Results' : 'Popular Cities'}</h3>

          <div className="cities-grid">
            {filteredCities.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', color: '#6b7280', padding: '2rem' }}>
                No cities found matching "{searchTerm}"
              </div>
            ) : (
              citiesDisplay.map((city) => {
                const CityIcon = CITY_ICONS[city.name] || Landmark;

                return (
                  <button
                    key={city.name}
                    onClick={() => {
                      if (city.name !== 'Indore') {
                        alert(`Coming Soon to ${city.name}!`);
                        return;
                      }

                      onSelectLocation(`${city.name}, India`);
                      onClose();
                    }}
                    style={{
                      opacity: city.name === 'Indore' ? 1 : 0.6,
                      border: city.name === 'Indore' ? '1px solid #0c831f' : '1px solid #e5e7eb',
                    }}
                    className="city-item"
                  >
                    <div className="city-icon-box">
                      <CityIcon
                        className="city-icon"
                        size={24}
                        color={city.name === 'Indore' ? '#0c831f' : '#9ca3af'}
                        strokeWidth={1.8}
                      />
                    </div>

                    <span
                      className="city-name"
                      style={{
                        fontWeight: city.name === 'Indore' ? 'bold' : 'normal',
                        color: city.name === 'Indore' ? '#0c831f' : 'inherit',
                      }}
                    >
                      {city.name}
                    </span>

                    {city.name === 'Indore' && (
                      <div
                        style={{
                          fontSize: '0.7rem',
                          color: '#0c831f',
                          background: '#e6f4ea',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          marginTop: '4px',
                        }}
                      >
                        Service Available
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {!searchTerm && (
            <div style={{ marginTop: '1.5rem' }}>
              <button className="view-all-btn" onClick={() => setShowAllCities(!showAllCities)}>
                {showAllCities ? 'Show Less' : 'View More Cities'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
