'use client';
import { useState, useEffect } from 'react';
import { Stethoscope, Plus, Tag, Search, Filter, Building2 } from 'lucide-react';

export default function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    hospital_id: '',
    name: '',
    category: 'Lab', // Default
    price: '',
    discount_price: '',
    description: ''
  });

  useEffect(() => {
    fetchServices();
    fetchHospitals();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHospitals = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/hospitals');
        if (res.ok) {
          const data = await res.json();
          setHospitals(data);
        }
      } catch (err) {
        console.error(err);
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('http://localhost:5000/api/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            alert('Service Added Successfully!');
            setShowForm(false);
            setFormData({ hospital_id: '', name: '', category: 'Lab', price: '', discount_price: '', description: '' });
            fetchServices(); 
        } else {
            alert('Failed to add service');
        }
    } catch (err) {
        console.error(err);
    }
  };

  // Premium Dark Styles
  const cardStyle = {
    background: 'rgba(30, 41, 59, 0.4)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem', 
    background: 'rgba(15, 23, 42, 0.6)', 
    border: '1px solid rgba(255,255,255,0.1)', 
    color: '#fff', borderRadius: '12px',
    outline: 'none', transition: 'border-color 0.2s',
    fontSize: '0.95rem'
  };

  if (showForm) {
      return (
          <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h1 style={{ fontSize: '2rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Add New Service</h1>
                  <button className="btn" onClick={() => setShowForm(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1' }}>Cancel</button>
              </div>
              
              <div style={{ ...cardStyle, padding: '2.5rem', maxWidth: '700px', margin: '0 auto' }}>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      
                      <div>
                          <label style={{ display: 'block', marginBottom: '0.6rem', color: '#94a3b8', fontSize: '0.9rem' }}>Service Name</label>
                          <input 
                            type="text" required placeholder="e.g. MRI Scan, CBC Test"
                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                            style={inputStyle}
                          />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <div>
                              <label style={{ display: 'block', marginBottom: '0.6rem', color: '#94a3b8', fontSize: '0.9rem' }}>Category</label>
                              <select 
                                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                                style={inputStyle}
                              >
                                  <option value="Lab" style={{ color: '#000' }}>Lab Test</option>
                                  <option value="Scan" style={{ color: '#000' }}>Scan / X-Ray</option>
                                  <option value="OPD" style={{ color: '#000' }}>OPD Consultation</option>
                                  <option value="Surgery" style={{ color: '#000' }}>Surgery</option>
                              </select>
                          </div>
                          <div>
                              <label style={{ display: 'block', marginBottom: '0.6rem', color: '#94a3b8', fontSize: '0.9rem' }}>Assign To Hospital</label>
                              <select 
                                value={formData.hospital_id} onChange={e => setFormData({...formData, hospital_id: e.target.value})}
                                style={inputStyle}
                              >
                                  <option value="" style={{ color: '#000' }}>-- Global / Independent --</option>
                                  {hospitals.map(h => (
                                      <option key={h.id} value={h.id} style={{ color: '#000' }}>{h.name}</option>
                                  ))}
                              </select>
                          </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <div>
                              <label style={{ display: 'block', marginBottom: '0.6rem', color: '#94a3b8', fontSize: '0.9rem' }}>Original Price (₹)</label>
                              <input 
                                type="number" required
                                value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                                style={inputStyle}
                              />
                          </div>
                          <div>
                              <label style={{ display: 'block', marginBottom: '0.6rem', color: '#94a3b8', fontSize: '0.9rem' }}>Discounted Price (₹)</label>
                              <input 
                                type="number" required
                                value={formData.discount_price} onChange={e => setFormData({...formData, discount_price: e.target.value})}
                                style={inputStyle}
                              />
                          </div>
                      </div>

                      <div>
                          <label style={{ display: 'block', marginBottom: '0.6rem', color: '#94a3b8', fontSize: '0.9rem' }}>Description (Optional)</label>
                          <textarea 
                            rows="3"
                            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                            style={{ ...inputStyle, resize: 'vertical' }}
                          />
                      </div>

                      <button className="btn" style={{ 
                          marginTop: '1rem', padding: '1rem', 
                          background: 'linear-gradient(135deg, #00d2d3 0%, #2e86de 100%)', 
                          color: '#fff', border: 'none', fontSize: '1rem', fontWeight: '600',
                          boxShadow: '0 4px 15px rgba(0, 210, 211, 0.3)'
                      }}>
                          Add Service
                      </button>

                  </form>
              </div>
          </div>
      );
  }

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
                <h1 style={{ fontSize: '2rem', fontWeight: '800', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Service Management</h1>
                <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Configure medical services and pricing.</p>
            </div>
            <button className="btn" onClick={() => setShowForm(true)} style={{ 
                background: 'linear-gradient(135deg, #00d2d3 0%, #2e86de 100%)', 
                color: '#fff', border: 'none', boxShadow: '0 4px 12px rgba(0, 210, 211, 0.3)',
                padding: '0.8rem 1.5rem'
            }}>
                <Plus size={20} style={{ marginRight: '8px' }} /> Add Service
            </button>
        </div>

        {/* Filters */}
        <div style={{ ...cardStyle, padding: '1rem', display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
            <Search size={20} style={{ color: '#64748b' }} />
            <input 
                type="text" placeholder="Search services..." 
                style={{ background: 'transparent', border: 'none', color: '#fff', flex: 1, outline: 'none', fontSize: '0.95rem' }} 
            />
            <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }}></div>
            <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', display: 'flex', gap: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>
                <Filter size={18} /> Filter
            </button>
        </div>

        {/* Table */}
        <div style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Service Name</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Category</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Hospital</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Price</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#94a3b8', fontWeight: '500', fontSize: '0.9rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} className="hover:bg-white/5">
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <div style={{ fontWeight: '500', fontSize: '1rem', marginBottom: '4px' }}>{service.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{service.description}</div>
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <span style={{ 
                                        padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem',
                                        background: service.category === 'Lab' ? 'rgba(52, 152, 219, 0.15)' : 'rgba(155, 89, 182, 0.15)',
                                        color: service.category === 'Lab' ? '#3498db' : '#9b59b6',
                                        border: service.category === 'Lab' ? '1px solid rgba(52, 152, 219, 0.2)' : '1px solid rgba(155, 89, 182, 0.2)'
                                    }}>
                                        {service.category}
                                    </span>
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    {service.hospital_name ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e2e8f0' }}>
                                            <Building2 size={16} color="#64748b" /> {service.hospital_name}
                                        </div>
                                    ) : (
                                        <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.9rem' }}>Platform Wide</span>
                                    )}
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ textDecoration: 'line-through', color: '#64748b', fontSize: '0.9rem' }}>₹{service.price}</span>
                                        <span style={{ color: '#00d2d3', fontWeight: 'bold', fontSize: '1.1rem' }}>₹{service.discount_price}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <button className="btn-link" style={{ color: '#f87171', fontSize: '0.9rem', fontWeight: '500', background: 'transparent', border: 'none', cursor: 'pointer' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {services.length === 0 && !loading && (
                    <div style={{ padding: '5rem', textAlign: 'center', color: '#64748b' }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                           <Stethoscope size={32} style={{ opacity: 0.5 }} />
                        </div>
                        <h3>No services found.</h3>
                        <p>Add one to get started.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
