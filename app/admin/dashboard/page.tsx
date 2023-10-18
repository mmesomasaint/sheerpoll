'use client'

import { useState } from 'react'
import { useAuth } from '../auth/auth'
import Link from 'next/link'

export default function Dashboard() {
  const { admin } = useAuth()

  return (
    <div className='flex flex-col items-start min-h-screen px-20'>
      <div className='flex flex-col items-start gap-10'>
        <h6 className='text-sm font-medium'>Welcome, {admin?.auth}</h6>
        <h2 className='text-6xl font-semibold'>Positions</h2>
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex justify-start items-center gap-10'>
          <Link href='/admin/dashboard/'>
            <p className='text-base font-semibold'>Ongoing</p>
          </Link>
          <Link href='/admin/dashboard/'>
            <p className='text-base font-semibold'>Concluded</p>
          </Link>
        </div>
        <div className='grow flex px-20 flex-col w-full'>
          <PositionCard />
          <PositionCard />
          <PositionCard />
        </div>
      </div>
    </div>
  )
}

function PositionCard() {
  return (
    <div className='first:border-t first:border-t-primary/60 border-b border-b-primary/60 px-20 py-10 rounded-md shadow-sm w-full'>
      <div className='flex flex-col items-stretch justify-between gap-6'>
        <div className='grid grid-cols-3 gap-10'>
          <div className='flex flex-col items-start gap-1'>
            <p className='text-sm font-semibold'>ID</p>
            <p className='text-xl font-semibold'>131FASDF4353DA</p>
          </div>
          <div className='flex flex-col items-start gap-1'>
            <p className='text-sm font-semibold'>STATUS</p>
            <p className='text-xl font-semibold'>CONCLUDED</p>
          </div>
          <div className='flex flex-col items-start gap-1'>
            <p className='text-sm font-semibold'>TOTAL VOTES</p>
            <p className='text-xl font-semibold'>833</p>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-10'>
          <div className='flex flex-col items-start gap-1'>
            <p className='text-sm font-semibold'>NAME</p>
            <p className='text-3xl font-semibold'>VICE PRESIDENT</p>
          </div>
          <div className='flex flex-col items-start gap-1'>
            <p className='text-sm font-semibold'>WINNER</p>
            <p className='text-xl font-semibold'>DR. IDRIS ADAKA</p>
          </div>
          <div className='flex flex-col items-start gap-1'>
            <p className='text-sm font-semibold'>CANDIDATES</p>
            <div className='flex flex-wrap justify-start items-center gap-3'>
              <p className='text-xl font-semibold'>DR. IDRIS ADAKA</p>
              <p className='text-xl font-semibold'>DR. IDRIS ADAKA</p>
              <p className='text-xl font-semibold'>DR. IDRIS ADAKA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
