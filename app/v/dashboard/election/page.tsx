'use client'

import { useRouter } from 'next/navigation'

export default function Election() {
  return (
    <div className='flex flex-col gap-0'>
      <VotedPositionAccordion />
      <VotedPositionAccordion />
      <VotedPositionAccordion />
      <VotedPositionAccordion />
    </div>
  )
}

function VotedPositionAccordion() {
  const router = useRouter()

  return (
    <div className='bg-primary/10 first:border-t first:border-t-primary border-b border-b-primary px-14 py-7'>
      <div className='flex flex-col items-start gap-2'>
        <p className='text-xs font-medium'>QER313EHNT_HHGRI58Y3</p>
        <div className='flex justify-start items-center gap-4'>
          <h3 className='text-4xl font-semibold text-'>Vice President</h3>
          <h3 className='text-2xl font-semibold text-'>&rarr;</h3>
          <h3 className='text-2xl font-semibold text-'>Amadi Joseph</h3>
        </div>
        <p className='text-xs font-medium'>03-04-2023</p>
      </div>
    </div>
  )
}
