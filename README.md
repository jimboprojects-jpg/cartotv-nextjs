# CartoTV – Next.js

Free live TV streaming platform. 10,000+ channels, 179 countries, 11 languages.

## Quick start

```bash
npm install --legacy-peer-deps
npm run dev          # http://localhost:3000 → redirects to /en
```

## Build (with fresh channel data)

```bash
npm run build:full   # fetch-channels → next build
```

## Deploy

**Vercel:** push to GitHub, import repo, Vercel auto-detects `vercel.json`.  
**Render:** push to GitHub, Render detects `render.yaml`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Build (uses existing manifest) |
| `npm run fetch-channels` | Refresh channel manifest from iptv-org |
| `npm run build:full` | Refresh channels + build |

## Architecture

- **Next.js 14 App Router** — all pages statically generated at build time
- **94,677 static pages** — home + watch + 179 countries + 8,398 channels × 11 languages + blog
- **Globe** — Three.js, loaded client-side only via `dynamic(..., { ssr: false })`
- **i18next** — 11 languages, synced from URL param, no browser detection
- **Streaming** — hls.js, fetches live M3U from iptv-org at runtime
