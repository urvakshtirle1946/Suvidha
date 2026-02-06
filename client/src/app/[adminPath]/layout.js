'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { 
  LayoutDashboard, Building2, Calendar, 
  Users, ShieldCheck, LogOut, Menu, User, CheckCircle, Bell, 
  Sun, Moon, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { Outfit } from 'next/font/google';

import { ToastProvider, useToast } from '@/context/ToastContext';

const outfit = Outfit({ subsets: ['latin'] });

// Internal component that can safely use useToast
function AdminLayoutContent({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams(); 
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Theme state (Default: Dark)

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());

  const { addToast } = useToast();
  
  const adminPathParam = params?.adminPath;
  const basePath = adminPathParam ? `/${adminPathParam}` : '';
  const securePath = process.env.NEXT_PUBLIC_ADMIN_ROUTE;

  useEffect(() => {
     if (!basePath) return; 

     if (securePath && adminPathParam !== securePath) {
        console.warn(`Invalid admin path: ${adminPathParam}. Expected: ${securePath}`);
        router.replace('/'); 
        return;
     }

     const checkAuth = () => {
         const auth = localStorage.getItem('admin_auth');
         if (pathname?.endsWith('/login')) {
             setIsAuthorized(true);
             return;
         }
         if (!auth) {
             router.push(`${basePath}/login`);
         } else {
             setIsAuthorized(true);
         }
     };
     
     const timer = setTimeout(checkAuth, 100);
     return () => clearTimeout(timer);
  }, [router, basePath, pathname, adminPathParam, securePath]);

  // Fetch Notifications State
  const [notifications, setNotifications] = useState([]);

  // Fetch Notifications (Recent Bookings)
  useEffect(() => {
     if (!isAuthorized) return;
     const fetchNotifications = async () => {
         try {
             const res = await fetch('http://localhost:5000/api/bookings');
             const data = await res.json();
             if(Array.isArray(data)) {
                 setNotifications(data.slice(0, 5)); // Top 5 recent
             }
         } catch (e) {
             console.error("Failed to fetch notifications", e);
         }
     };
     fetchNotifications();
  }, [isAuthorized]);

  const handleLogout = () => {
      setIsAuthorized(false);
      localStorage.removeItem('admin_auth');
      document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.replace(`${basePath}/login`);
  };

  const handleNotificationClick = () => {
      setShowNotifications(!showNotifications);
  };

  const toggleTheme = () => {
      setDarkMode(!darkMode);
  };

  // Calendar Logic
  const getDaysInMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 0 = Sun, 1 = Mon...
  };
  
  const changeMonth = (offset) => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate); // 0 (Sun) - 6 (Sat)
  // Adjust for Mon start (0=Mon, 6=Sun) -> (day + 6) % 7 if original is Sun=0
  // Standard JS: Sun=0. our layout: M T W T F S S
  // So Mon=1 needs to be 0 index. Sun=0 needs to be 6 index.
  const startOffset = firstDay === 0 ? 6 : firstDay - 1; 

  const calendarDays = [];
  // Empty slots
  for(let i=0; i<startOffset; i++) {
      calendarDays.push(null);
  }
  // Days
  for(let i=1; i<=daysInMonth; i++) {
      calendarDays.push(i);
  }

  const isLoginPage = pathname?.endsWith('/login');
  if (!isAuthorized) return null; 

  // Theme Variables
  const themeStyles = {
    '--bg-primary': darkMode ? '#050505' : '#F5F6FA', // Deep black vs soft gray
    '--bg-card': darkMode ? '#121212' : '#FFFFFF',     // Dark card vs white
    '--bg-sidebar': darkMode ? '#000000' : '#1C1C24',  // Pure black sidebar in dark mode
    '--text-primary': darkMode ? '#ffffff' : '#1C1C24',
    '--text-secondary': darkMode ? '#a1a1aa' : '#9ca3af', // zinc-400 vs gray-400
    '--accent': darkMode ? '#ccff00' : '#5e81f4',      // Neon Green vs Blue
    '--accent-text': darkMode ? '#000000' : '#ffffff', // Black text on neon green
    '--border': darkMode ? '#27272a' : '#E5E7EB',
    '--hover': darkMode ? '#18181b' : '#f3f4f6',       // zinc-900 vs gray-100
    '--chart-bar': darkMode ? '#27272a' : '#e0e7ff',
    '--chart-active': darkMode ? '#ccff00' : '#1C1C24',
  };

  return (
    <div className={`admin-root ${outfit.className}`} style={{ 
        ...themeStyles,
        minHeight: '100vh', 
        background: 'var(--bg-primary)', 
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-outfit)',
        transition: 'background 0.3s, color 0.3s'
      }}>
        
        {/* Sidebar - Fixed Position */}
        {!isLoginPage && (
        <aside className="custom-scrollbar" style={{ 
          width: '320px', 
          background: 'var(--bg-sidebar)', 
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem',
          gap: '2rem',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 50,
          borderRight: darkMode ? '1px solid var(--border)' : 'none',
          overflowY: 'auto'
        }}>
          {/* Logo Area */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', paddingBottom: '1rem' }}>
             <div style={{ 
               width: '40px', height: '40px', borderRadius: '12px',
               background: darkMode ? 'var(--accent)' : 'linear-gradient(135deg, #00d2d3, #2e86de)',
               display: 'flex', alignItems: 'center', justifyContent: 'center'
             }}>
                <ShieldCheck size={24} color={darkMode ? '#000' : '#fff'} />
             </div>
             <div>
                 <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>Suvidha</h1>
                 <span style={{ fontSize: '0.75rem', opacity: 0.5, letterSpacing: '1px' }}>ADMIN</span>
             </div>
          </div>

          {/* Navigation */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
             <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" href={`${basePath}`} active={pathname === basePath} darkMode={darkMode} />
             <NavItem icon={<Building2 size={20} />} label="Hospitals" href={`${basePath}/hospitals`} active={pathname === `${basePath}/hospitals`} darkMode={darkMode} />
             <NavItem icon={<Calendar size={20} />} label="Bookings" href={`${basePath}/bookings`} active={pathname === `${basePath}/bookings`} darkMode={darkMode} />
             <NavItem icon={<Users size={20} />} label="Users" href={`${basePath}/users`} active={pathname === `${basePath}/users`} darkMode={darkMode} />
          </nav>

          {/* Widget: My Schedule (Calendar) */}
          <div style={{ background: 'var(--bg-card)', borderRadius: '24px', padding: '1.2rem', color: 'var(--text-primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>
                      {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h3>
                  <div style={{ display: 'flex', gap: '5px' }}>
                      <button onClick={() => changeMonth(-1)} style={{ cursor: 'pointer', border: 'none', background: 'transparent', display: 'flex', alignItems: 'center' }}><ChevronLeft size={16} color="var(--text-secondary)" /></button>
                      <button onClick={() => changeMonth(1)} style={{ cursor: 'pointer', border: 'none', background: 'transparent', display: 'flex', alignItems: 'center' }}><ChevronRight size={16} color="var(--text-secondary)" /></button>
                  </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '0.7rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '0.8rem', rowGap: '12px', fontWeight: '500', cursor: 'pointer' }}>
                   {calendarDays.map((day, index) => {
                       const isToday = day === new Date().getDate() && 
                                       currentDate.getMonth() === new Date().getMonth() && 
                                       currentDate.getFullYear() === new Date().getFullYear();
                                       
                       return (
                           <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                               {day ? (
                                   <span style={{ 
                                       width: '28px', height: '28px', 
                                       display: 'flex', alignItems: 'center', justifyContent: 'center',
                                       borderRadius: '50%',
                                       background: isToday ? 'var(--accent)' : 'transparent',
                                       color: isToday ? 'var(--accent-text)' : 'var(--text-primary)',
                                       transition: 'background 0.2s'
                                   }} className={!isToday ? "calendar-day-hover" : ""}>
                                       {day}
                                   </span>
                               ) : <span></span>}
                           </div>
                       );
                   })}
              </div>
          </div>
          
          {/* Logout */}
           <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#ff6b6b', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem 0', marginTop: 'auto' }}>
              <LogOut size={18} /> Logout
           </button>

        </aside>
        )}

        {/* Main Content Area - Offset by Sidebar Width */}
        <div style={{ 
            marginLeft: !isLoginPage ? '320px' : '0', 
            width: !isLoginPage ? 'calc(100% - 320px)' : '100%',
            display: 'flex', flexDirection: 'column', minHeight: '100vh',
            transition: 'all 0.3s ease'
        }}>
          
          {!isLoginPage && (
          <header style={{ 
             padding: '2rem 3rem',
             display: 'flex', justifyContent: 'space-between', alignItems: 'center',
             background: 'var(--bg-primary)', 
             position: 'sticky',
             top: 0,
             zIndex: 40,
             transition: 'background 0.3s',
             borderBottom: darkMode ? '1px solid var(--border)' : 'none'
          }}>
             <div>
                 <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>Hello, Admin!</h2>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Here's what's happening in Suvidha today.</p>
             </div>
             
             <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', position: 'relative' }}>
                 {/* Theme Toggle */}
                 <button onClick={toggleTheme} style={{ 
                     width: '40px', height: '40px', borderRadius: '12px', background: 'var(--bg-card)', 
                     display: 'flex', alignItems: 'center', justifyContent: 'center', 
                     boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                     border: '1px solid var(--border)', cursor: 'pointer',
                     transition: 'all 0.2s',
                     color: 'var(--text-primary)'
                 }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                 </button>

                 {/* Notification Icon */}
                 <button onClick={handleNotificationClick} style={{ 
                     width: '40px', height: '40px', borderRadius: '12px', background: 'var(--bg-card)', 
                     display: 'flex', alignItems: 'center', justifyContent: 'center', 
                     boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                     border: '1px solid var(--border)', cursor: 'pointer', position: 'relative',
                     transition: 'all 0.2s',
                     zIndex: 100
                 }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                    {notifications.length > 0 && <div style={{ width: '8px', height: '8px', background: '#ff6b6b', borderRadius: '50%', position: 'absolute', top: '8px', right: '8px', border: '1px solid #fff' }}></div>}
                    <Bell size={20} color="var(--text-primary)" />
                 </button>

                 {/* Notification Dropdown */}
                 {showNotifications && (
                   <div style={{
                     position: 'absolute',
                     top: '120%',
                     right: '0',
                     width: '320px',
                     background: 'var(--bg-card)',
                     borderRadius: '16px',
                     boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                     padding: '1.2rem',
                     zIndex: 100,
                     border: '1px solid var(--border)'
                   }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Notifications</h3>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent)', cursor: 'pointer' }}>Mark all read</span>
                     </div>
                     
                     <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '0.8rem', fontWeight: 'bold' }}>Most Recent</h4>
                     <div className="custom-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '300px', overflowY: 'auto' }}>
                        {notifications.length > 0 ? (
                            notifications.map(booking => (
                                <MiniPatientRow 
                                    key={booking.id}
                                    name={booking.patient_name} 
                                    issue={booking.service_name} 
                                    time={booking.booking_time} 
                                    status={booking.status === 'confirmed' ? 'active' : ''} 
                                />
                            ))
                        ) : (
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', padding: '1rem' }}>No new notifications</div>
                        )}
                     </div>
                   </div>
                 )}

                 {/* Profile Icon */}
                 <Link href={`${basePath}/profile`} style={{ textDecoration: 'none' }}>
                     <div style={{ 
                         width: '40px', height: '40px', borderRadius: '50%', 
                         background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', 
                         display: 'flex', alignItems: 'center', justifyContent: 'center', 
                         boxShadow: '0 4px 12px rgba(255, 154, 158, 0.3)',
                         cursor: 'pointer', transition: 'transform 0.2s',
                         border: '2px solid #fff' 
                     }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                         <User size={20} color="#fff" />
                     </div>
                 </Link>
             </div>
          </header>
          )}
          
          <main style={{ padding: '0 3rem 3rem 3rem', flex: 1 }}>
             <div key={pathname} className="animate-fade-in" style={{ height: '100%' }}>
                 {children}
             </div>
          </main>
        </div>

      </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <ToastProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </ToastProvider>
  );
}

function NavItem({ icon, label, href, active, darkMode }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div style={{ 
         display: 'flex', alignItems: 'center', gap: '1rem', 
         padding: '0.8rem 1rem', borderRadius: '14px', 
         color: active ? (darkMode ? '#000' : '#fff') : '#888',
         background: active ? 'var(--accent)' : 'transparent', 
         transition: 'all 0.2s ease',
         fontWeight: active ? '700' : '500'
      }}>
         {icon}
         <span>{label}</span>
      </div>
    </Link>
  );
}

function MiniPatientRow({ name, issue, time, status }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                {name.substring(0,2).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-primary)' }}>{name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{issue}</div>
            </div>
            {status === 'active' ? (
                <CheckCircle size={16} color="var(--accent)" />
            ) : (
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{time}</div>
            )}
        </div>
    );
}
