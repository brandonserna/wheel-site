#!/bin/bash

# Automatic GitHub Pages Deployment Script
# This script will push your changes and trigger automatic deployment

set -e  # Exit on error

echo "🚀 Starting deployment process..."

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "❌ Error: Not a git repository. Run 'git init' first."
    exit 1
fi

# Add all changes
echo "📦 Adding changes..."
git add .

# Commit with timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
echo "💾 Committing changes..."
git commit -m "Deploy: $TIMESTAMP" || echo "No changes to commit"

# Check if remote exists
if ! git remote | grep -q 'origin'; then
    echo "❌ Error: No remote 'origin' found."
    echo "💡 Add your GitHub repository:"
    echo "   git remote add origin https://github.com/USERNAME/REPO.git"
    exit 1
fi

# Push to main branch
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Deployment initiated!"
echo "🌐 GitHub Actions will automatically deploy your site."
echo "📍 Check deployment status at: https://github.com/$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/')/actions"
echo ""
echo "🎉 Your site will be live at: https://$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/' | cut -d'/' -f1).github.io/$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/' | cut -d'/' -f2)"
