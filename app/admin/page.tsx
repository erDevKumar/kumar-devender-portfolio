'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';
import { PortfolioData } from '@/types/portfolio';
import { User, Briefcase, GraduationCap, Code, FolderKanban, Link as LinkIcon, CheckCircle, AlertCircle } from 'lucide-react';

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
    // Load current portfolio data
    const loadData = async () => {
      try {
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
          // Fallback to default data
          setData(portfolioData);
          setStats({
            experience: portfolioData.experience.length,
            education: portfolioData.education.length,
            skills: portfolioData.skills.length,
            projects: portfolioData.projects.length,
            socialLinks: portfolioData.socialLinks.length,
          });
        }
      } catch (error) {
        // Fallback to default data
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
        <div className="text-cyan-400">Loading dashboard...</div>
      </div>
    );
  }

  const statCards = [
    { icon: Briefcase, label: 'Experience', count: stats.experience, href: '/admin/experience', color: 'from-blue-500 to-cyan-500' },
    { icon: GraduationCap, label: 'Education', count: stats.education, href: '/admin/education', color: 'from-purple-500 to-pink-500' },
    { icon: Code, label: 'Skills', count: stats.skills, href: '/admin/skills', color: 'from-green-500 to-emerald-500' },
    { icon: FolderKanban, label: 'Projects', count: stats.projects, href: '/admin/projects', color: 'from-orange-500 to-red-500' },
    { icon: LinkIcon, label: 'Social Links', count: stats.socialLinks, href: '/admin/social-links', color: 'from-indigo-500 to-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold gradient-text-tech mb-2">Dashboard</h1>
        <p className="text-gray-400">Manage your portfolio content and design</p>
      </div>

      {/* Main Editor CTA */}
      <div className="glass-card-dark rounded-xl p-8 border-2 border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-100 mb-2">✨ Unified Portfolio Editor</h2>
            <p className="text-gray-300 mb-4">Edit all your portfolio content in one convenient place</p>
            <p className="text-sm text-gray-400">Update personal info, experience, education, skills, projects, and social links all from a single page</p>
          </div>
          <Link
            href="/admin/editor"
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:shadow-glow transition-all text-lg"
          >
            <Code className="w-6 h-6" />
            Open Editor
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.href}
              href={stat.href}
              className="glass-card-dark rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:shadow-glow group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} shadow-glow`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-gray-300 group-hover:text-cyan-400 transition-colors">
                  {stat.count}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-200">{stat.label}</h3>
              <p className="text-sm text-gray-400 mt-1">Click to manage</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="glass-card-dark rounded-xl p-6 border border-cyan-500/20">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/personal-info"
            className="flex items-center gap-4 p-4 bg-tech-800/50 rounded-lg hover:bg-tech-800 transition-all border border-cyan-500/20 hover:border-cyan-500/40"
          >
            <User className="w-6 h-6 text-cyan-400" />
            <div>
              <h3 className="font-semibold text-gray-200">Edit Personal Info</h3>
              <p className="text-sm text-gray-400">Update name, bio, contact details</p>
            </div>
          </Link>
          <Link
            href="/admin/design"
            className="flex items-center gap-4 p-4 bg-tech-800/50 rounded-lg hover:bg-tech-800 transition-all border border-cyan-500/20 hover:border-cyan-500/40"
          >
            <Code className="w-6 h-6 text-purple-400" />
            <div>
              <h3 className="font-semibold text-gray-200">Customize Design</h3>
              <p className="text-sm text-gray-400">Change colors, styles, and themes</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-300">
          <p className="font-semibold text-blue-400 mb-1">Note:</p>
          <p>Changes are saved to the portfolio data file. Make sure to rebuild and redeploy your site after making changes.</p>
        </div>
      </div>
    </div>
  );
}

