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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center mb-12">
          <div className="flex justify-center lg:justify-end">
            {personalInfo.profileImage && (
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden ring-4 ring-emerald-200/50 shadow-2xl bg-gray-100/80 flex items-center justify-center hover:scale-105 transition-all duration-500">
                <img src={personalInfo.profileImage} alt={`${personalInfo.name} - Profile`} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-teal-700 to-green-700">
              {personalInfo.name}
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl text-emerald-700/90 mb-6 font-medium">{personalInfo.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-emerald-200/40">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-md mb-3">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-base font-bold text-gray-900 mb-2">Email</h4>
                    <p className="text-sm font-semibold text-emerald-600 break-all">{personalInfo.email}</p>
                  </div>
                </a>
              )}
              {personalInfo.phone && (
                <a href={`tel:${personalInfo.phone}`} className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-emerald-200/40">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-3 rounded-2xl shadow-md mb-3">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-base font-bold text-gray-900 mb-2">Phone</h4>
                    <p className="text-sm font-semibold text-teal-600">{personalInfo.phone}</p>
                  </div>
                </a>
              )}
              {linkedInUrl && (
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-emerald-200/40">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-md mb-3">
                      <Linkedin className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-base font-bold text-gray-900 mb-2">LinkedIn</h4>
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
                  <p className="text-sm font-semibold text-emerald-600">New Opportunities</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-start mb-6">
              <SocialLinks socialLinks={socialLinks} email={personalInfo.email} size="lg" />
            </div>
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl p-6 mb-6 border border-emerald-200/30">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-2xl shadow-lg">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            About Me
          </h2>
          <p className="text-sm sm:text-base text-gray-700/90 leading-relaxed">{personalInfo.bio}</p>
        </div>
        <div className="flex justify-center mt-8 animate-bounce">
          <a href="#experience" className="inline-block text-emerald-700/80 hover:text-emerald-900 transition-all">
            <ChevronDown className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}

