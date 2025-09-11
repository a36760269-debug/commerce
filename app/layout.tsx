import type { Metadata } from 'next'
import { Inter, Noto_Sans_Arabic } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const notoSansArabic = Noto_Sans_Arabic({ 
  subsets: ['arabic'], 
  variable: '--font-arabic' 
})

export const metadata: Metadata = {
  title: 'Commerce Platform - Connect, Trade, Deliver',
  description: 'A comprehensive marketplace connecting buyers, sellers, and couriers with trust badges, smart matching, and seamless experiences.',
  keywords: 'marketplace, ecommerce, delivery, courier, seller, buyer, platform',
  authors: [{ name: 'Commerce Platform Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansArabic.variable} antialiased`}>
        <LanguageProvider>
          <AuthProvider>
            <div className="min-h-screen bg-gray-50">
              {children}
            </div>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  style: {
                    background: '#10b981',
                  },
                },
                error: {
                  style: {
                    background: '#ef4444',
                  },
                },
              }}
            />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}