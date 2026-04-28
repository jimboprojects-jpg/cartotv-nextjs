'use client'
import { Tv, MapPin, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { countries, Channel } from '@/data/countries';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { LanguageSelector } from '@/components/ui/LanguageSelector';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HeaderProps {
  onPlayChannel?: (channel: Channel) => void;
}

export const Header = ({ onPlayChannel }: HeaderProps) => {
  const { t } = useTranslation();
  const { favorites, removeFavorite } = useFavorites();
  const totalCountries = countries.length;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4">
      <div className="flex items-center justify-between">
        <div className="glass-panel px-4 py-3 flex items-center gap-3">
          <img src="/carto-tv-logo.png" alt="Carto TV" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Carto TV
            </h1>
            <p className="text-xs text-muted-foreground">{t('header.tagline')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass-panel px-4 py-2 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{totalCountries}</span>
              <span className="text-xs text-muted-foreground">{t('header.countries')}</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">10K+</span>
              <span className="text-xs text-muted-foreground">{t('header.channels')}</span>
            </div>
          </div>

          <LanguageSelector />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="glass-panel border-0 gap-2">
                <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                <span className="hidden sm:inline">{t('header.favorites')}</span>
                {favorites.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-xs">{favorites.length}</span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  {t('header.favorites')} ({favorites.length})
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-100px)] mt-4">
                {favorites.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Heart className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>{t('header.noFavorites')}</p>
                  </div>
                ) : (
                  <div className="space-y-2 pr-4">
                    {favorites.map((channel, index) => (
                      <div key={`${channel.url}-${index}`} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group">
                        <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" onClick={() => onPlayChannel?.(channel)}>
                          <img src={channel.countryFlag} alt="" className="w-6 h-4 object-cover rounded" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{channel.name}</p>
                            <p className="text-xs text-muted-foreground">{channel.countryName}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => removeFavorite(channel.url)}>
                          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
