import FirebaseApp from '@/lib/firebase'
import {
  doc,
  getFirestore,
  getDoc,
  query,
  where,
  limit,
  collection,
  getDocs,
} from 'firebase/firestore'

const db = getFirestore(FirebaseApp)
const positionsRef = collection(db, 'positions')

export async function getById(uid: string) {
  if (uid) {
    const docSnap = await getDoc(doc(positionsRef, uid))

    if (docSnap.exists()) return docSnap.data()
  }

  return null
}

export async function getAllByCreator(creator: string, first: number) {
  const q = query(positionsRef, where('creator', '==', creator), limit(first))
  const querySnap = await getDocs(q)
  const docs = querySnap.docs.map((doc) => doc.data())

  return docs
}

export async function getAll(first: number) {
  const q = query(positionsRef, limit(first))
  const querySnap = await getDocs(q)
  const docs = querySnap.docs.map((doc) => doc.data())

  return docs
}

export async function getStatus(
  status: 'ongoing' | 'concluded',
  first: number
) {
  const q = query(positionsRef, where('status', '==', status), limit(first))
  const querySnap = await getDocs(q)
  const docs = querySnap.docs.map((doc) => doc.data())

  return docs
}
