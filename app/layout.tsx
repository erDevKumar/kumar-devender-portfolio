import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { portfolioData } from '@/data/portfolio';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${portfolioData.personalInfo.name} - ${portfolioData.personalInfo.title}`,
  description: portfolioData.personalInfo.bio,
  keywords: [
    'portfolio',
    'software engineer',
    'developer',
    portfolioData.personalInfo.name,
    ...portfolioData.skills
      .filter((s) => s.category === 'technical')
      .map((s) => s.name),
  ].join(', '),
  authors: [{ name: portfolioData.personalInfo.name }],
  openGraph: {
    title: `${portfolioData.personalInfo.name} - Portfolio`,
    description: portfolioData.personalInfo.bio,
    type: 'website',
    url: 'https://yourportfolio.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${portfolioData.personalInfo.name} - Portfolio`,
    description: portfolioData.personalInfo.bio,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

