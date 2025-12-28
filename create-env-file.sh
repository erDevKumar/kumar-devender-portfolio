#!/bin/bash

# Script to create .env.local file for Firebase Remote Config setup

# Generate JWT secret
JWT_SECRET=$(openssl rand -base64 32)

# Create .env.local file
cat > .env.local << EOF
# Firebase Admin Configuration
# Only JWT_SECRET is needed here - password comes from Firebase Remote Config

# JWT Secret for token signing
# Generated secure random secret
JWT_SECRET=${JWT_SECRET}

# Firebase Service Account (Optional - for local development)
# Download service account key from Firebase Console → Project Settings → Service Accounts
# Copy the entire JSON content as a single-line string
# FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'

# Firebase Project ID (Optional - if not using service account)
# NEXT_PUBLIC_FIREBASE_PROJECT_ID=erkumardevender
EOF

echo "✅ .env.local file created successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Set up Firebase Remote Config:"
echo "   - Go to Firebase Console → Remote Config"
echo "   - Add parameter: admin_password"
echo "   - Set your password value"
echo "   - Publish changes"
echo ""
echo "2. (Optional) For local development, add Firebase Service Account:"
echo "   - Download service account key from Firebase Console"
echo "   - Add FIREBASE_SERVICE_ACCOUNT_KEY to .env.local"
echo ""
echo "3. Restart your server: npm run dev"
echo ""
