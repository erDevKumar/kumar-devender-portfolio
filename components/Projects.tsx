'use client';

import { Project } from '@/types/portfolio';
import { Code } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useAnimatedGradient } from '@/hooks/useAnimatedGradient';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProjectItem from './ProjectItem';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const { ref, isVisible } = useScrollAnimation();
  const { time, getGradient } = useAnimatedGradient(120, 10);

  return (
    <section id="projects" ref={ref} className="py-16 relative overflow-hidden" style={{ background: getGradient(120, 80, 100) }}>
      <AnimatedBackground time={time} hue={(time * 10 + 120) % 360} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`mb-12 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 flex items-center justify-center gap-4">
            <div className="bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-500 p-3 rounded-3xl shadow-2xl">
              <Code className="h-8 w-8 text-white" />
            </div>
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-600 text-lg">Showcasing innovation and technical expertise</p>
        </div>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <ProjectItem key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

