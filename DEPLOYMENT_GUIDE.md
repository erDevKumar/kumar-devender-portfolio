# Firebase Hosting Deployment Guide

## Prerequisites Checklist

### Step 1: Fix npm Cache Permission (if needed)
If you see permission errors, run this in your terminal:
```bash
sudo chown -R $(whoami) ~/.npm
```

### Step 2: Install Firebase CLI
Choose one of these methods:

**Option A: Global Installation (Recommended)**
```bash
npm install -g firebase-tools
```

**Option B: Local Installation (if global fails)**
```bash
npm install --save-dev firebase-tools
# Then use: npx firebase-tools <command>
```

**Option C: Using Homebrew (macOS)**
```bash
brew install firebase-cli
```

### Step 3: Verify Installation
```bash
firebase --version
```
You should see a version number (e.g., `13.0.0`)

---

## Deployment Steps

### Step 1: Login to Firebase
```bash
firebase login
```
This will open a browser window for you to authenticate with your Google account.

### Step 2: Initialize Firebase Project

**If you already have a Firebase project:**
```bash
firebase use --add
```
Select your existing project from the list.

**If you need to create a new Firebase project:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard
4. Enable "Hosting" when prompted
5. Then run:
```bash
firebase init hosting
```
When prompted:
- **What do you want to use as your public directory?** → Type: `out`
- **Configure as a single-page app?** → Type: `Yes`
- **Set up automatic builds and deploys with GitHub?** → Type: `No` (unless you want CI/CD)
- **File out/index.html already exists. Overwrite?** → Type: `No`

### Step 3: Verify Build Output
Make sure your build is up to date:
```bash
npm run build
```

Verify the `out/` directory contains:
- `index.html`
- `404.html`
- `_next/` folder (with all static assets)
- `logos/` folder (with all company logos)
- `profile.jpg`

### Step 4: Deploy to Firebase Hosting
```bash
firebase deploy --only hosting
```

### Step 5: Get Your Live URL
After deployment, Firebase will provide you with a URL like:
```
https://your-project-id.web.app
```
or
```
https://your-project-id.firebaseapp.com
```

---

## Troubleshooting

### Issue: "Firebase CLI not found"
**Solution:** Make sure Firebase CLI is installed and in your PATH. Try:
```bash
which firebase
```
If nothing shows, reinstall Firebase CLI.

### Issue: "Permission denied" during npm install
**Solution:** Fix npm cache permissions:
```bash
sudo chown -R $(whoami) ~/.npm
```

### Issue: "No Firebase project found"
**Solution:** 
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Run `firebase init hosting` again

### Issue: "Build failed"
**Solution:**
1. Make sure all dependencies are installed: `npm install`
2. Try cleaning the build: `rm -rf .next out`
3. Rebuild: `npm run build`

### Issue: "Deployment failed"
**Solution:**
1. Check that `out/` directory exists and has content
2. Verify `firebase.json` has `"public": "out"`
3. Make sure you're logged in: `firebase login`
4. Check your Firebase project is selected: `firebase use`

---

## Quick Reference Commands

```bash
# Check Firebase CLI version
firebase --version

# Login to Firebase
firebase login

# List all Firebase projects
firebase projects:list

# Select/switch Firebase project
firebase use <project-id>

# Initialize Firebase (if not done)
firebase init hosting

# Build the project
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy with preview channel (for testing)
firebase hosting:channel:deploy preview

# View deployment history
firebase hosting:clone <site-id>
```

---

## Post-Deployment

### Custom Domain (Optional)
1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the DNS configuration steps

### Update Site Settings
1. Go to Firebase Console → Hosting
2. Configure redirects, headers, or rewrites if needed

---

## Your Current Configuration

✅ **firebase.json** is already configured with:
- Public directory: `out`
- Rewrites: All routes → `/index.html` (for SPA routing)

✅ **next.config.js** is configured for static export

✅ **Build output** is ready in `out/` directory

---

## Next Steps

1. **Install Firebase CLI** (if not already installed)
2. **Login**: `firebase login`
3. **Initialize**: `firebase init hosting` (or link existing project)
4. **Deploy**: `firebase deploy --only hosting`

Once deployed, your portfolio will be live on Firebase Hosting! 🚀


