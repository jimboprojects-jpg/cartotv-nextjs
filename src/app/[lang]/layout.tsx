import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { I18nProvider } from '@/components/Layout/I18nProvider'
import { languages } from '@/i18n/config'

export async function generateStaticParams() {
  return languages.map(l => ({ lang: l.code }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = languages.find(l => l.code === params.lang)
  if (!lang) return {}
  const altLangs: Record<string, string> = {}
  languages.forEach(l => { altLangs[l.code] = `https://cartotv.com/${l.code}` })
  return { alternates: { canonical: `https://cartotv.com/${lang.code}`, languages: altLangs } }
}

export default function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  const langData = languages.find(l => l.code === params.lang)
  if (!langData) notFound()
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang='${langData.code}';document.documentElement.dir='${langData.dir}';` }} />
      <I18nProvider lang={langData.code}>{children}</I18nProvider>
    </>
  )
}
