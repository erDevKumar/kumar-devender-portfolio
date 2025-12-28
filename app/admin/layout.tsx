'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Settings, User, Briefcase, GraduationCap, Code, FolderKanban, Link as LinkIcon, LogOut, ExternalLink, Palette } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Check authentication
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const authToken = localStorage.getItem('admin_auth_token');
        if (authToken) {
          setIsAuthenticated(true);
        } else if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth_token');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111827]">
        <div className="text-center animate-fade-in-up">
          <div className="w-12 h-12 border-4 border-blue-500/20 rounded-full mx-auto mb-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-slow"></div>
          </div>
          <p className="text-gray-200 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!loading && !isAuthenticated && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111827]">
        <div className="text-center animate-fade-in-up">
          <div className="w-12 h-12 border-4 border-blue-500/20 rounded-full mx-auto mb-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-slow"></div>
          </div>
          <p className="text-gray-200 font-medium">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { href: '/admin', icon: Settings, label: 'Dashboard', color: 'text-blue-600 bg-blue-50' },
    { href: '/admin/editor', icon: Code, label: 'Portfolio Editor', color: 'text-purple-600 bg-purple-50' },
    { href: '/admin/personal-info', icon: User, label: 'Personal Info', color: 'text-green-600 bg-green-50' },
    { href: '/admin/experience', icon: Briefcase, label: 'Experience', color: 'text-orange-600 bg-orange-50' },
    { href: '/admin/education', icon: GraduationCap, label: 'Education', color: 'text-indigo-600 bg-indigo-50' },
    { href: '/admin/skills', icon: Code, label: 'Skills', color: 'text-pink-600 bg-pink-50' },
    { href: '/admin/projects', icon: FolderKanban, label: 'Projects', color: 'text-red-600 bg-red-50' },
    { href: '/admin/social-links', icon: LinkIcon, label: 'Social Links', color: 'text-cyan-600 bg-cyan-50' },
    { href: '/admin/design', icon: Palette, label: 'Design', color: 'text-yellow-600 bg-yellow-50' },
  ];

  return (
    <div className="min-h-screen bg-[#111827]">
      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800/60 backdrop-blur-sm border-r border-gray-700/50 min-h-screen sticky top-0 transition-all duration-300 ease-out shadow-lg`}>
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className={`${sidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                aria-label="Toggle sidebar"
              >
                <svg className="w-5 h-5 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-sm'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-500/30' : 'bg-gray-700/50 group-hover:bg-gray-700'} transition-colors`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {sidebarOpen && (
                    <span className={`${sidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 font-medium`}>
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-700/50 mt-auto space-y-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 w-full transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-gray-700/50 group-hover:bg-red-500/30 transition-colors">
                <LogOut className="w-5 h-5" />
              </div>
              {sidebarOpen && (
                <span className={`${sidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 font-medium`}>
                  Logout
                </span>
              )}
            </button>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 w-full transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-gray-700/50 group-hover:bg-blue-500/30 transition-colors">
                <ExternalLink className="w-5 h-5" />
              </div>
              {sidebarOpen && (
                <span className={`${sidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 font-medium`}>
                  View Site
                </span>
              )}
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 animate-fade-in-up">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
