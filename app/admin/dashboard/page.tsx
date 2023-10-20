'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../auth/auth'
import { DocumentData } from 'firebase/firestore'
import { getStatus } from '@/lib/position/get'
import Link from 'next/link'
import { CandidateType } from './create/page'

export default function Dashboard() {
  const { admin } = useAuth()
  const router = useRouter()
  const [status, setStatus] = useState<'ongoing' | 'concluded'>('ongoing')
  const [positions, setPositions] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState(true)

  const Positions = ({ positionList }: { positionList: DocumentData[] }) => {
    if (positionList.length === 0)
      return (
        <div className='flex flex-col justify-center items-center w-full'>
          <p className='text-base font-semibold'>No positions found...</p>
          <p className='text-base font-semibold'>
            Click&nsbp;
            <Link
              href='/admin/dashboard/create'
              className='text-primary hover:underline hover:underline-offset-4'
            >
              here
            </Link>&nsbp;
            to create a new position.
          </p>
        </div>
      )

    return (
      <>
        {positionList.map((position) => (
          <PositionCard id={position.id} name={position.name} status={position.status} candidates={position.candidates} />
        ))}
      </>
    )
  }

  useEffect(() => {
    setLoading(true)

    const getStatusPositions = async () => {
      const positionDocs = await getStatus(status, 20)
      setPositions(positionDocs)

      setLoading(false)
    }

    getStatusPositions()
  }, [status])

  return (
    <div className='flex flex-col items-start min-h-screen px-20 w-full'>
      <h6 className='text-sm font-medium pt-5'>Welcome, {admin?.auth}</h6>
      <div className='flex justify-between items-center gap-10 py-5 w-full'>
        <h1 className='text-4xl font-bold'>Positions</h1>
        <button
          type='button'
          className='px-7 py-3 text-white bg-primary rounded-md shadow-sm'
          onClick={() => router.push('/admin/dashboard/create')}
        >
          Create Position
        </button>
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex justify-start items-center gap-10 pb-1 border-b border-b-primary/60'>
          <div onClick={() => setStatus('ongoing')}>
            <p className='text-base font-semibold'>Ongoing</p>
          </div>
          <div onClick={() => setStatus('concluded')}>
            <p className='text-base font-semibold'>Concluded</p>
          </div>
        </div>
        <div className='grow flex px-20 flex-col w-full'>
          {loading ? (
            <div className='flex justify-center items-center'>Loading...</div>
          ) : (
            <Positions positionList={positions} />
          )}
        </div>
      </div>
    </div>
  )
}

function PositionCard({id, status, name, candidates}: {id: string, status: 'ongoing' | 'concluded', name: string, candidates: CandidateType[]}) {
  const candidatesNames = candidates.map(candidate => candidate.name)

  let winnerId = 0, totalVotes = 0

  candidates.forEach((candidate, curId) => {
    const curVotes = candidate.votes.length
    if (curVotes > candidates[winnerId].votes.length) winnerId = curId
    totalVotes += curVotes
  })

  return (
    <div className='border-b border-b-primary/60 px-20 py-10 shadow-sm w-full'>
      <div className='flex flex-col items-stretch justify-between gap-6'>
        <div className='grid grid-cols-3 gap-10'>
          <div className='flex flex-col items-start gap-1'>
            <p className='text-sm font-semibold'>ID</p>
            <p className='text-xl font-semibold uppercase'>{id}</p>
          </div>
          <div className='flex flex-col items-start gap-1'>
            <p className='text-sm font-semibold'>STATUS</p>
            <p className='text-xl font-semibold uppercase'>{status}</p>
          </div>
          <div className='flex flex-col items-start gap-1'>
            <p className='text-sm font-semibold'>TOTAL VOTES</p>
            <p className='text-xl font-semibold'>{totalVotes}</p>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-10'>
          <div className='flex flex-col items-start gap-1'>
            <p className='text-sm font-semibold'>NAME</p>
            <p className='text-xl font-semibold uppercase'>{name}</p>
          </div>
          <div className='flex flex-col items-start gap-1'>
            <p className='text-sm font-semibold'>WINNER</p>
            <p className='text-xl font-semibold uppercase'>{candidatesNames[winnerId]}</p>
          </div>
          <div className='flex flex-col items-start gap-1'>
            <p className='text-sm font-semibold'>CANDIDATES</p>
            <p className='text-xl font-semibold uppercase'>
              {candidatesNames.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
