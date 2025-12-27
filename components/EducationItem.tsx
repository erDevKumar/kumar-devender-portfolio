'use client';

import { Education } from '@/types/portfolio';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useItemScrollAnimation } from '@/hooks/useItemScrollAnimation';

interface EducationItemProps {
  edu: Education;
  index: number;
}

export default function EducationItem({ edu, index }: EducationItemProps) {
  const { ref, isVisible } = useItemScrollAnimation(index, 0);

  return (
    <div ref={ref} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="glass-card-dark rounded-3xl p-6 md:p-8 hover:shadow-tech-lg transition-all duration-500 border border-cyan-500/30 shadow-tech card-hover code-border focus-visible-ring">
      <div className="flex items-start gap-5 mb-6">
        <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 p-4 rounded-3xl shadow-glow flex-shrink-0">
          <GraduationCap className="h-7 w-7 md:h-8 md:w-8 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xl md:text-2xl font-bold text-gray-100 mb-2 leading-tight">
            {edu.degree}
            {edu.field && <span className="text-gray-300 font-normal"> in {edu.field}</span>}
          </h4>
          <h5 className="text-lg md:text-xl font-semibold gradient-text-tech mb-4">{edu.institution}</h5>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
        <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 py-2.5 rounded-full border border-cyan-500/30 shadow-soft">
          <Calendar className="h-4 w-4 md:h-5 md:w-5 text-cyan-400" />
          <span className="font-semibold text-gray-200">{edu.duration}</span>
        </div>
        {edu.location && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 px-4 py-2.5 rounded-full border border-blue-500/30 shadow-soft">
            <MapPin className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
            <span className="font-semibold text-gray-200">{edu.location}</span>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

