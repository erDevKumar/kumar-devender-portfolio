'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Settings, User, Briefcase, GraduationCap, Code, FolderKanban, Link as LinkIcon, LogOut, ExternalLink, Palette, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false); // Start as false for immediate render
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default to true for desktop
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      if (!mobile) {
        // On desktop, check localStorage for sidebar preference
        const savedState = localStorage.getItem('admin_sidebar_open');
        if (savedState !== null) {
          setSidebarOpen(savedState === 'true');
        } else {
          setSidebarOpen(true); // Default open on desktop
        }
      } else {
        setSidebarOpen(false); // Always closed on mobile initially
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Check authentication immediately - for static sites, use localStorage only
    if (typeof window === 'undefined') return;
    
    if (pathname === '/admin/login') {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    // For static export (Firebase Hosting), API routes don't work
    // Use localStorage as the only auth method
    const localToken = localStorage.getItem('admin_auth_token');
    
    if (localToken === 'authenticated') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // Redirect to login if not authenticated
      router.push('/admin/login');
    }
    
    setLoading(false);
  }, [pathname, router]);

  const handleLogout = async () => {
    // Try to call logout API if available (won't work on static sites)
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      // Ignore errors on static sites
    }
    
    localStorage.removeItem('admin_auth_token');
    router.push('/admin/login');
  };

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    // Save preference to localStorage for desktop
    if (!isMobile) {
      localStorage.setItem('admin_sidebar_open', String(newState));
    }
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
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-800/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 text-gray-200" />
            ) : (
              <Menu className="w-6 h-6 text-gray-200" />
            )}
          </button>
        </div>
      </div>

      <div className="flex pt-16 lg:pt-0">
        {/* Mobile Overlay */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${sidebarOpen ? 'w-64' : 'w-0 lg:w-16'}
          fixed lg:sticky top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] lg:h-screen
          bg-gray-800/60 backdrop-blur-sm border-r border-gray-700/50
          transition-all duration-300 ease-out shadow-lg z-50 lg:z-auto
          overflow-hidden lg:overflow-y-auto
        `}>
          {/* Desktop Sidebar Header */}
          <div className="hidden lg:flex items-center justify-center p-4 border-b border-gray-700/50 min-h-[64px]">
            {sidebarOpen ? (
              <div className="flex items-center justify-between w-full">
                <h1 className="text-xl lg:text-2xl font-bold text-white transition-opacity duration-300">Admin Panel</h1>
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0"
                  aria-label="Toggle sidebar"
                >
                  <X className="w-5 h-5 text-gray-200" />
                </button>
              </div>
            ) : (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors w-full flex items-center justify-center"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-5 h-5 text-gray-200" />
              </button>
            )}
          </div>

          {/* Navigation - Only show when sidebar is open */}
          {sidebarOpen && (
            <>
              <nav className="p-2 lg:p-4 space-y-1 lg:space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => isMobile && setSidebarOpen(false)}
                      className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-sm'
                          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                      }`}
                    >
                      <div className={`p-1.5 lg:p-2 rounded-lg flex-shrink-0 ${isActive ? 'bg-blue-500/30' : 'bg-gray-700/50 group-hover:bg-gray-700'} transition-colors`}>
                        <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                      </div>
                      <span className="font-medium text-sm lg:text-base whitespace-nowrap transition-opacity duration-300">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-2 lg:p-4 border-t border-gray-700/50 mt-auto space-y-1 lg:space-y-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 w-full transition-all duration-200 group"
                >
                  <div className="p-1.5 lg:p-2 rounded-lg bg-gray-700/50 group-hover:bg-red-500/30 transition-colors flex-shrink-0">
                    <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <span className="font-medium text-sm lg:text-base whitespace-nowrap transition-opacity duration-300">
                    Logout
                  </span>
                </button>
                <Link
                  href="/"
                  target="_blank"
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 w-full transition-all duration-200 group"
                >
                  <div className="p-1.5 lg:p-2 rounded-lg bg-gray-700/50 group-hover:bg-blue-500/30 transition-colors flex-shrink-0">
                    <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <span className="font-medium text-sm lg:text-base whitespace-nowrap transition-opacity duration-300">
                    View Site
                  </span>
                </Link>
              </div>
            </>
          )}

          {/* Collapsed Sidebar - Show icons only when closed on desktop */}
          {!sidebarOpen && !isMobile && (
            <nav className="p-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-center p-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-sm'
                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }`}
                    title={item.label}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-gray-700/50 space-y-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center p-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 w-full transition-all duration-200 group"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-center p-3 rounded-lg text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 w-full transition-all duration-200 group"
                  title="View Site"
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>
            </nav>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 animate-fade-in-up">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
