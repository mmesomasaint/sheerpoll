import FirebaseApp from '../firebase'
import { getFirestore, setDoc, doc } from 'firebase/firestore'

const db = getFirestore(FirebaseApp)

export default async function endPosition(id: string) {
  let position, error
  try {
    if (id) {
      const positionRef = doc(db, 'positions', id)
      position = await setDoc(
        positionRef,
        { status: 'concluded' },
        { merge: true }
      )
    }
  } catch (e) {
    error = e
  }

  return { position, error }
}
