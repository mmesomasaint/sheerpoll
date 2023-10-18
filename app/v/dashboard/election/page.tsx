'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../auth/auth'

export default function Election() {
  const { voter } = useAuth()

  return (
    <div className='flex flex-col min-h-screen gap-0'>
      <div className='flex flex-col items-start py-10 gap-5'>
        <h1 className='text-sm font-semibold'>Hello, {voter?.displayName}</h1>
        <h1 className='text-6xl font-semibold'>Election</h1>
      </div>
      <div className='grow flex flex-col h-full'>
        <div className='flex justify-start items-center gap-20'>
          <Link href='/v/dashboard/'>
            <p className='text-base font-semibold'>Timeline</p>
          </Link>
          <Link href='/v/dashboard/election'>
            <p className='text-base font-semibold'>Election</p>
          </Link>
        </div>
        <div className='grow h-full'>
          <div className='flex flex-col gap-0'>
            <PositionAccordion />
            <PositionAccordion />
            <PositionAccordion />
            <PositionAccordion />
          </div>
        </div>
      </div>
    </div>
  )
}

function PositionAccordion() {
  const router = useRouter()

  return (
    <div className='bg-primary/30 first:border-t first:border-t-primary border-b border-b-primary px-14 py-7'>
      <div className='flex flex-col items-start gap-2'>
        <p className='text-xs font-medium'>QER313EHNT_HHGRI58Y3</p>
        <div className='flex justify-between items-center gap-20'>
          <h3 className='text-4xl font-semibold text-'>Vice President</h3>
          <button
            type='button'
            onClick={() =>
              router.push('/v/dashboard/vote?position=Vice President')
            }
            className='px-7 py-3 text-white bg-primary rounded-md shadow-sm'
          >
            Vote
          </button>
        </div>
      </div>
    </div>
  )
}
