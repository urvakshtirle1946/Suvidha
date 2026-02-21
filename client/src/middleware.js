import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  
  // Determine if it's the admin subdomain
  const isAdminSubdomain = hostname.startsWith('admin.');
  const adminPath = process.env.NEXT_PUBLIC_ADMIN_ROUTE || 'admin';
  
  // 1. Block direct access to the hidden folder from the public domain
  if (!isAdminSubdomain && url.pathname.startsWith(`/${adminPath}`)) {
    // Redirect to home or throw 404
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 2. Rewrite requests from the admin subdomain to the internal hidden folder
  if (isAdminSubdomain) {
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
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
