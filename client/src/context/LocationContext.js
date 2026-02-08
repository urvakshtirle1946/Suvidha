'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { getApiUrl } from '@/utils/api';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [location, setLocation] = useState('Detecting location...');
  const [city, setCity] = useState('');

  const detectLocation = () => {
    setLocation('Detecting...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const apiUrl = getApiUrl();
          // Using our own server as a proxy to avoid CORS and comply with Nominatim policy
          const res = await fetch(`${apiUrl}/api/location/reverse?lat=${latitude}&lon=${longitude}`);
          
          if (!res.ok) throw new Error('Proxy fetch failed');

          const data = await res.json();
          
          // Nominatim JSONv2 format
          const address = data.address || {};
          const detectedCity = address.city || address.town || address.state_district || 'Indore';
          
          // Service area check
          if (!detectedCity.toLowerCase().includes('indore')) {
            // Keep the alert but still set Indore as default
            // alert(`We currently serve only in Indore. We are coming soon to ${detectedCity}!`);
            setCity('Indore'); 
            setLocation('Indore, India');
            return;
          }

          const detectedArea = address.suburb || address.neighbourhood || address.road || '';
          
          setCity(detectedCity);
          setLocation(`${detectedArea ? detectedArea + ', ' : ''}${detectedCity}`);
        } catch (error) {
          console.error("Location detection failed, defaulting to Indore", error);
          setCity('Indore');
          setLocation('Indore, India');
        }
      }, (err) => {
        console.warn("Location permission denied", err);
        setLocation('Indore, India');
        setCity('Indore');
      });
    } else {
      setLocation('Indore, India');
      setCity('Indore');
    }
  };

  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, city, setLocation, setCity, detectLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);
