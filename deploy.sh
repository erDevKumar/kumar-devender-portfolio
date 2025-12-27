#!/bin/bash

# Firebase Hosting Deployment Script
# Run this script after logging in to Firebase

set -e  # Exit on error

echo "🚀 Starting Firebase Deployment..."
echo ""

# Check if Firebase CLI is available
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx not found. Please install Node.js and npm."
    exit 1
fi

# Check if logged in
echo "📋 Checking Firebase authentication..."
if ! npx firebase-tools projects:list &> /dev/null; then
    echo "❌ Not logged in to Firebase. Please run:"
    echo "   npx firebase-tools login"
    echo ""
    echo "This will open a browser for authentication."
    exit 1
fi

echo "✅ Authenticated with Firebase"
echo ""

# Verify build exists
if [ ! -d "out" ]; then
    echo "📦 Building project..."
    npm run build
    echo ""
fi

# Check if .firebaserc exists, if not, initialize
if [ ! -f ".firebaserc" ]; then
    echo "⚙️  Firebase project not initialized. Running initialization..."
    echo "   Please select your Firebase project when prompted."
    npx firebase-tools init hosting
    echo ""
fi

# Deploy
echo "🚀 Deploying to Firebase Hosting..."
npx firebase-tools deploy --only hosting

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your site should be live at the URL shown above."

