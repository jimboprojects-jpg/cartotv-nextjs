import type { MetadataRoute } from 'next'
import { countries } from '@/data/countries'
import { getAllPosts } from '@/data/blog/posts'
import { getAllChannelParams } from '@/lib/channelManifest'
import { languages } from '@/i18n/config'

const BASE = 'https://cartotv.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const now = new Date()

  // Home (11)
  languages.forEach(l => entries.push({ url:`${BASE}/${l.code}`, lastModified:now, changeFrequency:'daily', priority:1.0 }))
  // Watch index (11)
  languages.forEach(l => entries.push({ url:`${BASE}/${l.code}/watch`, lastModified:now, changeFrequency:'weekly', priority:0.9 }))
  // Country pages (179 × 11 = 1,969)
  countries.forEach(c => {
    const slug = c.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
    languages.forEach(l => entries.push({ url:`${BASE}/${l.code}/watch/${slug}`, lastModified:now, changeFrequency:'daily', priority:0.8 }))
  })
  // Channel pages — en canonical only in sitemap (8,398 entries)
  getAllChannelParams().forEach(({ country, channel }) => {
    entries.push({ url:`${BASE}/en/watch/${country}/${channel}`, lastModified:now, changeFrequency:'weekly', priority:0.7 })
  })
  // Blog (11 + posts × 11)
  languages.forEach(l => entries.push({ url:`${BASE}/${l.code}/blog`, lastModified:now, changeFrequency:'weekly', priority:0.7 }))
  getAllPosts().forEach(p => {
    languages.forEach(l => entries.push({ url:`${BASE}/${l.code}/blog/${p.slug}`, lastModified:new Date(p.date), changeFrequency:'monthly', priority:0.6 }))
  })
  // Static (3 × 11)
  ;['who-we-are','terms','privacy'].forEach(page => {
    languages.forEach(l => entries.push({ url:`${BASE}/${l.code}/${page}`, lastModified:now, changeFrequency:'yearly', priority:0.4 }))
  })
  return entries
}
