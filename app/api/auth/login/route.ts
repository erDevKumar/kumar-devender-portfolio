import { NextRequest, NextResponse } from 'next/server';
import { getAdminPassword } from '@/lib/firebase-admin';

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET || 'your-secret-key-change-in-production';

// Simple JWT implementation (or use jsonwebtoken package)
function createToken(payload: { admin: boolean; timestamp: number }): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = Buffer.from(`${header}.${body}`).toString('base64url'); // Simplified - in production use proper HMAC
  return `${header}.${body}.${signature}`;
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Get admin password from Firebase Remote Config
    const adminPassword = await getAdminPassword();

    if (!adminPassword) {
      return NextResponse.json(
        { error: 'Authentication not configured. Please set admin_password in Firebase Remote Config.' },
        { status: 500 }
      );
    }

    // Check password (case-sensitive)
    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Generate simple token (in production, use proper JWT library)
    const token = createToken({
      admin: true,
      timestamp: Date.now(),
    });

    // Create response with token
    const response = NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );

    // Set HTTP-only cookie for additional security
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
