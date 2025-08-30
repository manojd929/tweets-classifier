import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Balaganapathi Tweets Showcase',
  description: 'A curated collection of Balaganapathi\'s tweets on saints, astrology, and philosophy of life',
  keywords: 'Balaganapathi, tweets, saints, astrology, philosophy, spirituality',
  authors: [{ name: 'manojd929' }],
  openGraph: {
    title: 'Balaganapathi Tweets Showcase',
    description: 'A curated collection of Balaganapathi\'s tweets on saints, astrology, and philosophy of life',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
          {children}
        </div>
      </body>
    </html>
  )
}
