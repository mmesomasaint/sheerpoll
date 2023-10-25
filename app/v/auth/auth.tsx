'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import firebase_app from '@/lib/firebase'
import type { Voter } from '@/lib/auth/types'
import { useRouter } from 'next/navigation'
import getVoter from '@/lib/auth/getVoter'
import { WithSpinner } from '@/components/spinner'

const auth = getAuth(firebase_app)

type AuthContextType = {
  voter: Voter | null
}

export const Auth = createContext<AuthContextType>({ voter: null })

export const useAuth = () => useContext(Auth)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [voter, setVoter] = useState<Voter | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getVoter(user.uid).then((currentVoter) => setVoter(currentVoter))
      } else {
        // If user is not a voter redirect to login pg.
        router.replace('/v/auth/login')
        setVoter(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <Auth.Provider value={{ voter: useMemo(() => voter, [voter]) }}>
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
