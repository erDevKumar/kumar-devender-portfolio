'use client';

import './globals.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="glass-card rounded-3xl p-8 md:p-12 shadow-soft-lg border border-red-200/40">
              <div className="mb-6">
                <div className="bg-gradient-to-br from-red-500 via-pink-500 to-rose-500 p-4 rounded-3xl shadow-2xl inline-block mb-6">
                  <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 gradient-text">Global Error</h1>
                <p className="text-gray-600 text-lg mb-6">
                  {error?.message || 'A critical error occurred. Please refresh the page.'}
                </p>
              </div>
              <button
                onClick={reset}
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 shadow-soft"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
