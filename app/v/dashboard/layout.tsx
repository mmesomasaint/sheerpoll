'use client'

import { AuthProvider } from '../auth/auth'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>{children}</AuthProvider>
  )
}
