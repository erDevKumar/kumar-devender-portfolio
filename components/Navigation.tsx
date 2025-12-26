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
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-card shadow-xl border-b border-emerald-100/50' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300">
            Portfolio
          </a>
          <div className="hidden md:flex space-x-10">
            {NAV_ITEMS.map((item) => (
              <a key={item.name} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-semibold relative group">
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-700 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-emerald-50" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-emerald-100/50">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {NAV_ITEMS.map((item) => (
              <a key={item.name} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="block px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all duration-300 font-medium">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

