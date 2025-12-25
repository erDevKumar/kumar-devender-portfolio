'use client';

import { WorkExperience } from '@/types/portfolio';
import { Calendar, MapPin, Briefcase, ExternalLink } from 'lucide-react';
import Collapsible from '../common/Collapsible';
import CompanyLogo from '../common/CompanyLogo';
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
            <div className="flex items-center gap-1.5 mb-1">
              <Briefcase className="h-3.5 w-3.5 text-emerald-600/70" />
              <h4 className="text-base font-bold text-gray-900">{exp.role}</h4>
            </div>
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <h5 className="text-sm font-semibold text-emerald-600/80">{exp.company}</h5>
              {exp.companyInfo?.website && (
                <a href={exp.companyInfo.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  <ExternalLink className="h-3 w-3 text-emerald-600/70 hover:text-emerald-700" />
                </a>
              )}
              {exp.current && <span className="bg-green-100/80 text-green-800 text-xs font-semibold px-1.5 py-0.5 rounded-full">Current</span>}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600/80 flex-wrap">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{exp.duration}</span>
              </div>
              {exp.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{exp.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    >
      {exp.companyInfo?.description && (
        <p className="text-xs text-gray-600/80 mb-2 italic border-l-2 border-emerald-200/50 pl-2 bg-emerald-50/50 py-1 rounded-r">
          {exp.companyInfo.description}
        </p>
      )}
      <ul className="list-disc list-inside space-y-1 text-xs text-gray-700/80">
        {exp.description.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </Collapsible>
  );
}

