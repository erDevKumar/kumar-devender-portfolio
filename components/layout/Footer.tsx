import { portfolioData } from '@/data/portfolio';

export default function Footer() {
  return (
    <footer className="bg-gray-900/90 backdrop-blur-sm text-white py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

