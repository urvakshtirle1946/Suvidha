import Navbar from '@/components/Navbar';
import HomeClient from '@/components/HomeClient';
import { getApiUrl } from '@/utils/api';

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

async function getHospitals() {
  const apiUrl = getApiUrl();
  try {
    const res = await fetch(`${apiUrl}/api/hospitals`);
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch hospitals:", error);
    return [];
  }
}

async function getServices() {
  const apiUrl = getApiUrl();
  try {
    const res = await fetch(`${apiUrl}/api/services?limit=8`);
    if (!res.ok) return [];
    const data = await res.json();
    // Handle both flattened array and paginated object formats
    return Array.isArray(data)
      ? data
      : (data && Array.isArray(data.data) ? data.data : []);
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export default async function Home() {
  const [hospitals, popularServices] = await Promise.all([
    getHospitals(),
    getServices()
  ]);

  return (
    <>
      <Navbar />
      <HomeClient hospitals={hospitals} popularServices={popularServices} />
    </>
  );
}
