'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { onAuthStateChanged, getAuth, User as Voter } from 'firebase/auth'
import firebase_app from '@/lib/firebase'
import { useRouter } from 'next/navigation'

const auth = getAuth(firebase_app)

type AuthContextType = {
  voter: Voter | null
}

export const Auth = createContext<AuthContextType>({ voter: null })

export const useAuth = () => useContext(Auth)

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [voter, setVoter] = useState<Voter | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setVoter(user)
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
    <Auth.Provider
      value={{ voter: useMemo(() => voter, [voter]) }}
    >
      {loading ? <div className='flex justify-center items-center'>Loading...</div> : children}
    </Auth.Provider>
  )
}
