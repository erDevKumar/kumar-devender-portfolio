'use client';

import { WorkExperience } from '@/types/portfolio';
import { Calendar, MapPin, Briefcase, ExternalLink } from 'lucide-react';
import Collapsible from '@/components/Collapsible';
import CompanyLogo from '@/components/CompanyLogo';
import { useExpandable } from '@/hooks/useExpandable';

interface ExperienceItemProps {
  exp: WorkExperience;
  index: number;
}

export default function ExperienceItem({ exp, index }: ExperienceItemProps) {
  const { isExpanded, toggle } = useExpandable<number>();

  return (
    <Collapsible
      isExpanded={isExpanded(index)}
      onToggle={() => toggle(index)}
      className="hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
      header={
        <div className="flex items-start gap-3 flex-1">
          <CompanyLogo
            logo={exp.companyInfo?.logo}
            companyName={exp.company}
            size="md"
            className="flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-4 w-4 text-emerald-600" />
              <h4 className="text-lg font-bold text-gray-900">{exp.role}</h4>
            </div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h5 className="text-base font-semibold gradient-text">{exp.company}</h5>
              {exp.companyInfo?.website && (
                <a href={exp.companyInfo.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:scale-110 transition-transform">
                  <ExternalLink className="h-4 w-4 text-emerald-600 hover:text-emerald-700" />
                </a>
              )}
              {exp.current && <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border border-green-200/50 shadow-sm">Current</span>}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
              <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                <span className="font-medium">{exp.duration}</span>
              </div>
              {exp.location && (
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="font-medium">{exp.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    >
      {exp.companyInfo?.description && (
        <p className="text-sm text-gray-700/90 mb-4 italic border-l-4 border-emerald-400/60 pl-4 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 py-2 rounded-r-lg">
          {exp.companyInfo.description}
        </p>
      )}
      <ul className="list-disc list-inside space-y-2 text-sm text-gray-700/90 ml-2">
        {exp.description.map((item, idx) => (
          <li key={idx} className="leading-relaxed">{item}</li>
        ))}
      </ul>
    </Collapsible>
  );
}

