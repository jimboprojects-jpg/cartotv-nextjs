export interface ChannelManifest { generatedAt: string; totalChannels: number; countries: Record<string, string[]> }
export interface ChannelEntry { name: string; slug: string }

function toSlug(name: string) { return name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') }

let _manifest: ChannelManifest | null = null
export function getChannelManifest(): ChannelManifest {
  if (_manifest) return _manifest
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  _manifest = require('../../scripts/channel-manifest.json') as ChannelManifest
  return _manifest
}

export function getAllChannelParams(): { country: string; channel: string }[] {
  const manifest = getChannelManifest()
  const params: { country: string; channel: string }[] = []
  const seen = new Set<string>()
  for (const [countryName, channels] of Object.entries(manifest.countries)) {
    const countrySlug = toSlug(countryName)
    for (const ch of channels) {
      const channelSlug = toSlug(ch)
      if (!channelSlug) continue
      const key = `${countrySlug}::${channelSlug}`
      if (seen.has(key)) continue
      seen.add(key)
      params.push({ country: countrySlug, channel: channelSlug })
    }
  }
  return params
}

export function getChannelFromManifest(countrySlug: string, channelSlug: string): { name: string; countryName: string } | null {
  const manifest = getChannelManifest()
  for (const [countryName, channels] of Object.entries(manifest.countries)) {
    if (toSlug(countryName) !== countrySlug) continue
    for (const ch of channels) {
      if (toSlug(ch) === channelSlug) return { name: ch, countryName }
    }
  }
  return null
}

export function getCountryChannelsFromManifest(countrySlug: string): ChannelEntry[] {
  const manifest = getChannelManifest()
  for (const [countryName, channels] of Object.entries(manifest.countries)) {
    if (toSlug(countryName) !== countrySlug) continue
    return channels.map(name => ({ name, slug: toSlug(name) }))
  }
  return []
}
