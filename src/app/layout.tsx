import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'PathPilot – India Multi-Modal Travel',
  description: 'Compare flights, trains, and buses across Maharashtra, Bihar, Gujarat, Delhi & Rajasthan. Book the best routes in one place.',
  keywords: 'travel india, flights trains buses, maharashtra, bihar, gujarat, delhi, rajasthan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${inter.variable} font-display antialiased bg-bg-light text-slate-900`}>
        {children}
      </body>
    </html>
  )
}
