import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <div className='flex justify-between items-center gap-10 px-10 py-5 w-full'>
        <div className='flex justify-start items-center gap-10'>
          <h1 className='text-4xl font-bold'>Sheerpoll</h1>
        </div>
        <div className='flex justify-end items-center gap-10'>
          <Link href='/auth/login' className='text-lg font-bold'>
            Login
          </Link>
          <Link href='/auth/signup' className='text-lg font-bold'>
            Signup
          </Link>
        </div>
      </div>
      <div className='grow flex flex-col justify-center items-center gap-10 p-10'>
        <h1 className='text-6xl font-bold'>PANs Sheerpoll</h1>
        <p className='text-2xl'>
          A pure and transparent election conducting platform
        </p>
        <div className='flex justify-center items-center gap-10'>
          <Link href='/auth/login' className='text-lg font-bold'>
            Login
          </Link>
          <Link href='/auth/signup' className='text-lg font-bold'>
            Signup
          </Link>
        </div>
      </div>
    </main>
  )
}
