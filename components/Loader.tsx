'use client';

import React, { useEffect, useState } from 'react';

export default function Loader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple timeout to show loading state briefly, then render content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Very short loading time - just for smooth transition

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-tech-950 via-tech-900 to-tech-950 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none"></div>
        <div className="text-center relative z-10">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent mb-4 shadow-glow-cyan"></div>
          <p className="text-cyan-400 font-medium">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

