'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AdminSessionManager() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Get the configured secure admin route
    // Note: We strip any leading/trailing slashes for cleaner comparison
    const secureRoute = process.env.NEXT_PUBLIC_ADMIN_ROUTE || 'admin';
    const adminPrefix = `/${secureRoute}`;

    // 2. Check if we are currently "outside" the admin section
    // We treat the "admin section" as any path starting with the secure prefix
    const isOutsideAdmin = !pathname.startsWith(adminPrefix);

    if (isOutsideAdmin) {
       const auth = localStorage.getItem('admin_auth');
       if (auth) {
           // 3. Admin has left the building -> Auto Logout
           console.log('Exiting admin area: Auto-logout triggered.');
           localStorage.removeItem('admin_auth');
           document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
       }
    }
  }, [pathname]);

  return null; // This component renders nothing
}
