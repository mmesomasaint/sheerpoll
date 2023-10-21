'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../auth/auth'
import { BsStar } from 'react-icons/bs'
import { DocumentData } from 'firebase/firestore'
import { getById } from '@/lib/position/get'

export default function Timeline() {
  const { voter } = useAuth()
  const [choice, setChoice] = useState<string | null>()
  const [loading, setLoading] = useState(true)
  const [position, setPosition] = useState<DocumentData | null>()

  const totalVotes = useMemo(
    () =>
      position?.candidates.reduce(
        (acc: number, cur: DocumentData) => acc + cur.votes.length,
        0
      ),
    [position]
  )

  useEffect(() => {
    setLoading(true)
    const fetchPosition = async () => {
      const data = await getById(position?.id)
      setPosition(data)
      setLoading(false)
    }

    fetchPosition()
  }, [])

  return (
    <div className='flex flex-col min-h-screen gap-0 px-24'>
      <h1 className='text-sm font-medium pt-5'>Vote A Candidate</h1>
      <div className='flex justify-between items-center py-5 gap-5'>
        <div className='flex flex-col items-start gap-0'>
          <p className='text-sm font-semibold text-black/60'>TITLE</p>
          <p className='text-4xl font-bold uppercase'>Vice President</p>
        </div>
        <div className='flex flex-col items-end gap-0'>
          <p className='text-sm font-semibold text-black/60'>TOTAL VOTES</p>
          <p className='text-xl text-center font-semibold uppercase w-full py-1 border border-primary text-primary rounded-md'>
            534
          </p>
        </div>
      </div>
      <div className='grow flex flex-col w-full'>
        <div className='flex justify-center items-center gap-10 pb-1 border-b border-b-primary/60'>
          <div className='relative'>
            <div className='px-7 flex justify-center items-center gap-3 w-fit'>
              <BsStar className='text-primary text-base' />
              <p className='text-base font-semibold'>Candidates</p>
            </div>
            <div className='absolute -bottom-[0.415rem] w-full border-2 border-primary' />
          </div>
        </div>
        <div className='grow flex px-20 flex-col justify-start w-full'>
          <CandidateCard
            name={'Obi'}
            votes={45}
            active={false}
            onVoteClick={() => setChoice('abc')}
          />
          <button
            type='submit'
            disabled={!choice}
            className='px-7 py-3 my-5 text-white bg-primary disabled:bg-black/60 rounded-md shadow-sm'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

function CandidateCard({
  name,
  votes,
  active,
  onVoteClick,
}: {
  name: string
  votes: number
  active: boolean
  onVoteClick: () => void
}) {
  return (
    <div className='border-b border-b-primary/60 px-20 py-10 shadow-sm w-full'>
      <div className='grid grid-cols-3 gap-10 place-items-center'>
        <div className='flex flex-col items-center gap-0'>
          <p className='text-sm font-semibold text-black/60'>NAME</p>
          <p className='text-xl font-semibold uppercase'>NNAMDI KANU</p>
        </div>
        <div className='flex flex-col items-center gap-0'>
          <p className='text-sm font-semibold text-black/60'>VOTES</p>
          <p className='text-xl font-semibold uppercase'>343</p>
        </div>
        <div className='flex flex-col items-center gap-0'>
          <p className='text-sm font-semibold text-black/60'>VOTE</p>
          <div
            className={`w-10 h-10 rounded-sm border-4 ${
              active ? 'border-primary' : 'border-black/60'
            } flex justify-center items-center shadow-sm`}
            onClick={onVoteClick}
          >
            {active && <BsStar className='text-primary text-base' />}
          </div>
        </div>
      </div>
    </div>
  )
}
