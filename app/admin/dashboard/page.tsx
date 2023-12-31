'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../auth/auth'
import { DocumentData } from 'firebase/firestore'
import { getByStatus } from '@/lib/position/get'
import Link from 'next/link'
import { CandidateType } from '@/lib/candidate/types'
import endPosition from '@/lib/position/end'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { VscAdd } from 'react-icons/vsc'
import { WithSpinner } from '@/components/spinner'

export default function Dashboard() {
  const { admin } = useAuth()
  const router = useRouter()
  const [status, setStatus] = useState<'ongoing' | 'concluded'>('ongoing')
  const [positions, setPositions] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    const getStatusPositions = async () => {
      const positionDocs = await getByStatus(status, 20)
      setPositions(positionDocs)

      setLoading(false)
    }

    getStatusPositions()
  }, [status])

  return (
    <div className='flex flex-col items-start min-h-screen px-5 xl:px-24 w-full'>
      <h6 className='text-sm font-medium pt-5'>Welcome, {admin?.auth}</h6>
      <div className='flex justify-between items-center gap-3 sm:gap-10 py-5 w-full'>
        <h1 className='text-4xl font-bold'>Positions</h1>
        <button
          type='button'
          className='px-7 py-3 bg-primary rounded-md shadow-sm'
          onClick={() => router.push('/admin/dashboard/create')}
        >
          <div className='flex justify-between items-center gap-3'>
            <VscAdd className='text-base text-white' />
            <p className='hidden sm:block text-white text-base font-semibold tracking-wider'>
              Create Position
            </p>
          </div>
        </button>
      </div>
      <div className='grow flex flex-col w-full'>
        <div className='flex justify-center sm:justify-start items-center gap-0 sm:gap-10 pb-1 border-b border-b-primary/60'>
          <div
            className='relative grow sm:grow-0'
            onClick={() => setStatus('ongoing')}
          >
            <p className='text-center px-0 sm:px-7 text-base font-semibold'>
              Ongoing
            </p>
            <div
              className={`${
                status === 'ongoing' ? 'block' : 'hidden'
              } absolute -bottom-[0.415rem] w-full border-2 border-primary`}
            />
          </div>
          <div
            className='relative grow sm:grow-0'
            onClick={() => setStatus('concluded')}
          >
            <p className='text-center px-0 sm:px-7 text-base font-semibold'>
              Concluded
            </p>
            <div
              className={`${
                status === 'concluded' ? 'block' : 'hidden'
              } absolute -bottom-[0.415rem] w-full border-2 border-primary`}
            />
          </div>
        </div>
        {loading ? (
          <div className='grow flex justify-center items-center h-full'>
            <WithSpinner dark>Loading...</WithSpinner>
          </div>
        ) : (
          <Positions positionList={positions} />
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
    <div className='grow flex px-0 xl:px-20 flex-col w-full'>
      {positionList.map((position) => (
        <PositionCard
          key={position.id}
          id={position.id}
          name={position.title}
          status={position.status}
          candidates={position.candidates}
        />
      ))}
    </div>
  )
}

function PositionCard({
  id,
  status,
  name,
  candidates,
}: {
  id: string
  status: 'ongoing' | 'concluded'
  name: string
  candidates: CandidateType[]
}) {
  const [displayOptions, setDisplayOptions] = useState(false)
  const candidatesNames = candidates.map((candidate) => candidate.name)

  let winnerId = 0,
    totalVotes = 0

  candidates.forEach((candidate, curId) => {
    const curVotes = candidate.votes.length
    if (curVotes > candidates[winnerId].votes.length) winnerId = curId
    totalVotes += curVotes
  })

  const NO_WINNER = totalVotes === 0 ? 'none' : candidatesNames[winnerId]
  const ONGOING = status === 'ongoing' ? 'pending' : NO_WINNER

  const endPos = async () => {
    const { position, error } = await endPosition(id)
    if (!error) {
      console.log('Position ended successfully: \n', position)
      return
    }
    console.log("Error: Position couldn't be ended\n", error)
    setDisplayOptions(false)
  }

  return (
    <div className='relative border-b border-b-primary/60 px-7 lg:px-20 py-10 shadow-sm w-full'>
      <div className='flex flex-col items-stretch justify-between gap-6'>
        <div
          className={`${
            status === 'ongoing' ? 'block' : 'hidden'
          } absolute top-2 sm:top-5 right-2 sm:right-5 `}
        >
          <div
            className='w-8 h-8 rounded-full border border-gray-900/60 flex justify-center items-center'
            onClick={() => setDisplayOptions(true)}
          >
            <BsThreeDotsVertical className='text-lg text-gray-900/60' />
          </div>
          <div className='relative'>
            <div
              className={`${
                displayOptions ? 'block' : 'hidden'
              } fixed inset-0 bg-transparent`}
              onClick={() => setDisplayOptions(false)}
            />
            <div
              className={`${
                displayOptions ? 'block' : 'hidden'
              } absolute right-0 z-20 w-fit rounded-md border border-gray-900/60 shadow-sm`}
            >
              <button
                type='button'
                className='px-7 py-3 text-primary text-base font-semibold border border-primary bg-white rounded-md shadow-sm'
                onClick={endPos}
              >
                Conclude
              </button>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10'>
          <div className='flex flex-col items-start gap-0'>
            <p className='text-sm font-semibold text-black/60'>ID</p>
            <p className='text-xl font-semibold uppercase break-all'>{id}</p>
          </div>
          <div className='flex flex-col items-start gap-0'>
            <p className='text-sm font-semibold text-black/60'>STATUS</p>
            <p className='text-xl font-semibold uppercase'>{status}</p>
          </div>
          <div className='flex flex-col items-start gap-0'>
            <p className='text-sm font-semibold text-black/60'>TOTAL VOTES</p>
            <p className='text-xl font-semibold'>{totalVotes}</p>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10'>
          <div className='flex flex-col items-start gap-0'>
            <p className='text-sm font-semibold text-black/60'>NAME</p>
            <p className='text-xl font-semibold uppercase'>{name}</p>
          </div>
          <div className='flex flex-col items-start gap-0'>
            <p className='text-sm font-semibold text-black/60'>WINNER</p>
            <p className='text-xl font-semibold uppercase'>{ONGOING}</p>
          </div>
          <div className='flex flex-col items-start gap-0'>
            <p className='text-sm font-semibold text-black/60'>CANDIDATES</p>
            <p className='text-xl font-semibold uppercase'>
              {candidatesNames.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
