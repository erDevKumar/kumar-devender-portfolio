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
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 antialiased">
        <Navigation />
        <Hero personalInfo={portfolioData.personalInfo} socialLinks={portfolioData.socialLinks} />
        <ExperienceProjects experience={portfolioData.experience} projects={portfolioData.projects} />
        <EducationSkills education={portfolioData.education} skills={portfolioData.skills} />
        <Footer />
      </main>
    </Loader>
  );
}
