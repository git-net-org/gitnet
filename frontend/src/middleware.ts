import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  console.log('Incoming request URL:', request.url);

  const token = request.cookies.get('token')?.value;
  console.log('Extracted token:', token);

  if (!token) {
    console.log('No token found, redirecting to /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    console.log('Verifying token...');
    await jwtVerify(token, secret);
    console.log('Token verification successful, proceeding to next middleware');
    return NextResponse.next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/'],
};
