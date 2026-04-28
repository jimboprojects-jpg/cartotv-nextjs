'use client'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
export function WhoWeAreClient({ lang }: { lang: string }) {
  const { t } = useTranslation(); const router = useRouter()
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => router.push(`/${lang}`)}>
          <ArrowLeft className="w-4 h-4" />{t('common.backToGlobe')}
        </Button>
        <div className="glass-panel p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold gradient-text mb-4">{t('about.title')}</h1>
            <p className="text-muted-foreground">{t('about.subtitle')}</p>
          </div>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">{t('about.mission.title')}</h2>
            <p className="text-muted-foreground leading-relaxed">{t('about.mission.text')}</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">{t('about.offer.title')}</h2>
            <ul className="text-muted-foreground space-y-2 list-disc list-inside">
              <li>{t('about.offer.items.channels')}</li>
              <li>{t('about.offer.items.globe')}</li>
              <li>{t('about.offer.items.content')}</li>
              <li>{t('about.offer.items.free')}</li>
              <li>{t('about.offer.items.adFree')}</li>
            </ul>
          </section>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">{t('about.team.title')}</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>{t('about.team.builtBy')}</p>
              <p>{t('about.team.driven')}</p>
              <p>{t('about.team.commitment')}</p>
              <p>{t('about.team.collaborate')}</p>
              <p>{t('about.team.contact').split('hello@cartotv.com').map((part: string, i: number, arr: string[]) => (
                <span key={i}>{part}{i < arr.length-1 && <a href="mailto:hello@cartotv.com" className="text-primary hover:underline font-medium">hello@cartotv.com</a>}</span>
              ))}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
