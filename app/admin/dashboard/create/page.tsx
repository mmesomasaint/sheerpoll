'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { BsStar } from 'react-icons/bs'

export type CandidateType = {
  name: string
  votes: string[]
  position_id: string
}

type FormType = { title: string; candidates: CandidateType[] }

export default function CreatePosition() {
  // Creating position requires 3 steps.
  // First one happens with creating the title
  // Second one happens when you create and add candidates
  // Third one is where you see everything you've created. and then click create
  // To create a fully fledged position.
  const searchParams = useSearchParams()
  const [ref, setRef] = useState(searchParams.get('ref') ?? '1')
  const [form, setForm] = useState<FormType>({
    title: '',
    candidates: [],
  })

  const FIRSTPAGE = ref === '1' || form.title.length === 0
  const SECONDPAGE = ref === '2' && form.title.length > 0
  const THIRDPAGE =
    ref === '3' && form.title.length > 0 && form.candidates.length > 0

  const setTitle = (title: string) => setForm((pre) => ({ ...pre, title }))
  const setCandidates = (candidate: CandidateType) =>
    setForm((pre) => ({
      ...pre,
      ['candidates']: [...pre.candidates, candidate],
    }))

  console.log(searchParams.get('ref'))
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Change the ref to the next step
    console.log('You created: ', form)
  }

  useEffect(() => {
    setRef(searchParams.get('ref') ?? '1')
  }, [searchParams.get('ref')])

  return (
    <form onSubmit={submit}>
      <div className='flex flex-col justify-center items-center gap-5 min-h-screen w-full'>
        <h1 className='text-4xl font-bold'>Create Position</h1>
        <div className='flex justify-center items-center'>
          <div className='w-8 h-8 rounded-full border border-black/60 bg-transparent flex justify-center items-center'>
            <BsStar className='text-xl text-primary' />
          </div>
          <div className='w-12 border-b bg-transparent border-black/60 border-dashed' />
          <div className='w-8 h-8 rounded-full border border-black/60 bg-transparent flex justify-center items-center'>
            <BsStar className='text-xl text-primary' />
          </div>
          <div className='w-12 border-b bg-transparent border-black/60 border-dashed' />
          <div className='w-8 h-8 rounded-full border border-black/60 bg-transparent flex justify-center items-center'>
            <BsStar className='text-xl text-primary' />
          </div>
        </div>
        {FIRSTPAGE && <Title title={form.title} setTitle={setTitle} />}
        {SECONDPAGE && (
          <Candidates
            candidates={form.candidates}
            setCandidates={setCandidates}
          />
        )}
        {THIRDPAGE && (
          <DisplayPosition title={form.title} candidates={form.candidates} />
        )}
        <button
          type='submit'
          className={`${
            THIRDPAGE ? 'block' : 'hidden'
          } px-7 py-3 text-white bg-primary rounded-md shadow-sm`}
        >
          Create
        </button>
      </div>
    </form>
  )
}

function Title({
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
          disabled={title.length === 0}
          className='px-7 py-3 text-white bg-primary rounded-md shadow-sm disabled:bg-primary/20'
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
  setCandidates: (candidate: CandidateType) => void
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
        <div className='flex flex-wrap justify-start items-center gap-3 w-full bg-transparent'>
          {candidates.map((candidate) => (
            <div className='shrink-0 rounded-md bg-primary/10 p-3 border shadow-sm'>
              {candidate.name}
            </div>
          ))}
          <button
            type='button'
            className={`${
              openPanel ? 'hidden' : 'block'
            } px-7 py-3 text-white bg-zinc-900 rounded-md shadow-sm`}
            onClick={() => setOpenPanel(true)}
          >
            Add
          </button>
        </div>
        <div
          className={`${
            openPanel ? 'block' : 'hidden'
          } flex flex-col gap-5 py-5 w-full bg-zinc-900/30`}
        >
          <div className={`flex flex-col items-start px-10 w-full`}>
            <h4 className='w-full text-center text-2xl font-semibold mb-3'>
              New Candidate
            </h4>
            <label htmlFor='name' className='text-base font-semibold'>
              Name
            </label>
            <input
              type='name'
              id='name'
              name='name'
              value={candidate.name}
              placeholder='name'
              className='border border-gray-400 rounded-md px-3 py-2 w-full'
              onChange={(e) =>
                setCandidate((pre) => ({ ...pre, ['name']: e.target.value }))
              }
            />
          </div>
          <button
            type='button'
            className={`${
              openPanel ? 'block' : 'hidden'
            } px-7 py-3 text-white bg-zinc-900 rounded-md shadow-sm w-fit mx-auto`}
            onClick={() => {
              setCandidates(candidate)
              setCandidate((pre) => ({ ...pre, ['name']: '' }))
              setOpenPanel(false)
            }}
          >
            Add Candidate
          </button>
        </div>
      </div>
      <div className='flex flex-col justify-start items-center gap-5'>
        <button
          type='button'
          disabled={candidates.length === 0}
          className='px-7 py-3 text-white bg-primary rounded-md shadow-sm disabled:bg-primary/20'
          onClick={() => router.push('/admin/dashboard/create?ref=3')}
        >
          Next
        </button>
      </div>
    </div>
  )
}

function DisplayPosition({
  title,
  candidates,
}: {
  title: string
  candidates: CandidateType[]
}) {
  return (
    <div className='flex flex-col gap-8 w-[25%]'>
      <div className='flex flex-col items-start gap-1'>
        <p className='text-sm font-semibold'>TITLE</p>
        <p className='text-xl font-semibold'>{title}</p>
      </div>
      <div className='flex flex-col items-start gap-1'>
        <p className='text-sm font-semibold'>CANDIDATES</p>
        <p className='text-xl font-semibold'>
          {candidates.map((candidate) => candidate.name).join(', ')}
        </p>
      </div>
    </div>
  )
}