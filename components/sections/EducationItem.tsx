'use client';

import { Education } from '@/types/portfolio';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

interface EducationItemProps {
  edu: Education;
}

export default function EducationItem({ edu }: EducationItemProps) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-5 hover:shadow-2xl transition-all duration-500 border border-emerald-200/30">
      <div className="flex items-start gap-4 mb-3">
        <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-2xl shadow-md">
          <GraduationCap className="h-6 w-6 text-emerald-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-900 mb-1">
            {edu.degree}
            {edu.field && <span className="text-gray-600"> in {edu.field}</span>}
          </h4>
          <h5 className="text-base font-semibold text-emerald-600 mb-2">{edu.institution}</h5>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600/80">
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
          <Calendar className="h-4 w-4 text-emerald-600" />
          <span className="font-medium">{edu.duration}</span>
        </div>
        {edu.location && (
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
            <MapPin className="h-4 w-4 text-emerald-600" />
            <span className="font-medium">{edu.location}</span>
          </div>
        )}
      </div>
    </div>
  );
}

