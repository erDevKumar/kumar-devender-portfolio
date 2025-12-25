'use client';

import { PersonalInfo } from '@/types/portfolio';
import SocialLinks from './SocialLinks';
import { ChevronDown, Sparkles, Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface HeroProps {
  personalInfo: PersonalInfo;
  socialLinks: Array<{ platform: string; url: string }>;
  stats?: {
    experience: number;
    projects: number;
    skills: number;
  };
}

export default function Hero({ personalInfo, socialLinks, stats }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animated gradient background
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.01);
    }, 16);
    
    // Scroll animations for About
    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAboutVisible(true);
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) aboutObserver.observe(aboutRef.current);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
      if (aboutRef.current) aboutObserver.unobserve(aboutRef.current);
    };
  }, []);

  // Nature-based animated gradient colors (sky to forest)
  const heroGradient1 = `hsl(${(time * 8 + 180) % 360}, 65%, 92%)`; // Sky blue tones
  const heroGradient2 = `hsl(${(time * 8 + 140) % 360}, 55%, 88%)`; // Sage green tones
  const heroGradient3 = `hsl(${(time * 8 + 100) % 360}, 50%, 90%)`; // Forest green tones

  // Get LinkedIn URL
  const linkedInUrl = socialLinks.find(link => link.platform.toLowerCase() === 'linkedin')?.url || '';

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${heroGradient1} 0%, ${heroGradient2} 50%, ${heroGradient3} 100%)`,
      }}
    >
      {/* Dynamic animated blending background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(76,175,80,0.12),transparent_60%)] animate-pulse-slow"
          style={{ animationDuration: '4s' }}
        ></div>
        <div 
          className="absolute top-20 left-10 w-96 h-96 bg-emerald-300/25 rounded-full blur-3xl animate-float transition-transform duration-700"
          style={{ 
            transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.03}px, ${(mousePosition.y - window.innerHeight / 2) * 0.03}px)`,
            animationDelay: '1s',
            background: `radial-gradient(circle, hsl(${(time * 8 + 140) % 360}, 70%, 80%) 0%, transparent 70%)`
          }}
        ></div>
        <div 
          className="absolute top-40 right-10 w-96 h-96 bg-sky-300/25 rounded-full blur-3xl animate-float transition-transform duration-700" 
          style={{ 
            animationDelay: '2s',
            transform: `translate(${(mousePosition.x - window.innerWidth / 2) * -0.03}px, ${(mousePosition.y - window.innerHeight / 2) * 0.03}px)`,
            background: `radial-gradient(circle, hsl(${(time * 8 + 180) % 360}, 70%, 80%) 0%, transparent 70%)`
          }}
        ></div>
        <div 
          className="absolute -bottom-20 left-1/2 w-96 h-96 bg-teal-300/25 rounded-full blur-3xl animate-float transition-transform duration-700" 
          style={{ 
            animationDelay: '3s',
            transform: `translate(${Math.sin(time) * 30}px, ${Math.cos(time) * 30}px)`,
            background: `radial-gradient(circle, hsl(${(time * 8 + 100) % 360}, 70%, 80%) 0%, transparent 70%)`
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
        {/* Main Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center mb-12">
          {/* Left side - Image */}
          <div className="flex justify-center lg:justify-end animate-slide-in-left">
            {personalInfo.profileImage && (
              <div className="relative group">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden ring-4 ring-emerald-200/50 shadow-2xl bg-gray-100/80 flex items-center justify-center transform hover:scale-105 hover:rotate-2 transition-all duration-500">
                  <img
                    src={personalInfo.profileImage}
                    alt={`${personalInfo.name} - Profile Photo`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const container = target.parentElement;
                      if (container && !container.querySelector('.fallback-initials')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback-initials text-emerald-600/80 font-bold text-4xl sm:text-5xl md:text-6xl';
                        const initials = personalInfo.name.split(' ').map(n => n[0]).join('');
                        fallback.textContent = initials;
                        container.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-emerald-400/70 animate-wiggle" />
              </div>
            )}
          </div>

          {/* Right side - Content */}
          <div className="text-center lg:text-left animate-slide-in-right">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-teal-700 to-green-700">
              {personalInfo.name}
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl text-emerald-700/90 mb-6 font-medium">
              {personalInfo.title}
            </h2>
            
            {/* Symmetric Contact Information Cards with Descriptions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1 border border-emerald-200/40 group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-md group-hover:from-emerald-600 group-hover:to-teal-700 transition-all mb-3">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-base font-bold text-gray-900 mb-2">Email</h4>
                    <p className="text-xs text-gray-600/80 mb-2 leading-relaxed">
                      Send me an email for professional inquiries, collaborations, or project discussions.
                    </p>
                    <p className="text-sm font-semibold text-emerald-600 break-all">{personalInfo.email}</p>
                  </div>
                </a>
              )}
              {personalInfo.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1 border border-emerald-200/40 group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-3 rounded-2xl shadow-md group-hover:from-teal-600 group-hover:to-cyan-700 transition-all mb-3">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-base font-bold text-gray-900 mb-2">Phone</h4>
                    <p className="text-xs text-gray-600/80 mb-2 leading-relaxed">
                      Call or message me directly for immediate communication and quick responses.
                    </p>
                    <p className="text-sm font-semibold text-teal-600">{personalInfo.phone}</p>
                  </div>
                </a>
              )}
              {linkedInUrl && (
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1 border border-emerald-200/40 group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-md group-hover:from-blue-600 group-hover:to-indigo-700 transition-all mb-3">
                      <Linkedin className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-base font-bold text-gray-900 mb-2">LinkedIn</h4>
                    <p className="text-xs text-gray-600/80 mb-2 leading-relaxed">
                      Connect with me on LinkedIn for professional networking and career opportunities.
                    </p>
                    <p className="text-sm font-semibold text-blue-600">View Profile</p>
                  </div>
                </a>
              )}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-emerald-200/40">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-md mb-3">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">Available</h4>
                  <p className="text-xs text-gray-600/80 mb-2 leading-relaxed">
                    Open to discussing new opportunities, interesting projects, and collaborations.
                  </p>
                  <p className="text-sm font-semibold text-emerald-600">New Opportunities</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-start mb-6">
              <SocialLinks socialLinks={socialLinks} email={personalInfo.email} size="lg" />
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div 
          ref={aboutRef}
          className={`bg-white/60 backdrop-blur-md rounded-3xl shadow-xl p-6 mb-6 border border-emerald-200/30 transition-all duration-1000 ${
            aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-2xl shadow-lg">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            About Me
          </h2>
          <p className="text-sm sm:text-base text-gray-700/90 leading-relaxed">
            {personalInfo.bio}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-8 animate-bounce">
          <a
            href="#experience-projects"
            className="inline-block text-emerald-700/80 hover:text-emerald-900 transition-all transform hover:scale-110"
            aria-label="Scroll to experience section"
          >
            <ChevronDown className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
