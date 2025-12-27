'use client';

import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';
import { SocialLink } from '@/types/portfolio';

interface SocialLinksProps {
  socialLinks: SocialLink[];
  email?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Official platform logos from CDN or brand assets
const platformLogos: Record<string, string> = {
  LinkedIn: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg',
  GitHub: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
  Github: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
  Twitter: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg',
  Email: '', // Will use Mail icon
};

// Platform-specific brand colors
const platformColors: Record<string, { bg: string; hover: string; border: string }> = {
  LinkedIn: {
    bg: 'from-blue-600/20 to-blue-700/20',
    hover: 'from-blue-600/30 to-blue-700/30',
    border: 'border-blue-500/30',
  },
  GitHub: {
    bg: 'from-gray-700/20 to-gray-800/20',
    hover: 'from-gray-700/30 to-gray-800/30',
    border: 'border-gray-500/30',
  },
  Github: {
    bg: 'from-gray-700/20 to-gray-800/20',
    hover: 'from-gray-700/30 to-gray-800/30',
    border: 'border-gray-500/30',
  },
  Twitter: {
    bg: 'from-sky-500/20 to-sky-600/20',
    hover: 'from-sky-500/30 to-sky-600/30',
    border: 'border-sky-500/30',
  },
  Email: {
    bg: 'from-cyan-500/20 to-blue-500/20',
    hover: 'from-cyan-500/30 to-blue-500/30',
    border: 'border-cyan-500/30',
  },
};

const sizeClasses = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };
const containerSizes = { sm: 'w-10 h-10', md: 'w-12 h-12', lg: 'w-14 h-14' };

export default function SocialLinks({ socialLinks, email, size = 'md' }: SocialLinksProps) {
  const allLinks = [...socialLinks, ...(email ? [{ platform: 'Email', url: `mailto:${email}` }] : [])];
  const colors = platformColors[size === 'lg' ? 'lg' : 'md'] || platformColors.md;

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {allLinks.map((link) => {
        const logoUrl = platformLogos[link.platform];
        const platformColor = platformColors[link.platform] || platformColors.Email;
        const hasLogo = logoUrl && link.platform !== 'Email';

        return (
          <a 
            key={link.platform} 
            href={link.url} 
            target={link.platform === 'Email' ? undefined : '_blank'} 
            rel={link.platform === 'Email' ? undefined : 'noopener noreferrer'} 
            className={`group relative flex items-center justify-center ${containerSizes[size]} rounded-xl bg-gradient-to-br ${platformColor.bg} backdrop-blur-sm text-gray-300 hover:text-white transition-all duration-300 shadow-tech hover:shadow-glow hover:scale-110 hover:-translate-y-1 border ${platformColor.border} overflow-hidden`} 
            aria-label={link.platform}
            title={link.platform}
          >
            {hasLogo ? (
              <img 
                src={logoUrl} 
                alt={link.platform}
                className={`${sizeClasses[size]} transition-transform group-hover:scale-110 filter brightness-0 invert`}
              />
            ) : (
              <Mail className={`${sizeClasses[size]} transition-transform group-hover:scale-110`} />
            )}
            <span className={`absolute inset-0 rounded-xl bg-gradient-to-br ${platformColor.hover} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></span>
          </a>
        );
      })}
    </div>
  );
}

