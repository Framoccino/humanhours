#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
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

# Check for required components
echo "Checking required components..."
COMPONENTS=(
    "hero-title"
    "ai-animation-container"
    "service-card"
    "provider-info"
)

for component in "${COMPONENTS[@]}"; do
    if curl -s "$URL" | grep -q "class=\"$component\""; then
        echo -e "${GREEN}✓ Found $component${NC}"
    else
        echo -e "${RED}✗ Missing $component${NC}"
        exit 1
    fi
done

echo -e "${GREEN}All components verified successfully!${NC}" 