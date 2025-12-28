'use client';

import React from 'react';
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
  Email: 'https://fonts.gstatic.com/s/i/productlogos/gmail/v8/192px.svg', // Gmail colored icon
  Gmail: 'https://fonts.gstatic.com/s/i/productlogos/gmail/v8/192px.svg', // Gmail colored icon
};

// Platform-specific icon colors (for single-color icons)
const platformIconColors: Record<string, string> = {
  LinkedIn: '#0077B5', // LinkedIn brand blue
  GitHub: '#FFFFFF', // GitHub white
  Github: '#FFFFFF', // GitHub white
  Twitter: '#1DA1F2', // Twitter brand blue
};

const sizeClasses = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };
const textSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

// Check if platform uses multi-colored icon (should be rendered as image, not masked)
const isMultiColoredIcon = (platform: string): boolean => {
  return platform === 'Email' || platform === 'Gmail';
};

export default function SocialLinks({ socialLinks, email, size = 'md' }: SocialLinksProps) {
  const allLinks = [...socialLinks, ...(email ? [{ platform: 'Email', url: `mailto:${email}` }] : [])];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
      {allLinks.map((link) => {
        const logoUrl = platformLogos[link.platform];
        const hasLogo = !!logoUrl;
        const iconColor = platformIconColors[link.platform] || '#FFFFFF';
        const isMultiColored = isMultiColoredIcon(link.platform);

        return (
          <a 
            key={link.platform} 
            href={link.url} 
            target={link.platform === 'Email' ? undefined : '_blank'} 
            rel={link.platform === 'Email' ? undefined : 'noopener noreferrer'} 
            className="group relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-white transition-all duration-200 border-2 border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            aria-label={link.platform}
            title={link.platform}
          >
            {hasLogo && isMultiColored ? (
              <img 
                src={logoUrl} 
                alt={link.platform}
                className={`${sizeClasses[size]} flex-shrink-0 transition-transform group-hover:scale-110 object-contain`}
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            ) : hasLogo ? (
              <div 
                className={`${sizeClasses[size]} flex-shrink-0 transition-transform group-hover:scale-110`}
                style={{
                  maskImage: `url(${logoUrl})`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: `url(${logoUrl})`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  backgroundColor: iconColor,
                }}
              />
            ) : null}
            <span className={`${textSizes[size]} font-semibold`}>{link.platform}</span>
          </a>
        );
      })}
    </div>
  );
}
