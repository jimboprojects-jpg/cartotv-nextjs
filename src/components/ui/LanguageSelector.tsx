'use client'
import { Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useRouter, usePathname } from 'next/navigation'
import { languages, LanguageCode } from '@/i18n/config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export const LanguageSelector = () => {
  const { i18n } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const currentLang = languages.find(l => l.code === i18n.language) || languages[0]

  const handleLanguageChange = (langCode: LanguageCode) => {
    const parts = pathname.split('/').filter(Boolean)
    const isLang = languages.some(l => l.code === parts[0])
    const rest = isLang ? parts.slice(1) : parts
    const newPath = `/${langCode}${rest.length > 0 ? '/' + rest.join('/') : ''}`
    i18n.changeLanguage(langCode)
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="glass-panel border-0 gap-2 px-3">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLang.nativeName}</span>
          <span className="sm:hidden">{currentLang.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-xl border-border/50">
        {languages.map(lang => (
          <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center justify-between cursor-pointer ${i18n.language === lang.code ? 'bg-primary/20 text-primary' : ''}`}>
            <span>{lang.nativeName}</span>
            <span className="text-xs text-muted-foreground">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
