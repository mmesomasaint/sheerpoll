import { AuthError } from 'firebase/auth'

export default function getError(error: AuthError) {
  if (error.code === 'auth/email-already-in-use') {
    return {
      from: ['email'],
      message: 'Email already registered',
    }
  } else if (error.code === 'auth/invalid-email') {
    return {
      from: ['email'],
      message: 'Email is not registered',
    }
  } else if (error.code === 'auth/invalid-password') {
    return {
      from: ['password'],
      message: 'Password is not registered',
    }
  } else if (error.code === 'auth/user-not-found') {
    return {
      from: ['email', 'password'],
      message: 'Voter is not registered',
    }
  } else if (error.code === 'auth/missing-password') {
    return {
      from: ['password'],
      message: 'Password missing',
    }
  } else if (error.code === 'auth/invalid-login-credentials') {
    return {
      from: ['email', 'password'],
      message: 'Voter is not registered',
    }
  }

  return {
    from: [''],
    message: 'Something went wrong',
  }
}
