/**
 * Build-time SSG prerender script.
 * Generates static HTML files with baked-in meta tags for:
 *   - Static pages (home, who-we-are, terms, privacy) × 11 languages
 *   - Watch index × 11 languages
 *   - Country pages (179 countries) × 11 languages
 * Total: ~2,035 HTML files
 */

import fs from 'fs';
import path from 'path';

// ── Language config ──────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: 'en', dir: 'ltr' }, { code: 'es', dir: 'ltr' }, { code: 'fr', dir: 'ltr' },
  { code: 'pt', dir: 'ltr' }, { code: 'ar', dir: 'rtl' }, { code: 'de', dir: 'ltr' },
  { code: 'hi', dir: 'ltr' }, { code: 'zh', dir: 'ltr' }, { code: 'sw', dir: 'ltr' },
  { code: 'id', dir: 'ltr' }, { code: 'ru', dir: 'ltr' },
];
const BASE_URL = 'https://cartotv.com';

// ── Helpers ──────────────────────────────────────────────────────────────────
const toSlug = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const escapeHtml = (str: string): string =>
  str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ── Load data ────────────────────────────────────────────────────────────────

interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
}

function loadCountryNames(): string[] {
  const src = fs.readFileSync(path.resolve(__dirname, '../src/data/countries.ts'), 'utf-8');
  const names: string[] = [];
  const re = /name:\s*"([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) names.push(m[1]);
  return names;
}

function loadBlogPosts(): BlogPostMeta[] {
  const src = fs.readFileSync(path.resolve(__dirname, '../src/data/blog/posts.ts'), 'utf-8');
  const posts: BlogPostMeta[] = [];
  // Match each post object's slug, title, description, date
  const re = /slug:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)",\s*\n\s*description:\s*"([^"]+)",\s*\n\s*date:\s*"([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    posts.push({ slug: m[1], title: m[2], description: m[3], date: m[4] });
  }
  return posts;
}

function loadTranslations(): Record<string, Record<string, any>> {
  const translations: Record<string, Record<string, any>> = {};
  for (const lang of LANGUAGES) {
    const filePath = path.resolve(__dirname, `../src/i18n/locales/${lang.code}.json`);
    if (fs.existsSync(filePath)) {
      translations[lang.code] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  }
  return translations;
}

function loadChannelManifest(): Record<string, string[]> {
  const manifestPath = path.resolve(__dirname, 'channel-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.warn('⚠️ channel-manifest.json not found, skipping channel prerender.');
    return {};
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  return manifest.countries || {};
}

function loadCountrySEO(): Record<string, string> {
  const seoContent: Record<string, string> = {};
  const seoFiles = ['africa.ts', 'americas.ts', 'europe.ts', 'asia-oceania.ts'];
  
  for (const file of seoFiles) {
    const filePath = path.resolve(__dirname, `../src/data/seo/${file}`);
    if (!fs.existsSync(filePath)) continue;
    const src = fs.readFileSync(filePath, 'utf-8');
    // Match: "CountryName": `...content...`
    const re = /"([^"]+)":\s*`([\s\S]*?)`/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(src)) !== null) {
      // Strip HTML tags to get plain text for description
      seoContent[m[1]] = m[2];
    }
  }
  return seoContent;
}

function getTranslation(translations: Record<string, any>, key: string, fallback: string, vars?: Record<string, string>): string {
  const parts = key.split('.');
  let val: any = translations;
  for (const p of parts) {
    if (val && typeof val === 'object' && p in val) val = val[p];
    else return fallback;
  }
  if (typeof val !== 'string') return fallback;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      val = val.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), v);
    }
  }
  return val;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

// ── HTML generation ──────────────────────────────────────────────────────────

interface PageMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  pathWithoutLang: string; // e.g. "" or "/watch" or "/watch/france"
  lang: string;
  dir: string;
  jsonLd?: object[];
  bodyContent?: string; // Semantic HTML for crawlers
}

function buildHreflangTags(pathWithoutLang: string): string {
  const tags = LANGUAGES.map(l => {
    const href = `${BASE_URL}/${l.code}${pathWithoutLang || ''}`;
    return `  <link rel="alternate" hreflang="${l.code}" href="${href}" />`;
  });
  tags.push(`  <link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${pathWithoutLang || ''}" />`);
  return tags.join('\n');
}

function buildMetaBlock(meta: PageMeta): string {
  const ogImage = `${BASE_URL}/og-image.png`;
  const jsonLdScripts = (meta.jsonLd || []).map(
    (schema, i) => `  <script type="application/ld+json" data-prerender="${i}">${JSON.stringify(schema)}</script>`
  ).join('\n');

  return `
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}" />
  <link rel="canonical" href="${meta.canonicalUrl}" />
${buildHreflangTags(meta.pathWithoutLang)}
  <meta property="og:title" content="${escapeHtml(meta.title)}" />
  <meta property="og:description" content="${escapeHtml(meta.description)}" />
  <meta property="og:url" content="${meta.canonicalUrl}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Carto TV" />
  <meta property="og:locale" content="${meta.lang}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
  <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
  <meta name="twitter:image" content="${ogImage}" />
  <meta name="twitter:site" content="@CartoTV" />
${jsonLdScripts}`;
}

function generatePageHtml(template: string, meta: PageMeta): string {
  // Remove existing dynamic meta from template (title, description, og, twitter, canonical, hreflang)
  let html = template;

  // Replace <html lang="en"> with correct lang/dir
  html = html.replace(/<html\s+lang="[^"]*"/, `<html lang="${meta.lang}" dir="${meta.dir}"`);

  // Remove existing title tag
  html = html.replace(/<title>[^<]*<\/title>\s*/g, '');

  // Remove existing meta description
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>\s*/g, '');

  // Remove existing OG tags (property="og:*")
  html = html.replace(/<meta\s+property="og:(title|description|url|locale)"\s+content="[^"]*"\s*\/?>\s*/g, '');

  // Remove existing twitter tags
  html = html.replace(/<meta\s+name="twitter:(title|description)"\s+content="[^"]*"\s*\/?>\s*/g, '');

  // Remove existing canonical
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>\s*/g, '');

  // Inject our meta block right after <head> + charset + viewport
  const metaBlock = buildMetaBlock(meta);
  html = html.replace(
    /(<meta\s+name="viewport"[^>]*\/>)/,
    `$1\n${metaBlock}`
  );

  // Inject crawler body content before </body> if provided
  if (meta.bodyContent) {
    const crawlerDiv = `
  <div id="prerender-content" style="position:absolute;left:-9999px;overflow:hidden;width:1px;height:1px;">
${meta.bodyContent}
  </div>`;
    html = html.replace('</body>', `${crawlerDiv}\n</body>`);
  }

  return html;
}

// ── Route definitions ────────────────────────────────────────────────────────

interface RouteConfig {
  pathWithoutLang: string;
  getTitle: (lang: string, translations: Record<string, any>) => string;
  getDescription: (lang: string, translations: Record<string, any>) => string;
  canonicalLang?: string; // defaults to current lang
  englishOnly?: boolean; // if true, only prerender for English (used for channel pages to reduce file count)
  getJsonLd?: (lang: string, canonicalUrl: string) => object[];
  getBodyContent?: (lang: string, translations: Record<string, any>) => string;
}

const toChannelSlug = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function buildRoutes(countryNames: string[], countrySEO: Record<string, string>, channelManifest: Record<string, string[]>, blogPosts: BlogPostMeta[]): RouteConfig[] {
  const routes: RouteConfig[] = [];

  // Static pages
  routes.push({
    pathWithoutLang: '',
    getTitle: (lang, tr) => getTranslation(tr, 'seo.title', 'Carto TV - Watch Live TV | Streaming Global Channels Worldwide'),
    getDescription: (lang, tr) => getTranslation(tr, 'seo.description', 'Watch 10,000+ free TV channels from 179 countries.'),
    getJsonLd: (lang, url) => [{
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Carto TV",
      "url": url,
      "applicationCategory": "Entertainment",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }]
  });

  routes.push({
    pathWithoutLang: '/who-we-are',
    getTitle: (lang, tr) => getTranslation(tr, 'aboutPage.seoTitle', 'About Carto TV - Who We Are'),
    getDescription: (lang, tr) => getTranslation(tr, 'aboutPage.seoDescription', 'Learn about Carto TV and our mission to provide free live TV worldwide.'),
    getJsonLd: (lang, url) => [{
      "@context": "https://schema.org", "@type": "AboutPage",
      "name": "About Carto TV", "url": url
    }]
  });

  routes.push({
    pathWithoutLang: '/terms',
    getTitle: (lang, tr) => getTranslation(tr, 'termsPage.seoTitle', 'Terms of Service - Carto TV'),
    getDescription: (lang, tr) => getTranslation(tr, 'termsPage.seoDescription', 'Read the terms of service for using Carto TV.'),
  });

  routes.push({
    pathWithoutLang: '/privacy',
    getTitle: (lang, tr) => getTranslation(tr, 'privacyPage.seoTitle', 'Privacy Policy - Carto TV'),
    getDescription: (lang, tr) => getTranslation(tr, 'privacyPage.seoDescription', 'Read how Carto TV protects your privacy.'),
  });

  // Watch index
  routes.push({
    pathWithoutLang: '/watch',
    getTitle: (lang, tr) => getTranslation(tr, 'countryPage.watchLiveTV', 'Watch Live TV by Country') + ' | Carto TV',
    getDescription: (lang, tr) => getTranslation(tr, 'countryPage.selectCountry', 'Select a country to browse free live TV channels on Carto TV.'),
    getBodyContent: (_lang, _tr) => {
      // Internal links to all country pages
      const links = countryNames.map(c => 
        `    <li><a href="/${_lang}/watch/${toSlug(c)}">${c}</a></li>`
      ).join('\n');
      return `  <nav aria-label="Countries"><h2>Browse TV Channels by Country</h2>\n  <ul>\n${links}\n  </ul></nav>`;
    }
  });

  // Country pages
  for (const country of countryNames) {
    const slug = toSlug(country);
    const seoHtml = countrySEO[country] || '';
    const seoPlain = stripHtml(seoHtml).slice(0, 300);

    routes.push({
      pathWithoutLang: `/watch/${slug}`,
      // Each language version self-canonicalizes for independent indexing
      getTitle: (_lang, tr) => getTranslation(tr, 'countryPage.watchTitle', `Watch ${country} TV Channels Free Online`, { country }) + ' | Carto TV',
      getDescription: (_lang, tr) => {
        const translated = getTranslation(tr, 'countryPage.watchDescription', '', { country });
        if (translated) return translated.slice(0, 160);
        return seoPlain ? seoPlain.slice(0, 160) : `Watch free live TV channels from ${country}. Stream news, sports, entertainment on Carto TV.`;
      },
      getJsonLd: (lang, url) => [
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/${lang}` },
            { "@type": "ListItem", "position": 2, "name": "Watch", "item": `${BASE_URL}/${lang}/watch` },
            { "@type": "ListItem", "position": 3, "name": country, "item": url }
          ]
        },
        {
          "@context": "https://schema.org", "@type": "WebPage",
          "name": `Watch ${country} TV Channels`,
          "description": `Free live TV channels from ${country}`,
          "url": url,
          "isPartOf": { "@type": "WebSite", "name": "Carto TV", "url": BASE_URL },
          "potentialAction": { "@type": "WatchAction", "target": url }
        }
      ],
      getBodyContent: (_lang) => {
        if (!seoHtml) return `<article><h1>Watch ${country} TV Channels Free Online</h1><p>Stream live TV from ${country} for free on Carto TV.</p></article>`;
        return `<article>${seoHtml}</article>`;
      }
    });
    // Channel pages for this country
    const channels = channelManifest[country] || [];
    for (const channelName of channels) {
      const channelSlug = toChannelSlug(channelName);
      if (!channelSlug) continue;

      routes.push({
        pathWithoutLang: `/watch/${slug}/${channelSlug}`,
        englishOnly: true, // Only prerender channel pages in English to keep file count manageable
        getTitle: (_lang, tr) => {
          const fallback = `Watch ${channelName} from ${country} - Free Live Stream | Carto TV`;
          return getTranslation(tr, 'channelPage.seoTitle', fallback, { channel: channelName, country });
        },
        getDescription: (_lang, tr) => {
          const fallback = `Stream ${channelName} from ${country} live and free on Carto TV. No registration required — watch news, sports, entertainment instantly.`;
          return getTranslation(tr, 'channelPage.seoDescription', fallback, { channel: channelName, country }).slice(0, 160);
        },
        getJsonLd: (lang, url) => [
          {
            "@context": "https://schema.org", "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/${lang}` },
              { "@type": "ListItem", "position": 2, "name": "Watch", "item": `${BASE_URL}/${lang}/watch` },
              { "@type": "ListItem", "position": 3, "name": country, "item": `${BASE_URL}/${lang}/watch/${slug}` },
              { "@type": "ListItem", "position": 4, "name": channelName, "item": url }
            ]
          },
          {
            "@context": "https://schema.org", "@type": "VideoObject",
            "name": channelName,
            "description": `Live stream of ${channelName} from ${country}`,
            "thumbnailUrl": `${BASE_URL}/og-image.png`,
            "uploadDate": "2024-01-01",
            "publication": {
              "@type": "BroadcastEvent", "isLiveBroadcast": true,
              "startDate": "2024-01-01"
            },
            "potentialAction": { "@type": "WatchAction", "target": url }
          }
        ],
        getBodyContent: (_lang) =>
          `<article><h1>Watch ${escapeHtml(channelName)} from ${escapeHtml(country)} - Free Live Stream</h1>` +
          `<p>Stream ${escapeHtml(channelName)} live from ${escapeHtml(country)} on Carto TV. Completely free, no sign-up required.</p>` +
          `<nav><a href="/${_lang}/watch/${slug}">← More ${escapeHtml(country)} channels</a></nav></article>`
      });
    }
  }

  // Blog index page
  routes.push({
    pathWithoutLang: '/blog',
    getTitle: () => 'Carto TV Blog - Free Live TV Streaming Tips & Guides',
    getDescription: () => 'Discover the best free TV channels from around the world. Tips, guides, and country-by-country reviews.',
    getJsonLd: (lang, url) => [{
      "@context": "https://schema.org", "@type": "Blog",
      "name": "Carto TV Blog", "url": url,
      "publisher": { "@type": "Organization", "name": "Carto TV" }
    }],
    getBodyContent: (_lang) => {
      const links = blogPosts.map(p =>
        `    <li><a href="/${_lang}/blog/${p.slug}">${escapeHtml(p.title)}</a></li>`
      ).join('\n');
      return `<nav aria-label="Blog Posts"><h2>Latest Articles</h2>\n<ul>\n${links}\n</ul></nav>`;
    }
  });

  // Individual blog posts
  for (const post of blogPosts) {
    routes.push({
      pathWithoutLang: `/blog/${post.slug}`,
      getTitle: () => `${post.title} | Carto TV`,
      getDescription: () => post.description.slice(0, 160),
      getJsonLd: (lang, url) => [{
        "@context": "https://schema.org", "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "datePublished": post.date,
        "author": { "@type": "Organization", "name": "Carto TV" },
        "publisher": { "@type": "Organization", "name": "Carto TV", "url": BASE_URL },
        "mainEntityOfPage": url
      }],
      getBodyContent: () =>
        `<article><h1>${escapeHtml(post.title)}</h1><p>${escapeHtml(post.description)}</p></article>`
    });
  }

  return routes;
}

export function prerender(outDir: string) {
  const templatePath = path.join(outDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.warn('⚠️ Prerender: dist/index.html not found, skipping.');
    return 0;
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  const countryNames = loadCountryNames();
  const translations = loadTranslations();
  const countrySEO = loadCountrySEO();
  const channelManifest = loadChannelManifest();
  const blogPosts = loadBlogPosts();
  const routes = buildRoutes(countryNames, countrySEO, channelManifest, blogPosts);

  let count = 0;

  for (const lang of LANGUAGES) {
    const tr = translations[lang.code] || translations['en'] || {};

    for (const route of routes) {
      // Skip non-English languages for English-only routes (e.g., channel pages)
      if (route.englishOnly && lang.code !== 'en') continue;

      const pathWithoutLang = route.pathWithoutLang;
      const canonicalLangCode = route.canonicalLang || lang.code;
      const canonicalUrl = `${BASE_URL}/${canonicalLangCode}${pathWithoutLang}`;

      const meta: PageMeta = {
        title: route.getTitle(lang.code, tr),
        description: route.getDescription(lang.code, tr),
        canonicalUrl,
        pathWithoutLang,
        lang: lang.code,
        dir: lang.dir,
        jsonLd: route.getJsonLd?.(lang.code, canonicalUrl),
        bodyContent: route.getBodyContent?.(lang.code, tr),
      };

      const html = generatePageHtml(template, meta);

      // Write to dist/{lang}{path}/index.html
      const dirPath = path.join(outDir, lang.code, pathWithoutLang.replace(/^\//, ''));
      fs.mkdirSync(dirPath, { recursive: true });
      fs.writeFileSync(path.join(dirPath, 'index.html'), html);
      count++;
    }
  }

  return count;
}
