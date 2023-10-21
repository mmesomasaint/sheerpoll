import FirebaseApp from '@/lib/firebase'
import {
  doc,
  getFirestore,
  getDoc,
  query,
  where,
  collection,
  getDocs,
} from 'firebase/firestore'

const db = getFirestore(FirebaseApp)
const candidatesRef = collection(db, 'candidates')

export async function getById(uid: string) {
  if (uid) {
    const docSnap = await getDoc(doc(candidatesRef, uid))

    if (docSnap.exists()) return docSnap.data()
  }

  return null
}

export async function getByPosition(positionId: string) {
  const q = query(candidatesRef, where('position_id', '==', positionId))
  const querySnap = await getDocs(q)
  const docs = querySnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

  return docs
}
