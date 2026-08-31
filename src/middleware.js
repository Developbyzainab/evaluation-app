import { NextResponse } from 'next/server';

export function middleware(request) {
  // Force dynamic rendering for all routes by adding a header
  // This prevents static generation for pages that use auth context
  const response = NextResponse.next();
  
  // Add a header to indicate dynamic rendering
  response.headers.set('x-middleware-cache', 'no-cache');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};