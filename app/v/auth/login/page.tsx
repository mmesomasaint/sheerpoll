'use client'

import logIn from '@/lib/auth/login'
import { useState, FormEvent } from 'react'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [err, setErr] = useState<string>('')

  const setEmail = (email: string) => setForm((prev) => ({ ...prev, email }))

  const setPassword = (password: string) =>
    setForm((prev) => ({ ...prev, password }))

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Submit the form
    const {voter, error} = await logIn(form.email, form.password)
    if (!error) {
      console.log(voter)
      return
    }

    setErr(error.message ?? 'An Error Occured while logging in')
  }

  return (
    <form onSubmit={submit}>
      <div className='flex flex-col justify-center items-center py-20 gap-5'>
        <div className='flex flex-col justify-start items-start gap-2'> 
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={form.email}
            placeholder='Email'
            className='border border-gray-400 rounded-md px-3 py-2'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex flex-col justify-start items-start gap-2'> 
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            className='border border-gray-400 rounded-md px-3 py-2'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex flex-col justify-start items-center gap-5'>
          <button
            type='submit'
            className='px-7 py-3 text-white bg-primary rounded-md shadow-sm'
          >
            Login
          </button>
          <p className='text-base font-semibold hover:underline hover:underline-offset-4 hover:text-primary'>
            I don&apos;t have an account?
          </p>
        </div>
      </div>
    </form>
  )
}
