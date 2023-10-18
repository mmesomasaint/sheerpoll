export default function authAdmin(rank: string, passcode: string) {
  const authorized = {
    [`${process.env.ADMIN_PRESIDENT}`]: process.env.ADMIN_PRESIDENT_CODE,
    [`${process.env.ADMIN_VICE_PRESIDENT}`]: process.env.ADMIN_VICE_PRESIDENT_CODE,
    [`${process.env.ADMIN_ELECTORIAL_GOVERNOR}`]: process.env.ADMIN_ELECTORIAL_GOVERNOR_CODE
  }
  
  if (rank === 'PRESIDENT' && passcode === process.env.ADMIN_PRESIDENT_CODE) {
    return process.env.ADMIN_PRESIDENT
  } else if (rank === 'VICE PRESIDENT' && passcode === process.env.ADMIN_VICE_PRESIDENT_CODE) {
    return process.env.ADMIN_VICE_PRESIDENT
  } else if (rank === 'ELECTORIAL GOVERNOR' && passcode === process.env.ADMIN_ELECTORIAL_GOVERNOR_CODE) {
    return process.env.ADMIN_ELECTORIAL_GOVERNOR
  }

  return null
}