'use client'
import { useEffect } from 'react'
import i18n from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import en from '@/i18n/locales/en.json'
import es from '@/i18n/locales/es.json'
import fr from '@/i18n/locales/fr.json'
import pt from '@/i18n/locales/pt.json'
import ar from '@/i18n/locales/ar.json'
import de from '@/i18n/locales/de.json'
import hi from '@/i18n/locales/hi.json'
import zh from '@/i18n/locales/zh.json'
import sw from '@/i18n/locales/sw.json'
import id from '@/i18n/locales/id.json'
import ru from '@/i18n/locales/ru.json'

const resources = {
  en:{translation:en}, es:{translation:es}, fr:{translation:fr},
  pt:{translation:pt}, ar:{translation:ar}, de:{translation:de},
  hi:{translation:hi}, zh:{translation:zh}, sw:{translation:sw},
  id:{translation:id}, ru:{translation:ru},
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en','es','fr','pt','ar','de','hi','zh','sw','id','ru'],
    interpolation: { escapeValue: false },
  })
}

const queryClient = new QueryClient()

export function I18nProvider({ lang, children }: { lang: string; children: React.ReactNode }) {
  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang)
  }, [lang])

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {children}
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </I18nextProvider>
  )
}
