'use client';
import { useState } from 'react';
import Link from 'next/link';
import { X, MapPin, Star, Clock, Award, Calendar } from 'lucide-react';

const DOCTORS = [
  {
    name: 'Dr. Anjali Sharma',
    specialty: 'Cardiologist',
    hospital: 'CHL Hospital, Indore',
    experience: '14 yrs exp',
    rating: 4.9,
    reviews: 312,
    img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80',
    tag: 'Top Rated',
    tagColor: '#000',
    href: '/hospitals?specialty=Cardiologist',
    about: 'Dr. Anjali Sharma is a senior cardiologist with expertise in interventional cardiology, heart failure management, and preventive cardiac care. She has performed over 2,000 cardiac procedures.',
    qualifications: ['MBBS – AIIMS Delhi', 'MD Cardiology – PGI Chandigarh', 'Fellowship – Royal College of Physicians'],
    availability: 'Mon – Sat, 10:00 AM – 2:00 PM',
    fee: '₹800',
    languages: ['Hindi', 'English'],
  },
  {
    name: 'Dr. Rohan Mehta',
    specialty: 'Orthopedic Surgeon',
    hospital: 'Bombay Hospital, Indore',
    experience: '11 yrs exp',
    rating: 4.8,
    reviews: 278,
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    tag: 'Most Booked',
    tagColor: '#333',
    href: '/hospitals?specialty=Orthopedic',
    about: 'Dr. Rohan Mehta specializes in joint replacement surgery, sports injuries, and spine care. He has successfully performed over 1,500 knee and hip replacement surgeries.',
    qualifications: ['MBBS – Grant Medical College', 'MS Orthopedics – KEM Hospital', 'AO Fellowship – Switzerland'],
    availability: 'Tue – Sun, 9:00 AM – 1:00 PM',
    fee: '₹700',
    languages: ['Hindi', 'English', 'Marathi'],
  },
  {
    name: 'Dr. Priya Nair',
    specialty: 'Neurologist',
    hospital: 'Shalby Hospital, Indore',
    experience: '9 yrs exp',
    rating: 4.7,
    reviews: 194,
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    tag: 'Highly Reviewed',
    tagColor: '#666',
    href: '/hospitals?specialty=Neurologist',
    about: 'Dr. Priya Nair is a neurologist specializing in epilepsy, migraines, and neurodegenerative disorders. She is known for her patient-centric approach and precision diagnosis.',
    qualifications: ['MBBS – Trivandrum Medical College', 'MD Neurology – NIMHANS Bangalore', 'DM Neurology – SGPGI'],
    availability: 'Mon, Wed, Fri – 11:00 AM – 3:00 PM',
    fee: '₹900',
    languages: ['Hindi', 'English', 'Malayalam'],
  },
  {
    name: 'Dr. Sameer Joshi',
    specialty: 'Dermatologist',
    hospital: 'Eureka Hospital, Indore',
    experience: '7 yrs exp',
    rating: 4.8,
    reviews: 241,
    img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
    tag: 'Top Rated',
    tagColor: '#000',
    href: '/hospitals?specialty=Dermatologist',
    about: 'Dr. Sameer Joshi is an expert dermatologist treating acne, psoriasis, hair loss, and skin allergies. He also specializes in cosmetic procedures including laser therapy.',
    qualifications: ['MBBS – MGM Medical College, Indore', 'DVD Dermatology – Bombay Hospital', 'Fellowship – IADVL'],
    availability: 'Mon – Sat, 5:00 PM – 8:00 PM',
    fee: '₹600',
    languages: ['Hindi', 'English'],
  },
  {
    name: 'Dr. Meena Gupta',
    specialty: 'Pediatrician',
    hospital: 'Gokuldas Hospital, Indore',
    experience: '16 yrs exp',
    rating: 4.9,
    reviews: 389,
    img: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80',
    tag: 'Most Booked',
    tagColor: '#333',
    href: '/hospitals?specialty=Pediatrician',
    about: 'Dr. Meena Gupta is a highly experienced pediatrician with over 16 years of practice. She specializes in newborn care, child development, vaccinations, and pediatric nutrition.',
    qualifications: ['MBBS – Indore Medical College', 'MD Pediatrics – SMS Hospital, Jaipur', 'Fellowship – IAP'],
    availability: 'Mon – Fri, 10:00 AM – 1:00 PM & 4:00 PM – 7:00 PM',
    fee: '₹500',
    languages: ['Hindi', 'English'],
  },
  {
    name: 'Dr. Vikram Patel',
    specialty: 'Diabetologist',
    hospital: 'City Home Pvt. Ltd., Indore',
    experience: '12 yrs exp',
    rating: 4.6,
    reviews: 167,
    img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    tag: 'Highly Reviewed',
    tagColor: '#666',
    href: '/hospitals?specialty=Diabetes',
    about: 'Dr. Vikram Patel is a diabetes and endocrinology specialist. He provides holistic diabetes management including diet counseling, insulin therapy, and prevention of complications.',
    qualifications: ['MBBS – RD Gardi Medical College', 'MD Medicine – BHOPAL', 'RSSDI Certified Diabetologist'],
    availability: 'Tue – Sun, 12:00 PM – 4:00 PM',
    fee: '₹650',
    languages: ['Hindi', 'English', 'Gujarati'],
  },
];

function DoctorModal({ doctor, onClose }) {
  if (!doctor) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
          position: 'relative',
        }}
      >
        {/* Header banner */}
        <div style={{
          height: '200px',
          background: 'linear-gradient(135deg, #000 0%, #333 100%)',
          borderRadius: '20px 20px 0 0',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '1.5rem',
          gap: '1.2rem',
        }}>
          {/* bg blur circles */}
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: 'rgba(255,255,255,0.07)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-30px', left: '40%', width: '120px', height: '120px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />

          {/* Photo */}
          <img
            src={doctor.img}
            alt={doctor.name}
            style={{
              width: '90px', height: '90px',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'top',
              border: '3px solid rgba(255,255,255,0.8)',
              flexShrink: 0,
              position: 'relative', zIndex: 2,
            }}
            onError={e => e.target.style.display = 'none'}
          />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ color: '#fff', margin: '0 0 4px 0', fontSize: '1.2rem', fontWeight: '800' }}>{doctor.name}</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', margin: '0 0 6px 0', fontSize: '0.85rem', fontWeight: '600' }}>{doctor.specialty}</p>
            <span style={{
              background: doctor.tagColor,
              color: '#fff', fontSize: '0.68rem', fontWeight: '700',
              padding: '2px 10px', borderRadius: '20px',
            }}>{doctor.tag}</span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '14px', right: '14px',
              background: 'rgba(255,255,255,0.2)', border: 'none',
              borderRadius: '50%', width: '34px', height: '34px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', zIndex: 3,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          borderBottom: '1px solid #f3f4f6',
        }}>
          {[
            { icon: <Star size={15} fill="#f59e0b" color="#f59e0b" />, val: `${doctor.rating} (${doctor.reviews})`, label: 'Rating' },
            { icon: <Award size={15} color="#2563eb" />, val: doctor.experience, label: 'Experience' },
            { icon: <Clock size={15} color="#000" />, val: doctor.fee, label: 'Consult Fee' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '1rem 0.5rem', textAlign: 'center',
              borderRight: i < 2 ? '1px solid #f3f4f6' : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>{s.icon}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#111827' }}>{s.val}</div>
              <div style={{ fontSize: '0.68rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem' }}>

          {/* Hospital */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1.2rem', color: '#6b7280', fontSize: '0.85rem' }}>
            <MapPin size={14} color="#000" />
            <span>{doctor.hospital}</span>
          </div>

          {/* About */}
          <div style={{ marginBottom: '1.2rem' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>About</h4>
            <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>{doctor.about}</p>
          </div>

          {/* Qualifications */}
          <div style={{ marginBottom: '1.2rem' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Qualifications</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {doctor.qualifications.map((q, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#374151' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#000', flexShrink: 0 }} />
                  {q}
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
            <Calendar size={15} color="#000" />
            <div>
              <div style={{ fontSize: '0.7rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Availability</div>
              <div style={{ fontSize: '0.82rem', color: '#111827', fontWeight: '600' }}>{doctor.availability}</div>
            </div>
          </div>

          {/* Languages */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '700', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Languages</h4>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {doctor.languages.map((lang, i) => (
                <span key={i} style={{ background: '#f3f4f6', color: '#374151', fontSize: '0.75rem', padding: '3px 10px', borderRadius: '20px', fontWeight: '500' }}>
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            href={doctor.href}
            style={{
              display: 'block', textDecoration: 'none',
            background: '#000', color: '#fff',
              textAlign: 'center', padding: '0.85rem',
              borderRadius: '12px', fontWeight: '700', fontSize: '0.95rem',
            }}
          >
            Book Appointment →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function TopDoctors() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <section style={{ marginBottom: '4rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.4rem' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(1.15rem, 3.5vw, 1.5rem)', fontWeight: '800', margin: '0 0 4px 0', color: '#111827' }}>
            Top Doctors
          </h2>
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#6b7280' }}>
            Trusted specialists across Indore — book an OPD instantly
          </p>
        </div>
        <Link
          href="/hospitals"
          style={{ color: '#000', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '3px' }}
        >
          See All <span style={{ fontSize: '1.1rem' }}>›</span>
        </Link>
      </div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
        gap: '1.2rem',
      }}>
        {DOCTORS.map((doc, i) => (
          <div
            key={i}
            className="smooth-lift"
            onClick={() => setSelectedDoctor(doc)}
            style={{
              '--lift-distance': '-4px',
              '--lift-shadow-hover': '0 14px 28px rgba(15,23,42,0.12)',
              background: '#fff',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 10px rgba(15,23,42,0.05)',
              cursor: 'pointer',
            }}
          >
            {/* Doctor image */}
            <div style={{ position: 'relative', height: '180px', background: '#f3f4f6', overflow: 'hidden' }}>
              <img
                src={doc.img}
                alt={doc.name}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div style={{
                position: 'absolute', top: '10px', left: '10px',
                background: doc.tagColor, color: '#fff',
                fontSize: '0.68rem', fontWeight: '700',
                padding: '3px 8px', borderRadius: '20px', letterSpacing: '0.03em',
              }}>
                {doc.tag}
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#111827', margin: '0 0 2px 0' }}>
                {doc.name}
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#000', fontWeight: '600', margin: '0 0 4px 0' }}>
                {doc.specialty}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <MapPin size={11} color="#9ca3af" />
                {doc.hospital}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '0.7rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={13} fill="#f59e0b" color="#f59e0b" />
                  <span style={{ fontWeight: '700', fontSize: '0.82rem', color: '#111827' }}>{doc.rating}</span>
                  <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>({doc.reviews})</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#374151', fontWeight: '600', background: '#f3f4f6', padding: '2px 8px', borderRadius: '10px' }}>
                  {doc.experience}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Detail Modal */}
      {selectedDoctor && (
        <DoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
    </section>
  );
}
