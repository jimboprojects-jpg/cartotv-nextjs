'use client'
import { useRouter } from 'next/navigation'; import { useTranslation } from 'react-i18next'; import { ArrowLeft } from 'lucide-react'; import { Button } from '@/components/ui/button'
export function PrivacyClient({ lang }: { lang: string }) {
  const { t } = useTranslation(); const router = useRouter()
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => router.push(`/${lang}`)}><ArrowLeft className="w-4 h-4" />{t('common.backToGlobe')}</Button>
        <div className="glass-panel p-8 space-y-6">
          <div className="text-center mb-8"><h1 className="text-3xl font-bold gradient-text mb-4">{t('privacy.title')}</h1><p className="text-muted-foreground text-sm">{t('privacy.lastUpdated')}</p></div>
          <section className="space-y-3"><h2 className="text-xl font-semibold">{t('privacy.sections.collect.title')}</h2><p className="text-muted-foreground">{t('privacy.sections.collect.intro')}</p>
            <ul className="text-muted-foreground space-y-2 list-disc list-inside ml-4">
              <li><strong>{t('privacy.sections.collect.usage.label')}:</strong> {t('privacy.sections.collect.usage.text')}</li>
              <li><strong>{t('privacy.sections.collect.localStorage.label')}:</strong> {t('privacy.sections.collect.localStorage.text')}</li>
              <li><strong>{t('privacy.sections.collect.technical.label')}:</strong> {t('privacy.sections.collect.technical.text')}</li>
            </ul>
          </section>
          <section className="space-y-3"><h2 className="text-xl font-semibold">{t('privacy.sections.noAccount.title')}</h2><p className="text-muted-foreground leading-relaxed">{t('privacy.sections.noAccount.text')}</p></section>
          <section className="space-y-3"><h2 className="text-xl font-semibold">{t('privacy.sections.cookies.title')}</h2><p className="text-muted-foreground">{t('privacy.sections.cookies.intro')}</p>
            <ul className="text-muted-foreground space-y-2 list-disc list-inside ml-4">
              <li>{t('privacy.sections.cookies.analytics')}</li><li>{t('privacy.sections.cookies.preferences')}</li>
            </ul>
          </section>
          <section className="space-y-3"><h2 className="text-xl font-semibold">{t('privacy.sections.thirdParty.title')}</h2><p className="text-muted-foreground">{t('privacy.sections.thirdParty.intro')}</p>
            <ul className="text-muted-foreground space-y-2 list-disc list-inside ml-4">
              <li><strong>{t('privacy.sections.thirdParty.google.label')}:</strong> {t('privacy.sections.thirdParty.google.text')}</li>
              <li><strong>{t('privacy.sections.thirdParty.coffee.label')}:</strong> {t('privacy.sections.thirdParty.coffee.text')}</li>
              <li><strong>{t('privacy.sections.thirdParty.streams.label')}:</strong> {t('privacy.sections.thirdParty.streams.text')}</li>
            </ul>
          </section>
          <section className="space-y-3"><h2 className="text-xl font-semibold">{t('privacy.sections.security.title')}</h2><p className="text-muted-foreground leading-relaxed">{t('privacy.sections.security.text')}</p></section>
          <section className="space-y-3"><h2 className="text-xl font-semibold">{t('privacy.sections.children.title')}</h2><p className="text-muted-foreground leading-relaxed">{t('privacy.sections.children.text')}</p></section>
          <section className="space-y-3"><h2 className="text-xl font-semibold">{t('privacy.sections.rights.title')}</h2><p className="text-muted-foreground leading-relaxed">{t('privacy.sections.rights.text')}</p></section>
          <section className="space-y-3"><h2 className="text-xl font-semibold">{t('privacy.sections.contact.title')}</h2><p className="text-muted-foreground">{t('privacy.sections.contact.text')} <a href="mailto:hello@cartotv.com" className="text-primary hover:underline">hello@cartotv.com</a></p></section>
        </div>
      </div>
    </div>
  )
}
