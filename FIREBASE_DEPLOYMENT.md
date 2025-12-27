# Firebase Hosting Deployment Guide

## Root Directory for Firebase Hosting

**The root directory to upload to Firebase is: `out/`**

This directory is generated when you run `npm run build` after configuring Next.js for static export.

## Steps to Deploy

### 1. Build the Project
```bash
npm run build
```

This will create an `out/` directory with all static files ready for Firebase hosting.

### 2. Deploy to Firebase

#### Option A: Using Firebase CLI (Recommended)
```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init hosting

# Deploy
firebase deploy --only hosting
```

#### Option B: Manual Upload
1. Build the project: `npm run build`
2. Upload the contents of the `out/` directory to Firebase Hosting
3. The `out/` folder contains all static files needed

## Important Notes

- **Root Directory**: `out/` (created after `npm run build`)
- **Firebase Config**: Already configured in `firebase.json`
- **Static Export**: Next.js is configured for static export in `next.config.js`
- **Images**: Set to `unoptimized: true` for static export compatibility

## File Structure After Build

```
out/
├── index.html
├── _next/
│   ├── static/
│   └── ...
├── profile.jpg
├── logos/
│   └── ...
└── ... (all other static assets)
```

## Firebase Configuration

The `firebase.json` file is already configured with:
- **Public directory**: `out`
- **Rewrites**: All routes redirect to `/index.html` (for client-side routing)

