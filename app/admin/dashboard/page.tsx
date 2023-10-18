'use client'

import {useState} from 'react'
import { useAuth } from '../auth/auth'
import Link from 'next/link'

export default function Dashboard() {
  const {admin} = useAuth()

  return (
    <div className='flex flex-col items-start min-h-screen px-20'>
      <div className='flex flex-col items-start gap-10'>
      <h6 className='text-sm font-medium'>Welcome, {admin?.auth}</h6>
      <h2 className='text-6xl font-semibold'>Positions</h2>
      </div>
      <div className='flex flex-col'>
        <div className='flex justify-start items-center gap-10'>
          <Link href='/admin/dashboard/'>
            <p className='text-base font-semibold'>Ongoing</p>
          </Link>
          <Link href='/admin/dashboard/'>
            <p className='text-base font-semibold'>Concluded</p>
          </Link>
        </div>
        <div className='grow flex px-20 flex-col'>
          Nothing to show here...
        </div>
      </div>
    </div>
  )
}