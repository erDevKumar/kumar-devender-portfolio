'use client';

import { WorkExperience } from '@/types/portfolio';
import { Briefcase } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useAnimatedGradient } from '@/hooks/useAnimatedGradient';
import AnimatedBackground from '@/components/AnimatedBackground';
import ExperienceItem from './ExperienceItem';

interface ExperienceProps {
  experience: WorkExperience[];
}

export default function Experience({ experience }: ExperienceProps) {
  const { ref, isVisible } = useScrollAnimation();
  const { time, getGradient } = useAnimatedGradient(120, 10);

  return (
    <section id="experience" ref={ref} className="section-padding relative overflow-hidden" style={{ background: getGradient(120, 80, 100) }}>
      <AnimatedBackground time={time} hue={(time * 10 + 120) % 360} />
      <div className="max-w-7xl mx-auto container-padding relative z-10">
        <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 flex items-center justify-center gap-4">
            <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-4 rounded-3xl shadow-2xl">
              <Briefcase className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
            <span className="gradient-text">Work Experience</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto text-balance">Professional journey and achievements</p>
        </div>
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <ExperienceItem key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

