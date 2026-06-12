'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HomeClient from '@/components/HomeClient';

import { apiFetch } from '@/utils/api';

const HOME_HOSPITAL_LIMIT = 8;
const HOME_LAB_LIMIT = 12;

export default function HomePage() {
  const [hospitals, setHospitals] = useState([]);
  const [popularServices, setPopularServices] = useState([]);
  const [defaultServices, setDefaultServices] = useState([]);
  const [defaultHospitals, setDefaultHospitals] = useState([]);
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    let isMounted = true;

    // Safely fetch a single endpoint — returns the Response on success, null on network failure.
    const safeFetch = async (endpoint) => {
      try {
        return await apiFetch(endpoint);
      } catch (err) {
        const isNetworkError = err instanceof TypeError && err.message === 'Failed to fetch';
        if (isNetworkError) {
          console.warn(`[Home] Server unreachable for ${endpoint} — showing empty state.`);
        } else {
          console.error(`[Home] Unexpected error fetching ${endpoint}:`, err);
        }
        return null;
      }
    };

    const loadHomeData = async () => {
      try {
        const [hospitalsRes, servicesRes, scanServicesRes, labServicesRes] = await Promise.all([
          safeFetch(`/api/hospitals?limit=${HOME_HOSPITAL_LIMIT}`),
          safeFetch(`/api/services?category=Lab&limit=${HOME_LAB_LIMIT}`),
          safeFetch(`/api/services?category=Scan&limit=50`),
          safeFetch(`/api/services?category=Lab&limit=50`),
        ]);

        if (!isMounted) return;

        const hospitalsData = hospitalsRes?.ok ? await hospitalsRes.json() : [];
        const servicesData = servicesRes?.ok ? await servicesRes.json() : [];
        const scanServicesData = scanServicesRes?.ok ? await scanServicesRes.json() : [];
        const labServicesData = labServicesRes?.ok ? await labServicesRes.json() : [];

        const hospitalList = Array.isArray(hospitalsData)
          ? hospitalsData
          : Array.isArray(hospitalsData?.data)
            ? hospitalsData.data
            : [];

        const serviceList = Array.isArray(servicesData)
          ? servicesData
          : Array.isArray(servicesData?.data)
            ? servicesData.data
            : [];

        const rankedServices = [...serviceList].sort((a, b) =>
          (Number(b.hospital_rating || 0) - Number(a.hospital_rating || 0)) ||
          (Number(a.discount_price || a.price || 0) - Number(b.discount_price || b.price || 0))
        );

        const scanList = Array.isArray(scanServicesData) ? scanServicesData : (scanServicesData?.data || []);
        const labList  = Array.isArray(labServicesData)  ? labServicesData  : (labServicesData?.data  || []);
        
        // Dedupe by name
        const seenScan = new Set();
        const uniqueScans = scanList.filter(s => {
          if (seenScan.has(s.name)) return false;
          seenScan.add(s.name);
          return true;
        }).slice(0, 5); // Take 5 unique scans
        
        const seenLab = new Set();
        const uniqueLabs = labList.filter(s => {
          if (seenLab.has(s.name)) return false;
          seenLab.add(s.name);
          return true;
        }).slice(0, 3); // Take 3 unique labs

        const searchServiceList = [...uniqueScans, ...uniqueLabs];

        setHospitals(hospitalList);
        setPopularServices(rankedServices);
        setDefaultServices(searchServiceList.map(s => ({ name: s.name, sub: s.category })));
        setDefaultHospitals(hospitalList.map(h => ({ name: h.name, sub: h.location })));
      } catch (error) {
        console.error('[Home] Failed to load home page data:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <HomeClient
        hospitals={hospitals}
        popularServices={popularServices}
        loading={loading}
        defaultServices={defaultServices}
        defaultHospitals={defaultHospitals}
      />

    </>
  );
}
