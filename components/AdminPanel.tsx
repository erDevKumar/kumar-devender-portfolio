'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Settings, User, Briefcase, GraduationCap, Code, FolderKanban, Link as LinkIcon, LogOut, Palette, Menu, X } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { PortfolioData } from '@/types/portfolio';
// Import actual admin page components
import AdminDashboardContent from '@/app/admin/page';
import PortfolioEditor from '@/app/admin/editor/page';
import PersonalInfoPage from '@/app/admin/personal-info/page';
import ExperiencePage from '@/app/admin/experience/page';
import EducationPage from '@/app/admin/education/page';
import SkillsPage from '@/app/admin/skills/page';
import ProjectsPage from '@/app/admin/projects/page';
import SocialLinksPage from '@/app/admin/social-links/page';
import DesignPage from '@/app/admin/design/page';

export default function AdminPanel() {
  const { isAuthenticated, currentView, setCurrentView, logout } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    // Load portfolio data
    setData(portfolioData);
  }, []);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      if (!mobile) {
        const savedState = localStorage.getItem('admin_sidebar_open');
        if (savedState !== null) {
          setSidebarOpen(savedState === 'true');
        } else {
          setSidebarOpen(true);
        }
      } else {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    if (!isMobile) {
      localStorage.setItem('admin_sidebar_open', String(newState));
    }
  };

  const navItems = [
    { id: 'dashboard', icon: Settings, label: 'Dashboard', color: 'text-blue-600 bg-blue-50' },
    { id: 'editor', icon: Code, label: 'Portfolio Editor', color: 'text-purple-600 bg-purple-50' },
    { id: 'personal-info', icon: User, label: 'Personal Info', color: 'text-green-600 bg-green-50' },
    { id: 'experience', icon: Briefcase, label: 'Experience', color: 'text-orange-600 bg-orange-50' },
    { id: 'education', icon: GraduationCap, label: 'Education', color: 'text-indigo-600 bg-indigo-50' },
    { id: 'skills', icon: Code, label: 'Skills', color: 'text-pink-600 bg-pink-50' },
    { id: 'projects', icon: FolderKanban, label: 'Projects', color: 'text-red-600 bg-red-50' },
    { id: 'social-links', icon: LinkIcon, label: 'Social Links', color: 'text-cyan-600 bg-cyan-50' },
    { id: 'design', icon: Palette, label: 'Design', color: 'text-yellow-600 bg-yellow-50' },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminDashboardContent />;
      case 'editor':
        return <PortfolioEditor />;
      case 'personal-info':
        return <PersonalInfoPage />;
      case 'experience':
        return <ExperiencePage />;
      case 'education':
        return <EducationPage />;
      case 'skills':
        return <SkillsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'social-links':
        return <SocialLinksPage />;
      case 'design':
        return <DesignPage />;
      default:
        return <AdminDashboardContent />;
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#111827] flex flex-col">
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

      <div className="flex flex-1 pt-16 lg:pt-0 overflow-hidden">
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
          ${sidebarOpen && isMobile ? 'w-64' : sidebarOpen ? 'w-64' : 'w-0 lg:w-16'}
          fixed lg:sticky top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] lg:h-screen
          bg-gray-800/60 backdrop-blur-sm border-r border-gray-700/50
          transition-all duration-300 ease-out shadow-lg z-50 lg:z-auto
          overflow-y-auto
        `}>
          {/* Desktop Sidebar Header */}
          <div className="hidden lg:block p-4 lg:p-6 border-b border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className={`${sidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 whitespace-nowrap ${sidebarOpen ? 'w-auto' : 'w-0 overflow-hidden'}`}>
                <h1 className="text-xl lg:text-2xl font-bold text-white">Admin Panel</h1>
              </div>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5 text-gray-200" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-200" />
                )}
              </button>
            </div>
          </div>

          <nav className="p-2 lg:p-4 space-y-1 lg:space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    if (isMobile) setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg transition-all duration-200 group w-full text-left ${
                    isActive
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-sm'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <div className={`p-1.5 lg:p-2 rounded-lg flex-shrink-0 ${isActive ? 'bg-blue-500/30' : 'bg-gray-700/50 group-hover:bg-gray-700'} transition-colors`}>
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  {sidebarOpen && (
                    <span className={`transition-opacity duration-300 font-medium text-sm lg:text-base whitespace-nowrap ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-2 lg:p-4 border-t border-gray-700/50 mt-auto space-y-1 lg:space-y-2">
            <button
              onClick={logout}
              className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 w-full transition-all duration-200 group"
            >
              <div className="p-1.5 lg:p-2 rounded-lg bg-gray-700/50 group-hover:bg-red-500/30 transition-colors flex-shrink-0">
                <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
              {sidebarOpen && (
                <span className={`transition-opacity duration-300 font-medium text-sm lg:text-base whitespace-nowrap ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                  Logout
                </span>
              )}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 w-full min-w-0 overflow-y-auto ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} transition-all duration-300 ease-out`}>
          <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}


