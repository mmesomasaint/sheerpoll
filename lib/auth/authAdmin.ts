export default function authAdmin(rank: string | null, passcode: string) {
  // Determine who the admin is by matching the rank with corresponding passcode
  const isPresident =
    rank === 'PRESIDENT' && passcode === process.env.NEXT_PUBLIC_ADMIN_PRESIDENT_CODE
  const isVice =
    rank === 'VICE PRESIDENT' &&
    passcode === process.env.NEXT_PUBLIC_ADMIN_VICE_PRESIDENT_CODE
  const isDeputyVice =
    rank === 'DEPUTY VICE GOVERNOR' &&
    passcode === process.env.NEXT_PUBLIC_ADMIN_DEPUTY_VICE_PRESIDENT
  const isElect =
    rank === 'ELECTORIAL GOVERNOR' &&
    passcode === process.env.NEXT_PUBLIC_ADMIN_ELECTORIAL_GOVERNOR_CODE


  // Depending on who they are, return their information otherwise return null.
  if (isPresident) {
    return {
      auth: process.env.NEXT_PUBLIC_ADMIN_PRESIDENT,
      id: process.env.NEXT_PUBLIC_ADMIN_PRESIDENT_SESSION,
    }
  } else if (isVice) {
    return {
      auth: process.env.NEXT_PUBLIC_ADMIN_VICE_PRESIDENT,
      id: process.env.NEXT_PUBLIC_ADMIN_VICE_PRESIDENT_SESSION,
    }
  } else if (isElect) {
    return {
      auth: process.env.NEXT_PUBLIC_ADMIN_ELECTORIAL_GOVERNOR,
      id: process.env.NEXT_PUBLIC_ADMIN_ELECTORIAL_GOVERNOR_SESSION,
    }
  } else if (isDeputyVice) {
    return {
      auth: process.env.NEXT_PUBLIC_ADMIN_DEPUTY_VICE_PRESIDENT,
      id: process.env.NEXT_PUBLIC_ADMIN_DEPUTY_VICE_PRESIDENT_SESSION,
    }
  }

  return null
}
