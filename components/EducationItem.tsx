'use client';

import { Education } from '@/types/portfolio';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { useItemScrollAnimation } from '@/hooks/useItemScrollAnimation';

interface EducationItemProps {
  edu: Education;
  index: number;
}

export default function EducationItem({ edu, index }: EducationItemProps) {
  const { ref, isVisible } = useItemScrollAnimation(index, 0);

  return (
    <div ref={ref} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/10">
        {/* Gradient Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        {/* Content */}
        <div className="p-6 lg:p-8">
          <div className="flex items-start gap-5">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-7 w-7 text-indigo-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                  <Award className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="mb-4">
                <h4 className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {edu.degree}
                </h4>
                {edu.field && (
                  <p className="text-base font-medium text-gray-300 mb-1">
                    {edu.field}
                  </p>
                )}
                <h5 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                  <span>{edu.institution}</span>
                </h5>
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-700/50 border border-gray-600/50">
                  <Calendar className="h-4 w-4 text-indigo-400" />
                  <span className="text-gray-200 font-medium text-sm">{edu.duration}</span>
                </div>
                {edu.location && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-700/50 border border-gray-600/50">
                    <MapPin className="h-4 w-4 text-purple-400" />
                    <span className="text-gray-200 font-medium text-sm">{edu.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
