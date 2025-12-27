'use client';

import { PersonalInfo } from '@/types/portfolio';
import SocialLinks from '@/components/SocialLinks';
import { ChevronDown, Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';
import { useAnimatedGradient } from '@/hooks/useAnimatedGradient';
import AnimatedBackground from '@/components/AnimatedBackground';

interface HeroProps {
  personalInfo: PersonalInfo;
  socialLinks: Array<{ platform: string; url: string }>;
}

export default function Hero({ personalInfo, socialLinks }: HeroProps) {
  const { time, getGradient } = useAnimatedGradient(180, 8);
  const linkedInUrl = socialLinks.find(link => link.platform.toLowerCase() === 'linkedin')?.url || '';
  const githubUrl = socialLinks.find(link => link.platform.toLowerCase() === 'github')?.url || '';

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      <AnimatedBackground time={time} hue={(time * 8 + 200) % 360} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
        {/* Main Hero Section - Side by Side Layout: Profile + About Me with Height Symmetry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-16">
          {/* Left: Profile Image and Info */}
          <div className="flex flex-col items-center lg:items-start animate-fade-in h-full">
            {personalInfo.profileImage && (
              <div className="relative group mb-5 lg:mb-6 w-full flex justify-center lg:justify-start">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 animate-tech-pulse"></div>
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden ring-4 ring-cyan-500/30 shadow-tech-lg bg-tech-800/50 flex items-center justify-center hover:scale-105 transition-all duration-700 card-hover">
                  <img src={personalInfo.profileImage} alt={`${personalInfo.name} - Profile`} className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            {/* Name and Title */}
            <div className="text-center lg:text-left mb-5 lg:mb-6 w-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 lg:mb-3 gradient-text-tech leading-[1.1] tracking-tight">
                {personalInfo.name}
              </h1>
              <div className="w-16 lg:w-20 h-0.5 lg:h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 mx-auto lg:mx-0 rounded-full shadow-glow-cyan mb-3 lg:mb-4"></div>
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-light leading-relaxed text-balance">
                {personalInfo.title}
              </h2>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start mb-5 lg:mb-6 w-full">
              <SocialLinks socialLinks={socialLinks} email={personalInfo.email} size="lg" />
            </div>
            
            {/* Contact Cards - Compact 2x2 Grid with Equal Heights */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md lg:max-w-full flex-1">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="glass-card-dark rounded-xl p-3 sm:p-4 shadow-tech hover:shadow-glow transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 border border-cyan-500/30 flex flex-col items-center justify-center h-full min-h-[110px] sm:min-h-[130px] group shine-effect card-hover">
                  <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 p-2 sm:p-2.5 rounded-lg shadow-glow mb-2 group-hover:scale-110 transition-all duration-300">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-100 mb-1">Email</h4>
                  <p className="text-[9px] sm:text-[10px] font-medium text-cyan-400 break-all text-center leading-tight px-1">{personalInfo.email}</p>
                </a>
              )}
              {personalInfo.phone && (
                <a href={`tel:${personalInfo.phone}`} className="glass-card-dark rounded-xl p-3 sm:p-4 shadow-tech hover:shadow-glow transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 border border-blue-500/30 flex flex-col items-center justify-center h-full min-h-[110px] sm:min-h-[130px] group shine-effect card-hover">
                  <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-2 sm:p-2.5 rounded-lg shadow-glow mb-2 group-hover:scale-110 transition-all duration-300">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-100 mb-1">Phone</h4>
                  <p className="text-[10px] sm:text-xs font-medium text-blue-400">{personalInfo.phone}</p>
                </a>
              )}
              {linkedInUrl && (
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="glass-card-dark rounded-xl p-3 sm:p-4 shadow-tech hover:shadow-glow transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 border border-blue-500/30 flex flex-col items-center justify-center h-full min-h-[110px] sm:min-h-[130px] group shine-effect card-hover">
                  <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-2 sm:p-2.5 rounded-lg shadow-glow mb-2 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" alt="LinkedIn" className="h-4 w-4 sm:h-5 sm:w-5 filter brightness-0 invert" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-100 mb-1">LinkedIn</h4>
                  <p className="text-[10px] sm:text-xs font-medium text-blue-400">View Profile</p>
                </a>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="glass-card-dark rounded-xl p-3 sm:p-4 shadow-tech hover:shadow-glow transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 border border-gray-500/30 flex flex-col items-center justify-center h-full min-h-[110px] sm:min-h-[130px] group shine-effect card-hover">
                  <div className="bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 p-2 sm:p-2.5 rounded-lg shadow-glow mb-2 group-hover:scale-110 transition-all duration-300">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub" className="h-4 w-4 sm:h-5 sm:w-5 filter brightness-0 invert" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-100 mb-1">GitHub</h4>
                  <p className="text-[10px] sm:text-xs font-medium text-gray-400">View Profile</p>
                </a>
              )}
            </div>
          </div>

          {/* Right: About Me Section - Matching Height */}
          <div className="animate-fade-in h-full flex" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card-dark rounded-3xl p-6 md:p-8 lg:p-10 border border-cyan-500/30 shadow-tech hover:shadow-glow transition-all duration-500 card-hover code-border w-full flex flex-col">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-100 mb-4 lg:mb-6 flex items-center gap-3">
                <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 p-2.5 md:p-3 rounded-xl shadow-glow flex-shrink-0">
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <span className="gradient-text-tech">About Me</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed text-balance flex-1">{personalInfo.bio}</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Centered */}
        <div className="flex justify-center mt-12 animate-bounce">
          <a href="#experience" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-tech-800/80 backdrop-blur-sm text-cyan-400 hover:text-cyan-300 hover:bg-tech-700/80 transition-all duration-300 shadow-glow hover:shadow-glow-lg hover:scale-110 border border-cyan-500/30">
            <ChevronDown className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
