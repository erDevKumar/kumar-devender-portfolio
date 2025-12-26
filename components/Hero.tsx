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
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden" style={{ background: getGradient(180, 140, 100) }}>
      <AnimatedBackground time={time} hue={(time * 8 + 140) % 360} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
        {/* Main Hero Section - Perfectly Symmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
          {/* Left: Profile Image - Centered */}
          <div className="flex justify-center lg:justify-center order-2 lg:order-1">
            {personalInfo.profileImage && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden ring-4 ring-emerald-300/60 shadow-2xl bg-gray-100/80 flex items-center justify-center hover:scale-105 transition-all duration-500">
                  <img src={personalInfo.profileImage} alt={`${personalInfo.name} - Profile`} className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
          
          {/* Right: Content - Centered */}
          <div className="text-center lg:text-center order-1 lg:order-2 flex flex-col items-center lg:items-center">
            <div className="mb-4 animate-fade-in">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 gradient-text leading-tight">
                {personalInfo.name}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 mx-auto rounded-full"></div>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-10 font-light max-w-3xl leading-relaxed">
              {personalInfo.title}
            </h2>
            
            {/* Contact Cards - Perfect 2x2 Grid */}
            <div className="grid grid-cols-2 gap-5 mb-10 w-full max-w-lg">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="glass-card rounded-3xl p-6 shadow-2xl hover:shadow-emerald-200/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border border-emerald-200/60 flex flex-col items-center justify-center min-h-[160px] group shine-effect">
                  <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-4 rounded-3xl shadow-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">Email</h4>
                  <p className="text-xs font-semibold text-emerald-600 break-all text-center">{personalInfo.email}</p>
                </a>
              )}
              {personalInfo.phone && (
                <a href={`tel:${personalInfo.phone}`} className="glass-card rounded-3xl p-6 shadow-2xl hover:shadow-teal-200/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border border-teal-200/60 flex flex-col items-center justify-center min-h-[160px] group shine-effect">
                  <div className="bg-gradient-to-br from-teal-500 via-cyan-500 to-cyan-600 p-4 rounded-3xl shadow-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">Phone</h4>
                  <p className="text-xs font-semibold text-teal-600">{personalInfo.phone}</p>
                </a>
              )}
              {linkedInUrl && (
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="glass-card rounded-3xl p-6 shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border border-blue-200/60 flex flex-col items-center justify-center min-h-[160px] group shine-effect">
                  <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-600 p-4 rounded-3xl shadow-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Linkedin className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">LinkedIn</h4>
                  <p className="text-xs font-semibold text-blue-600">View Profile</p>
                </a>
              )}
              <div className="glass-card rounded-3xl p-6 shadow-2xl border border-emerald-200/60 flex flex-col items-center justify-center min-h-[160px] group">
                <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-teal-600 p-4 rounded-3xl shadow-xl mb-4">
                  <MessageCircle className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-2">Available</h4>
                <p className="text-xs font-semibold text-emerald-600">New Opportunities</p>
              </div>
            </div>
            
            {/* Social Links - Centered */}
            <div className="flex justify-center mb-6">
              <SocialLinks socialLinks={socialLinks} email={personalInfo.email} size="lg" />
            </div>
          </div>
        </div>

        {/* About Section - Centered and Symmetric */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-10 border border-emerald-200/50 shadow-2xl hover:shadow-emerald-200/30 transition-all duration-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-3 rounded-2xl shadow-xl">
                <MessageCircle className="h-7 w-7 text-white" />
              </div>
              <span className="gradient-text">About Me</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center">{personalInfo.bio}</p>
          </div>
        </div>

        {/* Scroll Indicator - Centered */}
        <div className="flex justify-center mt-8 animate-bounce">
          <a href="#experience" className="inline-block text-emerald-700/80 hover:text-emerald-900 transition-all">
            <ChevronDown className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
