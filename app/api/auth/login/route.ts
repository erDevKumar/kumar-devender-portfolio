import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = 'admin@password';

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

          // Check password (case-sensitive)
          if (password !== ADMIN_PASSWORD) {
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
