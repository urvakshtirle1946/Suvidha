'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { 
  LayoutDashboard, Building2, Calendar, 
  Users, ShieldCheck, LogOut, Menu, User 
} from 'lucide-react';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams(); // Use the hook instead of the prop
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const adminPathParam = params?.adminPath;
  const basePath = adminPathParam ? `/${adminPathParam}` : '';
  const securePath = process.env.NEXT_PUBLIC_ADMIN_ROUTE;

  useEffect(() => {
     if (!basePath) return; // Wait for params

     // 1. Strict Path Security Check
     if (securePath && adminPathParam !== securePath) {
        console.warn(`Invalid admin path: ${adminPathParam}. Expected: ${securePath}`);
        router.replace('/'); 
        return;
     }

     // 2. Auth Check
     const checkAuth = () => {
         const auth = localStorage.getItem('admin_auth');
         
         if (pathname?.endsWith('/login')) {
             setIsAuthorized(true);
             return;
         }

         if (!auth) {
             console.log('Unauthorized content access, redirecting to login...');
             router.push(`${basePath}/login`);
         } else {
             setIsAuthorized(true);
         }
     };
     
     const timer = setTimeout(checkAuth, 100);
     return () => clearTimeout(timer);
     
     
  }, [router, basePath, pathname, adminPathParam, securePath]);

  const handleLogout = () => {
      // 1. Immediately hide dashboard
      setIsAuthorized(false);
      
      // 2. Clear credentials
      localStorage.removeItem('admin_auth');
      document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // 3. Redirect
      router.replace(`${basePath}/login`);
  };

  // Check if we are on the login page
  const isLoginPage = pathname?.endsWith('/login');

  if (!isAuthorized) return null; 

  return (
    <div className={`admin-root ${outfit.className}`} style={{ 
      display: 'flex', minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
      color: '#fff',
      fontFamily: 'var(--font-outfit)'
    }}>
      
      {/* Sidebar - Only show if NOT login page */}
      {!isLoginPage && (
      <aside style={{ 
        width: sidebarOpen ? '280px' : '90px', 
        background: 'rgba(15, 23, 42, 0.6)', 
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(255,255,255,0.08)', 
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 24px rgba(0,0,0,0.2)'
      }}>
        <div style={{ 
          padding: '2rem 1.5rem', 
          display: 'flex', alignItems: 'center', gap: '1rem', 
          borderBottom: '1px solid rgba(255,255,255,0.05)' 
        }}>
           <div style={{ 
             background: 'linear-gradient(135deg, #00d2d3 0%, #0abde3 100%)', 
             padding: '8px', borderRadius: '12px',
             boxShadow: '0 0 15px rgba(0, 210, 211, 0.4)'
           }}>
              <ShieldCheck size={26} color="#fff" strokeWidth={2.5} />
           </div>
           {sidebarOpen && (
             <div>
               <span style={{ fontWeight: '800', fontSize: '1.4rem', letterSpacing: '-0.5px' }}>Suvidha</span>
               <span style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Admin Panel</span>
             </div>
           )}
        </div>

        <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
           <NavItem icon={<LayoutDashboard size={20} />} label="Overview" href={`${basePath}`} isOpen={sidebarOpen} />
           <NavItem icon={<Building2 size={20} />} label="Hospitals" href={`${basePath}/hospitals`} isOpen={sidebarOpen} />
           <NavItem icon={<Calendar size={20} />} label="Bookings" href={`${basePath}/bookings`} isOpen={sidebarOpen} />
           <NavItem icon={<Users size={20} />} label="Users" href={`${basePath}/users`} isOpen={sidebarOpen} />
           <NavItem icon={<User size={20} />} label="Profile" href={`${basePath}/profile`} isOpen={sidebarOpen} />
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
           <button onClick={handleLogout} style={{ 
              display: 'flex', alignItems: 'center', gap: '1rem', 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.2)', 
              color: '#f87171', 
              padding: '1rem', borderRadius: '12px', cursor: 'pointer',
              width: '100%',
              transition: 'background 0.2s'
           }}>
              <LogOut size={20} />
              {sidebarOpen && <span style={{ fontWeight: '600' }}>Logout</span>}
           </button>
        </div>
      </aside>
      )}

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'radial-gradient(circle at top left, rgba(0, 210, 211, 0.05), transparent 40%)' }}>
        
        {!isLoginPage && (
        <header style={{ 
           padding: '1rem 2.5rem', 
           height: '80px',
           display: 'flex', justifyContent: 'space-between', alignItems: 'center',
           background: 'rgba(15, 23, 42, 0.4)',
           backdropFilter: 'blur(10px)',
           borderBottom: '1px solid rgba(255,255,255,0.05)',
           position: 'sticky', top: 0, zIndex: 10
        }}>
           <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ 
             background: 'rgba(255,255,255,0.05)', border: 'none', color: '#cbd5e1', 
             cursor: 'pointer', padding: '10px', borderRadius: '8px',
             transition: 'all 0.2s'
           }}>
              <Menu size={20} />
           </button>
           
           <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
               <button onClick={handleLogout} style={{
                   background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8',
                   padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem',
                   display: 'flex', alignItems: 'center', gap: '6px'
               }} className="hover:bg-white/5">
                   <LogOut size={16} /> Logout
               </button>

               <Link href={`${basePath}/profile`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: '#fff' }}>
                  <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
                    <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600' }}>Super Admin</span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>admin@suvidha.com</span>
                  </div>
                  <div style={{ 
                    width: '42px', height: '42px', borderRadius: '12px', 
                    background: 'linear-gradient(135deg, #00d2d3 0%, #2e86de 100%)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    fontWeight: 'bold', fontSize: '1.2rem',
                    boxShadow: '0 4px 10px rgba(0, 210, 211, 0.3)'
                  }}>
                     A
                  </div>
               </Link>
           </div>
        </header>
        )}
        
        <main style={{ padding: '2.5rem', flex: 1, overflowY: 'auto' }}>
           {children}
        </main>
      </div>

    </div>
  );
}

function NavItem({ icon, label, href, isOpen }) {
  // Simple active check logic could be added here if needed
  return (
    <Link href={href} className="group" style={{ textDecoration: 'none' }}>
      <div style={{ 
         display: 'flex', alignItems: 'center', gap: '1rem', 
         padding: '0.9rem 1rem', borderRadius: '10px', 
         color: '#cbd5e1', 
         transition: 'all 0.2s ease',
         background: 'transparent',
         position: 'relative',
         overflow: 'hidden'
      }}
      // Simple hover effect using inline style manipulation in React is hard without CSS-in-JS or classes.
      // We rely on the className 'group' and specific style tag below for hover
      className="admin-nav-item"
      >
         <div style={{ position: 'relative', zIndex: 1 }}>{icon}</div>
         {isOpen && <span style={{ fontWeight: '500', position: 'relative', zIndex: 1 }}>{label}</span>}
      </div>
       <style jsx>{`
         .admin-nav-item {
            border: 1px solid transparent;
         }
         .admin-nav-item:hover {
            background: rgba(0, 210, 211, 0.1);
            color: #fff !important;
            border: 1px solid rgba(0, 210, 211, 0.2);
            box-shadow: 0 0 15px rgba(0, 210, 211, 0.1);
            transform: translateX(4px);
         }
       `}</style>
    </Link>
  );
}
