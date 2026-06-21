import { NextResponse } from 'next/server';

export function proxy(req) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  
  // Extract hostname without port for comparison
  const host = hostname.split(':')[0];
  
  // Determine if it's the admin subdomain
  const isAdminSubdomain = host.startsWith('admin.');
  const adminPath = process.env.NEXT_PUBLIC_ADMIN_ROUTE || 'admin';

  // 1. Block direct access to the hidden folder from the public domain
  if (!isAdminSubdomain && url.pathname.startsWith(`/${adminPath}`)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 2. Rewrite requests from the admin subdomain to the internal hidden folder
  if (isAdminSubdomain) {
    // Send root directly to login with explicit path to avoid blank shell states.
    if (url.pathname === '/') {
      return NextResponse.redirect(new URL(`/${adminPath}/login`, req.url));
    }

    if (!url.pathname.startsWith(`/${adminPath}`)) {
      url.pathname = `/${adminPath}${url.pathname === '/' ? '' : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico and zelp-favicon.png (favicon files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|zelp-favicon.png).*)',
  ],
};
