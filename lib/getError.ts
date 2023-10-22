import { AuthError } from 'firebase/auth'

export default function getError(error: AuthError) {
  if (error.code === 'auth/email-already-in-use') {
    return {
      from: ['email'],
      message: 'Email already in use',
    }
  } else if (error.code === 'auth/invalid-email') {
    return {
      from: ['email'],
      message: "Email doesn't exist",
    }
  } else if (error.code === 'auth/invalid-password') {
    return {
      from: ['password'],
      message: "Password doesn't exist",
    }
  } else if (error.code === 'auth/user-not-found') {
    return {
      from: ['email', 'password'],
      message: "Voter doesn't exist",
    }
  }

  return {
    from: [''],
    message: 'Something went wrong',
  }
}
