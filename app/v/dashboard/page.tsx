'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../auth/auth'
import { BiSolidHot } from 'react-icons/bi'
import { BsFillClockFill } from 'react-icons/bs'
import { DocumentData } from 'firebase/firestore'
import { getByStatus, getByVoter } from '@/lib/position/get'
import { WithSpinner } from '@/components/spinner'

export default function Timeline() {
  const { voter } = useAuth()
  const [tab, setTab] = useState('hot')
  const [loading, setLoading] = useState(true)
  const [positionList, setpositionList] = useState<DocumentData[]>([])

  useEffect(() => {
    setLoading(true)
    setpositionList([])

    const fetchPositions = async () => {
      if (tab === 'timeline' && voter) {
        // Fetch timeline positions -- the voter already voted for
        const { positions, error } = await getByVoter(voter?.uid, 20)
        if (positions && !error) {
          setpositionList(positions)
        }
        setLoading(false)
      } else if (tab === 'hot' && voter) {
        // Fetch hot positions -- (ongoing positions)
        const positions = await getByStatus('ongoing', 20)
        setpositionList(positions)
        setLoading(false)
      }
    }

    fetchPositions()
  }, [tab])

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
              <BiSolidHot
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
              <BsFillClockFill
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
          <Positions
            positionList={positionList}
            tab={tab}
            votes={voter?.votes ?? []}
          />
        )}
      </div>
    </div>
  )
}

function Positions({
  positionList,
  tab,
  votes,
}: {
  positionList: DocumentData[]
  tab: string
  votes: string[]
}) {
  if (positionList.length === 0)
    return (
      <div className='grow flex flex-col justify-center items-center w-full'>
        <p className='text-base font-semibold'>No positions found.</p>
        <Link
          href='/v/dashboard/'
          className='text-primary text-base font-semibold hover:underline hover:underline-offset-4'
        >
          {tab === 'hot' ? 'Reload the page' : 'Vote now'}
        </Link>
      </div>
    )

  return (
    <div className='grow flex px-20 flex-col w-full'>
      {positionList.map((position) => {
        const totalVotes = position.candidates.reduce(
          (acc: number, cur: DocumentData) => acc + cur.votes.length,
          0
        )

        const hasNotVoted = votes?.every(
          (vote) => !position.votes?.includes(vote)
        )

        return (
          <div key={position.title + position.candidates.length}>
            {hasNotVoted ? (
              <HotPositionCard
                id={position.id}
                name={position.title}
                totalVotes={totalVotes}
                candidates={position.candidates}
              />
            ) : (
              <TimelinePositionCard
                name={position.title}
                totalVotes={totalVotes}
                status={position.status}
                candidates={position.candidates}
                votes={votes}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function HotPositionCard({
  id,
  name,
  totalVotes,
  candidates,
}: {
  id: string
  name: string
  totalVotes: number
  candidates: DocumentData[]
}) {
  const [loading, setLoading] = useState(false)

  // The topCandidateNames list was gotten by:
  // 1. candiates.slice() => Creates a copy of candidates array.
  // 2. .sort(a,b) => b.votes.length - a.votes.length => sorts the array copy in descending order.
  // 3. .map(candidate => candidate.name) => Creates a copy of the sorted array and returns only the name prop.
  // 4. .slice(0, 2) => Creates a copy of the array names to contain only the first two names in the list.
  const topCandidateNames = candidates
    .slice()
    .sort((a, b) => b.votes.length - a.votes.length)
    .map((candidate) => candidate.name)
    .slice(0, 2)

  const router = useRouter()

  return (
    <div className='relative border-b border-b-primary/60 px-20 py-10 shadow-sm w-full'>
      <div className='grid grid-cols-2 gap-20'>
        <div className='flex flex-col items-stretch justify-between gap-6'>
          <div className='flex flex-col items-start gap-0'>
            <p className='text-sm font-semibold text-black/60'>NAME</p>
            <p className='text-xl font-semibold uppercase'>{name}</p>
          </div>
          <div className='flex flex-col items-start gap-0'>
            <p className='text-sm font-semibold text-black/60'>TOTAL VOTES</p>
            <p className='text-xl font-semibold uppercase'>{totalVotes}</p>
          </div>
          <div className='flex flex-col items-start gap-0'>
            <p className='text-sm font-semibold text-black/60'>
              TOP CANDIDATES
            </p>
            <p className='text-xl font-semibold uppercase'>
              {topCandidateNames.join(', ')}
            </p>
          </div>
        </div>
        <div className='flex flex-col items-stretch justify-between gap-6 w-full'>
          <div className='flex flex-col items-start gap-0 w-full'>
            <p className='text-sm font-semibold text-black/60'>CANDIDATES</p>
            <div className='flex flex-col items-stretch justify-start gap-1 w-full'>
              {candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className='flex justify-between gap-10 items-start'
                >
                  <p className='text-xl font-semibold uppercase'>
                    {candidate.name}
                  </p>
                  <p className='text-xl font-semibold uppercase'>
                    {candidate.votes.length}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <button
            type='button'
            disabled={loading}
            className='px-7 py-3 text-white bg-primary rounded-md shadow-sm disabled:bg-black/60'
            onClick={() => {
              setLoading(true)
              router.push(`/v/dashboard/vote?position_id=${id}`)
              setLoading(false)
            }}
          >
            {loading ? (
              <WithSpinner>Loading...</WithSpinner>
            ) : (
              <p className='text-base font-semibold tracking-wider'>Vote</p>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function TimelinePositionCard({
  name,
  totalVotes,
  status,
  candidates,
  votes,
}: {
  name: string
  totalVotes: number
  status: string
  candidates: DocumentData[]
  votes: string[]
}) {
  const winner = candidates.reduce((acc, cur) => {
    if (acc.votes.length > cur.votes.length) return acc
    return cur
  })

  return (
    <div className='relative border-b border-b-primary/60 px-20 py-10 shadow-sm w-full'>
      <div className='grid grid-cols-2 gap-20'>
        <div className='flex flex-col items-stretch justify-between gap-6'>
          <div className='flex flex-col items-start gap-0'>
            <p className='text-sm font-semibold text-black/60'>NAME</p>
            <p className='text-xl font-semibold uppercase'>{name}</p>
          </div>
          <div className='flex flex-col items-start gap-0'>
            <p className='text-sm font-semibold text-black/60'>TOTAL VOTES</p>
            <p className='text-xl font-semibold uppercase'>{totalVotes}</p>
          </div>
          <div className='flex flex-col items-start gap-0'>
            <p className='text-sm font-semibold text-black/60'>WINNER</p>
            <p className='text-xl font-semibold uppercase'>{winner.name}</p>
          </div>
          <div className='flex flex-col items-start gap-0'>
            <p className='text-sm font-semibold text-black/60'>STATUS</p>
            <p className='text-xl font-semibold uppercase'>{status}</p>
          </div>
        </div>
        <div className='flex flex-col items-stretch justify-between gap-6 w-full'>
          <div className='flex flex-col items-start gap-0 w-full'>
            <p className='text-sm font-semibold text-black/60'>CANDIDATES</p>
            <div className='flex flex-col items-stretch justify-start gap-0 w-full'>
              {candidates.map((candidate) => {
                const isVotersCandidate =
                  candidate.votes.filter((candidateVote: string) =>
                    votes.includes(candidateVote)
                  ).length > 0

                return (
                  <div
                    key={candidate.id}
                    className={`border-2 ${
                      isVotersCandidate
                        ? 'border-primary text-primary'
                        : 'border-transparent text-black'
                    } flex justify-between gap-10 items-start p-1 rounded-md`}
                  >
                    <p className='text-xl font-semibold uppercase'>
                      {candidate.name}
                    </p>
                    <p className='text-xl font-semibold uppercase'>
                      {candidate.votes.length}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          <button
            type='button'
            disabled
            className='px-7 py-3 text-black/60 bg-white border border-black/60 rounded-md shadow-sm'
          >
            Voted
          </button>
        </div>
      </div>
    </div>
  )
}
