'use client'

import Link from 'next/link'
import { AuthProvider } from '../auth/auth'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>{children}</AuthProvider>
  )
}
