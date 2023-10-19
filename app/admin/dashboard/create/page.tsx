'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BsStar } from 'react-icons/bs'

type CandidateType = {
  name: string
  votes: string[]
  position_id: string
}

export default function CreatePosition() {
  // Creating position requires 3 steps.
  // First one happens with creating the title
  // Second one happens when you create and add candidates
  // Third one is where you see everything you've created. and then click create
  // To create a fully fledged position.
  const [form, setForm] = useState({
    title: '',
    candidates: [],
  })

  const setTitle = (title: string) => setForm((pre) => ({ ...pre, title }))

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Change the ref to the next step
  }

  return (
    <form onSubmit={submit}>
      <div className='flex flex-col justify-center items-center gap-5 min-h-screen w-full'>
        <h1 className='text-4xl font-bold'>Create Position</h1>
        <div className='flex justify-center items-center gap-1'>
          <div className='w-8 h-8 rounded-full border border-black/60 bg-transparent flex justify-center items-center'>
            <BsStar className='text-xl text-primary' />
          </div>
          <div className='w-12 border-b bg-transparent border-primary border-dashed' />
          <div className='w-8 h-8 rounded-full border border-black/60 bg-transparent flex justify-center items-center'>
            <BsStar className='text-xl text-primary' />
          </div>
          <div className='w-12 border-b bg-transparent border-primary border-dashed' />
          <div className='w-8 h-8 rounded-full border border-black/60 bg-transparent flex justify-center items-center'>
            <BsStar className='text-xl text-primary' />
          </div>
        </div>
        <CreaetePositionForm title={form.title} setTitle={setTitle} />
      </div>
    </form>
  )
}

function CreaetePositionForm({
  title,
  setTitle,
}: {
  title: string
  setTitle: (title: string) => void
}) {
  const router = useRouter()

  return (
    <div className='flex flex-col gap-5 w-full'>
      <div className='flex flex-col justify-start items-start gap-2 w-[25%] mx-auto'>
        <label htmlFor='title' className='text-base font-semibold'>
          Title
        </label>
        <input
          type='title'
          id='title'
          name='title'
          value={title}
          placeholder='title'
          className='border border-gray-400 rounded-md px-3 py-2 w-full'
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='flex flex-col justify-start items-center gap-5'>
        <button
          type='button'
          className='px-7 py-3 text-white bg-primary rounded-md shadow-sm'
          onClick={() => router.push('/admin/dashboard/create?ref=2')}
        >
          Next
        </button>
      </div>
    </div>
  )
}

function Candidates({
  candidates,
  setCandidates,
}: {
  candidates: CandidateType[]
  setCandidates: (candidate: object) => void
}) {
  const [openPanel, setOpenPanel] = useState(false)
  const [candidate, setCandidate] = useState<CandidateType>({
    name: '',
    votes: [],
    position_id: '',
  })
  const router = useRouter()

  return (
    <div className='flex flex-col gap-5 w-full'>
      <div className='flex flex-col justify-start items-start gap-2 w-[25%] mx-auto'>
        <label htmlFor='title' className='text-base font-semibold'>
          Candidates
        </label>
        <div className='flex justify-start items-center gap-3 bg-zinc-600/20'>
          {candidates.map((candidate) => (
            <div className='rounded-md bg-primary/10 p-3 border shadow-sm'>
              {candidate.name}
            </div>
          ))}
          <div className={`${'hidden'} flex flex-col items-start gap-5 mx-10`}>
            <label htmlFor='title' className='text-base font-semibold'>
              Name
            </label>
            <input
              type='title'
              id='title'
              name='title'
              value={candidate.name}
              placeholder='title'
              className='border border-gray-400 rounded-md px-3 py-2 w-full'
              onChange={(e) =>
                setCandidate((pre) => ({ ...pre, ['name']: e.target.value }))
              }
            />
          </div>
          <button
            type='button'
            className='px-7 py-3 text-white bg-primary/20 rounded-md shadow-sm'
            onClick={() => {
              if (openPanel) {
                setCandidates(candidate)
                setOpenPanel(false)
              } else setOpenPanel(true)
            }}
          >
            {openPanel ? 'Add Candidate' : 'Add'}
          </button>
        </div>
      </div>
      <div className='flex flex-col justify-start items-center gap-5'>
        <button
          type='button'
          className='px-7 py-3 text-white bg-primary rounded-md shadow-sm'
          onClick={() => router.push('/admin/dashboard/create?ref=2')}
        >
          Next
        </button>
      </div>
    </div>
  )
}
