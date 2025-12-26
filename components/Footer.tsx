import { portfolioData } from '@/data/portfolio';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-10 border-t border-emerald-500/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4">
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-300 text-lg font-medium">
            © {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights reserved.
          </p>
        </div>
        <p className="text-gray-400 text-sm">Built with passion and attention to detail</p>
      </div>
    </footer>
  );
}

