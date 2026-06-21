'use client';
import { useState, useEffect } from 'react';
import { Building2, MapPin, Star, Plus, CheckCircle, Tag, XCircle } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { getApiUrl } from '@/utils/api';

export default function HospitalManagement() {
  const apiUrl = getApiUrl();
  const [hospitals, setHospitals] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Form State
  const initialForm = {
    name: '',
    location: '',
    rating: '4.5',
    discount_percentage: '',
    discount_description: '',
    image_url: '', // Empty by default
    phone_number: '',
    map_url: ''
  };

  const DEFAULT_HOSPITAL_IMAGE = 'https://images.unsplash.com/photo-1587351021759-3e566b9af955?auto=format&fit=crop&q=80&w=800';
  const canManageHospitalNetwork = currentUser && currentUser.role !== 'hospital_partner';

  const [formData, setFormData] = useState(initialForm);
  const [services, setServices] = useState([{ name: '', category: '', price: '', discount_price: '' }]);

  const addServiceRow = () => {
      setServices([...services, { name: '', category: '', price: '', discount_price: '' }]);
  };

  const removeServiceRow = (index) => {
      const newServices = [...services];
      newServices.splice(index, 1);
      setServices(newServices);
  };

  // Standard Services List
  const STANDARD_SERVICES = [
      { name: 'MRI Scan', category: 'Scan', price: '4500' },
      { name: 'CT Scan', category: 'Scan', price: '3500' },
      { name: 'X-Ray', category: 'Scan', price: '500' },
      { name: 'Ultrasound', category: 'Scan', price: '1200' },
      { name: 'CBC Test', category: 'Lab', price: '350' },
      { name: 'Lipid Profile', category: 'Lab', price: '800' },
      { name: 'Liver Function Test', category: 'Lab', price: '900' },
      { name: 'Thyroid Profile', category: 'Lab', price: '600' },
      { name: 'Consultation', category: 'OPD', price: '500' }
  ];

  const autofillServices = () => {
      // Append standard services to existing ones (removing empty placeholder if exists)
      let currentServices = [...services];
      if (currentServices.length === 1 && currentServices[0].name === '') {
          currentServices = [];
      }
      
      const newServices = [...currentServices, ...STANDARD_SERVICES.map(s => ({
          ...s,
          discount_price: '' // Discount left empty for user to fill if needed
      }))];
      
      setServices(newServices);
  };

  const updateService = (index, field, value) => {
      const newServices = [...services];
      newServices[index][field] = value;
      setServices(newServices);
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchHospitals();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${apiUrl}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data?.user) setCurrentUser(data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHospitals = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${apiUrl}/api/hospitals/manage`, {
        cache: 'no-store',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('admin_auth');
        localStorage.removeItem('admin_token');
        window.location.href = `/${process.env.NEXT_PUBLIC_ADMIN_ROUTE || 'admin'}/login`;
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setHospitals(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
      setFormData(initialForm);
      setFormData(prev => ({ ...prev, image_file: null })); // Explicitly clear file
      setServices([{ name: '', category: '', price: '', discount_price: '' }]);
      setEditMode(false);
      setEditId(null);
  };

  const handleEdit = async (hospital) => {
      // Visual feedback immediately
      setShowForm(true);
      setEditMode(true);
      setEditId(hospital.id);
      
      // Pre-fill basic data
      setFormData({
          name: hospital.name,
          location: hospital.location,
          rating: hospital.rating,
          discount_percentage: hospital.discount_percentage,
          discount_description: hospital.discount_description,
          image_url: hospital.image_url || initialForm.image_url,
          phone_number: hospital.phone_number || '',
          map_url: hospital.map_url || ''
      });
      
      // Fetch Services
      try {
          const token = localStorage.getItem('admin_token');
          const res = await fetch(`${apiUrl}/api/hospitals/${hospital.id}`, {
              headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
              const fullData = await res.json();
              if (fullData.services && fullData.services.length > 0) {
                  setServices(fullData.services);
              } else {
                  setServices([{ name: '', category: '', price: '', discount_price: '' }]);
              }
          }
      } catch (e) {
          console.error("Failed to fetch hospital details", e);
      }
  };

  const handleDelete = async (id) => {
      if(!confirm('Are you sure you want to delete this hospital?')) return;
      try {
          const token = localStorage.getItem('admin_token');
          const res = await fetch(`${apiUrl}/api/hospitals/${id}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${token}` }
          });
          if(res.ok) {
              fetchHospitals();
          } else {
              alert('Failed to delete');
          }
      } catch (err) {
          console.error(err);
      }
  };

  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const url = editMode 
            ? `${apiUrl}/api/hospitals/${editId}` 
            : `${apiUrl}/api/hospitals`;
        
    const method = editMode ? 'PUT' : 'POST';

    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('rating', formData.rating);
    data.append('discount_percentage', formData.discount_percentage);
    data.append('discount_description', formData.discount_description);
    data.append('phone_number', formData.phone_number);
    data.append('map_url', formData.map_url);
    // Append Services as JSON string
    data.append('services', JSON.stringify(services));

    if (formData.image_file) {
        data.append('image', formData.image_file);
    } else if (formData.image_url) {
        data.append('image_url', formData.image_url); // Keep existing URL if no new file
    }

    const token = localStorage.getItem('admin_token');
    const res = await fetch(url, {
        method: method,
        headers: { 'Authorization': `Bearer ${token}` },
        // headers: { 'Content-Type': 'multipart/form-data' }, // Do NOT set manually
        body: data
    });

        if (res.ok) {
            addToast(editMode ? 'Hospital Updated Successfully!' : 'Hospital Added Successfully!', 'success');
            setShowForm(false);
            resetForm();
            fetchHospitals(); // Refresh list
        } else {
            addToast('Failed to save hospital', 'error');
        }
    } catch (err) {
        console.error(err);
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
    width: '100%', padding: '1rem', 
    background: 'var(--bg-primary)', 
    border: '1px solid var(--border)', 
    color: 'var(--text-primary)', borderRadius: '12px',
    outline: 'none', transition: 'border-color 0.2s'
  };

  if (showForm) {
      return (
          <div className="animate-fade-in">
              <div className="admin-header-row">
                  <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                      {editMode ? 'Edit Hospital' : 'Add New Hospital'}
                  </h1>
                  <button className="btn" onClick={() => { setShowForm(false); resetForm(); }} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>Cancel</button>
              </div>
              
              <div className="admin-card-padding" style={{ ...cardStyle, maxWidth: '700px', margin: '0 auto' }}>
                  
                  {/* Image Preview at the Top */}
                  {(formData.image_file || formData.image_url) && (
                      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                          <div style={{ 
                              width: '100%', height: '200px', 
                              borderRadius: '16px', overflow: 'hidden', 
                              border: '1px solid var(--border)',
                              background: 'var(--bg-primary)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                              <img 
                                  src={formData.image_file ? URL.createObjectURL(formData.image_file) : (formData.image_url.startsWith('data:') || formData.image_url.startsWith('http') ? formData.image_url : apiUrl + formData.image_url)} 
                                  alt="Hospital Preview" 
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                          </div>
                      </div>
                  )}

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      
                      <div>
                          <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Hospital Name</label>
                          <input 
                            type="text" required 
                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                            style={inputStyle}
                            placeholder="e.g. Apollo International"
                          />
                      </div>

                      <div>
                          <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Location (City, Area)</label>
                          <div style={{ position: 'relative' }}>
                             <MapPin size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-secondary)' }} />
                             <input 
                                type="text" required 
                                value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                                style={{ ...inputStyle, paddingLeft: '3rem' }}
                                placeholder="e.g. Bandra West, Mumbai"
                             />
                          </div>
                      </div>

                      <div>
                          <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Google Maps Link</label>
                          <input 
                            type="text" 
                            value={formData.map_url} onChange={e => setFormData({...formData, map_url: e.target.value})}
                            style={inputStyle}
                            placeholder="Paste Google Maps URL here"
                          />
                      </div>

                      <div>
                          <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Hospital Image (Upload)</label>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={e => setFormData({...formData, image_file: e.target.files[0]})}
                            style={inputStyle}
                          />
                          {formData.image_url && !formData.image_file && (
                              <div style={{ marginTop: '5px', fontSize: '0.8rem', color: 'var(--accent)' }}>
                                  Current Image: <a href={(formData.image_url.startsWith('data:') || formData.image_url.startsWith('http')) ? formData.image_url : apiUrl + formData.image_url} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>View</a>
                              </div>
                          )}
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                          <div>
                              <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Rating</label>
                              <div style={{ position: 'relative' }}>
                                <Star size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: '#fbbf24' }} />
                                <input 
                                    type="number" step="0.1" max="5" 
                                    value={formData.rating} onChange={e => setFormData({...formData, rating: e.target.value})}
                                    style={{ ...inputStyle, paddingLeft: '3rem' }}
                                />
                              </div>
                          </div>
                      </div>

                      <div>
                          <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Offer Headline</label>
                          <input 
                            type="text" placeholder="e.g. Flat 20% OFF on First Consult"
                            value={formData.discount_description} onChange={e => setFormData({...formData, discount_description: e.target.value})}
                            style={inputStyle}
                          />
                      </div>

                      <div>
                          <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>WhatsApp Number (for Notifications)</label>
                          <input 
                            type="text" placeholder="e.g. +919876543210"
                            value={formData.phone_number} onChange={e => setFormData({...formData, phone_number: e.target.value})}
                            style={inputStyle}
                          />
                      </div>

                      {/* --- SERVICES SECTION --- */}
                      <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>Add Services</h3>
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="button" onClick={autofillServices} style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '500' }}>Autofill Standard</button>
                                <button type="button" onClick={addServiceRow} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#059669', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '500' }}>+ Add Row</button>
                              </div>
                          </div>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {services.map((service, index) => (
                                <div key={index} className="hospital-service-row">
                                    <input 
                                        type="text" placeholder="Service Name (e.g. MRI Brain)" 
                                        value={service.name} 
                                        onChange={e => updateService(index, 'name', e.target.value)}
                                        style={{ ...inputStyle, padding: '8px', fontSize: '0.9rem' }}
                                        required
                                    />
                                    <input 
                                        type="text" placeholder="Category" 
                                        value={service.category} 
                                        onChange={e => updateService(index, 'category', e.target.value)}
                                        style={{ ...inputStyle, padding: '8px', fontSize: '0.9rem' }}
                                        list="categories"
                                    />
                                    <input 
                                        type="number" placeholder="Price" 
                                        value={service.price} 
                                        onChange={e => updateService(index, 'price', e.target.value)}
                                        style={{ ...inputStyle, padding: '8px', fontSize: '0.9rem' }}
                                        required
                                    />
                                    <input 
                                        type="number" placeholder="Disc. Price" 
                                        value={service.discount_price} 
                                        onChange={e => updateService(index, 'discount_price', e.target.value)}
                                        style={{ ...inputStyle, padding: '8px', fontSize: '0.9rem' }}
                                    />
                                    <XCircle size={20} color="#f87171" style={{ cursor: 'pointer' }} onClick={() => removeServiceRow(index)} />
                                </div>
                            ))}
                          </div>
                          <datalist id="categories">
                              <option value="Scan" />
                              <option value="Lab" />
                              <option value="OPD" />
                              <option value="Surgery" />
                          </datalist>
                      </div>

                      <button className="btn" style={{ 
                          marginTop: '1rem', padding: '1rem', 
                          background: 'var(--accent)', 
                          color: 'var(--accent-text)', border: 'none', fontSize: '1rem',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontWeight: 'bold'
                      }}>
                          {editMode ? 'Update Hospital' : 'Add Hospital & Services'}
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
                <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>Hospital Partners</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Manage your network of healthcare providers.</p>
            </div>
            {canManageHospitalNetwork && <button className="btn" onClick={() => { resetForm(); setShowForm(true); }} style={{
                background: 'var(--accent)', 
                color: 'var(--accent-text)', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                padding: '0.8rem 1.5rem', fontWeight: 'bold'
            }}>
                <Plus size={20} style={{ marginRight: '8px' }} /> Add Hospital
            </button>}
        </div>

        <div className="grid-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {hospitals.map((hospital) => {
                // Determine Background Image
                let bgImage = DEFAULT_HOSPITAL_IMAGE;
                if (hospital.image_url) {
                    bgImage = (hospital.image_url.startsWith('data:') || hospital.image_url.startsWith('http'))
                        ? hospital.image_url
                        : apiUrl + hospital.image_url;
                }

                return (
                <div key={hospital.id} style={{ ...cardStyle, overflow: 'hidden', transition: 'transform 0.3s', display: 'flex', flexDirection: 'column', height: '100%' }} className="hover:scale-[1.02]">
                    <div style={{ 
                        height: '160px', 
                        background: `url('${bgImage}') center/cover no-repeat`, 
                        position: 'relative',
                        flexShrink: 0
                    }}>
                        <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', color: '#fbbf24', padding: '6px 10px', borderRadius: '8px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                            <Star size={14} fill="#fbbf24" stroke="none" /> {hospital.rating}
                        </div>
                    </div>
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '700' }}>{hospital.name}</h3>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                           <MapPin size={16} color="var(--text-secondary)" /> 
                           {hospital.map_url ? (
                               <a href={hospital.map_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }} className="hover:underline">
                                   {hospital.location}
                               </a>
                           ) : (
                               <span>{hospital.location}</span>
                           )}
                        </div>
                        
                        <div className="admin-btn-grid" style={{ marginTop: 'auto' }}>
                            <button onClick={() => handleEdit(hospital)} className="btn" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>Edit</button>
                            {canManageHospitalNetwork && <button onClick={() => handleDelete(hospital.id)} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171' }}>Remove</button>}
                        </div>
                    </div>
                </div>
            )})}
        </div>

        {loading && (
             <div className="grid-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                 {[1, 2, 3, 4, 5, 6].map((n) => (
                     <div key={n} style={{ ...cardStyle, background: 'var(--bg-card)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '350px' }}>
                         <div style={{ height: '160px', background: 'var(--border)', opacity: 0.1, flexShrink: 0 }}></div>
                         <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                             <div style={{ height: '24px', width: '60%', background: 'var(--border)', marginBottom: '1rem', borderRadius: '4px', opacity: 0.1 }}></div>
                             <div style={{ height: '16px', width: '40%', background: 'var(--border)', marginBottom: '1.5rem', borderRadius: '4px', opacity: 0.1 }}></div>
                             <div className="admin-btn-grid" style={{ marginTop: 'auto' }}>
                                 <div style={{ height: '40px', background: 'var(--border)', borderRadius: '8px', opacity: 0.1 }}></div>
                                 <div style={{ height: '40px', background: 'var(--border)', borderRadius: '8px', opacity: 0.1 }}></div>
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
        )}

        {hospitals.length === 0 && !loading && (
             <div style={{ padding: '6rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                 <div style={{ background: 'var(--bg-card)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid var(--border)' }}>
                    <Building2 size={40} style={{ opacity: 0.5, color: 'var(--text-primary)' }} />
                 </div>
                 <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No hospitals added yet.</h3>
                 <p style={{ fontSize: '1.1rem' }}>Click "Add Hospital" to onboard your first partner.</p>
             </div>
        )}
    </div>
  );
}
