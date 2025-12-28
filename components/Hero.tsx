'use client';

import { PersonalInfo, WorkExperience, Project } from '@/types/portfolio';
import SocialLinks from '@/components/SocialLinks';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  personalInfo: PersonalInfo;
  socialLinks: Array<{ platform: string; url: string }>;
  experience?: WorkExperience[];
  projects?: Project[];
}

export default function Hero({ personalInfo, socialLinks, experience = [], projects = [] }: HeroProps) {
  // Split name for gradient effect
  const nameParts = personalInfo.name.split(' ');
  const firstName = nameParts[0] || personalInfo.name;
  const lastName = nameParts.slice(1).join(' ') || '';

  // Calculate statistics
  const yearsExperience = experience.length > 0 
    ? experience.reduce((acc, exp) => acc + 2, 0) // Approximate 2 years per experience
    : 10.5; // Fallback
  const topCompanies = experience.length > 0 
    ? new Set(experience.map(exp => exp.company)).size 
    : 6;
  const projectsDelivered = projects.length || 15;
  const leadershipYears = experience.length > 0
    ? experience.filter(exp => 
        exp.role.toLowerCase().includes('lead') || 
        exp.role.toLowerCase().includes('senior') ||
        exp.role.toLowerCase().includes('manager')
      ).length * 2
    : 4;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 sm:pt-20 bg-[#111827] relative overflow-hidden">
      {/* Gradient Background Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/15 via-transparent to-purple-950/15"></div>
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/8 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-32 relative z-10">
        {/* Main Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left: Name and About Section */}
          <div className="flex flex-col animate-fade-in-up order-2 lg:order-1">
            {/* Name with Gradient Effect */}
            <div className="mb-4 sm:mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight mb-2">
                <span className="text-white">{firstName}</span>
                {lastName && (
                  <span className="block bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                    {lastName}
                  </span>
                )}
              </h1>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-medium mt-2">
                {personalInfo.title}
              </h2>
            </div>

            {/* Professional Summary / About - Title Removed */}
            <div className="space-y-3 sm:space-y-4">
              <p className="text-base sm:text-lg text-white leading-relaxed">
                {personalInfo.bio}
              </p>
            </div>
          </div>

          {/* Right: Photo, Social Links, and Stats */}
          <div className="flex flex-col items-center lg:items-end gap-4 sm:gap-6 animate-fade-in-up stagger-2 order-1 lg:order-2">
            {/* Profile Image with Corner Badges */}
            {personalInfo.profileImage && (
              <div className="relative">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden ring-4 ring-white/10 shadow-2xl">
                  <img 
                    src={personalInfo.profileImage} 
                    alt={`${personalInfo.name} - Profile`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                {/* Decorative gradient overlay */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-2xl blur-xl -z-10"></div>
                
                {/* Top Left Badge - Years Experience - Darkened */}
                <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-gradient-to-br from-orange-600/50 to-orange-700/50 border border-orange-600/60 backdrop-blur-sm shadow-xl animate-bounce-subtle hover:scale-110 transition-all duration-300">
                  <span className="text-[10px] sm:text-xs font-bold text-orange-200">10.5+ Yrs</span>
                </div>
                
                {/* Bottom Right Badge - Projects - Darkened */}
                <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-gradient-to-br from-green-600/50 to-green-700/50 border border-green-600/60 backdrop-blur-sm shadow-xl animate-bounce-subtle hover:scale-110 transition-all duration-300" style={{ animationDelay: '0.3s' }}>
                  <span className="text-[10px] sm:text-xs font-bold text-green-200">15+ Proj</span>
                </div>
              </div>
            )}

            {/* Statistics Section - Below Image */}
            <div className="w-full lg:w-auto mt-2">
              <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-xs mx-auto lg:mx-0 lg:max-w-none">
                <div className="text-center px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg bg-gray-800/40 backdrop-blur-sm border border-gray-700/50">
                  <div className="text-base sm:text-lg md:text-xl font-bold text-blue-400 mb-0.5">
                    {yearsExperience}+
                  </div>
                  <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-300 font-medium leading-tight">
                    Years Experience
                  </div>
                </div>
                <div className="text-center px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg bg-gray-800/40 backdrop-blur-sm border border-gray-700/50">
                  <div className="text-base sm:text-lg md:text-xl font-bold text-indigo-400 mb-0.5">
                    {topCompanies}
                  </div>
                  <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-300 font-medium leading-tight">
                    Top Companies
                  </div>
                </div>
                <div className="text-center px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg bg-gray-800/40 backdrop-blur-sm border border-gray-700/50">
                  <div className="text-base sm:text-lg md:text-xl font-bold text-green-400 mb-0.5">
                    {projectsDelivered}+
                  </div>
                  <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-300 font-medium leading-tight">
                    Projects Delivered
                  </div>
                </div>
                <div className="text-center px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg bg-gray-800/40 backdrop-blur-sm border border-gray-700/50">
                  <div className="text-base sm:text-lg md:text-xl font-bold text-purple-400 mb-0.5">
                    {leadershipYears}
                  </div>
                  <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-300 font-medium leading-tight">
                    Years Leadership
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links - Below Stats */}
            <div className="w-full lg:w-auto mt-4 sm:mt-6">
              <SocialLinks 
                socialLinks={socialLinks} 
                email={personalInfo.email}
                size="lg"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8 sm:mt-12 animate-bounce-subtle">
          <a 
            href="#experience" 
            className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 text-gray-200 hover:text-blue-400 hover:border-blue-500/50 transition-all duration-200"
            aria-label="Scroll to experience section"
          >
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
