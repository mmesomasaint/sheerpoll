import { useState, FormEvent } from 'react'

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    verifyPassword: '',
  })

  const setName = (name: string) => setForm((prev) => ({ ...form, name }))
  const setEmail = (email: string) => setForm((prev) => ({ ...form, email }))
  const setPassword = (password: string) =>
    setForm((prev) => ({ ...form, password }))
  const setVerifyPassword = (verifyPassword: string) =>
    setForm((prev) => ({ ...form, verifyPassword }))
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Submit the form
  }

  return (
    <form onSubmit={submit}>
      <div className='flex flex-col gap-5'>
        <label htmlFor='name'>Full Name</label>
        <input
          type='text'
          id='name'
          name='name'
          value={form.name}
          placeholder='Full Name'
          className='border border-gray-400 rounded-md px-3 py-2'
          onChange={(e) => setName(e.target.value)}
        />
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
          value={form.password}
          placeholder='Password'
          className='border border-gray-400 rounded-md px-3 py-2'
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor='v_password'>Verify Password</label>
        <input
          type='v_password'
          id='v_password'
          name='v_password'
          value={form.verifyPassword}
          placeholder='Verify Password'
          className='border border-gray-400 rounded-md px-3 py-2'
          onChange={(e) => setVerifyPassword(e.target.value)}
        />
        <div className='flex justify-start items-center gap-10'>
          <button
            type='submit'
            className='px-7 py-3 text-white bg-primary rounded-md shadow-sm'
          >
            Register
          </button>
          <p className='text-base font-semibold'>I have an account</p>
        </div>
      </div>
    </form>
  )
}