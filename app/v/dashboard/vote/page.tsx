'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '../../auth/auth'
import { BsFillPeopleFill, BsCheckLg } from 'react-icons/bs'
import { DocumentData } from 'firebase/firestore'
import { getById } from '@/lib/position/get'
import createVote from '@/lib/vote/create'
import { WithSpinner } from '@/components/spinner'

export default function Timeline() {
  const { voter } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
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

  const vote = async () => {
    setLoading(true)

    if (voter && choice && position) {
      const { vote, error } = await createVote(position.id, choice, voter.uid)

      if (!error && vote) {
        voter.votes = [...voter.votes, vote]
        router.push('/v/dashboard/')

        return
      }

      console.log('Error submitting vote.\n', error)
    }

    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)

    const fetchPosition = async () => {
      const position_id = searchParams.get('position_id')
      if (position_id) {
        const data = await getById(position_id)
        setPosition(data)
      } else if (!position_id) router.push('/v/dashboard/')

      setLoading(false)
    }

    fetchPosition().then(() => setLoading(false))
  }, [searchParams.get('position_id')])

  return (
    <div className='flex flex-col min-h-screen gap-0 px-5 xl:px-24'>
      <h1 className='text-sm font-medium pt-5'>Vote A Candidate</h1>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center py-5 gap-5'>
        <div className='flex flex-col items-start gap-0'>
          <p className='text-sm font-semibold text-black/60'>TITLE</p>
          <p className='text-4xl font-bold uppercase'>
            {position?.title || 'No_Title'}
          </p>
        </div>
        <div className='flex flex-col items-end gap-0'>
          <p className='text-sm font-semibold text-black/60'>TOTAL VOTES</p>
          <p className='text-xl text-center font-semibold uppercase w-full py-1 border border-primary text-primary rounded-md'>
            {totalVotes || '0'}
          </p>
        </div>
      </div>
      <div className='grow flex flex-col w-full'>
        <div className='flex justify-center items-center gap-10 pb-1 border-b border-b-primary/60'>
          <div className='relative grow sm:grow-0'>
            <div className='px-7 flex justify-center items-center gap-3 w-full sm:w-fit'>
              <BsFillPeopleFill className='text-primary text-base' />
              <p className='text-base font-semibold'>Candidates</p>
            </div>
            <div className='absolute -bottom-[0.415rem] w-full border-2 border-primary' />
          </div>
        </div>
        <div className='grow flex px-0 sm:px-20 flex-col justify-start w-full'>
          {position?.candidates.map((candidate: DocumentData) => (
            <CandidateCard
              key={candidate.id}
              name={candidate.name}
              votes={candidate.votes.length}
              active={choice === candidate.id}
              onVoteClick={() => setChoice(candidate.id)}
            />
          ))}
          <button
            type='submit'
            disabled={!choice || loading}
            className='px-7 py-3 my-5 text-white bg-primary disabled:bg-black/60 rounded-md shadow-sm'
            onClick={vote}
          >
            {loading ? (
              <WithSpinner>Loading...</WithSpinner>
            ) : (
              <p className='text-base font-semibold tracking-wider'>Submit</p>
            )}
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
    <div className='border-b border-b-primary/60 px-7 lg:px-20 py-10 shadow-sm w-full'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 sm:place-items-center'>
        <div className='flex flex-col items-start sm:items-center gap-0'>
          <p className='text-sm font-semibold text-black/60'>NAME</p>
          <p className='text-xl font-semibold uppercase'>{name} </p>
        </div>
        <div className='flex flex-col items-start sm:items-center gap-0'>
          <p className='text-sm font-semibold text-black/60'>VOTES</p>
          <p className='text-xl font-semibold uppercase'>{votes}</p>
        </div>
        <div className='flex flex-col items-start sm:items-center gap-0'>
          <p className='text-sm font-semibold text-black/60'>VOTE</p>
          <div
            className={`w-10 h-10 rounded-sm border-4 ${
              active ? 'border-primary' : 'border-black/60'
            } flex justify-center items-center shadow-sm`}
            onClick={onVoteClick}
          >
            {active && <BsCheckLg className='text-primary text-4xl' />}
          </div>
        </div>
      </div>
    </div>
  )
}
