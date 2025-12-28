# Firebase Remote Config Option

If you prefer to use Firebase Remote Config for the admin password, here's how to set it up:

## Advantages
- ✅ Update password without redeployment
- ✅ Centralized configuration
- ✅ Can be updated from Firebase Console

## Disadvantages
- ❌ Requires Firebase setup
- ❌ Adds external dependency
- ❌ More complex than environment variables
- ❌ Requires Firebase project and credentials

## Setup Steps

1. **Install Firebase Admin SDK:**
```bash
npm install firebase-admin
```

2. **Set up Firebase credentials:**
   - Download service account key from Firebase Console
   - Store in `lib/firebase-admin.ts`

3. **Configure Remote Config:**
   - In Firebase Console → Remote Config
   - Add parameter: `admin_password` (type: String)
   - Set your password value

4. **Update API route** to fetch from Remote Config instead of environment variable

## Recommendation

**For this portfolio project, I recommend using environment variables** because:
- ✅ Simpler setup (no Firebase required)
- ✅ More secure (no external API calls)
- ✅ Standard Next.js practice
- ✅ Works on all hosting platforms
- ✅ No additional costs

The current implementation using environment variables is production-ready and secure.

