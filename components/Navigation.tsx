'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/utils/constants';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -80; // Account for fixed navigation
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
      isScrolled 
        ? 'glass-card-dark shadow-tech-lg border-b border-cyan-500/30 backdrop-blur-xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')} 
            className="text-2xl font-extrabold gradient-text-tech hover:scale-105 transition-all duration-300 tracking-tight focus-visible-ring"
          >
            Portfolio
          </a>
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={(e) => handleNavClick(e, item.href)} 
                className="relative px-4 py-2 text-gray-300 hover:text-cyan-400 transition-all duration-300 font-semibold text-sm rounded-xl group focus-visible-ring"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-0 bg-cyan-500/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 group-hover:w-3/4"></span>
              </a>
            ))}
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-gray-300 hover:text-cyan-400 transition-all duration-300 p-2.5 rounded-xl hover:bg-cyan-500/10 active:scale-95 focus-visible-ring" 
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden glass-card-dark border-t border-cyan-500/30 backdrop-blur-xl animate-slide-up">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={(e) => handleNavClick(e, item.href)} 
                className="block px-4 py-3 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-xl transition-all duration-300 font-semibold text-sm active:scale-95 focus-visible-ring"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

