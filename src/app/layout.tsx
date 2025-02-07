import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { Web3Provider } from '@/context/Web3Context'
import { ProfileSetup } from '@/components/ProfileSetup'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Human Hours',
  description: 'Trade skills, earn hours, build trust.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
        </Web3Provider>
      </body>
    </html>
  )
} 