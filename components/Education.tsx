'use client';

import { Education as EducationType } from '@/types/portfolio';
import { GraduationCap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useAnimatedGradient } from '@/hooks/useAnimatedGradient';
import AnimatedBackground from '@/components/AnimatedBackground';
import EducationItem from './EducationItem';

interface EducationProps {
  education: EducationType[];
}

export default function Education({ education }: EducationProps) {
  const { ref, isVisible } = useScrollAnimation();
  const { time, getGradient } = useAnimatedGradient(160, 10);

  return (
    <section id="education" ref={ref} className="py-16 relative overflow-hidden" style={{ background: getGradient(160, 200, 140) }}>
      <AnimatedBackground time={time} hue={(time * 10 + 160) % 360} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`mb-12 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 flex items-center justify-center gap-4">
            <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-3 rounded-3xl shadow-2xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-gray-600 text-lg">Academic background and qualifications</p>
        </div>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <EducationItem key={index} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  );
}

