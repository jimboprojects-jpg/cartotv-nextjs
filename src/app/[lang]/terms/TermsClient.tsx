'use client'
import { useRouter } from 'next/navigation'; import { useTranslation } from 'react-i18next'; import { ArrowLeft } from 'lucide-react'; import { Button } from '@/components/ui/button'
export function TermsClient({ lang }: { lang: string }) {
  const { t } = useTranslation(); const router = useRouter()
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => router.push(`/${lang}`)}><ArrowLeft className="w-4 h-4" />{t('common.backToGlobe')}</Button>
        <div className="glass-panel p-8 space-y-6">
          <div className="text-center mb-8"><h1 className="text-3xl font-bold gradient-text mb-4">{t('terms.title')}</h1><p className="text-muted-foreground text-sm">{t('terms.lastUpdated')}</p></div>
          <section className="space-y-3"><h2 className="text-xl font-semibold">{t('terms.sections.acceptance.title')}</h2><p className="text-muted-foreground leading-relaxed">{t('terms.sections.acceptance.text')}</p></section>
          <section className="space-y-3"><h2 className="text-xl font-semibold">{t('terms.sections.description.title')}</h2><p className="text-muted-foreground leading-relaxed">{t('terms.sections.description.text')}</p></section>
          <section className="space-y-3"><h2 className="text-xl font-semibold">{t('terms.sections.content.title')}</h2><p className="text-muted-foreground leading-relaxed">{t('terms.sections.content.text')}</p></section>
          <section className="space-y-3"><h2 className="text-xl font-semibold">{t('terms.sections.conduct.title')}</h2><p className="text-muted-foreground">{t('terms.sections.conduct.intro')}</p>
            <ul className="text-muted-foreground space-y-2 list-disc list-inside ml-4">
              <li>{t('terms.sections.conduct.items.unlawful')}</li><li>{t('terms.sections.conduct.items.interfere')}</li>
              <li>{t('terms.sections.conduct.items.reproduce')}</li><li>{t('terms.sections.conduct.items.automated')}</li>
            </ul>
          </section>
          <section className="space-y-3"><h2 className="text-xl font-semibold">{t('terms.sections.ip.title')}</h2><p className="text-muted-foreground leading-relaxed">{t('terms.sections.ip.text')}</p></section>
          <section className="space-y-3"><h2 className="text-xl font-semibold">{t('terms.sections.liability.title')}</h2><p className="text-muted-foreground leading-relaxed">{t('terms.sections.liability.text')}</p></section>
          <section className="space-y-3"><h2 className="text-xl font-semibold">{t('terms.sections.changes.title')}</h2><p className="text-muted-foreground leading-relaxed">{t('terms.sections.changes.text')}</p></section>
          <section className="space-y-3"><h2 className="text-xl font-semibold">{t('terms.sections.contact.title')}</h2><p className="text-muted-foreground">{t('terms.sections.contact.text')} <a href="mailto:hello@cartotv.com" className="text-primary hover:underline">hello@cartotv.com</a></p></section>
        </div>
      </div>
    </div>
  )
}
