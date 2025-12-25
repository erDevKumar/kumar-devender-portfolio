'use client';

import { WorkExperience } from '@/types/portfolio';
import { Calendar, MapPin, Briefcase, Building2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ExperienceProps {
  experience: WorkExperience[];
}

export default function Experience({ experience }: ExperienceProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set()); // All collapsed by default
  const { ref, isVisible } = useScrollAnimation();

  const toggleExpand = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section 
      id="experience" 
      ref={ref}
      className="py-12 bg-gradient-to-br from-blue-50/60 via-indigo-50/50 to-purple-50/60 relative overflow-hidden"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className={`text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Work Experience
        </h2>
        <div className="space-y-3">
          {experience.map((exp, index) => {
            const isExpanded = expandedItems.has(index);
            return (
              <div
                key={index}
                className={`bg-white/70 backdrop-blur-sm rounded-lg shadow-sm p-3 md:p-4 hover:shadow-md hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-0.5 border border-blue-200/50 group cursor-pointer transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  {/* Company Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-white/80 border border-blue-200/70 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                      {exp.companyInfo?.logo ? (
                        <img
                          src={exp.companyInfo.logo}
                          alt={`${exp.company} logo`}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const container = target.parentElement;
                            if (container && !container.querySelector('.company-initial')) {
                              const fallback = document.createElement('div');
                              fallback.className = 'company-initial text-blue-600/80 font-bold text-base sm:text-lg';
                              fallback.textContent = exp.company.charAt(0);
                              container.appendChild(fallback);
                            }
                          }}
                        />
                      ) : (
                        <div className="text-blue-600/80 font-bold text-base sm:text-lg">
                          {exp.company.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Briefcase className="h-3.5 w-3.5 text-blue-600/70 flex-shrink-0" />
                          <h3 className="text-base font-bold text-gray-900 truncate">{exp.role}</h3>
                        </div>
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <h4 className="text-sm font-semibold text-blue-600/80">
                            {exp.company}
                          </h4>
                          {exp.companyInfo?.website && (
                            <a
                              href={exp.companyInfo.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-blue-600/70 hover:text-blue-700 transition-all transform hover:scale-125"
                              aria-label={`Visit ${exp.company} website`}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          {exp.current && (
                            <span className="bg-green-100/80 text-green-800 text-xs font-semibold px-1.5 py-0.5 rounded-full animate-pulse">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600/80 flex-wrap">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{exp.duration}</span>
                          </div>
                          {exp.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{exp.location}</span>
                            </div>
                          )}
                          {exp.companyInfo?.industry && (
                            <div className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              <span className="truncate">{exp.companyInfo.industry}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(index);
                        }}
                        className="flex-shrink-0 text-blue-600/70 hover:text-blue-700 transition-all transform hover:scale-110 flex items-center gap-1"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            <span className="text-xs">Less</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            <span className="text-xs">More</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Collapsible Content with proper height */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        {exp.companyInfo?.description && (
                          <p className="text-xs text-gray-600/80 mb-2 italic border-l-2 border-blue-200/50 pl-2 bg-blue-50/50 py-1 rounded-r">
                            {exp.companyInfo.description}
                          </p>
                        )}
                        
                        {exp.description.length > 0 && (
                          <ul className="list-disc list-inside space-y-1 text-xs text-gray-700/80 pl-1">
                            {exp.description.map((item, idx) => (
                              <li key={idx} className="hover:text-blue-600/80 transition-colors duration-200">
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
