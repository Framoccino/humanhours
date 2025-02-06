#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# URL to check
URL="https://framoccino.github.io/humanhours/"

# Check if site is accessible
echo "Checking site accessibility..."
if curl -s --head "$URL" | grep "200 OK" > /dev/null; then
    echo -e "${GREEN}✓ Site is accessible${NC}"
else
    echo -e "${RED}✗ Site is not accessible${NC}"
    exit 1
fi

# Check for required files
echo "Checking required files..."
FILES=(
    "index.html"
    "_next/static/chunks/main.js"
    "_next/static/css/main.css"
)

for file in "${FILES[@]}"; do
    if curl -s "$URL$file" > /dev/null; then
        echo -e "${GREEN}✓ Found $file${NC}"
    else
        echo -e "${RED}✗ Missing $file${NC}"
        exit 1
    fi
done

# Check for components
echo "Checking components..."
COMPONENTS=(
    "AIVisualization"
    "SearchBar"
    "ServiceCards"
)

for component in "${COMPONENTS[@]}"; do
    if curl -s "$URL" | grep -q "$component"; then
        echo -e "${GREEN}✓ Found $component${NC}"
    else
        echo -e "${RED}✗ Missing $component${NC}"
        exit 1
    fi
done

echo -e "${GREEN}All checks passed successfully!${NC}" 