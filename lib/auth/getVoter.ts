import FirebaseApp from '@/lib/firebase'
import { getAuth, User } from 'firebase/auth'
import { doc, getFirestore, getDoc } from 'firebase/firestore'

const auth = getAuth(FirebaseApp)
const db = getFirestore(FirebaseApp)

export default async function getVoter(uid = auth.currentUser?.uid) {
  if (uid) {
    const votersRef = doc(db, 'voters', uid)
    const docSnap = await getDoc(votersRef)

    if (docSnap.exists()) return docSnap.data() as User
  }

  return null
}
