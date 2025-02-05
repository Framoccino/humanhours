#!/bin/bash

# Ensure script stops on first error
set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Starting Alpha Deployment Process...${NC}"

# 1. Update content
echo -e "${YELLOW}📝 Updating content from prompt...${NC}"
# This would integrate with an AI service to process the prompt
# For now, we'll use the manual updates

# 2. Build process
echo -e "${BLUE}🏗️ Building project...${NC}"
npm run build
npm run export

# 3. Optimize assets
echo -e "${BLUE}🎨 Optimizing assets...${NC}"
# Optimize images
find public/images -type f -name "*.jpg" -exec convert {} -strip -quality 85 {} \;

# Minify CSS
cat index.html | grep "<style>" -A 1000 | grep "</style>" -B 1000 > temp.css
npx clean-css-cli temp.css -o temp.min.css
sed -i.bak 's/<style>.*<\/style>/<style>'"$(cat temp.min.css)"'<\/style>/g' index.html
rm temp.css temp.min.css index.html.bak

# 4. Deploy to GitHub Pages
echo -e "${BLUE}📤 Deploying to GitHub Pages...${NC}"
npm run deploy

# 5. Verify deployment
echo -e "${BLUE}✅ Verifying deployment...${NC}"
./scripts/verify-deploy.sh

echo -e "${GREEN}🎉 Alpha deployment complete!${NC}" 