import { portfolioData } from '@/data/portfolio';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-tech-950 via-tech-900 to-tech-950 text-white py-12 md:py-16 border-t border-cyan-500/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.15),transparent_70%)]"></div>
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-6">
          <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 mx-auto rounded-full mb-6 shadow-glow-cyan"></div>
          <p className="text-gray-200 text-lg md:text-xl font-semibold mb-2">
            © {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights reserved.
          </p>
        </div>
        <p className="text-gray-400 text-sm md:text-base">Built with passion and attention to detail</p>
      </div>
    </footer>
  );
}

