import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Loader from '@/components/Loader';
import { portfolioData } from '@/data/portfolio';

export default function Home() {
  return (
    <Loader>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
        <Navigation />
        <Hero personalInfo={portfolioData.personalInfo} socialLinks={portfolioData.socialLinks} />
        <Experience experience={portfolioData.experience} />
        <Projects projects={portfolioData.projects} />
        <Education education={portfolioData.education} />
        <Skills skills={portfolioData.skills} />
        <Footer />
      </main>
    </Loader>
  );
}
