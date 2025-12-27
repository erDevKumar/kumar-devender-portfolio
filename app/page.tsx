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
      <main className="min-h-screen bg-gradient-to-br from-tech-950 via-tech-900 to-tech-950 antialiased relative overflow-hidden">
        <div className="fixed inset-0 tech-grid opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.1),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(124,58,237,0.08),transparent_50%)] pointer-events-none"></div>
        <div className="relative z-10">
          <Navigation />
          <Hero personalInfo={portfolioData.personalInfo} socialLinks={portfolioData.socialLinks} />
          <ExperienceProjects experience={portfolioData.experience} projects={portfolioData.projects} />
          <EducationSkills education={portfolioData.education} skills={portfolioData.skills} />
          <Footer />
        </div>
      </main>
    </Loader>
  );
}
