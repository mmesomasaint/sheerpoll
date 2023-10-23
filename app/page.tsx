'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IoIosArrowForward } from 'react-icons/io'

export default function Home() {
  const router = useRouter()

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <div className="grow relative h-full w-full bg-[url('/closeup-fingerprint-paper.jpg')] bg-no-repeat bg-cover bg-center">
        <div className='grow fixed z-10 inset-0 bg-[rgba(255,255,255,0.55)] w-full flex flex-col'>
          <div className='z-20 flex justify-between items-center gap-6 sm:gap-10 px-5 sm:px-10 py-5 w-full'>
            <h1 className='text-4xl font-bold'>Sheerpoll</h1>
            <div className='flex justify-end items-center gap-6'>
              <Link
                href='/v/auth/login'
                className='text-base font-semibold px-7 py-3 border border-primary text-primary rounded-md'
              >
                Login
              </Link>
              <Link
                href='/v/auth/register'
                className='hidden sm:block text-base font-semibold px-7 py-3 border border-primary bg-primary text-white rounded-md'
              >
                Signup
              </Link>
            </div>
          </div>
          <div className='z-20 grow w-full flex flex-col justify-start items-center gap-10 p-5 sm:p-10 mt-20'>
            <h1 className='text-4xl font-bold'>Sheerpoll</h1>
            <p className='text-center text-base font-semibold tracking-wider'>
              A pure and transparent election conducting platform
            </p>
            <div className='flex justify-center items-center gap-10'>
              <button
                type='button'
                className='px-7 py-3 bg-primary rounded-md shadow-sm'
                onClick={() => router.push('/v/auth/register')}
              >
                <div className='flex justify-between items-center gap-5'>
                  <p className='text-white text-base font-semibold tracking-wider'>
                    Get Started
                  </p>
                  <IoIosArrowForward className='text-2xl text-white' />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
