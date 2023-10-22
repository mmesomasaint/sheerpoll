import { useEffect, useState } from 'react'
import { BsStar } from 'react-icons/bs'

export default function Message({
  text,
  setText,
  error,
}: {
  text?: string
  setText?: (value: string | undefined) => void
  error?: boolean
}) {
  const [message, setMessage] = useState(text)

  useEffect(() => {
    if (text) setMessage(text)
  }, [text])

  return (
    <div className='flxed inset-0 bg-transparent'>
      <div className='relative w-full h-full'>
        <div
          className={`rounded-md shadow-sm flex justify-between items-center gap-10 p-3 my-5 ${
            error ? 'bg-red-500/20' : 'bg-primary/20'
          } duration-700 absolute left-[50%] -translate-x-[50%] top-0 ${
            !text && '-translate-y-24'
          } w-[25%]`}
        >
          <p className='text-base font-semibold tracking-wider'>{message}</p>
          <div
            className='shrink-0 w-8 h-8 rounded-full border border-black flex justify-center items-center'
            onClick={() => setText?.(undefined)}
          >
            <BsStar className='text-base text-black' />
          </div>
        </div>
      </div>
    </div>
  )
}
