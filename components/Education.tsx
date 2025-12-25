'use client';

import { Education as EducationType } from '@/types/portfolio';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface EducationProps {
  education: EducationType[];
}

export default function Education({ education }: EducationProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      id="education" 
      ref={ref}
      className="py-12 bg-gradient-to-br from-slate-50/80 via-gray-50/60 to-zinc-50/80 relative overflow-hidden"
    >
      {/* Unified theme background pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className={`text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Education
        </h2>
        <div className="space-y-3">
          {education.map((edu, index) => (
            <div
              key={index}
              className={`bg-white/70 backdrop-blur-sm rounded-lg shadow-sm p-4 md:p-5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 border border-primary-200/50 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="bg-primary-100/60 p-2 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-primary-600/70 flex-shrink-0" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </h3>
                  <h4 className="text-sm font-semibold text-primary-600/80 mb-2">
                    {edu.institution}
                  </h4>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600/80">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{edu.duration}</span>
                </div>
                {edu.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{edu.location}</span>
                  </div>
                )}
              </div>
              {edu.description && (
                <p className="text-xs text-gray-700/80 mt-2">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
