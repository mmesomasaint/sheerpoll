'use client'
import { useState, FormEvent } from 'react'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })

  const setEmail = (email: string) => setForm((prev) => ({ ...form, email }))
  const setPassword = (password: string) =>
    setForm((prev) => ({ ...form, password }))
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Submit the form
  }

  return (
    <form onSubmit={submit}>
      <div className='flex flex-col gap-5'>
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
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          className='border border-gray-400 rounded-md px-3 py-2'
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='flex justify-start items-center gap-10'>
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
