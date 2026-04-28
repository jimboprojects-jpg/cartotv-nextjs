'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
const LANGS = ['en','es','fr','pt','ar','de','hi','zh','sw','id','ru']
export const useLocalizedNavigate = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { i18n } = useTranslation()
  return (path: string) => {
    const parts = pathname.split('/').filter(Boolean)
    const lang = LANGS.includes(parts[0]) ? parts[0] : (i18n.language || 'en')
    const normalized = path.startsWith('/') ? path : `/${path}`
    router.push(`/${lang}${normalized === '/' ? '' : normalized}`)
  }
}
