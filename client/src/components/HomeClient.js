'use client';
import { useState } from 'react';
import { apiFetch } from '@/utils/api';
import HospitalProfileModal from './HospitalProfileModal';
import PaymentReminder from './PaymentReminder';
import HeroSection from './HeroSection';
import QuickExploreGrid from './QuickExploreGrid';
import FutureExperience from './FutureExperience';
import Footer from '@/components/Footer';

export default function HomeClient({ hospitals, loading = false, defaultServices = [], defaultHospitals = [] }) {
  const [selectedHospitalForProfile, setSelectedHospitalForProfile] = useState(null);

  const handleHospitalClick = async (hospital) => {
    try {
      document.body.style.cursor = 'wait';
      const res = await apiFetch(`/api/hospitals/${hospital.id}`);
      if (!res.ok) throw new Error('Failed to fetch details');
      const fullData = await res.json();
      setSelectedHospitalForProfile(fullData);
    } catch (err) {
      console.error("Error fetching hospital details:", err);
      setSelectedHospitalForProfile(hospital);
    } finally {
      document.body.style.cursor = 'default';
    }
  };

  return (
    <main
      style={{
        background: '#f4f6fb',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="container"
        style={{
          paddingTop: 'calc(var(--header-height) + 1.5rem)',
          paddingBottom: '3rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {/* Hero Section */}
        <HeroSection defaultServices={defaultServices} defaultHospitals={defaultHospitals} />

        {/* Quick Explore Bento Grid */}
        <QuickExploreGrid />

        {/* Future Experience */}
        <FutureExperience />
      </div>

      <HospitalProfileModal
        isOpen={!!selectedHospitalForProfile}
        onClose={() => setSelectedHospitalForProfile(null)}
        hospital={selectedHospitalForProfile}
        onBookService={() => setSelectedHospitalForProfile(null)}
      />

      <PaymentReminder />

      {/* Footer (contains Circular Footer + Performer Illustration) */}
      <Footer />
    </main>
  );
}
