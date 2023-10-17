import firebase_app from '@/lib/firebase'
import {
  createUserWithEmailAndPassword,
  getAuth,
  AuthError,
} from 'firebase/auth'
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'

const auth = getAuth(firebase_app)
const db = getFirestore(firebase_app)
const votersRef = collection(db, 'voters')

export default async function register(email: string, password: string) {
  let voter = null,
    error = null

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const data = {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      votes: [],
    }

    // Create voter in planners db, and the local variable
    await setDoc(doc(votersRef, result.user.uid), data)
    voter = data
  } catch (e) {
    error = e as AuthError
  }

  return { voter, error }
}
