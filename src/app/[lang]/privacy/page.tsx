import type { Metadata } from 'next'
import { PrivacyClient } from './PrivacyClient'
export const metadata: Metadata = {
  title: 'Privacy Policy | CartoTV',
  description: 'Read the CartoTV Privacy Policy. We do not collect personal data, require no account, and use only minimal analytics cookies.',
  alternates: { canonical: 'https://cartotv.com/en/privacy' },
}
export default function PrivacyPage({ params }: { params: { lang: string } }) { return <PrivacyClient lang={params.lang} /> }
