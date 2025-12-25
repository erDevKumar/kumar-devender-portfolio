import { PersonalInfo } from '@/types/portfolio';
import { Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';

interface ContactProps {
  personalInfo: PersonalInfo;
  socialLinks: Array<{ platform: string; url: string }>;
}

export default function Contact({ personalInfo, socialLinks }: ContactProps) {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
          Get In Touch
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <p className="text-lg text-gray-700 mb-8 text-center">
            I'm always open to discussing new opportunities, interesting projects, or just
            having a chat. Feel free to reach out!
          </p>
          <div className="space-y-6 mb-8">
            {personalInfo.email && (
              <div className="flex items-center gap-4">
                <div className="bg-primary-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-4">
                <div className="bg-primary-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
            )}
            <div className="flex items-center gap-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-900 font-medium">{personalInfo.location}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <SocialLinks socialLinks={socialLinks} email={personalInfo.email} size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

