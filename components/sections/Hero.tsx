'use client';

import { PersonalInfo } from '@/types/portfolio';
import SocialLinks from '../common/SocialLinks';
import { ChevronDown, Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';
import { useAnimatedGradient } from '@/hooks/useAnimatedGradient';
import AnimatedBackground from '../common/AnimatedBackground';

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
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden ring-4 ring-emerald-200/50 shadow-2xl bg-gray-100/80 flex items-center justify-center hover:scale-105 transition-all duration-500">
                <img src={personalInfo.profileImage} alt={`${personalInfo.name} - Profile`} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          
          {/* Right: Content - Centered */}
          <div className="text-center lg:text-center order-1 lg:order-2 flex flex-col items-center lg:items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-teal-700 to-green-700">
              {personalInfo.name}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-emerald-700/90 mb-8 font-medium max-w-2xl">
              {personalInfo.title}
            </h2>
            
            {/* Contact Cards - Perfect 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-lg">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-emerald-200/40 flex flex-col items-center justify-center min-h-[140px]">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-md mb-3">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">Email</h4>
                  <p className="text-xs font-semibold text-emerald-600 break-all text-center">{personalInfo.email}</p>
                </a>
              )}
              {personalInfo.phone && (
                <a href={`tel:${personalInfo.phone}`} className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-emerald-200/40 flex flex-col items-center justify-center min-h-[140px]">
                  <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-3 rounded-2xl shadow-md mb-3">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">Phone</h4>
                  <p className="text-xs font-semibold text-teal-600">{personalInfo.phone}</p>
                </a>
              )}
              {linkedInUrl && (
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-emerald-200/40 flex flex-col items-center justify-center min-h-[140px]">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-md mb-3">
                    <Linkedin className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">LinkedIn</h4>
                  <p className="text-xs font-semibold text-blue-600">View Profile</p>
                </a>
              )}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-emerald-200/40 flex flex-col items-center justify-center min-h-[140px]">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-md mb-3">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">Available</h4>
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
          <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-emerald-200/30">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-2xl shadow-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              About Me
            </h2>
            <p className="text-sm sm:text-base text-gray-700/90 leading-relaxed text-center">{personalInfo.bio}</p>
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
