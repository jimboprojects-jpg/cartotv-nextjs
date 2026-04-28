'use client'
import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Header } from '@/components/ui/Header'
import { ChannelsPanel } from '@/components/ui/ChannelsPanel'
import { VideoPlayer } from '@/components/ui/VideoPlayer'
import { ZoomControls } from '@/components/ui/ZoomControls'
import { Instructions } from '@/components/ui/Instructions'
import { SideMenu } from '@/components/ui/SideMenu'
import { BuyMeCoffeeButton } from '@/components/ui/BuyMeCoffeeButton'
import { AffiliateButtons } from '@/components/ui/AffiliateButtons'
import type { Country, Channel } from '@/data/countries'
import type { SceneHandle } from '@/components/Globe/Scene'

const Scene = dynamic(
  () => import('@/components/Globe/Scene').then(m => m.Scene),
  { ssr: false, loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-64 h-64 rounded-full border-2 border-primary/30 animate-pulse" />
    </div>
  )}
)

export default function HomeClient({ lang }: { lang: string }) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [playingChannel, setPlayingChannel] = useState<Channel | null>(null)
  const sceneRef = useRef<SceneHandle>(null)

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[hsl(var(--space-dark))]" />
      <div className="absolute inset-0">
        <Scene ref={sceneRef} selectedCountry={selectedCountry} onSelectCountry={setSelectedCountry} />
      </div>
      <SideMenu />
      <Header onPlayChannel={setPlayingChannel} />
      <ChannelsPanel country={selectedCountry} onClose={() => setSelectedCountry(null)} onPlayChannel={setPlayingChannel} />
      <AffiliateButtons />
      <BuyMeCoffeeButton />
      <ZoomControls
        onZoomIn={() => sceneRef.current?.zoomIn()}
        onZoomOut={() => sceneRef.current?.zoomOut()}
        onReset={() => { sceneRef.current?.reset(); setSelectedCountry(null) }}
      />
      {!selectedCountry && <Instructions />}
      <VideoPlayer channel={playingChannel} onClose={() => setPlayingChannel(null)} />
    </div>
  )
}
