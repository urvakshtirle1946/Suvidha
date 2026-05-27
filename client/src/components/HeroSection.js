'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { apiFetch } from '@/utils/api';

const MOSAIC = [
  ['https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80', '1/2', '1/2'],
  ['https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80', '2/3', '1/3'],
  ['https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80', '3/4', '1/2'],
  ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80', '1/2', '2/3'],
  ['https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=600&q=80', '3/4', '2/3'],
];

const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad'];

// ─── Generic dropdown field ───────────────────────────────────────────────────
function SkeletonRow({ width }) {
  return (
    <div style={{ padding: '0.7rem 1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{
        height: '12px', borderRadius: '6px', background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.4s infinite',
        width: width || '60%',
      }} />
    </div>
  );
}

function SearchField({ label, placeholder, value, onChange, suggestions = [], onSelect, icon, loading = false }) {
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setFocused(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const showDrop = focused && suggestions.length > 0;

  return (
    <div ref={ref} style={{ flex: 1, position: 'relative', minWidth: 0 }}>
      <div style={{ padding: '0.85rem 1.1rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>
          {label}
        </div>
        <input
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          style={{
            border: 'none', outline: 'none', width: '100%',
            fontSize: '0.875rem', color: '#111827',
            background: 'transparent', fontWeight: '500',
          }}
        />
      </div>

      {(showDrop || (focused && loading)) && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          right: 0,
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.14)',
          border: '1px solid #e5e7eb',
          zIndex: 100,
          overflow: 'hidden',
          maxHeight: '220px',
          overflowY: 'auto',
        }}>
          {loading ? (
            [70, 50, 80, 55, 65].map((w, i) => <SkeletonRow key={i} width={`${w}%`} />)
          ) : suggestions.map((s, i) => (
            <div
              key={i}
              onMouseDown={() => { onSelect(s); setFocused(false); }}
              style={{
                padding: '0.7rem 1rem',
                fontSize: '0.875rem',
                color: '#374151',
                cursor: 'pointer',
                borderBottom: i < suggestions.length - 1 ? '1px solid #f3f4f6' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {icon && <span style={{ color: '#9ca3af', flexShrink: 0 }}>{icon}</span>}
              {typeof s === 'string' ? s : (
                <span>
                  <span style={{ fontWeight: '600', color: '#111827' }}>{s.name}</span>
                  {s.sub && <span style={{ color: '#9ca3af', fontSize: '0.78rem', marginLeft: '6px' }}>{s.sub}</span>}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HeroSection({ defaultServices: preloadedServices = [], defaultHospitals: preloadedHospitals = [] }) {
  const router = useRouter();
  const { location } = useLocation();

  const [where, setWhere] = useState(location || '');
  const [what, setWhat] = useState('');
  const [which, setWhich] = useState('');

  // Default lists — use preloaded data if available, else fetch on mount
  const [loadingServices, setLoadingServices] = useState(preloadedServices.length === 0);
  const [loadingHospitals, setLoadingHospitals] = useState(preloadedHospitals.length === 0);
  const [defaultServices, setDefaultServices] = useState(preloadedServices);
  const [defaultHospitals, setDefaultHospitals] = useState(preloadedHospitals);

  // Live-filtered lists (shown when typing)
  const [whatSuggestions, setWhatSuggestions] = useState([]);
  const [whichSuggestions, setWhichSuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);

  // ── Only fetch if not preloaded ─────────────────────────────────────────────
  useEffect(() => {
    if (preloadedServices.length > 0) return;
    // Show diagnostic/screening services (Scan + Lab) — no Surgery/OPD
    Promise.all([
      apiFetch('/api/services?category=Scan&limit=50').then(r => r.ok ? r.json() : []),
      apiFetch('/api/services?category=Lab&limit=50').then(r => r.ok ? r.json() : []),
    ])
      .then(([scanData, labData]) => {
        const scanList = Array.isArray(scanData) ? scanData : (scanData.data || []);
        const labList  = Array.isArray(labData)  ? labData  : (labData.data  || []);
        
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

        const combined = [...uniqueScans, ...uniqueLabs];
        
        // Ensure X-Ray is in the list
        const xrayInList = combined.some(s => s.name.toLowerCase().includes('x-ray') || s.name.toLowerCase().includes('xray'));
        let finalCombined = combined;
        if (!xrayInList) {
            finalCombined = [{ name: 'X-Ray', category: 'Scan' }, ...combined];
        }
        
        setDefaultServices(finalCombined.map(s => ({ name: s.name, sub: s.category })));
      })
      .catch(() => {})
      .finally(() => setLoadingServices(false));
  }, [preloadedServices.length]);


  useEffect(() => {
    if (preloadedHospitals.length > 0) return;
    apiFetch('/api/hospitals?limit=8')
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        const list = Array.isArray(data) ? data : (data.data || []);
        setDefaultHospitals(list.map(h => ({ name: h.name, sub: h.location })));
      })
      .catch(() => {})
      .finally(() => setLoadingHospitals(false));
  }, [preloadedHospitals.length]);

  // ── City filter ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!where) { setCitySuggestions(CITIES.slice(0, 5)); return; }
    setCitySuggestions(CITIES.filter(c => c.toLowerCase().startsWith(where.toLowerCase())));
  }, [where]);

  // ── Live service search ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!what || what.length < 2) {
      setWhatSuggestions(defaultServices);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await apiFetch(`/api/services?search=${encodeURIComponent(what)}&limit=8`, { signal: ctrl.signal });
        if (!res.ok) return;
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.data || []);
        setWhatSuggestions(list.map(s => ({ name: s.name, sub: s.category || s.hospital_name })));
      } catch { /* ignore abort */ }
    }, 280);
    return () => { ctrl.abort(); clearTimeout(t); };
  }, [what, defaultServices]);

  // ── Live hospital search ────────────────────────────────────────────────────
  useEffect(() => {
    if (!which || which.length < 2) {
      setWhichSuggestions(defaultHospitals);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await apiFetch(`/api/hospitals?search=${encodeURIComponent(which)}&limit=8`, { signal: ctrl.signal });
        if (!res.ok) return;
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.data || []);
        setWhichSuggestions(list.map(h => ({ name: h.name, sub: h.location })));
      } catch { /* ignore abort */ }
    }, 280);
    return () => { ctrl.abort(); clearTimeout(t); };
  }, [which, defaultHospitals]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (where) params.set('location', where);
    if (what) params.set('search', what);
    if (which) params.set('hospital', which);
    router.push(`/hospitals?${params.toString()}`);
  };

  return (
    <div style={{ position: 'relative', flex: '0 0 auto' }}>
      {/* Mosaic */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.5fr 1fr',
        gridTemplateRows: '160px 160px',
        gap: '6px',
        borderRadius: '20px',
        overflow: 'hidden',
        height: '320px',
      }}>
        {MOSAIC.map(([src, col, row], i) => (
          <div key={i} style={{ gridColumn: col, gridRow: row, overflow: 'hidden' }}>
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => e.target.style.background = '#e5e7eb'} />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '20px',
        background: 'linear-gradient(160deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Text */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
        padding: '1rem 2rem', paddingBottom: '5rem',
      }}>
        <h1 style={{
          color: '#fff', fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', fontWeight: '800',
          textAlign: 'center', textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          letterSpacing: '-0.02em', lineHeight: 1.15, margin: 0,
        }}>
          Discover Healthcare Near You
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(0.8rem, 2vw, 1rem)',
          textAlign: 'center', textShadow: '0 1px 6px rgba(0,0,0,0.4)', margin: 0,
        }}>
          Labs · Hospitals · Specialists — Zero Service Fees
        </p>
      </div>

      {/* Search bar */}
      <div style={{
        position: 'absolute', bottom: '-28px', left: '50%', transform: 'translateX(-50%)',
        width: 'min(700px, 90%)', background: '#fff', borderRadius: '16px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'stretch',
        border: '1px solid #e5e7eb', overflow: 'visible', zIndex: 20,
      }}>
        {/* Where */}
        <div style={{ borderRight: '1px solid #e5e7eb', overflow: 'visible' }}>
          <SearchField
            label="Where"
            placeholder="City or area"
            value={where}
            onChange={e => setWhere(e.target.value)}
            suggestions={citySuggestions}
            onSelect={v => setWhere(v)}
            icon={<MapPin size={14} color="#000" />}
          />
        </div>

        {/* What */}
        <div style={{ borderRight: '1px solid #e5e7eb', overflow: 'visible', flex: 1 }}>
          <SearchField
            label="What"
            placeholder="Test or treatment"
            value={what}
            onChange={e => setWhat(e.target.value)}
            suggestions={whatSuggestions}
            onSelect={v => setWhat(typeof v === 'string' ? v : v.name)}
            loading={loadingServices && whatSuggestions.length === 0}
          />
        </div>

        {/* Hospital */}
        <div style={{ overflow: 'visible', flex: 1 }}>
          <SearchField
            label="Hospital"
            placeholder="Hospital name"
            value={which}
            onChange={e => setWhich(e.target.value)}
            suggestions={whichSuggestions}
            onSelect={v => setWhich(typeof v === 'string' ? v : v.name)}
            loading={loadingHospitals && whichSuggestions.length === 0}
          />
        </div>

        {/* Search button */}
        <div style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <button
            onClick={handleSearch}
            style={{
              background: '#000', border: 'none', cursor: 'pointer',
              width: '44px', height: '44px', borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#333'}
            onMouseLeave={e => e.currentTarget.style.background = '#000'}
          >
            <Search size={18} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}
