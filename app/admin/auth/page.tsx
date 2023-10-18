'use client'

import {useState, FormEvent} from 'react'

export default function Auth() {
  const [form ,setForm] = useState({
    rank: '',
    passcode: '',
  })

  const setRank = (rank: string) => setForm((prev) => ({ ...prev, rank }))
  const setPasscode = (passcode: string) => setForm((prev) => ({ ...prev, passcode }))

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Submit the form
  }

  return (
    <form onSubmit={submit}>
      <div className='flex flex-col justify-center items-center gap-5 min-h-screen'>
        <div className='flex flex-col justify-start items-start gap-2'>
          <label htmlFor='passcode' className='text-base font-semibold'>
            Passcode
          </label>
          <input
            type='passcode'
            id='passcode'
            name='passcode'
            value={form.passcode}
            placeholder='passcode'
            className='border border-gray-400 rounded-md px-3 py-2'
            onChange={(e) => setPasscode(e.target.value)}
          />
        </div>
        <div className='flex flex-col justify-start items-center gap-5'>
          <button
            type='submit'
            className='px-7 py-3 text-white bg-primary rounded-md shadow-sm'
          >
            Sign in
          </button>
        </div>
      </div>
    </form>
  )
}