'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowRight, Shield } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Default admin password - should be changed in production
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple password check - in production, use proper authentication
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_auth_token', 'authenticated');
      // Use window.location for a full page reload to ensure auth state is set
      setTimeout(() => {
        window.location.href = '/admin';
      }, 300);
    } else {
      setError('Invalid password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111827] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.1),transparent_50%)] animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(124,58,237,0.08),transparent_50%)] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6">
        <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700/50 animate-scale-in">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 animate-fade-in-down">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 mb-3 sm:mb-4 shadow-lg shadow-blue-500/25 animate-scale-in stagger-1">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-sm sm:text-base text-gray-300">Enter your password to access the admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 animate-fade-in-up stagger-2">
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-800/40 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter admin password"
                  required
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm animate-fade-in-down flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 sm:py-3 rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 shadow-lg shadow-blue-500/25 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin-slow"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-300 animate-fade-in-up stagger-3">
            <div className="bg-gray-800/30 rounded-lg p-3 sm:p-4 border border-gray-700/50">
              <p className="font-medium text-gray-200 text-xs sm:text-sm">Default password: <code className="bg-gray-800/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-blue-400 text-xs sm:text-sm">admin123</code></p>
              <p className="text-[10px] sm:text-xs mt-2 text-gray-300">⚠️ Change this in production!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
