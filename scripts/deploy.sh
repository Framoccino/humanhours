#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Ensure script stops on first error
set -e

echo -e "${BLUE}🚀 Starting deployment process...${NC}"

# Check required files
REQUIRED_FILES=(
    "index.html"
    "public/css/main.css"
    "public/js/web3.js"
    "public/js/visualization.js"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${RED}Missing required file: ${file}${NC}"
        exit 1
    fi
done

# Build process
echo -e "${BLUE}🏗️ Building project...${NC}"

# 1. Optimize images
echo -e "${BLUE}📸 Optimizing images...${NC}"
find public/images -type f \( -name "*.jpg" -o -name "*.png" \) -exec convert {} -strip -quality 85 {} \;

# 2. Minify CSS
echo -e "${BLUE}🎨 Minifying CSS...${NC}"
npx clean-css-cli -o public/css/main.min.css public/css/main.css

# 3. Minify JavaScript
echo -e "${BLUE}📦 Minifying JavaScript...${NC}"
for file in public/js/*.js; do
    npx uglify-js "$file" -o "${file%.js}.min.js"
done

# 4. Create dist directory
echo -e "${BLUE}📁 Creating distribution...${NC}"
rm -rf dist
mkdir -p dist/{css,js,images}

# 5. Copy and rename files
cp index.html dist/
cp public/css/main.min.css dist/css/
cp public/js/*.min.js dist/js/
cp -r public/images/* dist/images/

# 6. Deploy to GitHub Pages
echo -e "${BLUE}🚀 Deploying to GitHub Pages...${NC}"
touch dist/.nojekyll
gh-pages -d dist -t true

echo -e "${GREEN}✅ Deployment complete!${NC}" 