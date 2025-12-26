'use client';

import React from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom right, #fef2f2, #fce7f3, #fdf2f8)' }}>
          <div style={{ textAlign: 'center', maxWidth: '28rem', margin: '0 auto', padding: '1rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Global Error</h1>
              <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
                {error?.message || 'A critical error occurred. Please refresh the page.'}
              </p>
            </div>
            <button
              onClick={reset}
              style={{
                background: 'linear-gradient(to right, #10b981, #14b8a6)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
