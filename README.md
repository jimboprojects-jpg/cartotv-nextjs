# CartoTV — Next.js 14 with Render Deployment

## Render Deployment (Production)

### Option A — render.yaml (recommended, one-click)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Render automatically reads `render.yaml` — click **Deploy**

### Option B — Manual Render setup

In Render dashboard:

| Setting | Value |
|---|---|
| **Environment** | Node |
| **Plan** | Starter (2GB RAM — required for build) |
| **Build Command** | `npm install --legacy-peer-deps && npm run build` |
| **Start Command** | `node .next/standalone/server.js` |
| **Node Version** | 20 |

**Environment Variables** (add in Render dashboard):
```
NODE_ENV=production
NODE_OPTIONS=--max-old-space-size=1536
PORT=10000
HOSTNAME=0.0.0.0
NEXT_TELEMETRY_DISABLED=1
```

---

## How the Build Works

```
npm install --legacy-peer-deps   # Install deps
npm run fetch-channels            # Fetch 10,000+ channels from iptv-org (~2 min)
next build                        # Build Next.js (~3-5 min)
postbuild                         # Copy public/ and static/ into .next/standalone/
node .next/standalone/server.js   # Start persistent Node.js server
```

### Why `output: 'standalone'`?
Unlike Vercel (serverless), Render runs a **persistent Node.js process**.
`output: 'standalone'` packages the app into a self-contained server at
`.next/standalone/server.js` with minimal dependencies.

### Why ISR for channel pages?
Building 110,000 channel pages (10,000 channels × 11 languages) at build time
would exceed Render's memory and time limits. Instead:
- **Country pages** (1,969): Built at deploy time (SSG)
- **Channel pages** (110,000+): Rendered on first request, cached 24h (ISR)
- **Result**: Build completes in ~5-8 minutes, all pages are indexed by Google

---

## Local Development

```bash
npm install --legacy-peer-deps
npm run fetch-channels   # Pull live channel data (~2 min)
npm run dev              # http://localhost:3000
```

## Sitemap

Auto-generated at `/sitemap.xml` pointing to:
- `/sitemap/0.xml` — Static pages
- `/sitemap/1.xml` — Country pages (1,969 URLs)
- `/sitemap/2.xml` — Channel pages A–M
- `/sitemap/3.xml` — Channel pages N–Z
- `/sitemap/4.xml` — Categories + Blog

Submit `https://your-domain.com/sitemap.xml` to Google Search Console.
