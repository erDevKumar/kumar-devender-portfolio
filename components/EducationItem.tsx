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
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex items-start gap-3 sm:gap-5">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="relative p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-indigo-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                  <Award className="h-1.5 w-1.5 sm:h-2 sm:w-2 lg:h-2.5 lg:w-2.5 text-white" />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="mb-3 sm:mb-4">
                <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-indigo-400 transition-colors break-words">
                  {edu.degree}
                </h4>
                {edu.field && (
                  <p className="text-sm sm:text-base font-medium text-gray-300 mb-1 break-words">
                    {edu.field}
                  </p>
                )}
                <h5 className="text-base sm:text-lg font-semibold text-gray-200 flex items-center gap-2 break-words">
                  <span>{edu.institution}</span>
                </h5>
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-gray-700/50 border border-gray-600/50">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-200 font-medium whitespace-nowrap">{edu.duration}</span>
                </div>
                {edu.location && (
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-gray-700/50 border border-gray-600/50">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-200 font-medium break-words">{edu.location}</span>
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
