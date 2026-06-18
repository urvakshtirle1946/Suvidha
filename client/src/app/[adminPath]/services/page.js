'use client';
import { useState, useEffect } from 'react';
import { Stethoscope, Plus, Tag, Search, Filter, Building2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { getApiUrl } from '@/utils/api';

export default function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const { addToast } = useToast();
  const isPartner = currentUser?.role === 'hospital_partner';

  // Form State
  const [formData, setFormData] = useState({
    hospital_id: '',
    name: '',
    category: 'Lab', // Default
    price: '',
    discount_price: '',
    description: '',
    slot_capacity: 1,
    is_active: true
  });

  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 10;

  useEffect(() => {
    fetchCurrentUser();
    fetchServices(page);
    fetchHospitals();
  }, [page]); // Re-fetch on page change

  const fetchCurrentUser = async () => {
    try {
      const apiUrl = getApiUrl();
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${apiUrl}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data?.user) {
        setCurrentUser(data.user);
        if (data.user.role === 'hospital_partner' && data.user.hospital_id) {
          setFormData(prev => ({ ...prev, hospital_id: data.user.hospital_id }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchServices = async (currentPage = 1) => {
    setLoading(true);
    try {
      const apiUrl = getApiUrl();
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${apiUrl}/api/services/manage`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const result = await res.json();
        // Handle both new paginated response and old array response (fallback)
        if (result.data) {
            setServices(result.data);
            setTotalPages(result.meta.totalPages);
        } else {
            setServices(result); // Fallback
            setTotalPages(1);
        }
      }
    } catch (err) {
      console.error(err);
      addToast('Error fetching services', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchHospitals = async () => {
      try {
        const apiUrl = getApiUrl();
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`${apiUrl}/api/hospitals/manage`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
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
    if (!currentUser) {
        addToast('Please wait while your admin session loads.', 'error');
        return;
    }
    try {
        const apiUrl = getApiUrl();
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`${apiUrl}/api/services`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              ...formData,
              hospital_id: isPartner ? currentUser.hospital_id : formData.hospital_id
            })
        });

        if (res.ok) {
            addToast('Service Added Successfully!', 'success');
            setShowForm(false);
            setFormData({ hospital_id: isPartner ? currentUser.hospital_id : '', name: '', category: 'Lab', price: '', discount_price: '', description: '', slot_capacity: 1, is_active: true });
            fetchServices(); 
        } else {
            addToast('Failed to add service', 'error');
        }
    } catch (err) {
        console.error(err);
        addToast('Error adding service', 'error');
    }
  };

  const toggleService = async (service) => {
    try {
      const apiUrl = getApiUrl();
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${apiUrl}/api/services/${service.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...service, is_active: !service.is_active })
      });
      if (!res.ok) throw new Error('Update failed');
      addToast(service.is_active ? 'Service paused' : 'Service activated', 'success');
      fetchServices(page);
    } catch (err) {
      console.error(err);
      addToast('Failed to update service', 'error');
    }
  };

  // Light & Clean Styles matching Dashboard
  const cardStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '20px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)'
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem', 
    background: 'var(--bg-primary)', 
    border: '1px solid var(--border)', 
    color: 'var(--text-primary)', borderRadius: '12px',
    outline: 'none', transition: 'border-color 0.2s',
    fontSize: '0.95rem'
  };

  if (showForm) {
      return (
          <div className="animate-fade-in">
              <div className="admin-header-row">
                  <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>Add New Service</h1>
                  <button className="btn" onClick={() => setShowForm(false)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>Cancel</button>
              </div>
              
              <div className="admin-card-padding" style={{ ...cardStyle, maxWidth: '700px', margin: '0 auto' }}>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      
                      <div>
                          <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Service Name</label>
                          <input 
                            type="text" required placeholder="e.g. MRI Scan, CBC Test"
                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                            style={inputStyle}
                          />
                      </div>

                      <div>
                          <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Bookings Per Time Slot</label>
                          <input
                            type="number" min="1" required
                            value={formData.slot_capacity}
                            onChange={e => setFormData({...formData, slot_capacity: e.target.value})}
                            style={inputStyle}
                          />
                      </div>

                      <div className="admin-form-grid">
                          <div>
                              <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Category</label>
                              <select 
                                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                                style={inputStyle}
                              >
                                  <option value="Lab">Lab Test</option>
                                  <option value="Scan">Scan / X-Ray</option>
                                  <option value="OPD">OPD Consultation</option>
                                  <option value="Surgery">Surgery</option>
                              </select>
                          </div>
                          <div>
                              <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Assign To Hospital</label>
                              <select
                                value={formData.hospital_id} onChange={e => setFormData({...formData, hospital_id: e.target.value})}
                                disabled={!currentUser || isPartner}
                                style={inputStyle}
                              >
                                  {!isPartner && <option value="">-- Global / Independent --</option>}
                                  {hospitals.map(h => (
                                      <option key={h.id} value={h.id}>{h.name}</option>
                                  ))}
                              </select>
                          </div>
                      </div>

                      <div className="admin-form-grid">
                          <div>
                              <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Original Price (₹)</label>
                              <input 
                                type="number" required
                                value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                                style={inputStyle}
                              />
                          </div>
                          <div>
                              <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Discounted Price (₹)</label>
                              <input 
                                type="number" required
                                value={formData.discount_price} onChange={e => setFormData({...formData, discount_price: e.target.value})}
                                style={inputStyle}
                              />
                          </div>
                      </div>

                      <div>
                          <label style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Description (Optional)</label>
                          <textarea 
                            rows="3"
                            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                            style={{ ...inputStyle, resize: 'vertical' }}
                          />
                      </div>

                      <button className="btn" style={{ 
                          marginTop: '1rem', padding: '1rem', 
                          background: 'var(--accent)', 
                          color: 'var(--accent-text)', border: 'none', fontSize: '1rem', fontWeight: '600',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                          cursor: 'pointer', borderRadius: '12px'
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
        <div className="admin-header-row">
            <div>
                <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>Service Management</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Configure medical services and pricing.</p>
            </div>
            <button className="btn" onClick={() => setShowForm(true)} style={{ 
                background: 'var(--accent)', 
                color: 'var(--accent-text)', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                padding: '0.8rem 1.5rem', cursor: 'pointer', borderRadius: '12px',
                display: 'flex', alignItems: 'center', fontWeight: '600'
            }}>
                <Plus size={20} style={{ marginRight: '8px' }} /> Add Service
            </button>
        </div>

        {/* Filters */}
        <div style={{ ...cardStyle, padding: '1rem', display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Search size={20} style={{ color: 'var(--text-secondary)' }} />
            <input 
                type="text" placeholder="Search services..." 
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', flex: 1, outline: 'none', fontSize: '0.95rem' }} 
            />
            <div style={{ width: '1px', height: '24px', background: 'var(--border)' }}></div>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', display: 'flex', gap: '6px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}>
                <Filter size={18} /> Filter
            </button>
        </div>

        {/* Table */}
        <div style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Service Name</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Category</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Hospital</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Price</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Capacity / Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <div style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '4px', color: 'var(--text-primary)' }}>{service.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{service.description}</div>
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <span style={{ 
                                        padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem',
                                        background: service.category === 'Lab' ? 'rgba(2, 132, 199, 0.1)' : 'rgba(147, 51, 234, 0.1)',
                                        color: service.category === 'Lab' ? '#0284c7' : '#9333ea',
                                        border: service.category === 'Lab' ? '1px solid rgba(186, 230, 253, 0.5)' : '1px solid rgba(233, 213, 255, 0.5)',
                                        fontWeight: '500'
                                    }}>
                                        {service.category}
                                    </span>
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    {service.hospital_name ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                                            <Building2 size={16} color="var(--text-secondary)" /> {service.hospital_name}
                                        </div>
                                    ) : (
                                        <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.9rem' }}>Platform Wide</span>
                                    )}
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ textDecoration: 'line-through', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>₹{service.price}</span>
                                        <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.1rem' }}>₹{service.discount_price}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem' }}>
                                    <div style={{ marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{service.slot_capacity || 1} per slot</div>
                                    <button onClick={() => toggleService(service)} className="btn-link" style={{ color: service.is_active ? '#f87171' : '#22c55e', fontSize: '0.9rem', fontWeight: '500', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                      {service.is_active ? 'Pause' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {services.length === 0 && !loading && (
                    <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <div style={{ background: 'var(--bg-primary)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                           <Stethoscope size={32} style={{ opacity: 0.5, color: 'var(--text-secondary)' }} />
                        </div>
                        <h3>No services found.</h3>
                        <p>Add one to get started.</p>
                    </div>
                )}
                
                {/* Pagination Controls */}
                {services.length > 0 && totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
                        <button 
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="btn"
                            style={{ 
                                background: 'var(--bg-primary)', 
                                border: '1px solid var(--border)', 
                                color: page === 1 ? 'var(--text-secondary)' : 'var(--text-primary)',
                                cursor: page === 1 ? 'not-allowed' : 'pointer',
                                padding: '8px 16px', borderRadius: '8px'
                            }}
                        >
                            Previous
                        </button>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Page {page} of {totalPages}</span>
                        <button 
                            disabled={page === totalPages}
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            className="btn"
                            style={{ 
                                background: 'var(--bg-primary)', 
                                border: '1px solid var(--border)', 
                                color: page === totalPages ? 'var(--text-secondary)' : 'var(--text-primary)',
                                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                                padding: '8px 16px', borderRadius: '8px'
                            }}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
