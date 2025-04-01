// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Check if the request is for an API route
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const res = NextResponse.next();

    // Set CORS headers
    res.headers.set('Access-Control-Allow-Origin', '*'); // Or specify your origin
    res.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );

    // Handle preflight requests (OPTIONS)
    if (req.method === 'OPTIONS') {
      return NextResponse.json({}, { status: 200 });
    }

    return res;
  }

  // Continue to the next middleware or route
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*', // Apply middleware to all API routes
};