import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import { portfolioData } from '@/data/portfolio';

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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: portfolioData.personalInfo.profileImage || '/profile.jpg',
    shortcut: portfolioData.personalInfo.profileImage || '/profile.jpg',
    apple: portfolioData.personalInfo.profileImage || '/profile.jpg',
  },
  openGraph: {
    title: `${portfolioData.personalInfo.name} - Portfolio`,
    description: portfolioData.personalInfo.bio,
    type: 'website',
    url: 'https://yourportfolio.com',
    images: portfolioData.personalInfo.profileImage ? [portfolioData.personalInfo.profileImage] : [],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${portfolioData.personalInfo.name} - Portfolio`,
    description: portfolioData.personalInfo.bio,
    images: portfolioData.personalInfo.profileImage ? [portfolioData.personalInfo.profileImage] : [],
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
      <body className="antialiased">{children}</body>
    </html>
  );
}

