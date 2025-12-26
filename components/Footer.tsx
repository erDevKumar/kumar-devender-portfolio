import { portfolioData } from '@/data/portfolio';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 md:py-16 border-t border-emerald-500/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-6">
          <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 mx-auto rounded-full mb-6 shadow-glow"></div>
          <p className="text-gray-200 text-lg md:text-xl font-semibold mb-2">
            © {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights reserved.
          </p>
        </div>
        <p className="text-gray-400 text-sm md:text-base">Built with passion and attention to detail</p>
      </div>
    </footer>
  );
}

