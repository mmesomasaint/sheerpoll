export default function authAdmin(rank: string, passcode: string) {
  if (rank === 'PRESIDENT' && passcode === process.env.ADMIN_PRESIDENT_CODE) {
    return {auth: process.env.ADMIN_PRESIDENT, id: process.env.ADMIN_PRESIDENT_SESSION}
  } else if (rank === 'VICE PRESIDENT' && passcode === process.env.ADMIN_VICE_PRESIDENT_CODE) {
    return {auth: process.env.ADMIN_VICE_PRESIDENT, id: process.env.ADMIN_VICE_PRESIDENT_SESSION}
  } else if (rank === 'ELECTORIAL GOVERNOR' && passcode === process.env.ADMIN_ELECTORIAL_GOVERNOR_CODE) {
    return {auth: process.env.ADMIN_ELECTORIAL_GOVERNOR, id: process.env.ADMIN_ELECTORIAL_GOVERNOR_SESSION}
  } else if (rank === 'DEPUTY VICE GOVERNOR' && passcode === process.env.ADMIN_DEPUTY_VICE_PRESIDENT) {
    return {auth: process.env.ADMIN_DEPUTY_VICE_PRESIDENT, id: process.env.ADMIN_DEPUTY_VICE_PRESIDENT_SESSION}
  }

  return null
}