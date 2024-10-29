// src/app/layout.tsx (this is the correct file, I see it in your structure)
import { Inter } from 'next/font/google'
import { Web3Provider } from '@/contexts/Web3Context'
import { Providers } from '@/app/providers'  // Your existing wagmi/rainbowkit providers
import { Navbar } from '@/components/layout/Navbar'  // Adjust this path if needed
import '@/app/globals.css'  // Updated to match your structure

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Web3Provider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
            </div>
          </Web3Provider>
        </Providers>
      </body>
    </html>
  )
}