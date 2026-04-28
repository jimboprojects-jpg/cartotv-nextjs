import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCountryBySlug, getAllCountrySlugs } from '@/utils/countrySlug'
import { getCountrySEO } from '@/data/seo'
import { languages } from '@/i18n/config'
import { getAllChannelParams, getChannelFromManifest, getCountryChannelsFromManifest } from '@/lib/channelManifest'
import { WatchChannelClient } from './WatchChannelClient'

interface Props { params: { lang: string; country: string; channel: string } }

export async function generateStaticParams() {
  const channelParams = getAllChannelParams()
  return languages.flatMap(l => channelParams.map(({ country, channel }) => ({ lang: l.code, country, channel })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const countryData = getCountryBySlug(params.country)
  const channelInfo = getChannelFromManifest(params.country, params.channel)
  const channelName = channelInfo?.name ?? params.channel.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const countryName = countryData?.name ?? channelInfo?.countryName ?? params.country.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const title = `Watch ${channelName} Live Stream Free | CartoTV`
  const desc = `Stream ${channelName} from ${countryName} live and free on CartoTV. No registration needed. Watch online on any device.`
  const altLangs: Record<string,string> = {}
  languages.forEach(l => { altLangs[l.code] = `https://cartotv.com/${l.code}/watch/${params.country}/${params.channel}` })
  return {
    title, description: desc,
    alternates: { canonical: `https://cartotv.com/en/watch/${params.country}/${params.channel}`, languages: altLangs },
    openGraph: { title, description: desc, url: `https://cartotv.com/${params.lang}/watch/${params.country}/${params.channel}` },
    twitter: { title, description: desc },
  }
}

export default function WatchChannelPage({ params }: Props) {
  const countryData = getCountryBySlug(params.country)
  const channelInfo = getChannelFromManifest(params.country, params.channel)
  if (!countryData && !channelInfo) notFound()

  const channelName = channelInfo?.name ?? params.channel.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const countryName = countryData?.name ?? channelInfo?.countryName ?? params.country.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const relatedFromManifest = getCountryChannelsFromManifest(params.country).filter(ch => ch.slug !== params.channel).slice(0, 12)
  const seoContent = countryData ? getCountrySEO(countryName) : undefined

  const jsonLd = [
    { '@context':'https://schema.org','@type':'VideoObject',
      'name':`${channelName} - Live Stream`,
      'description':`Watch ${channelName} live for free from ${countryName} on CartoTV.`,
      'thumbnailUrl': countryData?.flag ?? 'https://cartotv.com/og-image.png',
      'uploadDate':'2024-01-01',
      'contentUrl':`https://cartotv.com/en/watch/${params.country}/${params.channel}`,
      'publication':{ '@type':'BroadcastEvent','isLiveBroadcast':true,'startDate':'2024-01-01' },
      'potentialAction':{ '@type':'WatchAction','target':`https://cartotv.com/en/watch/${params.country}/${params.channel}` },
    },
    { '@context':'https://schema.org','@type':'BroadcastService',
      'name':channelName,
      'description':`Watch ${channelName} live for free from ${countryName} on CartoTV`,
      'url':`https://cartotv.com/en/watch/${params.country}/${params.channel}`,
      'provider':{ '@type':'Organization','name':'CartoTV','url':'https://cartotv.com' },
      'areaServed':{ '@type':'Country','name':countryName },
    },
    { '@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[
      { '@type':'ListItem','position':1,'name':'Home','item':`https://cartotv.com/${params.lang}` },
      { '@type':'ListItem','position':2,'name':'Watch','item':`https://cartotv.com/${params.lang}/watch` },
      { '@type':'ListItem','position':3,'name':countryName,'item':`https://cartotv.com/${params.lang}/watch/${params.country}` },
      { '@type':'ListItem','position':4,'name':channelName,'item':`https://cartotv.com/${params.lang}/watch/${params.country}/${params.channel}` },
    ]},
  ]

  return (
    <>
      {jsonLd.map((s,i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <noscript>
        <article style={{maxWidth:960,margin:'0 auto',padding:'2rem',color:'#e0e0e0',background:'#0a0a1a'}}>
          <h1>Watch {channelName} Live — Free Stream from {countryName}</h1>
          <p>Stream {channelName} from {countryName} live and free on CartoTV. No registration required.</p>
          <h2>More channels from {countryName}</h2>
          <ul>{relatedFromManifest.map(ch=><li key={ch.slug}><a href={`/${params.lang}/watch/${params.country}/${ch.slug}`}>{ch.name}</a></li>)}</ul>
          {seoContent && <div dangerouslySetInnerHTML={{ __html: seoContent }} />}
        </article>
      </noscript>
      <WatchChannelClient
        lang={params.lang}
        countrySlug={params.country}
        channelSlug={params.channel}
        resolvedChannelName={channelName}
        resolvedCountryName={countryName}
        resolvedCountryFlag={countryData?.flag}
        relatedFromManifest={relatedFromManifest}
      />
    </>
  )
}
