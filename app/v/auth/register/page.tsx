'use client'

import register from '@/lib/auth/register'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Register() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    verifyPassword: '',
  })

  const setName = (name: string) => setForm((prev) => ({ ...prev, name }))
  const setEmail = (email: string) => setForm((prev) => ({ ...prev, email }))

  const setPassword = (password: string) =>
    setForm((prev) => ({ ...prev, password }))

  const setVerifyPassword = (verifyPassword: string) =>
    setForm((prev) => ({ ...prev, verifyPassword }))

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Submit the form
    const { voter, error } = await register(
      form.name,
      form.email,
      form.password
    )
    if (!error) {
      console.log(`Successfully registered:`, voter)
      router.push('/v/dashboard/')
      return
    }
    console.log(error)
  }

  return (
    <form onSubmit={submit}>
      <div className='flex flex-col justify-center items-center gap-5 min-h-screen'>
        <h1 className='text-4xl font-bold'>Register</h1>
        <div className='flex flex-col justify-start items-start gap-2 w-[25%]'>
          <label htmlFor='name' className='text-base font-semibold'>
            Full Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={form.name}
            placeholder='Full Name'
            className='border border-gray-400 rounded-md px-3 py-2 text-sm font-medium w-full focus:outline-primary'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            className='border border-gray-400 rounded-md px-3 py-2 text-sm font-medium w-full focus:outline-primary'
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
            className='border border-gray-400 rounded-md px-3 py-2 text-sm font-medium w-full'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex flex-col justify-start items-start gap-2 w-[25%]'>
          <label htmlFor='v_password' className='text-base font-semibold'>
            Verify Password
          </label>
          <input
            type='v_password'
            id='v_password'
            name='v_password'
            value={form.verifyPassword}
            placeholder='Verify Password'
            className='border border-gray-400 rounded-md px-3 py-2 text-sm font-medium w-full'
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
        </div>
        <div className='flex flex-col justify-start items-center gap-5'>
          <button
            type='submit'
            className='px-7 py-3 text-white bg-primary rounded-md shadow-sm'
          >
            Register
          </button>
          <Link
            href='/v/auth/login/'
            className='text-base font-semibold hover:underline hover:underline-offset-4 hover:text-primary'
          >
            I have an account?
          </Link>
        </div>
      </div>
    </form>
  )
}
