'use client'
import { useState } from 'react'
import { Menu, Users, FileText, Shield, Globe, BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { languages } from '@/i18n/config'

function getLang(pathname: string) {
  const part = pathname.split('/').filter(Boolean)[0]
  return languages.some(l => l.code === part) ? part : 'en'
}

const TikTokIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
)

import { Twitter, Facebook, Youtube } from 'lucide-react'

export const SideMenu = () => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const pathname = usePathname()
  const lang = getLang(pathname)

  const menuItems = [
    { icon: Globe,    labelKey: 'menu.watchByCountry', path: `/${lang}/watch`      },
    { icon: BookOpen, labelKey: 'menu.blog',           path: `/${lang}/blog`       },
    { icon: Users,    labelKey: 'menu.whoWeAre',       path: `/${lang}/who-we-are` },
    { icon: FileText, labelKey: 'menu.terms',          path: `/${lang}/terms`      },
    { icon: Shield,   labelKey: 'menu.privacy',        path: `/${lang}/privacy`    },
  ]
  const socialLinks = [
    { icon: Twitter,   label: 'Twitter/X', url: 'https://twitter.com/cartotvs' },
    { icon: Facebook,  label: 'Facebook',  url: 'https://facebook.com/dakulia' },
    { icon: Youtube,   label: 'YouTube',   url: 'https://youtube.com/@CartoTVs' },
    { icon: TikTokIcon,label: 'TikTok',    url: 'https://tiktok.com/@cartotv.com' },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 glass-panel border-0 h-10 w-10">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] bg-card/95 backdrop-blur-xl border-border/50">
        <SheetHeader className="text-left">
          <SheetTitle className="gradient-text text-xl">{t('menu.title')}</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-6">
          <nav className="space-y-2">
            {menuItems.map(item => (
              <Link key={item.path} href={item.path} onClick={() => setOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors text-foreground">
                <item.icon className="w-5 h-5 text-primary" />
                <span>{t(item.labelKey)}</span>
              </Link>
            ))}
          </nav>
          <div className="border-t border-border/50" />
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground px-4">{t('menu.followUs')}</p>
            <div className="flex flex-wrap gap-2 px-4">
              {socialLinks.map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition-colors text-sm text-foreground">
                  <s.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
