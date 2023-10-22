import FirebaseApp from '@/lib/firebase'
import { signInWithEmailAndPassword, getAuth, AuthError } from 'firebase/auth'
import { doc, getFirestore, getDoc } from 'firebase/firestore'
import getError from '../getError'

const auth = getAuth(FirebaseApp)
const db = getFirestore(FirebaseApp)

export default async function logIn(email: string, password: string) {
  let voter = null,
    error = null

  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const plannersRef = doc(db, 'voters', result.user.uid)
    const docSnap = await getDoc(plannersRef)

    if (docSnap.exists()) voter = docSnap.data()
    else throw new Error('Email does not exist')
  } catch (e) {
    error = getError(e as AuthError)

    // If a voter was signed in, sign them out.
    if (auth.currentUser) await auth.signOut()
  }

  return { voter, error }
}
