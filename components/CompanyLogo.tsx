'use client';


interface CompanyLogoProps {
  logo?: string;
  companyName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-20 h-20',
  lg: 'w-24 h-24',
};

export default function CompanyLogo({ logo, companyName, size = 'md', className = '' }: CompanyLogoProps) {
  const sizeClass = sizeClasses[size];
  const fallbackInitial = companyName.charAt(0).toUpperCase();

  return (
    <div className={`${sizeClass} rounded-2xl overflow-hidden bg-white/90 border-2 border-cyan-500/30 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group ${className}`}>
      {logo ? (
        <img
          src={logo}
          alt={`${companyName} logo`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 p-1"
          style={{ objectPosition: 'center' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const container = target.parentElement;
            if (container && !container.querySelector('.fallback-initial')) {
              const fallback = document.createElement('div');
              fallback.className = 'fallback-initial text-cyan-400 font-bold text-xl sm:text-2xl';
              fallback.textContent = fallbackInitial;
              container.appendChild(fallback);
            }
          }}
        />
      ) : (
        <div className="text-cyan-400 font-bold text-xl sm:text-2xl">{fallbackInitial}</div>
      )}
    </div>
  );
}

