import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://cartotv.com'),
  title: { default: 'CartoTV – Free Online Live TV Channels from Around the World', template: '%s | CartoTV' },
  description: 'Watch live TV channels from around the world with CartoTV. Stream news, sports, movies, kids and entertainment channels online by country — No sign-up required.',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  verification: { other: { 'msvalidate.01': ['54877744799106B3304BF9074BD01A16'] } },
  applicationName: 'CartoTV',
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
  openGraph: { siteName: 'CartoTV', images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', site: '@CartoTV', creator: '@CartoTV' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#00e6b8" />
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2116450199889361" crossOrigin="anonymous" strategy="afterInteractive" />
        <Script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer strategy="afterInteractive" />
        <Script id="onesignal-init" strategy="afterInteractive">{`
          window.OneSignalDeferred = window.OneSignalDeferred || [];
          OneSignalDeferred.push(async function(OneSignal) {
            await OneSignal.init({ appId: "4c598172-f798-4bd2-9483-90e2aefaf259" });
          });
        `}</Script>
      </head>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-LVEWCM7QE2" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LVEWCM7QE2');
        `}</Script>
        {children}
      </body>
    </html>
  )
}
