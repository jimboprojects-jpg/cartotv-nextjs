import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { countries } from '@/data/countries'
import { getCountryBySlug, toSlug, getAllCountrySlugs } from '@/utils/countrySlug'
import { getCountrySEO } from '@/data/seo'
import { languages } from '@/i18n/config'
import { WatchCountryClient } from './WatchCountryClient'

interface Props { params: { lang: string; country: string } }

export async function generateStaticParams() {
  const slugs = getAllCountrySlugs()
  return languages.flatMap(l => slugs.map(country => ({ lang: l.code, country })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCountryBySlug(params.country)
  if (!c) return {}
  const title = `Watch ${c.name} TV Channels Free Online | CartoTV`
  const desc = `Stream live TV channels from ${c.name} for free on CartoTV. Watch news, sports, entertainment and more. No signup required.`
  const altLangs: Record<string,string> = {}
  languages.forEach(l => { altLangs[l.code] = `https://cartotv.com/${l.code}/watch/${params.country}` })
  return {
    title, description: desc,
    alternates: { canonical: `https://cartotv.com/en/watch/${params.country}`, languages: altLangs },
    openGraph: { title, description: desc, url: `https://cartotv.com/${params.lang}/watch/${params.country}` },
  }
}

export default function WatchCountryPage({ params }: Props) {
  const countryData = getCountryBySlug(params.country)
  if (!countryData) notFound()
  const seoContent = getCountrySEO(countryData.name)
  const jsonLd = {
    '@context':'https://schema.org','@type':'CollectionPage',
    name: `Watch Free Live TV from ${countryData.name}`,
    url: `https://cartotv.com/en/watch/${params.country}`,
    provider: { '@type':'Organization', name:'CartoTV', url:'https://cartotv.com' },
    breadcrumb: { '@type':'BreadcrumbList', itemListElement: [
      { '@type':'ListItem', position:1, name:'Home', item:`https://cartotv.com/${params.lang}` },
      { '@type':'ListItem', position:2, name:'Watch', item:`https://cartotv.com/${params.lang}/watch` },
      { '@type':'ListItem', position:3, name:countryData.name, item:`https://cartotv.com/${params.lang}/watch/${params.country}` },
    ]},
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <noscript>
        <article style={{maxWidth:960,margin:'0 auto',padding:'2rem',color:'#e0e0e0',background:'#0a0a1a'}}>
          <h1>Watch {countryData.name} TV Channels – Free Live Stream</h1>
          <p>Stream free live TV channels from {countryData.name} on CartoTV. No registration required.</p>
          {seoContent && <div dangerouslySetInnerHTML={{ __html: seoContent }} />}
        </article>
      </noscript>
      <WatchCountryClient lang={params.lang} countrySlug={params.country} seoContent={seoContent} />
    </>
  )
}
