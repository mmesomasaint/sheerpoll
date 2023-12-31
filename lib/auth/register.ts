import FirebaseApp from '@/lib/firebase'
import {
  createUserWithEmailAndPassword,
  getAuth,
  AuthError,
} from 'firebase/auth'
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'
import getError from '../getError'

const auth = getAuth(FirebaseApp)
const db = getFirestore(FirebaseApp)
const votersRef = collection(db, 'voters')

export default async function register(
  name: string,
  email: string,
  password: string
) {
  let voter = null,
    error = null

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const data = {
      uid: result.user.uid,
      email: result.user.email,
      displayName: name.toString(), // Ensure it's string format.
      votes: [],
    }

    // Create voter in planners db, and the local variable
    await setDoc(doc(votersRef, result.user.uid), data)
    voter = data
  } catch (e) {
    error = getError(e as AuthError)

    // If a user is already created, delete them.
    if (auth.currentUser) await auth.currentUser.delete()
  }

  return { voter, error }
}
