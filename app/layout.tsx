import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const inter = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Sheerpoll',
  description: 'Pure and transparent election conducting platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
