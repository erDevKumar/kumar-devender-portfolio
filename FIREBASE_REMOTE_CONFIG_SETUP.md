# Firebase Remote Config Setup for Admin Password

## Overview

The admin panel now uses Firebase Remote Config to store the admin password. This allows you to update the password without redeploying your application.

## Setup Instructions

### Step 1: Install Firebase Admin SDK

The package is already being installed. If needed, run:
```bash
npm install firebase-admin
```

### Step 2: Set Up Firebase Service Account

You have two options:

#### Option A: Service Account Key (Recommended for local development)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `erkumardevender`
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Download the JSON file
6. Add to `.env.local`:
```env
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}'
```
   (Copy the entire JSON content as a single-line string)

#### Option B: Application Default Credentials (For Firebase Hosting/Functions)

If deploying to Firebase, you can use Application Default Credentials:
```bash
gcloud auth application-default login
```

Or set in `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_PROJECT_ID=erkumardevender
```

### Step 3: Configure Remote Config in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `erkumardevender`
3. Navigate to **Remote Config** (in the left sidebar)
4. Click **Add parameter**
5. Set:
   - **Parameter key**: `admin_password`
   - **Default value**: Your admin password
   - **Description**: Admin panel password
6. Click **Save**
7. Click **Publish changes**

### Step 4: Set JWT Secret (Still needed)

Add to `.env.local`:
```env
JWT_SECRET=your-random-secret-key-here
```

Generate one:
```bash
openssl rand -base64 32
```

## Security Notes

✅ **Password stored in Firebase Remote Config** - Not in code or environment variables  
✅ **Server-side verification** - Password check happens on server  
✅ **Can be updated without redeployment** - Change password in Firebase Console  
✅ **Secure by default** - Remote Config values are server-side only  

## Updating the Password

1. Go to Firebase Console → Remote Config
2. Edit the `admin_password` parameter
3. Set new value
4. Click **Publish changes**
5. Password is updated immediately (no redeployment needed)

## Troubleshooting

- **"Authentication not configured"**: Make sure `admin_password` is set in Firebase Remote Config
- **"Firebase Admin SDK not properly configured"**: Check your service account credentials
- **Connection errors**: Verify your Firebase project ID is correct

