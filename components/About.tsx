import { PersonalInfo } from '@/types/portfolio';
import { MapPin, Mail, Phone } from 'lucide-react';

interface AboutProps {
  personalInfo: PersonalInfo;
}

export default function About({ personalInfo }: AboutProps) {
  return (
    <section id="about" className="py-12 bg-gradient-to-br from-white/80 via-white/60 to-white/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          About Me
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left side - Bio */}
          <div className="animate-slide-in-left">
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700/80 text-sm leading-relaxed">
                {personalInfo.bio}
              </p>
            </div>
          </div>
          {/* Right side - Contact Info */}
          <div className="animate-slide-in-right">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-primary-50/60 to-primary-100/60 backdrop-blur-sm p-3 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-105 border border-gray-200/50">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="bg-primary-600/70 p-1.5 rounded-lg">
                    <MapPin className="h-3.5 w-3.5 text-white" />
                  </div>
                  <h3 className="text-xs font-semibold text-gray-900">Location</h3>
                </div>
                <p className="text-xs text-gray-700/80">{personalInfo.location}</p>
              </div>
              {personalInfo.email && (
                <div className="bg-gradient-to-br from-blue-50/60 to-blue-100/60 backdrop-blur-sm p-3 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-105 border border-gray-200/50">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="bg-blue-600/70 p-1.5 rounded-lg">
                      <Mail className="h-3.5 w-3.5 text-white" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900">Email</h3>
                  </div>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-primary-600/80 hover:text-primary-700/80 transition-colors text-xs break-all"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              )}
              {personalInfo.phone && (
                <div className="bg-gradient-to-br from-green-50/60 to-green-100/60 backdrop-blur-sm p-3 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-105 border border-gray-200/50 sm:col-span-2">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="bg-green-600/70 p-1.5 rounded-lg">
                      <Phone className="h-3.5 w-3.5 text-white" />
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900">Phone</h3>
                  </div>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="text-primary-600/80 hover:text-primary-700/80 transition-colors text-xs"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
