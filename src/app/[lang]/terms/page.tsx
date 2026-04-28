import type { Metadata } from 'next'
import { TermsClient } from './TermsClient'
export const metadata: Metadata = {
  title: 'Terms of Service | CartoTV',
  description: 'Read the CartoTV Terms of Service. Learn about acceptable use, content policies, and your rights when using our free live TV streaming platform.',
  alternates: { canonical: 'https://cartotv.com/en/terms' },
}
export default function TermsPage({ params }: { params: { lang: string } }) { return <TermsClient lang={params.lang} /> }
