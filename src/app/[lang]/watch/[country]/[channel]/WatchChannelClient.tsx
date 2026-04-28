'use client'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { ArrowLeft, Tv, Heart, Share2, Play, Eye, Loader2, ChevronRight } from 'lucide-react'
import { InlineVideoPlayer } from '@/components/ui/InlineVideoPlayer'
import { getCountryBySlug } from '@/utils/countrySlug'
import { toChannelSlug, findChannelBySlug } from '@/utils/channelSlug'
import { Channel, parseM3U } from '@/data/countries'
import { Button } from '@/components/ui/button'
import { useFavorites } from '@/hooks/useFavorites'
import { toast } from '@/hooks/use-toast'

interface ManifestChannel { name: string; slug: string }
interface Props {
  lang: string; countrySlug: string; channelSlug: string
  resolvedChannelName: string; resolvedCountryName: string
  resolvedCountryFlag?: string; relatedFromManifest: ManifestChannel[]
}

export function WatchChannelClient({ lang, countrySlug, channelSlug, resolvedChannelName, resolvedCountryName, resolvedCountryFlag, relatedFromManifest }: Props) {
  const { t } = useTranslation()
  const router = useRouter()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [channels, setChannels] = useState<Channel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const countryData = getCountryBySlug(countrySlug)

  useEffect(() => {
    if (!countryData) { setLoading(false); return }
    const fetch_ = async () => {
      setLoading(true); setError(null)
      try {
        const res = await fetch(countryData.url)
        if (!res.ok) throw new Error('Failed')
        setChannels(parseM3U(await res.text()))
      } catch { setError(t('channels.error')) }
      finally { setLoading(false) }
    }
    fetch_()
  }, [countryData, t])

  const currentChannel = useMemo(() => {
    if (channels.length === 0) return null
    const idx = findChannelBySlug(channels, channelSlug)
    return idx >= 0 ? channels[idx] : null
  }, [channels, channelSlug])

  const relatedChannels = useMemo(() => {
    if (!currentChannel) return []
    return channels.filter(ch => ch.name !== currentChannel.name && ch.category === currentChannel.category).slice(0, 12)
  }, [channels, currentChannel])

  const formatViews = (v: number) => v >= 1000 ? `${(v/1000).toFixed(0)}K` : v.toString()
  const flag = resolvedCountryFlag ?? countryData?.flag

  const handleFavorite = (channel: Channel) => {
    if (!countryData) return
    toggleFavorite(channel, countryData.name, countryData.flag)
    toast({ title: isFavorite(channel.url) ? t('channels.removedFromFavorites') : t('channels.addedToFavorites'), description: channel.name })
  }

  const handleShare = async (channel: Channel) => {
    const text = `Watch ${channel.name} from ${resolvedCountryName} free on CartoTV!`
    const url = window.location.href
    if (navigator.share) { try { await navigator.share({ title: channel.name, text, url }) } catch {} }
    else { await navigator.clipboard.writeText(`${text}\n${url}`); toast({ title: t('channels.linkCopied') }) }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-4 flex-wrap">
          <Link href={`/${lang}`} className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/${lang}/watch`} className="hover:text-foreground transition-colors">Watch</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/${lang}/watch/${countrySlug}`} className="hover:text-foreground transition-colors flex items-center gap-1">
            {flag && <img src={flag} alt={resolvedCountryName} className="w-5 h-3.5 object-cover rounded" />}
            {resolvedCountryName}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{resolvedChannelName}</span>
        </nav>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading {resolvedChannelName}...</p>
          </div>
        )}

        {!loading && !currentChannel && (
          <div className="text-center py-16">
            <Tv className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Watch {resolvedChannelName} Live</h1>
            <p className="text-muted-foreground mb-6">from {resolvedCountryName} — stream may be temporarily unavailable.</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => router.push(`/${lang}/watch/${countrySlug}`)}>Browse {resolvedCountryName} channels</Button>
              <Button variant="outline" onClick={() => window.location.reload()}>Try again</Button>
            </div>
          </div>
        )}

        {!loading && currentChannel && (
          <>
            <div className="mb-6"><InlineVideoPlayer channel={currentChannel} /></div>
            <div className="flex items-start gap-4 mb-8">
              <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {currentChannel.logo
                  ? <img src={currentChannel.logo} alt={currentChannel.name} className="w-full h-full object-cover" onError={e=>{(e.target as HTMLImageElement).style.display='none'}} />
                  : <Tv className="w-8 h-8 text-primary" />}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold mb-1">Watch {currentChannel.name} Live — Free Stream from {resolvedCountryName}</h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /><span className="text-red-400">{formatViews(currentChannel.liveViews)} watching</span></span>
                  {currentChannel.category && <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs">{currentChannel.category}</span>}
                  {flag && <span className="flex items-center gap-1"><img src={flag} alt={resolvedCountryName} className="w-4 h-3 object-cover rounded" />{resolvedCountryName}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleFavorite(currentChannel)}>
                    <Heart className={`w-4 h-4 mr-1 ${isFavorite(currentChannel.url)?'fill-red-500 text-red-500':''}`} />
                    {isFavorite(currentChannel.url)?'Saved':'Save'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare(currentChannel)}><Share2 className="w-4 h-4 mr-1" />Share</Button>
                  <Button variant="ghost" size="sm" onClick={() => router.push(`/${lang}/watch/${countrySlug}`)}><ArrowLeft className="w-4 h-4 mr-1" />All channels</Button>
                </div>
              </div>
            </div>

            <section className="prose prose-sm prose-invert max-w-none mb-8">
              <h2>About {currentChannel.name}</h2>
              <p>{currentChannel.name} is a {currentChannel.category?.toLowerCase()||'television'} channel broadcasting from {resolvedCountryName}. Watch {currentChannel.name} live online for free on CartoTV — no registration, no subscription, no downloads required.{currentChannel.category && ` As a ${currentChannel.category.toLowerCase()} channel, ${currentChannel.name} delivers quality ${currentChannel.category.toLowerCase()} programming to viewers worldwide.`}</p>
              <p>CartoTV provides free access to thousands of live TV channels from {resolvedCountryName} and 178 other countries worldwide. Whether you're looking for news, sports, entertainment, or cultural programming, CartoTV has you covered with reliable streams available 24/7.</p>
              <h3>How to Watch {currentChannel.name}</h3>
              <ol>
                <li>Click the play button above to start streaming {currentChannel.name} instantly</li>
                <li>No account creation or payment required — completely free</li>
                <li>Works on desktop, tablet, and mobile browsers</li>
                <li>Save this channel to your favourites for quick access later</li>
              </ol>
              <h3>Why Watch {currentChannel.name} on CartoTV?</h3>
              <p>CartoTV aggregates free-to-air live TV streams from around the globe into one easy-to-use platform. {currentChannel.name} from {resolvedCountryName} is just one of over 10,000 channels available. No sign-up, no credit card, works on any modern browser.</p>
            </section>

            {relatedChannels.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-bold mb-3">More {currentChannel.category||''} channels from {resolvedCountryName}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {relatedChannels.map((ch,i) => (
                    <Link key={`${ch.name}-${i}`} href={`/${lang}/watch/${countrySlug}/${toChannelSlug(ch.name)}`}
                      className="group flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                      <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {ch.logo ? <img src={ch.logo} alt={ch.name} className="w-full h-full object-cover" loading="lazy" /> : <Tv className="w-5 h-5 text-primary" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{ch.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Eye className="w-3 h-3" /><span className="text-red-400">{formatViews(ch.liveViews)}</span></p>
                      </div>
                      <Play className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Manifest-based related channels — always visible for SEO */}
        {!currentChannel && relatedFromManifest.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-3">More channels from {resolvedCountryName}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {relatedFromManifest.map(ch => (
                <Link key={ch.slug} href={`/${lang}/watch/${countrySlug}/${ch.slug}`}
                  className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                  <Tv className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm truncate">{ch.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
