'use client'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Search, Tv, Play, Eye, Loader2, Heart, Share2, Filter, ArrowLeft, Globe } from 'lucide-react'
import { VideoPlayer } from '@/components/ui/VideoPlayer'
import { getCountryBySlug } from '@/utils/countrySlug'
import { toChannelSlug } from '@/utils/channelSlug'
import { countries, Channel, parseM3U } from '@/data/countries'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFavorites } from '@/hooks/useFavorites'
import { toast } from '@/hooks/use-toast'

interface Props { lang: string; countrySlug: string; seoContent?: string }

export function WatchCountryClient({ lang, countrySlug, seoContent }: Props) {
  const { t } = useTranslation()
  const router = useRouter()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [channels, setChannels] = useState<Channel[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [countrySearch, setCountrySearch] = useState('')
  const [playingChannel, setPlayingChannel] = useState<Channel | null>(null)
  const countryData = getCountryBySlug(countrySlug)

  const filteredCountries = useMemo(() => {
    if (!countrySearch) return countries
    return countries.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()))
  }, [countrySearch])

  useEffect(() => {
    if (!countryData) return
    const fetch_ = async () => {
      setLoading(true); setError(null)
      try {
        const res = await fetch(countryData.url)
        if (!res.ok) throw new Error('Failed')
        setChannels(parseM3U(await res.text()))
      } catch { setError(t('channels.error')); setChannels([]) }
      finally { setLoading(false) }
    }
    fetch_(); setSearchQuery(''); setSelectedCategory('All')
  }, [countryData, t])

  const filteredChannels = useMemo(() => channels.filter(ch => {
    return ch.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === 'All' || ch.category?.toLowerCase().includes(selectedCategory.toLowerCase()))
  }), [channels, searchQuery, selectedCategory])

  const categories = useMemo(() => {
    const cats = new Set(channels.map(c => c.category || 'General'))
    return ['All', ...Array.from(cats)]
  }, [channels])

  const formatViews = (v: number) => v >= 1000 ? `${(v/1000).toFixed(0)}K` : v.toString()

  const handleFavorite = (channel: Channel) => {
    if (!countryData) return
    toggleFavorite(channel, countryData.name, countryData.flag)
    toast({ title: isFavorite(channel.url) ? t('channels.removedFromFavorites') : t('channels.addedToFavorites'), description: channel.name })
  }

  const handleShare = async (channel: Channel) => {
    const text = `Watch ${channel.name} from ${countryData?.name} free on CartoTV!`
    const url = window.location.href
    if (navigator.share) { try { await navigator.share({ title: channel.name, text, url }) } catch {} }
    else { await navigator.clipboard.writeText(`${text}\n${url}`); toast({ title: t('channels.linkCopied') }) }
  }

  if (!countryData) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.push(`/${lang}`)}><ArrowLeft className="w-5 h-5" /></Button>
            <div>
              <h1 className="text-2xl font-bold">{t('countryPage.watchLiveTV')}</h1>
              <p className="text-sm text-muted-foreground">{t('countryPage.selectCountry')}</p>
            </div>
          </div>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder={t('countryPage.searchCountries')} value={countrySearch} onChange={e=>setCountrySearch(e.target.value)} className="pl-9" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredCountries.map(c => (
              <button key={c.name} onClick={() => router.push(`/${lang}/watch/${c.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}`)}
                className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-left">
                <img src={c.flag} alt={c.name} className="w-8 h-6 object-cover rounded shadow-sm" onError={e=>{(e.target as HTMLImageElement).style.display='none'}} />
                <span className="text-sm font-medium truncate">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push(`/${lang}/watch`)}><ArrowLeft className="w-5 h-5" /></Button>
          <img src={countryData.flag} alt={countryData.name} className="w-10 h-7 object-cover rounded shadow-md" />
          <div>
            <h1 className="text-2xl font-bold">Watch {countryData.name} TV Channels – Free Live Stream</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Tv className="w-3 h-3" />
              {loading ? t('channels.loading') : t('countryPage.channelCount', { filtered: filteredChannels.length, total: channels.length })}
            </p>
          </div>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder={t('channels.searchPlaceholder')} value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} className="pl-9" />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto pb-3 mb-4">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          {categories.slice(0,8).map(cat => (
            <Button key={cat} variant={selectedCategory===cat?'default':'ghost'} size="sm" className="h-7 px-2 text-xs whitespace-nowrap flex-shrink-0" onClick={()=>setSelectedCategory(cat)}>
              {cat==='All'?t('channels.all'):cat}
            </Button>
          ))}
        </div>
        {loading && <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}
        {error && <p className="text-center py-12 text-muted-foreground">{error}</p>}
        {!loading && !error && filteredChannels.length===0 && <p className="text-center py-12 text-muted-foreground">{t('channels.noChannels')}</p>}
        <div className="space-y-2">
          {filteredChannels.map((ch, i) => (
            <div key={`${ch.name}-${i}`} className="group flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <Link href={`/${lang}/watch/${countrySlug}/${toChannelSlug(ch.name)}`} className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {ch.logo ? <img src={ch.logo} alt={ch.name} className="w-full h-full object-cover" loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.display='none'}} /> : <Tv className="w-5 h-5 text-primary" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{ch.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /><span className="text-red-400">{formatViews(ch.liveViews)}</span></span>
                    {ch.category && <span className="px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[10px] truncate max-w-[80px]">{ch.category}</span>}
                  </div>
                </div>
              </Link>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8 md:opacity-0 md:group-hover:opacity-100 transition-opacity" onClick={()=>handleFavorite(ch)}>
                  <Heart className={`w-4 h-4 ${isFavorite(ch.url)?'fill-red-500 text-red-500':''}`} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 md:opacity-0 md:group-hover:opacity-100 transition-opacity" onClick={()=>handleShare(ch)}>
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={()=>setPlayingChannel(ch)}>
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        {seoContent && (
          <section className="mt-12 prose prose-sm prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: seoContent }} />
          </section>
        )}
      </div>
      <VideoPlayer channel={playingChannel} onClose={() => setPlayingChannel(null)} />
    </div>
  )
}
