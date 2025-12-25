'use client';

import { useState, useEffect } from 'react';
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-xl font-bold text-primary-600 hover:text-primary-700">
            Portfolio
          </a>
          <div className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <a key={item.name} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                {item.name}
              </a>
            ))}
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-700 hover:text-primary-600" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a key={item.name} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="block px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-md">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

