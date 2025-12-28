'use client';

import React from 'react';
import { Mail } from 'lucide-react';
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

const sizeClasses = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };
const containerSizes = { sm: 'w-10 h-10', md: 'w-12 h-12', lg: 'w-14 h-14' };

export default function SocialLinks({ socialLinks, email, size = 'md' }: SocialLinksProps) {
  const allLinks = [...socialLinks, ...(email ? [{ platform: 'Email', url: `mailto:${email}` }] : [])];

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {allLinks.map((link) => {
        const logoUrl = platformLogos[link.platform];
        const hasLogo = logoUrl && link.platform !== 'Email';

        return (
          <a 
            key={link.platform} 
            href={link.url} 
            target={link.platform === 'Email' ? undefined : '_blank'} 
            rel={link.platform === 'Email' ? undefined : 'noopener noreferrer'} 
            className={`group relative flex items-center justify-center ${containerSizes[size]} rounded-lg bg-gray-800/40 backdrop-blur-sm text-gray-200 hover:bg-gray-700/50 hover:text-white transition-all duration-200 border border-gray-700/50 hover:border-blue-500/50`} 
            aria-label={link.platform}
            title={link.platform}
          >
            {hasLogo ? (
              <img 
                src={logoUrl} 
                alt={link.platform}
                className={`${sizeClasses[size]} transition-transform group-hover:scale-110`}
              />
            ) : (
              <Mail className={`${sizeClasses[size]} transition-transform group-hover:scale-110`} />
            )}
          </a>
        );
      })}
    </div>
  );
}
