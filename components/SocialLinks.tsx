'use client';

import React from 'react';
import { Linkedin, Github, Twitter, Mail, ExternalLink } from 'lucide-react';
import { SocialLink } from '@/types/portfolio';

interface SocialLinksProps {
  socialLinks: SocialLink[];
  email?: string;
  size?: 'sm' | 'md' | 'lg';
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: Linkedin,
  Github: Github,
  GitHub: Github,
  Twitter: Twitter,
  Email: Mail,
};

const sizeClasses = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };

export default function SocialLinks({ socialLinks, email, size = 'md' }: SocialLinksProps) {
  const allLinks = [...socialLinks, ...(email ? [{ platform: 'Email', url: `mailto:${email}` }] : [])];

  return (
    <div className="flex items-center gap-3">
      {allLinks.map((link) => {
        const Icon = iconMap[link.platform] || ExternalLink;
        return (
          <a 
            key={link.platform} 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm text-gray-600 hover:text-emerald-600 transition-all duration-300 shadow-soft hover:shadow-lg hover:scale-110 hover:-translate-y-1 ${sizeClasses[size]}`} 
            aria-label={link.platform}
          >
            <Icon className={`${sizeClasses[size]} transition-transform group-hover:scale-110`} />
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>
        );
      })}
    </div>
  );
}

