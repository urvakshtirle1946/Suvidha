'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { getApiUrl } from '@/utils/api';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [location, setLocation] = useState('Indore, India');
  const [city, setCity] = useState('Indore');
  // Default to Indore coordinates
  const [latitude, setLatitude] = useState(22.7196); 
  const [longitude, setLongitude] = useState(75.8577);

  const detectLocation = () => {
    setLocation('Detecting...');
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setLatitude(lat);
        setLongitude(lng);

        try {
          // Use our backend proxy to avoid CORS issues
          const apiUrl = getApiUrl();
          const res = await fetch(`${apiUrl}/api/location/reverse?lat=${lat}&lon=${lng}`);
          
          if (!res.ok) throw new Error('Fetch failed');

          const data = await res.json();
          // Nominatim returns address object directly in top level for some formats, 
          // or inside address property. Our controller returns what Nominatim returns.
          // Standard Nominatim JSON has `address` object.
          const address = data.address || {};
          const detectedCity = address.city || address.town || address.state_district || 'Indore';
          const detectedArea = address.suburb || address.neighbourhood || address.road || '';
          
          setCity(detectedCity);
          setLocation(`${detectedArea ? detectedArea + ', ' : ''}${detectedCity}`);
        } catch (error) {
          console.error("Location reverse geocode failed", error);
          // Fallback location name but keep coordinates
          setCity('Indore');
          setLocation('Indore, India');
        }
      }, (err) => {
        console.warn("Location permission denied", err);
        // Fallback to Indore defaults
        setLocation('Indore, India');
        setCity('Indore');
        setLatitude(22.7196);
        setLongitude(75.8577);
      });
    } else {
      // Fallback
      setLocation('Indore, India');
      setCity('Indore');
      setLatitude(22.7196);
      setLongitude(75.8577);
    }
  };

  useEffect(() => {
    // Intentionally left empty to prevent auto-prompting for location on mount.
  }, []);

  return (
    <LocationContext.Provider value={{ location, city, setLocation, setCity, detectLocation, latitude, longitude }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);
