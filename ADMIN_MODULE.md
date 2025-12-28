# Admin Module Documentation

## Overview

The admin module provides a comprehensive interface to manage all content and design elements of your portfolio website.

## Access

- **URL**: `http://erkumardevender.web.app/admin` (or `http://localhost:3000/admin` in development)
- **Default Password**: `admin123` (Change this in production!)

## Features

### 1. Authentication
- Simple password-based authentication
- Session stored in localStorage
- Default password: `admin123`
- **Important**: Change the password in `app/admin/login/page.tsx` or use environment variables

### 2. Dashboard
- Overview of all portfolio sections
- Quick statistics
- Quick access to all management pages

### 3. Content Management

#### Personal Information (`/admin/personal-info`)
- Edit name, title, location, bio
- Update email and phone
- Upload profile image

#### Work Experience (`/admin/experience`)
- Add, edit, delete work experience entries
- Manage company information
- Upload company logos
- Add multiple description points

#### Education (`/admin/education`)
- Add, edit, delete education entries
- Manage institution, degree, field, dates

#### Skills (`/admin/skills`)
- Add, edit, delete skills
- Categorize skills (technical, soft, language, tool)
- Set proficiency levels

#### Projects (`/admin/projects`)
- Add, edit, delete projects
- Upload project images
- Manage technologies list
- Add project links (GitHub, Live, Demo)

#### Social Links (`/admin/social-links`)
- Add, edit, delete social media links
- Manage platform names and URLs

### 4. Design Customization (`/admin/design`)
- Customize primary, secondary, and accent colors
- Change background and text colors
- Select font family
- Live preview of changes

## API Routes

### `/api/portfolio`
- **GET**: Retrieve current portfolio data
- **POST**: Update portfolio data (saves to `data/portfolio.json`)

### `/api/upload`
- **POST**: Upload images (profile, logos, project images)
- Saves to `public/` directory in appropriate folders

## Data Storage

- Portfolio data is stored in `data/portfolio.json`
- Falls back to `data/portfolio.ts` if JSON doesn't exist
- Images are stored in `public/` directory:
  - Profile images: `public/profile/`
  - Company logos: `public/logos/`
  - Project images: `public/projects/`

## Important Notes

### Deployment Considerations

1. **Static Export Disabled**: The admin module requires API routes, so static export is disabled in `next.config.js`. You'll need to:
   - Deploy to a platform that supports Next.js API routes (Vercel, Netlify, etc.)
   - Or use Firebase Functions for API routes
   - Or deploy the admin separately from the main site

2. **Password Security**: 
   - Change the default password in production
   - Consider using environment variables: `NEXT_PUBLIC_ADMIN_PASSWORD`
   - Or implement proper authentication (Firebase Auth, NextAuth, etc.)

3. **File Permissions**: 
   - Ensure the server has write permissions to `data/` and `public/` directories
   - For production, consider using a database instead of file storage

4. **Data Backup**: 
   - The `data/portfolio.json` file is created/updated by the admin
   - Consider backing up this file regularly
   - You may want to track it in git or exclude it (see `.gitignore`)

## Usage

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000/admin`
3. Login with default password: `admin123`
4. Use the sidebar to navigate to different sections
5. Make your changes and click "Save Changes"
6. Rebuild and redeploy your site to see changes live

## Troubleshooting

- **API routes not working**: Make sure static export is disabled in `next.config.js`
- **File upload fails**: Check write permissions on `public/` directory
- **Data not saving**: Check write permissions on `data/` directory
- **Authentication issues**: Clear localStorage and try logging in again

