# Portfolio Website

A modern, responsive portfolio website built with Next.js 14+, TypeScript, and Tailwind CSS. This portfolio is designed to showcase your professional information, with a structure that mirrors LinkedIn profile sections.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- 📱 Mobile-first approach
- ⚡ Fast performance with Next.js
- 🔍 SEO optimized
- 🎯 Smooth scrolling navigation
- 💼 LinkedIn-compatible data structure
- 🌐 Social media integration (LinkedIn prioritized)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Update your portfolio data in `data/portfolio.ts` with your information from LinkedIn or other sources.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Updating Portfolio Data

Edit `data/portfolio.ts` to update:
- Personal information (name, title, bio, location, email)
- Work experience
- Education
- Skills
- Projects
- Social media links

### Styling

The website uses Tailwind CSS. You can customize:
- Colors in `tailwind.config.ts`
- Global styles in `app/globals.css`
- Component-specific styles in individual component files

### SEO

Update metadata in `app/layout.tsx`:
- Title and description
- Open Graph tags
- Twitter card information
- Keywords

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page with all sections
│   └── globals.css         # Global styles
├── components/
│   ├── Hero.tsx            # Hero/Introduction section
│   ├── About.tsx           # About me section
│   ├── Experience.tsx      # Work experience timeline
│   ├── Education.tsx       # Education section
│   ├── Skills.tsx          # Skills & technologies
│   ├── Projects.tsx        # Projects portfolio
│   ├── Contact.tsx         # Contact form/section
│   ├── SocialLinks.tsx     # Social media links
│   └── Navigation.tsx      # Navigation header
├── data/
│   └── portfolio.ts        # Portfolio data structure
├── types/
│   └── portfolio.ts        # TypeScript type definitions
└── public/                 # Static assets
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with default settings

### Other Platforms

Build the project:
```bash
npm run build
```

The `out` directory will contain the static export (if configured) or you can deploy the Next.js application to any Node.js hosting platform.

## LinkedIn Integration

To populate your portfolio with LinkedIn data:

1. Visit your LinkedIn profile: https://www.linkedin.com/in/erkumardevender/
2. Manually copy the relevant information to `data/portfolio.ts`
3. Update the social links section with your actual LinkedIn URL and other social media profiles

## License

This project is open source and available for personal use.

