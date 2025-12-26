'use client';

import React from 'react';

interface CompanyLogoProps {
  logo?: string;
  companyName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

export default function CompanyLogo({ logo, companyName, size = 'md', className = '' }: CompanyLogoProps) {
  const sizeClass = sizeClasses[size];
  const fallbackInitial = companyName.charAt(0).toUpperCase();

  return (
    <div className={`${sizeClass} rounded-2xl overflow-hidden bg-white/90 border-2 border-emerald-200/70 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group ${className}`}>
      {logo ? (
        <img
          src={logo}
          alt={`${companyName} logo`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          style={{ objectPosition: 'center' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const container = target.parentElement;
            if (container && !container.querySelector('.fallback-initial')) {
              const fallback = document.createElement('div');
              fallback.className = 'fallback-initial text-emerald-600/80 font-bold text-lg';
              fallback.textContent = fallbackInitial;
              container.appendChild(fallback);
            }
          }}
        />
      ) : (
        <div className="text-emerald-600/80 font-bold text-lg">{fallbackInitial}</div>
      )}
    </div>
  );
}

