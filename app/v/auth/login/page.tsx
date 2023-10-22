'use client'

import logIn from '@/lib/auth/login'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Spinner from '@/components/spinner'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [err, setErr] = useState<string>('')
  const router = useRouter()

  const setEmail = (email: string) => setForm((prev) => ({ ...prev, email }))

  const setPassword = (password: string) =>
    setForm((prev) => ({ ...prev, password }))

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Submit the form
    const { voter, error } = await logIn(form.email, form.password)
    if (!error) {
      console.log('Successfully logged in: ', voter)
      router.push('/v/dashboard/')
      return
    }

    setErr(error.message ?? 'An Error Occured while logging in')
    setLoading(false)
  }

  return (
    <form onSubmit={submit}>
      <div className='flex flex-col justify-center items-center py-20 gap-5 min-h-screen'>
        <h1 className='text-4xl font-bold'>LogIn</h1>
        <div className='flex flex-col justify-start items-start gap-2 w-[25%]'>
          <label htmlFor='email' className='text-base font-semibold'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={form.email}
            placeholder='Email'
            className='border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-primary'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex flex-col justify-start items-start gap-2 w-[25%]'>
          <label htmlFor='password' className='text-base font-semibold'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={form.password}
            placeholder='Password'
            className='border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-primary'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex flex-col justify-start items-center gap-5'>
          <button
            type='submit'
            disabled={loading}
            className='px-7 py-3 text-white bg-primary rounded-md shadow-sm disabled:bg-black/60'
          >
          {loading ? (
            <div className='flex justify-center gap-2 items-center'>
              <Spinner />
              <p className='text-base font-semibold'>Loading...</p>
            </div>
          ) : (
            <p className='text-base font-semibold'>Sign In</p>
          )}
          </button>
          <Link
            href='/v/auth/register/'
            className='text-base font-semibold hover:underline hover:underline-offset-4 hover:text-primary'
          >
            I don&apos;t have an account?
          </Link>
        </div>
      </div>
    </form>
  )
}
