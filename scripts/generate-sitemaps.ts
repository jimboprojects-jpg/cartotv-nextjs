/**
 * Sitemap generator for CartoTV
 * Used by the Vite plugin to generate sitemap-index.xml, sitemap-pages.xml, sitemap-watch.xml,
 * and sitemap-channels-*.xml (when channel-manifest.json exists) at build time.
 */

import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://cartotv.com';
const LANGUAGES = ['en', 'es', 'fr', 'de', 'pt', 'ar', 'zh', 'hi', 'sw', 'id', 'ru'];
const TODAY = new Date().toISOString().split('T')[0];
const MAX_URLS_PER_SITEMAP = 15000;

// Country names must match src/data/countries.ts exactly
const COUNTRY_NAMES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi",
  "Côte d'Ivoire","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic",
  "DR Congo","Denmark","Djibouti","Dominica","Dominican Republic",
  "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia",
  "Fiji","Finland","France",
  "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
  "Haiti","Honduras","Hungary",
  "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
  "Jamaica","Japan","Jordan",
  "Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan",
  "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
  "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar",
  "Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway",
  "Oman",
  "Pakistan","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
  "Qatar",
  "Romania","Russia","Rwanda",
  "Saudi Arabia","Senegal","Serbia","Sierra Leone","Singapore","Slovakia","Slovenia","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
  "Taiwan","Tajikistan","Tanzania","Thailand","Togo","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
  "Vatican City","Venezuela","Vietnam",
  "Yemen","Zambia","Zimbabwe"
];

interface ChannelManifest {
  countries: Record<string, string[]>;
}

function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function hreflangBlock(path: string): string {
  return LANGUAGES.map(lang =>
    `    <xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}/${lang}${path}" />`
  ).join('\n') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${path}" />`;
}

function urlEntry(lang: string, path: string, changefreq: string, priority: string): string {
  return `  <url>
    <loc>${BASE_URL}/${lang}${path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${hreflangBlock(path)}
  </url>`;
}

function xmlHeader(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;
}

function loadChannelManifest(): ChannelManifest | null {
  try {
    const scriptDir = import.meta.dirname || path.dirname(new URL(import.meta.url).pathname);
    const manifestPath = path.resolve(scriptDir, 'channel-manifest.json');
    if (!fs.existsSync(manifestPath)) return null;
    return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  } catch {
    return null;
  }
}

export function getChannelSitemapCount(): number {
  const manifest = loadChannelManifest();
  if (!manifest) return 0;
  
  let totalUrls = 0;
  for (const country of Object.keys(manifest.countries)) {
    totalUrls += manifest.countries[country].length * LANGUAGES.length;
  }
  return Math.ceil(totalUrls / MAX_URLS_PER_SITEMAP);
}

// Blog post slugs — keep in sync with src/data/blog/posts.ts
const BLOG_SLUGS = [
  "best-free-tv-channels-from-india", "best-free-tv-channels-from-united-states",
  "best-free-tv-channels-from-united-kingdom", "best-free-tv-channels-from-france",
  "best-free-tv-channels-from-brazil", "best-free-tv-channels-from-germany",
  "best-free-tv-channels-from-japan", "watch-live-news-channels-free-worldwide",
  "best-free-sports-channels-to-watch-online", "best-free-tv-channels-from-nigeria",
  "best-free-tv-channels-from-turkey", "best-free-tv-channels-from-south-korea",
  "best-free-tv-channels-from-mexico", "best-free-arabic-tv-channels-to-watch-online",
  "best-free-tv-channels-from-italy", "best-free-tv-channels-from-spain",
  "best-free-tv-channels-from-egypt", "best-free-tv-channels-from-russia",
  "how-to-watch-free-tv-channels-online-without-cable", "best-free-tv-channels-from-china",
  "best-free-tv-channels-from-kenya", "best-free-tv-channels-from-indonesia",
  "best-free-tv-channels-from-pakistan", "best-free-tv-channels-from-argentina",
];

export function generateSitemapIndex(): string {
  const channelCount = getChannelSitemapCount();
  
  let channelEntries = '';
  for (let i = 1; i <= channelCount; i++) {
    channelEntries += `
  <sitemap>
    <loc>${BASE_URL}/sitemap-channels-${i}.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-watch.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-blog.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>${channelEntries}
</sitemapindex>`;
}

export function generatePagesSitemap(): string {
  const pages = [
    { path: '', changefreq: 'daily', enPriority: '1.0', otherPriority: '0.9' },
    { path: '/who-we-are', changefreq: 'monthly', enPriority: '0.7', otherPriority: '0.6' },
    { path: '/terms', changefreq: 'yearly', enPriority: '0.5', otherPriority: '0.4' },
    { path: '/privacy', changefreq: 'yearly', enPriority: '0.5', otherPriority: '0.4' },
    { path: '/blog', changefreq: 'weekly', enPriority: '0.8', otherPriority: '0.7' },
  ];

  const urls: string[] = [];
  for (const page of pages) {
    for (const lang of LANGUAGES) {
      const priority = lang === 'en' ? page.enPriority : page.otherPriority;
      urls.push(urlEntry(lang, page.path, page.changefreq, priority));
    }
  }

  return `${xmlHeader()}\n\n${urls.join('\n\n')}\n\n</urlset>`;
}

export function generateBlogSitemap(): string {
  const urls: string[] = [];
  for (const slug of BLOG_SLUGS) {
    for (const lang of LANGUAGES) {
      const priority = lang === 'en' ? '0.7' : '0.6';
      urls.push(urlEntry(lang, `/blog/${slug}`, 'monthly', priority));
    }
  }
  return `${xmlHeader()}\n\n${urls.join('\n\n')}\n\n</urlset>`;
}

export function generateWatchSitemap(): string {
  const urls: string[] = [];

  // Watch index page
  for (const lang of LANGUAGES) {
    const priority = lang === 'en' ? '0.8' : '0.7';
    urls.push(urlEntry(lang, '/watch', 'daily', priority));
  }

  // Country landing pages
  const slugs = COUNTRY_NAMES.map(toSlug);
  for (const slug of slugs) {
    for (const lang of LANGUAGES) {
      const priority = lang === 'en' ? '0.7' : '0.6';
      urls.push(urlEntry(lang, `/watch/${slug}`, 'weekly', priority));
    }
  }

  return `${xmlHeader()}\n\n${urls.join('\n\n')}\n\n</urlset>`;
}

export function generateChannelSitemaps(): { filename: string; content: string }[] {
  const manifest = loadChannelManifest();
  if (!manifest) return [];

  // Collect all channel URLs
  const allUrls: string[] = [];
  
  for (const [countryName, channelNames] of Object.entries(manifest.countries)) {
    const countrySlug = toSlug(countryName);
    for (const channelName of channelNames) {
      const channelSlug = toSlug(channelName);
      for (const lang of LANGUAGES) {
        const priority = lang === 'en' ? '0.6' : '0.5';
        allUrls.push(urlEntry(lang, `/watch/${countrySlug}/${channelSlug}`, 'weekly', priority));
      }
    }
  }

  // Split into multiple sitemaps if needed
  const sitemaps: { filename: string; content: string }[] = [];
  for (let i = 0; i < allUrls.length; i += MAX_URLS_PER_SITEMAP) {
    const chunk = allUrls.slice(i, i + MAX_URLS_PER_SITEMAP);
    const index = Math.floor(i / MAX_URLS_PER_SITEMAP) + 1;
    sitemaps.push({
      filename: `sitemap-channels-${index}.xml`,
      content: `${xmlHeader()}\n\n${chunk.join('\n\n')}\n\n</urlset>`,
    });
  }

  return sitemaps;
}
