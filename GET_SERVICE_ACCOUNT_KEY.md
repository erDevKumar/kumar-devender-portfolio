# How to Get Firebase Service Account Key

## Quick Steps

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project: **erkumardevender**

2. **Navigate to Service Accounts**
   - Click on the **gear icon** (⚙️) next to "Project Overview"
   - Select **Project Settings**
   - Go to the **Service Accounts** tab

3. **Generate New Private Key**
   - Click **"Generate New Private Key"** button
   - A warning dialog will appear - click **"Generate Key"**
   - A JSON file will be downloaded (e.g., `erkumardevender-firebase-adminsdk-xxxxx.json`)

4. **Add to .env.local**
   - Open the downloaded JSON file
   - Copy the **entire content**
   - Open your `.env.local` file
   - Add this line:
   ```env
   FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}'
   ```
   - **Important**: Paste the entire JSON as a single-line string (remove all line breaks)
   - Make sure to wrap it in single quotes

5. **Restart Server**
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

## Example .env.local

```env
# JWT Secret
JWT_SECRET=GqTEOSb8Wu7XghaWD/RXe85+AHu3FuP+S2USChXlj9Q=

# Firebase Project ID
NEXT_PUBLIC_FIREBASE_PROJECT_ID=erkumardevender

# Firebase Service Account Key (paste entire JSON here as single line)
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"erkumardevender","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-xxxxx@erkumardevender.iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}'
```

## Quick Command to Format JSON

If you have the JSON file, you can use this command to format it for .env.local:

```bash
# On macOS/Linux
cat your-service-account-key.json | jq -c . | sed "s/'/\\\\'/g" | xargs -I {} echo "FIREBASE_SERVICE_ACCOUNT_KEY='{}'" >> .env.local
```

Or manually:
1. Open the JSON file
2. Remove all line breaks and spaces (make it one line)
3. Wrap it in single quotes
4. Add to .env.local

## Security Note

⚠️ **Never commit the service account key to git!**  
⚠️ The `.env.local` file is already in `.gitignore`  
⚠️ Keep this key secure and private

