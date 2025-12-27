# Quick Deployment Guide

## ✅ What's Ready

- ✅ Firebase CLI installed (version 13.0.0)
- ✅ Build output ready in `out/` directory
- ✅ `firebase.json` configured correctly
- ✅ Deployment script created (`deploy.sh`)

## 🚀 Deployment Steps

### Step 1: Login to Firebase

Run this command in your terminal:

```bash
cd /Users/erkumardevender/Desktop/kumar_Devender_Portfolio
npx firebase-tools login
```

This will:
1. Open a browser window
2. Ask you to sign in with your Google account
3. Grant permissions to Firebase CLI
4. Complete authentication

**Note:** Make sure you use the Google account that has access to your Firebase project.

---

### Step 2: Initialize Firebase Project (if needed)

**If you already have a Firebase project:**

```bash
npx firebase-tools use --add
```

Select your project from the list.

**If you need to create a new Firebase project:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard
4. Enable "Hosting" when prompted
5. Then run:

```bash
npx firebase-tools init hosting
```

When prompted:
- **What do you want to use as your public directory?** → Type: `out`
- **Configure as a single-page app?** → Type: `Yes`
- **Set up automatic builds and deploys with GitHub?** → Type: `No` (unless you want CI/CD)
- **File out/index.html already exists. Overwrite?** → Type: `No`

---

### Step 3: Deploy

**Option A: Use the deployment script (Recommended)**

```bash
./deploy.sh
```

**Option B: Deploy manually**

```bash
# Make sure build is up to date
npm run build

# Deploy
npx firebase-tools deploy --only hosting
```

---

## 📋 What Happens During Deployment

1. Firebase CLI will upload all files from the `out/` directory
2. Your site will be deployed to Firebase Hosting
3. You'll get a URL like: `https://your-project-id.web.app`

---

## 🔍 Verify Everything is Ready

Run these commands to verify:

```bash
# Check Firebase CLI version
npx firebase-tools --version

# Check if logged in
npx firebase-tools projects:list

# Check build output
ls -la out/

# Check Firebase config
cat firebase.json
```

---

## 🆘 Troubleshooting

### "Failed to authenticate"
→ Run `npx firebase-tools login` again

### "No Firebase project found"
→ Run `npx firebase-tools init hosting` or `npx firebase-tools use --add`

### "Build failed"
→ Run `npm run build` to rebuild

### "Permission denied"
→ Make sure you have write access to the project directory

---

## 📝 Next Steps After Deployment

1. **Get your live URL** - Firebase will show it after deployment
2. **Test your site** - Visit the URL and verify everything works
3. **Custom domain (optional)** - Add your own domain in Firebase Console → Hosting

---

## 🎉 You're All Set!

Once you complete Step 1 (login), you can run `./deploy.sh` and your portfolio will be live!

