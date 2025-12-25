import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import { portfolioData } from '@/data/portfolio';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <Navigation />
      <Hero personalInfo={portfolioData.personalInfo} socialLinks={portfolioData.socialLinks} />
      <Experience experience={portfolioData.experience} />
      <Projects projects={portfolioData.projects} />
      <Education education={portfolioData.education} />
      <Skills skills={portfolioData.skills} />
      <Footer />
    </main>
  );
}
