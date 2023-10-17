import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen gap-0">
      <div className="py-16">
        <h1 className="text-6xl font-bold">Hello, (name)</h1>
      </div>
      <div className="grow flex flex-col h-full">
        <div className="flex justify-start items-center gap-20">
          <Link href='/v/dashboard/'>
            <p className="text-base font-semibold">Timeline</p>
          </Link>
          <Link href='/v/dashboard/election'>
            <p className="text-base font-semibold">Election</p>
          </Link>
        </div>
        <div className="grow h-full">
          Loading.. or Content goes here..
        </div>
      </div>
    </div>
  )
}