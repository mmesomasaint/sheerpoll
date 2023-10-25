'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { WithSpinner } from '@/components/spinner'

type SessionType = {
  auth: string | undefined
  id: string | undefined
}

type AuthContextType = {
  admin: SessionType | null
  setAdmin?: (admin: SessionType) => void
}

export const Auth = createContext<AuthContextType>({ admin: null })

export const useAuth = () => useContext(Auth)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<SessionType | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!admin) {
      router.replace('/admin/auth/')
    }
    setLoading(false)
  }, [admin])

  return (
    <Auth.Provider value={{ admin, setAdmin }}>
      {loading ? (
        <div className='flex justify-center items-center min-h-screen bg-black/30'>
          <WithSpinner dark>Loading...</WithSpinner>
        </div>
      ) : (
        children
      )}
    </Auth.Provider>
  )
}
