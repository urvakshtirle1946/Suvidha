'use client';
import { useState, useEffect } from 'react';
import { Building2, MapPin, Star, Plus, CheckCircle, Tag, XCircle } from 'lucide-react';

export default function HospitalManagement() {
  const [hospitals, setHospitals] = useState([]);
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
    image_url: 'linear-gradient(45deg, #1e293b, #0f172a)', // Default placeholder
    phone_number: '',
    map_url: ''
  };
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

  const updateService = (index, field, value) => {
      const newServices = [...services];
      newServices[index][field] = value;
      setServices(newServices);
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/hospitals`);
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

  const handleEdit = (hospital) => {
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
      setEditId(hospital.id);
      setEditMode(true);
      setShowForm(true);
  };

  const handleDelete = async (id) => {
      if(!confirm('Are you sure you want to delete this hospital?')) return;
      try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/hospitals/${id}`, {
              method: 'DELETE'
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const url = editMode 
            ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/hospitals/${editId}` 
            : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/hospitals`;
        
    const method = editMode ? 'PUT' : 'POST';

    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('rating', formData.rating);
    data.append('discount_percentage', formData.discount_percentage);
    data.append('discount_description', formData.discount_description);
    data.append('phone_number', formData.phone_number);
    data.append('map_url', formData.map_url);
    if (formData.image_file) {
        data.append('image', formData.image_file);
    } else if (formData.image_url) {
        data.append('image_url', formData.image_url); // Keep existing URL if no new file
    }
    
    // Append Services as JSON string
    data.append('services', JSON.stringify(services));

    const res = await fetch(url, {
        method: method,
        // headers: { 'Content-Type': 'multipart/form-data' }, // Do NOT set manually
        body: data
    });

        if (res.ok) {
            alert(editMode ? 'Hospital Updated Successfully!' : 'Hospital Added Successfully!');
            setShowForm(false);
            resetForm();
            fetchHospitals(); // Refresh list
        } else {
            alert('Failed to save hospital');
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
    width: '100%', padding: '1rem', 
    background: 'rgba(15, 23, 42, 0.6)', 
    border: '1px solid rgba(255,255,255,0.1)', 
    color: '#fff', borderRadius: '12px',
    outline: 'none', transition: 'border-color 0.2s'
  };

  if (showForm) {
      return (
          <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h1 style={{ fontSize: '2rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {editMode ? 'Edit Hospital' : 'Add New Hospital'}
                  </h1>
                  <button className="btn" onClick={() => { setShowForm(false); resetForm(); }} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1' }}>Cancel</button>
              </div>
              
              <div style={{ ...cardStyle, padding: '2.5rem', maxWidth: '700px', margin: '0 auto' }}>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      
                      <div>
                          <label style={{ display: 'block', marginBottom: '0.8rem', color: '#94a3b8', fontSize: '0.9rem' }}>Hospital Name</label>
                          <input 
                            type="text" required 
                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                            style={inputStyle}
                            placeholder="e.g. Apollo International"
                          />
                      </div>

                      <div>
                          <label style={{ display: 'block', marginBottom: '0.8rem', color: '#94a3b8', fontSize: '0.9rem' }}>Location (City, Area)</label>
                          <div style={{ position: 'relative' }}>
                             <MapPin size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: '#64748b' }} />
                             <input 
                                type="text" required 
                                value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                                style={{ ...inputStyle, paddingLeft: '3rem' }}
                                placeholder="e.g. Bandra West, Mumbai"
                             />
                          </div>
                      </div>

                      <div>
                          <label style={{ display: 'block', marginBottom: '0.8rem', color: '#94a3b8', fontSize: '0.9rem' }}>Google Maps Link</label>
                          <input 
                            type="text" 
                            value={formData.map_url} onChange={e => setFormData({...formData, map_url: e.target.value})}
                            style={inputStyle}
                            placeholder="Paste Google Maps URL here"
                          />
                      </div>

                      <div>
                          <label style={{ display: 'block', marginBottom: '0.8rem', color: '#94a3b8', fontSize: '0.9rem' }}>Hospital Image (Upload)</label>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={e => setFormData({...formData, image_file: e.target.files[0]})}
                            style={inputStyle}
                          />
                          {formData.image_url && !formData.image_file && (
                              <div style={{ marginTop: '5px', fontSize: '0.8rem', color: '#00d2d3' }}>
                                  Current Image: <a href={formData.image_url.startsWith('/') ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + formData.image_url : formData.image_url} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>View</a>
                              </div>
                          )}
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                          <div>
                              <label style={{ display: 'block', marginBottom: '0.8rem', color: '#94a3b8', fontSize: '0.9rem' }}>Rating</label>
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
                          <label style={{ display: 'block', marginBottom: '0.8rem', color: '#94a3b8', fontSize: '0.9rem' }}>Offer Headline</label>
                          <input 
                            type="text" placeholder="e.g. Flat 20% OFF on First Consult"
                            value={formData.discount_description} onChange={e => setFormData({...formData, discount_description: e.target.value})}
                            style={inputStyle}
                          />
                      </div>

                      <div>
                          <label style={{ display: 'block', marginBottom: '0.8rem', color: '#94a3b8', fontSize: '0.9rem' }}>WhatsApp Number (for Notifications)</label>
                          <input 
                            type="text" placeholder="e.g. +919876543210"
                            value={formData.phone_number} onChange={e => setFormData({...formData, phone_number: e.target.value})}
                            style={inputStyle}
                          />
                      </div>

                      {/* --- SERVICES SECTION --- */}
                      {!editMode && (
                      <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                              <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>Add Services</h3>
                              <button type="button" onClick={addServiceRow} style={{ background: 'rgba(0, 210, 211, 0.1)', color: '#00d2d3', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer' }}>+ Add Row</button>
                          </div>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {services.map((service, index) => (
                                <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 30px', gap: '10px', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px' }}>
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
                              <option value="Radiology" />
                              <option value="Pathology" />
                              <option value="Cardiology" />
                              <option value="Consultation" />
                          </datalist>
                      </div>
                      )}

                      <button className="btn" style={{ 
                          marginTop: '1rem', padding: '1rem', 
                          background: 'linear-gradient(135deg, #00d2d3 0%, #2e86de 100%)', 
                          color: '#fff', border: 'none', fontSize: '1rem',
                          boxShadow: '0 4px 15px rgba(0, 210, 211, 0.3)'
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
                <h1 style={{ fontSize: '2rem', fontWeight: '800', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hospital Partners</h1>
                <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Manage your network of healthcare providers.</p>
            </div>
            <button className="btn" onClick={() => { resetForm(); setShowForm(true); }} style={{ 
                background: 'linear-gradient(135deg, #00d2d3 0%, #2e86de 100%)', 
                color: '#fff', border: 'none', boxShadow: '0 4px 12px rgba(0, 210, 211, 0.3)',
                padding: '0.8rem 1.5rem'
            }}>
                <Plus size={20} style={{ marginRight: '8px' }} /> Add Hospital
            </button>
        </div>

        <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {hospitals.map((hospital) => (
                <div key={hospital.id} style={{ ...cardStyle, overflow: 'hidden', transition: 'transform 0.3s' }} className="hover:scale-[1.02]">
                    <div style={{ 
                        height: '160px', 
                        background: hospital.image_url 
                            ? `url('${hospital.image_url.startsWith('/') ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + hospital.image_url : hospital.image_url}') center/cover no-repeat` 
                            : 'linear-gradient(45deg, #1e293b, #0f172a)', 
                        position: 'relative' 
                    }}>
                        <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', color: '#fbbf24', padding: '6px 10px', borderRadius: '8px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                            <Star size={14} fill="#fbbf24" stroke="none" /> {hospital.rating}
                        </div>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#f8fafc' }}>{hospital.name}</h3>
                        <div style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                           <MapPin size={16} color="#64748b" /> 
                           {hospital.map_url ? (
                               <a href={hospital.map_url} target="_blank" rel="noopener noreferrer" style={{ color: '#00d2d3', textDecoration: 'none' }} className="hover:underline">
                                   {hospital.location}
                               </a>
                           ) : (
                               <span>{hospital.location}</span>
                           )}
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                             {/* Badge removed */}
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <button onClick={() => handleEdit(hospital)} className="btn" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1' }}>Edit</button>
                            <button onClick={() => handleDelete(hospital.id)} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171' }}>Remove</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {hospitals.length === 0 && !loading && (
             <div style={{ padding: '6rem', textAlign: 'center', color: '#64748b' }}>
                 <div style={{ background: 'rgba(255,255,255,0.03)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <Building2 size={40} style={{ opacity: 0.5 }} />
                 </div>
                 <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>No hospitals added yet.</h3>
                 <p style={{ fontSize: '1.1rem' }}>Click "Add Hospital" to onboard your first partner.</p>
             </div>
        )}
    </div>
  );
}
