import { Linkedin, Github, Twitter, Mail, ExternalLink } from 'lucide-react';
import { SocialLink } from '@/types/portfolio';

interface SocialLinksProps {
  socialLinks: SocialLink[];
  email?: string;
  size?: 'sm' | 'md' | 'lg';
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: Linkedin,
  Github: Github,
  GitHub: Github,
  Twitter: Twitter,
  Email: Mail,
};

const sizeClasses = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };

export default function SocialLinks({ socialLinks, email, size = 'md' }: SocialLinksProps) {
  const allLinks = [...socialLinks, ...(email ? [{ platform: 'Email', url: `mailto:${email}` }] : [])];

  return (
    <div className="flex items-center gap-4">
      {allLinks.map((link) => {
        const Icon = iconMap[link.platform] || ExternalLink;
        return (
          <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className={`text-gray-600 hover:text-primary-600 transition-colors ${sizeClasses[size]}`} aria-label={link.platform}>
            <Icon className={`${sizeClasses[size]} transition-transform hover:scale-110`} />
          </a>
        );
      })}
    </div>
  );
}

