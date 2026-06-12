'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Sparkles, Target, X } from 'lucide-react';
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
                color: s && s.isAISuggest ? '#7c3aed' : '#374151',
                background: s && s.isAISuggest ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)' : 'transparent',
                cursor: 'pointer',
                borderBottom: i < suggestions.length - 1 ? '1px solid #f3f4f6' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={e => e.currentTarget.style.background = s && s.isAISuggest ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)' : '#f9fafb'}
              onMouseLeave={e => e.currentTarget.style.background = s && s.isAISuggest ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)' : 'transparent'}
            >
              {icon && <span style={{ color: '#9ca3af', flexShrink: 0 }}>{icon}</span>}
              {typeof s === 'string' ? s : (
                s.isAISuggest ? (
                  <span style={{ fontWeight: '700', color: '#7c3aed' }}>
                    {s.name}
                  </span>
                ) : (
                  <span>
                    <span style={{ fontWeight: '600', color: '#111827' }}>{s.name}</span>
                    {s.sub && <span style={{ color: '#9ca3af', fontSize: '0.78rem', marginLeft: '6px' }}>{s.sub}</span>}
                  </span>
                )
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
  const { location: ctxLocation, setLocation: setCtxLocation, detectLocation } = useLocation();

  const [where, setWhere] = useState(ctxLocation || '');
  const [what, setWhat] = useState('');
  const [which, setWhich] = useState('');

  // AI Mode states
  const [isAiMode, setIsAiMode] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [placeholderText, setPlaceholderText] = useState("Search tests or full body checkups");
  const [isTransitioningPlaceholder, setIsTransitioningPlaceholder] = useState(false);
  const [btnScale, setBtnScale] = useState(1);
  const searchBarRef = useRef(null);

  // Close suggestions when clicking outside the search pill container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setFocusedField(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Default lists — use preloaded data if available, else fetch on mount
  const [loadingServices, setLoadingServices] = useState(preloadedServices.length === 0);
  const [loadingHospitals, setLoadingHospitals] = useState(preloadedHospitals.length === 0);
  const [defaultServices, setDefaultServices] = useState(preloadedServices);
  const [defaultHospitals, setDefaultHospitals] = useState(preloadedHospitals);

  // Live-filtered lists (shown when typing)
  const [whatSuggestions, setWhatSuggestions] = useState([]);
  const [whichSuggestions, setWhichSuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);

  // Symptoms & AI Suggest states
  const [symptomsInput, setSymptomsInput] = useState('');
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  // Synchronize input with context location when it changes
  useEffect(() => {
    if (ctxLocation) {
      setWhere(ctxLocation);
    }
  }, [ctxLocation]);

  // Google search bar style transition for placeholder
  useEffect(() => {
    setIsTransitioningPlaceholder(true);
    const timer = setTimeout(() => {
      setPlaceholderText(
        isAiMode
          ? "Describe your symptoms or ask anything..."
          : "Search tests or full body checkups"
      );
      setIsTransitioningPlaceholder(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [isAiMode]);

  // Google search bar style bounce/scale morph for button
  useEffect(() => {
    setBtnScale(0.8);
    const timer = setTimeout(() => {
      setBtnScale(1);
    }, 150);
    return () => clearTimeout(timer);
  }, [isAiMode]);

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
        const formatted = list.map(s => ({ name: s.name, sub: s.category || s.hospital_name }));
        
        if (what.trim().length > 0) {
          formatted.push({
            name: `✨ Analyze symptoms for "${what}" with Zelp AI`,
            isAISuggest: true,
            originalQuery: what
          });
        }
        
        setWhatSuggestions(formatted);
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

  const handleSymptomsSubmit = async (overrideSymptoms) => {
    const input = typeof overrideSymptoms === 'string' ? overrideSymptoms : symptomsInput;
    if (!input.trim() || loadingSuggestions) return;

    setLoadingSuggestions(true);
    try {
      const response = await apiFetch('/api/symptoms/suggest', {
        method: 'POST',
        body: JSON.stringify({ symptoms: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch symptom suggestions');
      }

      const data = await response.json();
      const suggestions = data.suggestions || [];

      // Store exclusively in sessionStorage
      sessionStorage.setItem('ai_suggestions', JSON.stringify(suggestions));
      sessionStorage.setItem('ai_query', input);

      // Clean URL redirect
      router.push(`/search-results?symptoms=${encodeURIComponent(input.trim())}`);
    } catch (err) {
      console.error('Error fetching symptom suggestions:', err);
      sessionStorage.setItem('ai_suggestions', JSON.stringify([]));
      sessionStorage.setItem('ai_query', input);
      router.push(`/search-results?symptoms=${encodeURIComponent(input.trim())}`);
    } finally {
      setLoadingSuggestions(false);
    }
  };

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
      <div className="hero-mosaic">
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
      <div className="hero-text-overlay">
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

      {/* Unified Pill Search Bar (Uber/1mg Style) */}
      <div ref={searchBarRef} className={`search-bar-pill ${isAiMode ? 'ai-mode-active' : ''}`}>
        <div className="search-bar-pill-inner">
          
          {/* 1. Location Section (Left Side) */}
          <div className="search-bar-location">
            <MapPin size={18} color="#000000" style={{ flexShrink: 0 }} />
            <input
              type="text"
              value={where}
              onChange={e => {
                setWhere(e.target.value);
                setFocusedField('location');
              }}
              onFocus={() => setFocusedField('location')}
              placeholder="City or area"
            />
            <button 
              type="button" 
              onClick={detectLocation}
              className="gps-detect-btn"
              title="Auto-detect Location"
            >
              <Target size={18} className={ctxLocation === 'Detecting...' ? 'gps-spin' : ''} />
            </button>

            {/* Location Suggestions Dropdown */}
            {focusedField === 'location' && citySuggestions.length > 0 && (
              <div className="pill-suggestions-dropdown">
                {citySuggestions.map((city, idx) => (
                  <div 
                    key={idx} 
                    onMouseDown={() => {
                      setWhere(city);
                      setFocusedField(null);
                    }} 
                    className="pill-suggestion-item"
                  >
                    <MapPin size={14} color="#9ca3af" />
                    <span>{city}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="search-bar-divider" />

          {/* 2. Search Input Section (What) */}
          <div className="search-bar-input-wrap">
            <div className={`ai-input-wrapper ${isAiMode ? 'ai-active' : ''}`}>
              <div className="ai-input-inner">
                <input
                  type="text"
                  value={isAiMode ? symptomsInput : what}
                  onChange={e => {
                    if (isAiMode) {
                      setSymptomsInput(e.target.value);
                    } else {
                      setWhat(e.target.value);
                      setFocusedField('search');
                    }
                  }}
                  onFocus={() => {
                    if (!isAiMode) setFocusedField('search');
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (isAiMode) {
                        handleSymptomsSubmit();
                      } else {
                        handleSearch();
                      }
                      setFocusedField(null);
                    }
                  }}
                  placeholder={placeholderText}
                  className={isTransitioningPlaceholder ? 'placeholder-fade' : 'placeholder-normal'}
                />
                
                {/* Clear button if text exists */}
                {((isAiMode && symptomsInput) || (!isAiMode && what)) && (
                  <button
                    type="button"
                    onClick={() => {
                      if (isAiMode) {
                        setSymptomsInput('');
                      } else {
                        setWhat('');
                      }
                    }}
                    className="clear-input-btn"
                    title="Clear input"
                  >
                    <X size={14} />
                  </button>
                )}

                {/* Custom AI Mode capsule toggler */}
                <div 
                  onClick={() => setIsAiMode(!isAiMode)}
                  className={`ai-mode-toggle-wrap ${isAiMode ? 'active' : ''}`}
                  title={isAiMode ? "Switch to Normal Search" : "Switch to AI Mode"}
                >
                  <div className="ai-mode-toggle-inner">
                    <div style={{ position: 'relative', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Search size={14} color={isAiMode ? "#ffffff" : "#000000"} strokeWidth={2.5} />
                      <Sparkles size={8} color={isAiMode ? "#ffffff" : "#000000"} style={{ position: 'absolute', top: '-3px', right: '-3px' }} />
                    </div>
                    <span className="ai-mode-toggle-text">AI Mode</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Suggestions Dropdown */}
            {focusedField === 'search' && !isAiMode && whatSuggestions.length > 0 && (
              <div className="pill-suggestions-dropdown">
                {whatSuggestions.map((s, idx) => (
                  <div 
                    key={idx}
                    onMouseDown={() => {
                      if (s && s.isAISuggest) {
                        setIsAiMode(true);
                        setSymptomsInput(s.originalQuery);
                        handleSymptomsSubmit(s.originalQuery);
                      } else {
                        setWhat(typeof s === 'string' ? s : s.name);
                      }
                      setFocusedField(null);
                    }}
                    className={`pill-suggestion-item ${s && s.isAISuggest ? 'ai-suggest' : ''}`}
                  >
                    {s && s.isAISuggest ? (
                      <>
                        <Sparkles size={14} />
                        <span>{s.name}</span>
                      </>
                    ) : (
                      <>
                        <Search size={14} color="#9ca3af" />
                        <div>
                          <span style={{ fontWeight: '600', color: '#111827' }}>{typeof s === 'string' ? s : s.name}</span>
                          {s.sub && <span style={{ color: '#9ca3af', fontSize: '0.78rem', marginLeft: '8px' }}>{s.sub}</span>}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="search-bar-divider" />

          {/* 3. Hospital Section (Which) */}
          <div className="search-bar-hospital">
            <input
              type="text"
              value={which}
              onChange={e => {
                setWhich(e.target.value);
                setFocusedField('hospital');
              }}
              onFocus={() => setFocusedField('hospital')}
              placeholder="Hospital name"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch();
                  setFocusedField(null);
                }
              }}
            />

            {/* Hospital Suggestions Dropdown */}
            {focusedField === 'hospital' && whichSuggestions.length > 0 && (
              <div className="pill-suggestions-dropdown">
                {whichSuggestions.map((h, idx) => (
                  <div 
                    key={idx}
                    onMouseDown={() => {
                      setWhich(typeof h === 'string' ? h : h.name);
                      setFocusedField(null);
                    }}
                    className="pill-suggestion-item"
                  >
                    <Search size={14} color="#9ca3af" />
                    <div>
                      <span style={{ fontWeight: '600', color: '#111827' }}>{typeof h === 'string' ? h : h.name}</span>
                      {h.sub && <span style={{ color: '#9ca3af', fontSize: '0.78rem', marginLeft: '8px' }}>{h.sub}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. AI / Search Button Section (Far Right) */}
          <div className="search-bar-button-wrap">
            <button
              onClick={() => {
                const currentQuery = isAiMode ? symptomsInput : what;
                if (!currentQuery.trim()) {
                  setIsAiMode(!isAiMode);
                } else {
                  if (isAiMode) {
                    handleSymptomsSubmit();
                  } else {
                    handleSearch();
                  }
                }
              }}
              style={{
                transform: `scale(${btnScale})`,
              }}
              title={isAiMode ? "Analyze Symptoms with AI" : "Search"}
            >
              <Search size={18} color="#ffffff" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
