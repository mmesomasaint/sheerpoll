import {useRouter, useSearchParams } from "next/navigation";
import {BsCheckLg} from 'react-icons/bs'

export default function Vote() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const position = searchParams.get('position')

  // Get current position with getPos(position); in maybe useEffect
  // or anyway else.

  return (
    <div className="flex flex-col items-start gap-10">
      <div className="flex flex-col gap-3">
        <h6 className="text-sm uppercase font-medium">ID</h6>
        <h4 className="text-lg uppercase font-medium">QER313EHNT_HHGRI58Y3</h4>
      </div>
      <div className="flex flex-col gap-3">
        <h6 className="text-sm uppercase font-medium">VOTES</h6>
        <h4 className="text-2xl uppercase font-semibold">3,877</h4>
      </div>
      <div className="flex flex-col gap-3">
        <h6 className="text-sm uppercase font-medium">TITLE</h6>
        <h4 className="text-5xl uppercase font-semibold">Vice President</h4>
      </div>
      <div className="flex flex-col gap-3">
        <h6 className="text-sm uppercase font-medium">WINNER</h6>
        <h4 className="text-2xl uppercase font-semibold">Pending..</h4>
      </div>
      <div className="flex flex-col gap-3">
        <h6 className="text-sm uppercase font-medium">CANDIDATES</h6>
        <div className="flex flex-col gap-3">
          <CheckBox>Amadi Stephens</CheckBox>
          <CheckBox>Amadi Stephens</CheckBox>
          <CheckBox>Amadi Stephens</CheckBox>
          <CheckBox>Amadi Stephens</CheckBox>
          <CheckBox>Amadi Stephens</CheckBox>
        </div>
      </div>
          <button
            type='button'
            onClick={() => router.replace('/v/dashboard/')}
            className='px-7 py-3 text-white bg-primary rounded-md shadow-sm'
          >
            Vote
          </button>
    </div>
  )
}


function CheckBox({
  check,
  setCheck,
  children,
}: {
  children: React.ReactNode
  check?: boolean
  setCheck?: (prev: boolean) => void
}) {
  return (
    <div
      className='flex justify-start items-center gap-2'
      onClick={() => setCheck?.(!check)}
    >
      <div
        className={`w-[1.18rem] h-[1.18rem] rounded-md flex justify-center items-center border ${
          check ? 'border-apple-store-pri' : 'border-apple-store-faded'
        }`}
      >
        {check && <BsCheckLg className={`text-lg text-apple-store-pri`} />}
      </div>
      <p className="text-base font-medium text-secondary-faded">
        {children}
      </p>
    </div>
  )
}