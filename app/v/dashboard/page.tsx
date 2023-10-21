'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../auth/auth'
import { BsStar } from 'react-icons/bs'
import { DocumentData } from 'firebase/firestore'

export default function Timeline() {
  const { voter } = useAuth()
  const [tab, setTab] = useState('hot')
  const [loading, setLoading] = useState(false)

  return (
    <div className='flex flex-col min-h-screen gap-0 px-24'>
      <div className='flex flex-col items-start py-5 gap-5'>
        <h1 className='text-sm font-medium'>Welcome, {voter?.displayName}</h1>
        <h1 className='text-4xl font-bold'>Dashboard</h1>
      </div>
      <div className='grow flex flex-col w-full'>
        <div className='flex justify-start items-center gap-10 pb-1 border-b border-b-primary/60'>
          <div className='relative' onClick={() => setTab('hot')}>
            <div className='px-7 flex justify-center items-center gap-3 w-fit'>
              <BsStar
                className={`${
                  tab === 'hot' ? 'text-primary' : 'text-black/60'
                } text-base`}
              />
              <p className='text-base font-semibold'>Hot</p>
            </div>
            <div
              className={`${
                tab === 'hot' ? 'block' : 'hidden'
              } absolute -bottom-[0.415rem] w-full border-2 border-primary`}
            />
          </div>
          <div className='relative' onClick={() => setTab('timeline')}>
            <div className='px-7 flex justify-center items-center gap-3 w-fit'>
              <BsStar
                className={`${
                  tab === 'timeline' ? 'text-primary' : 'text-black/60'
                } text-base`}
              />
              <p className='text-base font-semibold'>Timeline</p>
            </div>
            <div
              className={`${
                tab === 'timeline' ? 'block' : 'hidden'
              } absolute -bottom-[0.415rem] w-full border-2 border-primary`}
            />
          </div>
        </div>
        {loading ? (
          <div className='grow flex justify-center items-center h-full'>
            <p className='text-base font-semibold'>Loading...</p>
          </div>
        ) : (
          <Positions positionList={[{ value: 'Test Value' }]} />
        )}
      </div>
    </div>
  )
}

function Positions({ positionList }: { positionList: DocumentData[] }) {
  if (positionList.length === 0)
    return (
      <div className='grow flex flex-col justify-center items-center w-full'>
        <p className='text-base font-semibold'>No positions found.</p>
        <Link
          href='/admin/dashboard/create'
          className='text-primary text-base font-semibold hover:underline hover:underline-offset-4'
        >
          Create new position?
        </Link>
      </div>
    )

  return (
    <div className='grow flex px-20 flex-col w-full'>
      <HotPositionCard />
      <HotPositionCard />
      <HotPositionCard />
      <HotPositionCard />
      <HotPositionCard />
    </div>
  )
}

function HotPositionCard() {
  return (
    <div className='relative border-b border-b-primary/60 px-20 py-10 shadow-sm w-full'>
      <div className='grid grid-cols-2 gap-20'>
        <div className='flex flex-col items-stretch justify-between gap-6'>
          <div className='flex flex-col items-start gap-0'>
            <p className='text-sm font-semibold text-black/60'>NAME</p>
            <p className='text-xl font-semibold uppercase'>Vice President</p>
          </div>
          <div className='flex flex-col items-start gap-0'>
            <p className='text-sm font-semibold text-black/60'>TOTAL VOTES</p>
            <p className='text-xl font-semibold uppercase'>566</p>
          </div>
          <div className='flex flex-col items-start gap-0'>
            <p className='text-sm font-semibold text-black/60'>
              TOP CANDIDATES
            </p>
            <p className='text-xl font-semibold uppercase'>
              Sydney Klems, Anthony Smith
            </p>
          </div>
        </div>
        <div className='flex flex-col items-stretch justify-between gap-6 w-full'>
          <div className='flex flex-col items-start gap-0 w-full'>
            <p className='text-sm font-semibold text-black/60'>CANDIDATES</p>
            <div className='flex flex-col items-stretch justify-start gap-1 w-full'>
              <div className='flex justify-between gap-10 items-start'>
                <p className='text-xl font-semibold uppercase'>Denise Watson</p>
                <p className='text-xl font-semibold uppercase'>70</p>
              </div>
              <div className='flex justify-between gap-10 items-start'>
                <p className='text-xl font-semibold uppercase'>Miram Ekoh</p>
                <p className='text-xl font-semibold uppercase'>69</p>
              </div>
              <div className='flex justify-between gap-10 items-start'>
                <p className='text-xl font-semibold uppercase'>Sydney Klems</p>
                <p className='text-xl font-semibold uppercase'>88</p>
              </div>
              <div className='flex justify-between gap-10 items-start'>
                <p className='text-xl font-semibold uppercase'>Anthony Smith</p>
                <p className='text-xl font-semibold uppercase'>77</p>
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='px-7 py-3 text-white bg-primary rounded-md shadow-sm'
          >
            Vote
          </button>
        </div>
      </div>
    </div>
  )
}
