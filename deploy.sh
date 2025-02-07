#!/bin/bash

# Ensure script stops on first error
set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Starting deployment process...${NC}"

# Clean previous builds
echo -e "${BLUE}🧹 Cleaning previous builds...${NC}"
rm -rf .next out node_modules package-lock.json

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

# Build and export
echo -e "${BLUE}🏗️ Building project...${NC}"
npm run build
npm run export

# Prepare for GitHub Pages
echo -e "${BLUE}📝 Preparing for GitHub Pages...${NC}"
touch out/.nojekyll
echo "framoccino.github.io/humanhours" > out/CNAME

# Deploy
echo -e "${BLUE}🚀 Deploying to GitHub Pages...${NC}"
npm run deploy

echo -e "${GREEN}✅ Deployment complete!${NC}" 