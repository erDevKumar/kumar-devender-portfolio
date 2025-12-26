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

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden" style={{ background: getGradient(180, 140, 100) }}>
      <AnimatedBackground time={time} hue={(time * 8 + 140) % 360} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
        {/* Main Hero Section - Perfectly Symmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left: Profile Image - Centered */}
          <div className="flex justify-center lg:justify-center order-2 lg:order-1 animate-fade-in">
            {personalInfo.profileImage && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-[2.5rem] blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700 animate-pulse-slow"></div>
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-[2.5rem] overflow-hidden ring-4 ring-emerald-300/50 shadow-2xl bg-gray-100/90 flex items-center justify-center hover:scale-105 transition-all duration-700 card-hover">
                  <img src={personalInfo.profileImage} alt={`${personalInfo.name} - Profile`} className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>

          {/* Right: Content - Centered */}
          <div className="text-center lg:text-center order-1 lg:order-2 flex flex-col items-center lg:items-center animate-slide-up">
            <div className="mb-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 gradient-text leading-[1.1] tracking-tight">
                {personalInfo.name}
              </h1>
              <div className="w-32 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 mx-auto rounded-full shadow-lg"></div>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-700 mb-12 font-light max-w-3xl leading-relaxed text-balance">
              {personalInfo.title}
            </h2>
            
            {/* Contact Cards - Perfect 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4 mb-12 w-full max-w-xl">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="glass-card rounded-3xl p-6 shadow-soft-lg hover:shadow-glow transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-emerald-200/50 flex flex-col items-center justify-center min-h-[170px] group shine-effect card-hover">
                  <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-4 rounded-2xl shadow-xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Mail className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">Email</h4>
                  <p className="text-xs font-semibold text-emerald-600 break-all text-center leading-tight">{personalInfo.email}</p>
                </a>
              )}
              {personalInfo.phone && (
                <a href={`tel:${personalInfo.phone}`} className="glass-card rounded-3xl p-6 shadow-soft-lg hover:shadow-glow transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-teal-200/50 flex flex-col items-center justify-center min-h-[170px] group shine-effect card-hover">
                  <div className="bg-gradient-to-br from-teal-500 via-cyan-500 to-cyan-600 p-4 rounded-2xl shadow-xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Phone className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">Phone</h4>
                  <p className="text-xs font-semibold text-teal-600">{personalInfo.phone}</p>
                </a>
              )}
              {linkedInUrl && (
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="glass-card rounded-3xl p-6 shadow-soft-lg hover:shadow-glow transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-blue-200/50 flex flex-col items-center justify-center min-h-[170px] group shine-effect card-hover">
                  <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-600 p-4 rounded-2xl shadow-xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Linkedin className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">LinkedIn</h4>
                  <p className="text-xs font-semibold text-blue-600">View Profile</p>
                </a>
              )}
              <div className="glass-card rounded-3xl p-6 shadow-soft-lg border border-emerald-200/50 flex flex-col items-center justify-center min-h-[170px] group card-hover">
                <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-teal-600 p-4 rounded-2xl shadow-xl mb-4">
                  <MessageCircle className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-2">Available</h4>
                <p className="text-xs font-semibold text-emerald-600">New Opportunities</p>
              </div>
            </div>

            {/* Social Links - Centered */}
            <div className="flex justify-center mb-8">
              <SocialLinks socialLinks={socialLinks} email={personalInfo.email} size="lg" />
            </div>
          </div>
        </div>

        {/* About Section - Centered and Symmetric */}
        <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="glass-card rounded-3xl p-10 md:p-12 border border-emerald-200/40 shadow-soft-lg hover:shadow-glow transition-all duration-500 card-hover">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-4">
              <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-3.5 rounded-2xl shadow-xl">
                <MessageCircle className="h-7 w-7 text-white" />
              </div>
              <span className="gradient-text">About Me</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed text-center text-balance">{personalInfo.bio}</p>
          </div>
        </div>

        {/* Scroll Indicator - Centered */}
        <div className="flex justify-center mt-12 animate-bounce">
          <a href="#experience" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm text-emerald-700/80 hover:text-emerald-900 hover:bg-white transition-all duration-300 shadow-soft hover:shadow-lg hover:scale-110">
            <ChevronDown className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
