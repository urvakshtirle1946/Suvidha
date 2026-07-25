/**
 * Helper utility to build Practo redirection links based on specialty and location.
 */

const SPECIALTY_SLUGS = {
  'Cardiologist': 'cardiologist',
  'Cardiology': 'cardiologist',
  'Orthopedic Surgeon': 'orthopedist',
  'Orthopedic': 'orthopedist',
  'Orthopedics': 'orthopedist',
  'Neurologist': 'neurologist',
  'Neurology': 'neurologist',
  'Dermatologist': 'dermatologist',
  'Dermatology': 'dermatologist',
  'Pediatrician': 'pediatrician',
  'Pediatrics': 'pediatrician',
  'Diabetologist': 'diabetologist',
  'Diabetes': 'diabetologist',
  'Endocrinologist': 'endocrinologist',
  'Gynecologist': 'gynecologist-obstetrician',
  'Gynecology': 'gynecologist-obstetrician',
  'Obstetrician': 'gynecologist-obstetrician',
  'General Physician': 'general-physician',
  'General Physician / Internal Medicine': 'general-physician',
  'ENT Specialist': 'ent-specialist',
  'ENT': 'ent-specialist',
  'Gastroenterologist': 'gastroenterologist',
  'Gastroenterology': 'gastroenterologist',
  'Urologist': 'urologist',
  'Urology': 'urologist',
  'Pulmonologist': 'pulmonologist',
  'Pulmonology': 'pulmonologist',
  'Ophthalmologist': 'ophthalmologist',
  'Ophthalmology': 'ophthalmologist',
  'Psychiatrist': 'psychiatrist',
  'Psychiatry': 'psychiatrist'
};

/**
 * Returns a Practo URL for a given medical specialty and city.
 * @param {string} specialty - e.g. "Cardiologist", "Orthopedic Surgeon"
 * @param {string} city - e.g. "indore"
 * @returns {string} Practo redirect URL
 */
export function getPractoUrl(specialty, city = 'indore') {
  if (!specialty) {
    return `https://www.practo.com/${city.toLowerCase()}/doctors`;
  }

  const cleanSpecialty = specialty.trim();
  const slug = SPECIALTY_SLUGS[cleanSpecialty] || 
    cleanSpecialty.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

  const cleanCity = city.toLowerCase().trim().replace(/\s+/g, '-');
  return `https://www.practo.com/${cleanCity}/${slug}`;
}

/**
 * Open Practo in a new browser tab for the given specialty and city.
 * @param {string} specialty 
 * @param {string} city 
 */
export function redirectToPracto(specialty, city = 'indore') {
  const url = getPractoUrl(specialty, city);
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  return url;
}
