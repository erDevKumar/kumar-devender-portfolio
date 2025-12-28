'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Settings, User, Briefcase, GraduationCap, Code, FolderKanban, Link as LinkIcon, Palette, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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
      <div className="min-h-screen flex items-center justify-center bg-tech-950">
        <div className="text-cyan-400">Loading...</div>
      </div>
    );
  }

  if (!loading && !isAuthenticated && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tech-950">
        <div className="text-cyan-400">Redirecting to login...</div>
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { href: '/admin', icon: Settings, label: 'Dashboard' },
    { href: '/admin/editor', icon: Code, label: 'Portfolio Editor' },
    { href: '/admin/personal-info', icon: User, label: 'Personal Info' },
    { href: '/admin/experience', icon: Briefcase, label: 'Experience' },
    { href: '/admin/education', icon: GraduationCap, label: 'Education' },
    { href: '/admin/skills', icon: Code, label: 'Skills' },
    { href: '/admin/projects', icon: FolderKanban, label: 'Projects' },
    { href: '/admin/social-links', icon: LinkIcon, label: 'Social Links' },
    { href: '/admin/design', icon: Palette, label: 'Design' },
  ];

  return (
    <div className="min-h-screen bg-tech-950">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-tech-900 border-r border-cyan-500/20 min-h-screen sticky top-0">
          <div className="p-6 border-b border-cyan-500/20">
            <h1 className="text-2xl font-bold gradient-text-tech">Admin Panel</h1>
            <p className="text-sm text-gray-400 mt-1">Portfolio Management</p>
          </div>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-300 hover:bg-tech-800 hover:text-cyan-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-cyan-500/20 mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-tech-800 hover:text-red-400 w-full transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-tech-800 hover:text-cyan-400 w-full transition-all mt-2"
            >
              <span>View Site</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

