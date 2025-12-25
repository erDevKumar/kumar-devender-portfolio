import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ExperienceAndProjects from '@/components/ExperienceAndProjects';
import EducationAndSkills from '@/components/EducationAndSkills';
import { portfolioData } from '@/data/portfolio';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <Navigation />
      <Hero
        personalInfo={portfolioData.personalInfo}
        socialLinks={portfolioData.socialLinks}
        stats={{
          experience: portfolioData.experience.length,
          projects: portfolioData.projects.length,
          skills: portfolioData.skills.length,
        }}
      />
      <ExperienceAndProjects 
        experience={portfolioData.experience} 
        projects={portfolioData.projects}
      />
      <EducationAndSkills 
        education={portfolioData.education} 
        skills={portfolioData.skills}
      />
      <footer className="bg-gray-900/90 backdrop-blur-sm text-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

