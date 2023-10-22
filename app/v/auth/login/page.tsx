'use client'

import logIn from '@/lib/auth/login'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { WithSpinner } from '@/components/spinner'
import Message from '@/components/message'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [err, setErr] = useState<
    { from: string[]; message: string } | undefined
  >()
  const [errMsg, setErrMsg] = useState<string | undefined>('')
  const router = useRouter()

  const setEmail = (email: string) => setForm((prev) => ({ ...prev, email }))

  const setPassword = (password: string) =>
    setForm((prev) => ({ ...prev, password }))

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setErr(undefined)
    setErrMsg(undefined)

    // Submit the form
    const { voter, error } = await logIn(form.email, form.password)
    if (!error) {
      console.log('Successfully logged in: ', voter)
      router.push('/v/dashboard/')
      return
    }

    setErrMsg(error.message)
    setErr(error)
    setLoading(false)
  }

  return (
    <form onSubmit={submit}>
      <Message text={errMsg} setText={setErrMsg} error />
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
            autoFocus={err?.from.includes('email')}
            className={`border ${
              err?.from.includes('email')
                ? 'border-red-400 focus:outline-red-400'
                : 'border-gray-400 focus:outline-primary'
            } rounded-md px-3 py-2 w-full`}
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
            autoFocus={err?.from.includes('password')}
            className={`border ${
              err?.from.includes('password')
                ? 'border-red-400 focus:outline-red-400'
                : 'border-gray-400 focus:outline-primary'
            } rounded-md px-3 py-2 w-full`}
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
              <WithSpinner>Loading...</WithSpinner>
            ) : (
              <p className='text-base font-semibold tracking-wider'>Sign in</p>
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
