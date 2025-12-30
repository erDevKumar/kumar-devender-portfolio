'use client';

import { Education } from '@/types/portfolio';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import ScrollAnimated from './ScrollAnimated';
import Card from './Card';
import MetaBadge from './MetaBadge';

interface EducationItemProps {
  edu: Education;
  index: number;
}

export default function EducationItem({ edu, index }: EducationItemProps) {
  return (
    <ScrollAnimated index={index}>
      <Card gradient="indigo">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex items-start gap-3 sm:gap-5">
            <div className="flex-shrink-0">
              <div className="relative p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-indigo-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                  <Award className="h-1.5 w-1.5 sm:h-2 sm:w-2 lg:h-2.5 lg:w-2.5 text-white" />
                </div>
              </div>
            </div>

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
                <h5 className="text-base sm:text-lg font-semibold text-gray-200 break-words">
                  {edu.institution}
                </h5>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <MetaBadge icon={Calendar} text={edu.duration} iconColor="text-indigo-400" />
                {edu.location && <MetaBadge icon={MapPin} text={edu.location} iconColor="text-purple-400" />}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </ScrollAnimated>
  );
}
