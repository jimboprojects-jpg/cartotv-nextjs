#!/bin/bash
# ─────────────────────────────────────────────────────────────────
# CartoTV Next.js — GitHub Push Script
# Run this once from inside the cartotv-nextjs folder:
#   chmod +x push-to-github.sh && ./push-to-github.sh
# ─────────────────────────────────────────────────────────────────

set -e

GITHUB_USER="douglasmbura"
REPO_NAME="cartotv-nextjs"
TOKEN="${GITHUB_TOKEN:-}"   # set via: export GITHUB_TOKEN=ghp_xxx

echo "🚀 CartoTV Next.js — GitHub Push"
echo ""

# ── 1. Check token ────────────────────────────────────────────────
if [ -z "$TOKEN" ]; then
  echo "Enter your GitHub Personal Access Token:"
  read -rs TOKEN
  echo ""
fi

# ── 2. Create repo on GitHub ──────────────────────────────────────
echo "📦 Creating GitHub repo: $GITHUB_USER/$REPO_NAME ..."
RESPONSE=$(curl -s -w "%{http_code}" -o /tmp/gh_response.json \
  -X POST \
  -H "Authorization: token $TOKEN" \
  -H "Content-Type: application/json" \
  https://api.github.com/user/repos \
  -d "{
    \"name\": \"$REPO_NAME\",
    \"description\": \"CartoTV — Next.js 14 SSR migration for full SEO. 2,000+ indexable pages.\",
    \"private\": false,
    \"auto_init\": false
  }")

HTTP_CODE="${RESPONSE: -3}"

if [ "$HTTP_CODE" = "201" ]; then
  echo "✅ Repo created: https://github.com/$GITHUB_USER/$REPO_NAME"
elif [ "$HTTP_CODE" = "422" ]; then
  echo "ℹ️  Repo already exists — pushing to existing repo"
else
  echo "⚠️  GitHub API returned $HTTP_CODE"
  cat /tmp/gh_response.json
fi

# ── 3. Git init and push ──────────────────────────────────────────
echo ""
echo "📤 Initialising git and pushing..."

git init
git add .
git commit -m "feat: migrate CartoTV to Next.js 14 App Router for full SSR SEO

- 1,969 statically generated country watch pages (179 countries × 11 langs)
- Auto-generated sitemap.xml with 2,024 URLs
- Server-rendered hreflang on every page
- Schema.org JSON-LD on all pages
- robots.ts auto-generation
- All original components preserved with 'use client' for Three.js/HLS
- i18n: 11 languages (en, es, fr, de, pt, ar, zh, hi, sw, id, ru)
- Ready to deploy on Vercel"

git branch -M main
git remote remove origin 2>/dev/null || true
git remote add origin "https://$TOKEN@github.com/$GITHUB_USER/$REPO_NAME.git"
git push -u origin main --force

echo ""
echo "✅ Done! Repo is live at:"
echo "   https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""
echo "Next step — deploy to Vercel:"
echo "   npx vercel"
echo "   Then add cartotv.com as a custom domain in Vercel dashboard."
