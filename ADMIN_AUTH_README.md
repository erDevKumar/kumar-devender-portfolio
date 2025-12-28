# Admin Panel Authentication

## Overview

The admin panel uses **Firebase Remote Config** for password authentication. The password is stored securely in Firebase and can be updated without redeploying the application.

## Setup

### 1. Install Dependencies

```bash
npm install
```

This will install `firebase-admin` which is required for Remote Config access.

### 2. Configure Firebase Remote Config

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `erkumardevender`
3. Navigate to **Remote Config** (in the left sidebar)
4. Click **Add parameter**
5. Set:
   - **Parameter key**: `admin_password`
   - **Default value**: Your desired admin password
   - **Description**: Admin panel password
6. Click **Save**
7. Click **Publish changes**

### 3. Set Up Firebase Admin SDK

#### Option A: Service Account Key (Recommended for local development)

1. In Firebase Console → **Project Settings** → **Service Accounts**
2. Click **Generate New Private Key**
3. Download the JSON file
4. Add to `.env.local`:
```env
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}'
```
   (Copy the entire JSON content as a single-line string)

#### Option B: Application Default Credentials (For Firebase Hosting)

If deploying to Firebase Hosting/Functions, you can use:
```env
NEXT_PUBLIC_FIREBASE_PROJECT_ID=erkumardevender
```

### 4. Set JWT Secret

Add to `.env.local`:
```env
JWT_SECRET=your-random-secret-key-here
```

Generate one:
```bash
openssl rand -base64 32
```

## Updating the Password

1. Go to Firebase Console → Remote Config
2. Edit the `admin_password` parameter
3. Set new value
4. Click **Publish changes**
5. Password is updated immediately (no redeployment needed)

## Security Features

✅ **Password in Firebase Remote Config** - Not in code or environment variables  
✅ **Server-side verification** - Password check happens on server  
✅ **JWT tokens** - Secure session management with 24-hour expiration  
✅ **HTTP-only cookies** - Additional security layer  
✅ **Update without redeployment** - Change password in Firebase Console  

## Troubleshooting

- **"Authentication not configured"**: Make sure `admin_password` is set in Firebase Remote Config
- **"Firebase Admin SDK not properly configured"**: Check your service account credentials in `.env.local`
- **Connection errors**: Verify your Firebase project ID matches your project

## Important Notes

⚠️ **Never commit `.env.local` to git!**  
⚠️ **Keep JWT_SECRET secret and random**  
⚠️ **Use strong passwords**  
⚠️ **The password is case-sensitive**

