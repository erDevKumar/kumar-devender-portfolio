#!/bin/bash

# Interactive Firebase Deployment Script
# This script guides you through the deployment process

set -e

echo "🚀 Firebase Hosting Deployment"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Check Firebase CLI
echo -e "${GREEN}Step 1:${NC} Checking Firebase CLI..."
if npx firebase-tools --version &> /dev/null; then
    VERSION=$(npx firebase-tools --version)
    echo -e "✅ Firebase CLI version: ${VERSION}"
else
    echo -e "${RED}❌ Firebase CLI not found${NC}"
    exit 1
fi
echo ""

# Step 2: Check authentication
echo -e "${GREEN}Step 2:${NC} Checking Firebase authentication..."
if npx firebase-tools projects:list &> /dev/null; then
    echo -e "✅ Already authenticated with Firebase"
    PROJECTS=$(npx firebase-tools projects:list 2>/dev/null | grep -v "┌\|├\|└\|│\|Project" | grep -E "^[A-Za-z0-9-]+" | head -5)
    if [ ! -z "$PROJECTS" ]; then
        echo "Available projects:"
        echo "$PROJECTS"
    fi
else
    echo -e "${YELLOW}⚠️  Not logged in to Firebase${NC}"
    echo ""
    echo "Please run the following command to login:"
    echo -e "${GREEN}npx firebase-tools login${NC}"
    echo ""
    echo "This will open a browser for authentication."
    echo "After logging in, run this script again."
    exit 1
fi
echo ""

# Step 3: Check Firebase project configuration
echo -e "${GREEN}Step 3:${NC} Checking Firebase project configuration..."
if [ -f ".firebaserc" ]; then
    echo "✅ Firebase project configured"
    CURRENT_PROJECT=$(grep '"default"' .firebaserc | cut -d'"' -f4 || echo "none")
    echo "Current project: $CURRENT_PROJECT"
else
    echo -e "${YELLOW}⚠️  Firebase project not initialized${NC}"
    echo ""
    echo "Initializing Firebase project..."
    echo "You'll be prompted to select or create a project."
    npx firebase-tools init hosting --project default
    
    if [ ! -f ".firebaserc" ]; then
        echo -e "${RED}❌ Initialization failed or cancelled${NC}"
        exit 1
    fi
fi
echo ""

# Step 4: Verify build
echo -e "${GREEN}Step 4:${NC} Verifying build output..."
if [ ! -d "out" ] || [ ! -f "out/index.html" ]; then
    echo -e "${YELLOW}⚠️  Build output not found. Building now...${NC}"
    npm run build
    if [ ! -f "out/index.html" ]; then
        echo -e "${RED}❌ Build failed${NC}"
        exit 1
    fi
fi
echo "✅ Build output ready"
echo ""

# Step 5: Deploy
echo -e "${GREEN}Step 5:${NC} Deploying to Firebase Hosting..."
echo ""
npx firebase-tools deploy --only hosting

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Your portfolio is now live on Firebase Hosting!"
echo "Check the URL shown above to visit your site."


