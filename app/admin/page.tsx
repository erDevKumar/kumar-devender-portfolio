'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';
import { PortfolioData } from '@/types/portfolio';
import { User, Briefcase, GraduationCap, Code, FolderKanban, Link as LinkIcon, CheckCircle, AlertCircle, ArrowRight, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    experience: 0,
    education: 0,
    skills: 0,
    projects: 0,
    socialLinks: 0,
  });

  useEffect(() => {
    // Load current portfolio data - for static sites, use default data
    const loadData = async () => {
      try {
        // Try API route first (for development)
        const response = await fetch('/api/portfolio');
        if (response.ok) {
          const portfolioData = await response.json();
          setData(portfolioData);
          setStats({
            experience: portfolioData.experience?.length || 0,
            education: portfolioData.education?.length || 0,
            skills: portfolioData.skills?.length || 0,
            projects: portfolioData.projects?.length || 0,
            socialLinks: portfolioData.socialLinks?.length || 0,
          });
        } else {
          throw new Error('API not available');
        }
      } catch (error) {
        // Fallback to default data (for static sites)
        setData(portfolioData);
        setStats({
          experience: portfolioData.experience.length,
          education: portfolioData.education.length,
          skills: portfolioData.skills.length,
          projects: portfolioData.projects.length,
          socialLinks: portfolioData.socialLinks.length,
        });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center animate-fade-in-up">
          <div className="w-12 h-12 border-4 border-blue-500/20 rounded-full mx-auto mb-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-slow"></div>
          </div>
          <p className="text-gray-200 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { 
      icon: Briefcase, 
      label: 'Experience', 
      count: stats.experience, 
      href: '/admin/experience', 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      icon: GraduationCap, 
      label: 'Education', 
      count: stats.education, 
      href: '/admin/education', 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    { 
      icon: Code, 
      label: 'Skills', 
      count: stats.skills, 
      href: '/admin/skills', 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    { 
      icon: FolderKanban, 
      label: 'Projects', 
      count: stats.projects, 
      href: '/admin/projects', 
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    { 
      icon: LinkIcon, 
      label: 'Social Links', 
      count: stats.socialLinks, 
      href: '/admin/social-links', 
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="animate-fade-in-down">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-300">Manage your portfolio content</p>
      </div>

      {/* Main Editor CTA */}
      <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-4 sm:p-6 lg:p-8 border border-blue-500/25 shadow-lg animate-scale-in stagger-1">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
              <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-lg border border-blue-500/30 flex-shrink-0">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Unified Portfolio Editor</h2>
            </div>
            <p className="text-gray-200 mb-2 text-base sm:text-lg">Edit all your portfolio content in one convenient place</p>
            <p className="text-xs sm:text-sm text-gray-300">Update personal info, experience, education, skills, projects, and social links all from a single page</p>
          </div>
          <Link
            href="/admin/editor"
            className="flex items-center justify-center gap-2 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-200 shadow-lg shadow-blue-500/25 transform hover:-translate-y-0.5 text-sm sm:text-base w-full md:w-auto"
          >
            <Code className="w-4 h-4 sm:w-5 sm:h-5" />
            Open Editor
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.href}
              href={stat.href}
              className={`bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 animate-fade-in-up stagger-${index + 2} group`}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-lg bg-blue-500/20 border border-blue-500/30 group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-400`} />
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {stat.count}
                  </div>
                  <div className="text-xs text-gray-200 mt-1">items</div>
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{stat.label}</h3>
              <p className="text-xs sm:text-sm text-gray-200 flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                Manage
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 shadow-lg animate-fade-in-up stagger-4">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-lg border border-blue-500/30 flex-shrink-0">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Link
              href="/admin/personal-info"
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all duration-200 border border-gray-700/50 hover:border-green-500/50 group"
            >
            <div className="p-2 sm:p-3 bg-green-500/20 rounded-lg border border-green-500/30 group-hover:bg-green-500/30 transition-colors flex-shrink-0">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-sm sm:text-base">Edit Personal Info</h3>
              <p className="text-xs sm:text-sm text-gray-300">Update name, bio, contact details</p>
            </div>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-green-400 transition-colors flex-shrink-0" />
          </Link>
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3 animate-fade-in-up stagger-5">
        <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-200">
          <p className="font-semibold text-blue-400 mb-1">Note:</p>
          <p className="text-gray-200">Changes are saved to the portfolio data file. Make sure to rebuild and redeploy your site after making changes.</p>
        </div>
      </div>
    </div>
  );
}
