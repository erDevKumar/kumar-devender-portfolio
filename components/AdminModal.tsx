'use client';

import { useState, useEffect } from 'react';
import { Lock, ArrowRight, Shield } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import AdminPanel from './AdminPanel';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const { isAuthenticated, login, isAdminOpen, openAdmin } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      openAdmin();
    } else {
      // Restore body scroll when modal closes
      document.body.style.overflow = 'unset';
      setPassword('');
      setError('');
      setLoading(false);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, openAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(password);
    
    if (success) {
      setLoading(false);
      // Don't close modal - let AdminPanel take over
    } else {
      setError('Invalid password');
      setLoading(false);
    }
  };

  // If authenticated, show full-screen admin panel instead of modal
  if (isAuthenticated && isAdminOpen) {
    return <AdminPanel />;
  }

  // Show login modal
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Login Modal */}
      <div className="relative z-10 w-full max-w-md bg-[#111827] rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
        <div className="p-6 sm:p-8">
          <LoginView 
            password={password}
            setPassword={setPassword}
            error={error}
            loading={loading}
            onSubmit={handleLogin}
          />
        </div>
      </div>
    </div>
  );
}

// Login View Component
function LoginView({ 
  password, 
  setPassword, 
  error, 
  loading, 
  onSubmit 
}: { 
  password: string;
  setPassword: (val: string) => void;
  error: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 mb-4 shadow-lg shadow-blue-500/25">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
        <p className="text-sm text-gray-300">Enter your password to access the admin panel</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-300" />
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-base bg-gray-800/40 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter admin password"
              required
              autoFocus
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 shadow-lg shadow-blue-500/25 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <span>Login</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

