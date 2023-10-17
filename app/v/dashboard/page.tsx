'use client'

import { useRouter } from 'next/navigation'

export default function Dashboard() {
  return (
    <div className='flex flex-col gap-0'>
      <PositionAccordion />
      <PositionAccordion />
      <PositionAccordion />
      <PositionAccordion />
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
            onClick={() => router.push('/v/dashboard/vote/pos_id')}
            className='px-7 py-3 text-white bg-primary rounded-md shadow-sm'
          >
            Vote
          </button>
        </div>
      </div>
    </div>
  )
}
