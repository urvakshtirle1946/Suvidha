'use client';
import { useState, useEffect } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { getApiUrl } from '@/utils/api';

export default function WaitlistManagement() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    fetchWaitlist();
    const interval = setInterval(fetchWaitlist, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchWaitlist = async () => {
    try {
      const apiUrl = getApiUrl();
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${apiUrl}/api/auth/waitlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('admin_auth');
        localStorage.removeItem('admin_token');
        window.location.href = `/${process.env.NEXT_PUBLIC_ADMIN_ROUTE || 'admin'}/login`;
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || 'Failed to fetch waitlist.');
      }

      const data = await res.json();
      setEntries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      addToast(err.message || 'Error fetching waitlist', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredEntries = entries.filter((entry) => {
    // Exclude waitlist.me and manual email entries
    if (entry.source === 'waitlist.me' || entry.source === 'email') return false;
    
    const name = String(entry.name || '').toLowerCase();
    const email = String(entry.email || '').toLowerCase();
    const needle = searchTerm.toLowerCase();
    return name.includes(needle) || email.includes(needle);
  });

  const cardStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '20px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)'
  };

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>Waitlist</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          People who clicked Continue with Google on the landing page.
        </p>
      </div>

      <div style={{ ...cardStyle, padding: '1.2rem', display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
        <Search size={20} style={{ color: 'var(--text-secondary)' }} />
        <input
          type="text"
          placeholder="Search waitlist by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', flex: 1, outline: 'none', fontSize: '1rem' }}
        />
      </div>

      <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Name</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Email</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Source</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Joined</th>
                <th style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr key={entry.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} className="waitlist-row-hover">
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #00d2d3 0%, #2e86de 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <UserPlus size={18} color="#fff" />
                      </div>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{entry.name || 'User'}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)' }}>{entry.email || '-'}</td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{entry.source || 'google'}</td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)' }}>
                    {entry.created_at ? new Date(entry.created_at).toLocaleDateString() : '-'}
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <span style={{
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      background: 'rgba(245, 158, 11, 0.15)',
                      color: '#f59e0b',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}>
                      {entry.status || 'pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!loading && filteredEntries.length === 0 && (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No waitlist entries found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
