import type { Metadata } from 'next'
import { WhoWeAreClient } from './WhoWeAreClient'
export const metadata: Metadata = {
  title: 'Who We Are – About CartoTV',
  description: 'Learn about CartoTV — the free global live TV platform with 10,000+ channels from 179 countries. No signup, no subscription required.',
  alternates: { canonical: 'https://cartotv.com/en/who-we-are' },
}
export default function WhoWeArePage({ params }: { params: { lang: string } }) {
  return <WhoWeAreClient lang={params.lang} />
}
