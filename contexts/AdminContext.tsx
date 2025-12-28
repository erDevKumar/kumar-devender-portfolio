'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  isAdminOpen: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    // Check if already authenticated on mount
    const token = localStorage.getItem('admin_auth_token');
    if (token === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      // Try API route first (for development/localhost)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('admin_auth_token', 'authenticated');
          setIsAuthenticated(true);
          return true;
        }
      }
    } catch (err) {
      // Ignore API errors
    }

    // If API route fails (static site), use hardcoded password
    const staticPassword = 'admin@password';
    
    if (password === staticPassword) {
      localStorage.setItem('admin_auth_token', 'authenticated');
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_auth_token');
    setIsAuthenticated(false);
    setIsAdminOpen(false);
    setCurrentView('dashboard');
  };

  const openAdmin = () => {
    setIsAdminOpen(true);
  };

  const closeAdmin = () => {
    setIsAdminOpen(false);
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        isAdminOpen,
        openAdmin,
        closeAdmin,
        login,
        logout,
        currentView,
        setCurrentView,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

