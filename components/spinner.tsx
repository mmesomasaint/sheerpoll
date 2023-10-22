export default function Spinner() {
  return (
    <div className='relative flex justify-center items-center'>
      <div className='w-5 h-5 border-4 border-white border-dotted rounded-full animate-spin' />
    </div>
  )
}

export function WithSpinner({ children }: { children: string }) {
  return (
    <div className='flex justify-center gap-2 items-center'>
      <Spinner />
      <p className='text-base font-semibold'>{children}</p>
    </div>
  )
}
