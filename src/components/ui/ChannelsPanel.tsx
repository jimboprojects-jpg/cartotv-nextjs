'use client'
import { useState, useEffect, useMemo } from 'react';
import { X, Tv, Eye, Play, Loader2, Heart, Share2, Search, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Country, Channel, parseM3U } from '@/data/countries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFavorites } from '@/hooks/useFavorites';
import { toast } from '@/hooks/use-toast';

interface ChannelsPanelProps {
  country: Country | null;
  onClose: () => void;
  onPlayChannel: (channel: Channel) => void;
}

export const ChannelsPanel = ({ country, onClose, onPlayChannel }: ChannelsPanelProps) => {
  const { t } = useTranslation();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!country) {
      setChannels([]);
      return;
    }

    const fetchChannels = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(country.url);
        if (!response.ok) throw new Error('Failed to fetch channels');
        
        const content = await response.text();
        const parsedChannels = parseM3U(content);
        setChannels(parsedChannels);
      } catch (err) {
        setError(t('channels.error'));
        setChannels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
    setSearchQuery('');
    setSelectedCategory('All');
  }, [country, t]);

  const filteredChannels = useMemo(() => {
    return channels.filter(channel => {
      const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || 
        channel.category?.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [channels, searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    const cats = new Set(channels.map(c => c.category || 'General'));
    return ['All', ...Array.from(cats)];
  }, [channels]);

  const handleShare = async (channel: Channel) => {
    const shareText = t('channels.shareText', { name: channel.name, country: country?.name });
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: channel.name,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      toast({
        title: t('channels.linkCopied'),
        description: t('channels.linkCopiedDesc'),
      });
    }
  };

  const handleFavorite = (channel: Channel) => {
    if (!country) return;
    toggleFavorite(channel, country.name, country.flag);
    toast({
      title: isFavorite(channel.url) ? t('channels.removedFromFavorites') : t('channels.addedToFavorites'),
      description: channel.name,
    });
  };

  if (!country) return null;

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(0)}K`;
    }
    return views.toString();
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:right-auto md:left-6 md:bottom-6 z-50 md:w-[380px] lg:w-[420px] max-h-[70vh] md:max-h-[80vh] glass-panel animate-fade-in flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-3 md:p-4 border-b border-border/50 flex-shrink-0">
        <div className="flex items-start justify-between mb-2 md:mb-3">
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
            <img 
              src={country.flag} 
              alt={`${country.name} flag`}
              className="w-8 h-6 md:w-10 md:h-7 object-cover rounded shadow-md flex-shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-base md:text-lg font-bold text-foreground truncate">{country.name}</h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Tv className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">
                  {loading ? t('channels.loading') : t('channels.count', { filtered: filteredChannels.length, total: channels.length })}
                </span>
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground flex-shrink-0"
            onClick={onClose}
            aria-label={t('common.close')}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-2 md:mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t('channels.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-secondary/50"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          {categories.slice(0, 6).map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'ghost'}
              size="sm"
              className="h-7 px-2 text-xs whitespace-nowrap flex-shrink-0"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'All' ? t('channels.all') : cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Channels List */}
      <div className="flex-1 overflow-y-auto scrollbar-visible p-2 md:p-3 space-y-2">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}
        
        {error && (
          <div className="text-center py-8 text-muted-foreground">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && filteredChannels.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>{t('channels.noChannels')}</p>
          </div>
        )}

        {filteredChannels.map((channel, index) => (
          <div
            key={`${channel.name}-${index}`}
            className="group flex items-center gap-2 p-2 md:p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            {/* Channel Info - Clickable */}
            <div 
              className="flex items-center gap-2 md:gap-3 flex-1 min-w-0 cursor-pointer"
              onClick={() => onPlayChannel(channel)}
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {channel.logo ? (
                  <img 
                    src={channel.logo} 
                    alt={channel.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<svg class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>';
                    }}
                  />
                ) : (
                  <Tv className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm font-medium text-foreground truncate">
                  {channel.name}
                </p>
                <div className="flex items-center gap-1 md:gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span className="text-red-400">{formatViews(channel.liveViews)}</span>
                  </span>
                  {channel.category && (
                    <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[10px] truncate max-w-[60px]">
                      {channel.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 md:h-8 md:w-8 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                onClick={() => handleFavorite(channel)}
                aria-label={isFavorite(channel.url) ? t('channels.removeFavorite') : t('channels.addFavorite')}
              >
                <Heart className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isFavorite(channel.url) ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 md:h-8 md:w-8 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                onClick={() => handleShare(channel)}
                aria-label={t('channels.share')}
              >
                <Share2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 md:h-8 md:w-8 text-primary"
                onClick={() => onPlayChannel(channel)}
                aria-label={t('channels.play')}
              >
                <Play className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
