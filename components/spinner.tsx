export default function Spinner({ dark }: { dark?: boolean }) {
  return (
    <div className='relative flex justify-center items-center'>
      <div
        className={`w-5 h-5 border-4 ${
          dark ? 'border-black' : 'border-white'
        } border-dotted rounded-full animate-spin`}
      />
    </div>
  )
}

export function WithSpinner({
  dark,
  children,
}: {
  children: string
  dark?: boolean
}) {
  return (
    <div className='flex justify-center gap-2 items-center'>
      <Spinner dark={dark} />
      <p className='text-base font-semibold tracking-wider'>{children}</p>
    </div>
  )
}
