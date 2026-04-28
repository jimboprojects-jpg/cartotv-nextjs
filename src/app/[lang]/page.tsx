import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { languages } from '@/i18n/config'
import { countries } from '@/data/countries'

const HomeClient = dynamic(() => import('./HomeClient'), { ssr: false })

const TITLES: Record<string, string> = {
  en:'CartoTV – Free Online Live TV Channels from Around the World',
  es:'CartoTV – Canales de TV en Vivo Gratis de Todo el Mundo',
  fr:'CartoTV – Chaînes TV en Direct Gratuites du Monde Entier',
  de:'CartoTV – Kostenlose Live-TV-Kanäle aus aller Welt',
  pt:'CartoTV – Canais de TV ao Vivo Gratuitos do Mundo Todo',
  ar:'CartoTV – قنوات تلفزيون مباشر مجانية من حول العالم',
  zh:'CartoTV – 全球免费直播电视频道',
  hi:'CartoTV – दुनिया भर से मुफ्त लाइव टीवी चैनल',
  sw:'CartoTV – Njia za Televisheni za Bure Kutoka Duniani Kote',
  id:'CartoTV – Saluran TV Langsung Gratis dari Seluruh Dunia',
  ru:'CartoTV – Бесплатные прямые телеканалы со всего мира',
}
const DESCS: Record<string, string> = {
  en:'Watch live TV channels from around the world with CartoTV. Stream news, sports, movies, kids and entertainment channels online by country — No sign-up required.',
  es:'Mira canales de TV en vivo de todo el mundo con CartoTV. Sin registro necesario.',
  fr:'Regardez des chaînes TV en direct du monde entier avec CartoTV. Sans inscription.',
  de:'Schauen Sie Live-TV-Kanäle aus aller Welt mit CartoTV. Keine Registrierung.',
  pt:'Assista canais de TV ao vivo de todo o mundo com CartoTV. Sem cadastro.',
  ar:'شاهد القنوات التلفزيونية المباشرة من حول العالم مع CartoTV. بدون تسجيل.',
  zh:'使用CartoTV观看来自世界各地的直播电视频道。无需注册。',
  hi:'CartoTV के साथ दुनिया भर से लाइव टीवी चैनल देखें। साइन-अप की आवश्यकता नहीं।',
  sw:'Tazama vituo vya TV moja kwa moja kutoka duniani kote na CartoTV. Bila usajili.',
  id:'Tonton saluran TV langsung dari seluruh dunia dengan CartoTV. Tanpa pendaftaran.',
  ru:'Смотрите прямые телеканалы со всего мира на CartoTV. Без регистрации.',
}

export async function generateStaticParams() {
  return languages.map(l => ({ lang: l.code }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang
  const title = TITLES[lang] || TITLES.en
  const desc = DESCS[lang] || DESCS.en
  const altLangs: Record<string, string> = {}
  languages.forEach(l => { altLangs[l.code] = `https://cartotv.com/${l.code}` })
  return {
    title, description: desc,
    alternates: { canonical: `https://cartotv.com/${lang}`, languages: altLangs },
    openGraph: { title, description: desc, url: `https://cartotv.com/${lang}` },
    twitter: { title, description: desc },
  }
}

export default function HomePage({ params }: { params: { lang: string } }) {
  const lang = params.lang
  const jsonLd = [
    { '@context':'https://schema.org','@type':'WebApplication','name':'CartoTV','url':'https://cartotv.com','description':'Watch free live world TV. No account needed. 10,000+ channels from 179 countries.','applicationCategory':'Entertainment','offers':{'@type':'Offer','price':'0','priceCurrency':'USD'} },
    { '@context':'https://schema.org','@type':'WebSite','name':'CartoTV','url':'https://cartotv.com','potentialAction':{'@type':'SearchAction','target':{'@type':'EntryPoint','urlTemplate':`https://cartotv.com/${lang}/watch?q={search_term_string}`},'query-input':'required name=search_term_string'} },
    { '@context':'https://schema.org','@type':'FAQPage','mainEntity':[
      {'@type':'Question','name':'Is CartoTV free?','acceptedAnswer':{'@type':'Answer','text':'Yes, completely free with no registration required.'}},
      {'@type':'Question','name':'How many channels?','acceptedAnswer':{'@type':'Answer','text':'Over 10,000 live TV channels from 179 countries.'}},
      {'@type':'Question','name':'Do I need an account?','acceptedAnswer':{'@type':'Answer','text':'No account or registration needed.'}},
    ]},
  ]
  return (
    <>
      {jsonLd.map((s,i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <noscript>
        <div style={{maxWidth:960,margin:'0 auto',padding:'2rem',color:'#e0e0e0',background:'#0a0a1a'}}>
          <h1>CartoTV – Watch Free Live TV Channels Worldwide</h1>
          <p>Stream 10,000+ live TV channels from 179 countries. No registration required.</p>
          <h2>Browse by Country</h2>
          <ul>{countries.slice(0,30).map(c=><li key={c.name}><a href={`/${lang}/watch/${c.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`}>{c.name} TV channels</a></li>)}</ul>
        </div>
      </noscript>
      <HomeClient lang={lang} />
    </>
  )
}
