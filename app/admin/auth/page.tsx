'use client'

import { useState, FormEvent } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useAuth } from './auth'
import {useRouter} from 'next/navigation'
import authAdmin from '@/lib/auth/authAdmin'

export default function Auth() {
  const { setAdmin } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState<{ rank: null | string; passcode: string }>({
    rank: null,
    passcode: '',
  })

  const setRank = (rank: string) => setForm((prev) => ({ ...prev, rank }))
  const setPasscode = (passcode: string) =>
    setForm((prev) => ({ ...prev, passcode }))

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Submit the form
    const adminSession = authAdmin(form.rank, form.passcode)
    if (adminSession) {
      console.log('Successfull login: ', adminSession)
      setAdmin?.(adminSession)
      router.push('/admin/dashboard')
      return
    }
    console.log('Error loging in', adminSession)
  }

  return (
    <form onSubmit={submit}>
      <div className='flex flex-col justify-center items-center gap-5 min-h-screen'>
        <h1 className='text-4xl font-bold'>Admin</h1>
        <div className='flex flex-col justify-start items-start gap-2 w-[25%]'>
          <label htmlFor='dropdown' className='text-base font-semibold'>
            Authority
          </label>
        <DropDown
          selected={form.rank ?? 'VICE PRESIDENT'}
          setSelected={setRank}
          items={[
            'PRESIDENT',
            'VICE PRESIDENT',
            'DEPUTY VICE PRESIDENT',
            'ELECTORIAL GOVERNOR',
          ]}
          full
        />
        </div>
        <div className='flex flex-col justify-start items-start gap-2 w-[25%]'>
          <label htmlFor='passcode' className='text-base font-semibold'>
            Passcode
          </label>
          <input
            type='passcode'
            id='passcode'
            name='passcode'
            value={form.passcode}
            placeholder='passcode'
            className='border border-gray-400 rounded-md px-3 py-2 w-full'
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

function DropDown({
  selected,
  setSelected,
  items,
  full,
}: {
  selected: string
  setSelected?: (value: string) => void
  items: string[]
  full?: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`cursor-pointer inline-block relative ${
        full ? 'w-full' : 'w-[25%]'
      }`}
    >
      <div
        className={`flex justify-between items-center gap-5 p-3 border ${
          open
            ? 'border-apple-store-pri'
            : 'border-apple-store-outline-faded-max'
        } rounded-t-md ${open ? 'rounded-b-none' : 'rounded-md'}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <p className='text-sm semibold'>{selected}</p>
        <IoIosArrowDown
          className={`shrink-0 text-base
          text-apple-store-pri ${open && 'rotate-180'}`}
        />
      </div>
      <div
        className={`${
          open ? 'block' : 'hidden'
        } w-full absolute left-0 top-[100%] border-y border-apple-store-faded-max border-t-0 border-b-0 rounded-b-md flex flex-col`}
      >
        {items.map((item) => {
          const isSelected = selected === item

          return (
            <DropItem
              key={`${item}~${isSelected}`}
              isSelected={isSelected}
              setValue={(value) => {
                setOpen(false)
                setSelected?.(value)
              }}
              full={full}
            >
              {item}
            </DropItem>
          )
        })}
      </div>
    </div>
  )
}

function DropItem({
  isSelected,
  setValue,
  full,
  children,
}: {
  isSelected: boolean
  setValue: (value: string) => void
  children: string
  full?: boolean
}) {
  return (
    <div
      onClick={() => setValue(children)}
      className={`bg-white last:rounded-b-md p-3 border ${
        isSelected ? 'border-primary text-primary' : 'text-black/60'
      } ${full && 'w-full'} hover:border-y hover:border-apple-store-pri`}
    >
      {children}
    </div>
  )
}
