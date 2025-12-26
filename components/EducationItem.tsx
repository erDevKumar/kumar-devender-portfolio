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
      <div className="glass-card rounded-3xl p-6 md:p-8 hover:shadow-soft-lg transition-all duration-500 border border-emerald-200/40 shadow-soft-lg card-hover focus-visible-ring">
      <div className="flex items-start gap-5 mb-6">
        <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-4 rounded-3xl shadow-xl flex-shrink-0">
          <GraduationCap className="h-7 w-7 md:h-8 md:w-8 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
            {edu.degree}
            {edu.field && <span className="text-gray-600 font-normal"> in {edu.field}</span>}
          </h4>
          <h5 className="text-lg md:text-xl font-semibold gradient-text mb-4">{edu.institution}</h5>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
        <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2.5 rounded-full border border-emerald-200/50 shadow-soft">
          <Calendar className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" />
          <span className="font-semibold text-gray-700">{edu.duration}</span>
        </div>
        {edu.location && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-2.5 rounded-full border border-teal-200/50 shadow-soft">
            <MapPin className="h-4 w-4 md:h-5 md:w-5 text-teal-600" />
            <span className="font-semibold text-gray-700">{edu.location}</span>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

