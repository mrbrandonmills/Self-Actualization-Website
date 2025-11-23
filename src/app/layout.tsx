import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/custom-cursor'
import Navigation from '@/components/navigation'
import SmoothScroll from '@/components/smooth-scroll'
import PageTransition from '@/components/page-transition'
import Footer from '@/components/footer'

// Playfair Display - Luxury serif for headings
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

// Inter - Clean sans-serif for body text
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Self Actualized Life - Transform Your Reality',
  description: 'Unlock your full potential with luxury coaching, premium resources, and transformational guidance. Your journey to self-actualization begins here.',
  keywords: ['self-actualization', 'personal development', 'luxury coaching', 'transformation', 'mindset', 'success'],
  authors: [{ name: 'The Self Actualized Life' }],
  openGraph: {
    title: 'The Self Actualized Life - Transform Your Reality',
    description: 'Unlock your full potential with luxury coaching and transformational guidance.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Self Actualized Life',
    description: 'Transform your reality. Unlock your full potential.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // Add Google verification code when ready
    // google: 'your-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          <CustomCursor />
          <Navigation />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
