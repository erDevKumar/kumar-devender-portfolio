'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ExperienceProjects from '@/components/ExperienceProjects';
import EducationSkills from '@/components/EducationSkills';
import Loader from '@/components/Loader';
import ScrollProgress from '@/components/ScrollProgress';
import { portfolioData } from '@/data/portfolio';

export default function Home() {
  return (
    <Loader>
      <ScrollProgress />
      <main className="min-h-screen bg-[#111827] antialiased relative">
        {/* Subtle background patterns */}
        <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Gradient overlays for depth */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-950/15 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-purple-950/15 to-transparent"></div>
        </div>

        <div className="relative z-10">
          <Navigation />
          <Hero 
            personalInfo={portfolioData.personalInfo} 
            socialLinks={portfolioData.socialLinks}
            experience={portfolioData.experience}
            projects={portfolioData.projects}
          />
          <ExperienceProjects experience={portfolioData.experience} projects={portfolioData.projects} />
          <EducationSkills education={portfolioData.education} skills={portfolioData.skills} />
          <Footer />
        </div>
      </main>
    </Loader>
  );
}
