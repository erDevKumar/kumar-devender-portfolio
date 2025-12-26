'use client';

import { Education } from '@/types/portfolio';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

interface EducationItemProps {
  edu: Education;
}

export default function EducationItem({ edu }: EducationItemProps) {
  return (
    <div className="glass-card rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 border border-emerald-200/50 shadow-xl hover:-translate-y-1">
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-4 rounded-3xl shadow-xl">
          <GraduationCap className="h-7 w-7 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {edu.degree}
            {edu.field && <span className="text-gray-600 font-normal"> in {edu.field}</span>}
          </h4>
          <h5 className="text-lg font-semibold gradient-text mb-3">{edu.institution}</h5>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 rounded-full border border-emerald-200/50 shadow-sm">
          <Calendar className="h-4 w-4 text-emerald-600" />
          <span className="font-semibold text-gray-700">{edu.duration}</span>
        </div>
        {edu.location && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-2 rounded-full border border-teal-200/50 shadow-sm">
            <MapPin className="h-4 w-4 text-teal-600" />
            <span className="font-semibold text-gray-700">{edu.location}</span>
          </div>
        )}
      </div>
    </div>
  );
}

