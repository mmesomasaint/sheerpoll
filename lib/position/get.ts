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
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore'
import { getByPosition } from '../candidate/get'

const db = getFirestore(FirebaseApp)
const positionsRef = collection(db, 'positions')

const extractCandidatesInfo = async (
  querySnap: QuerySnapshot<DocumentData, DocumentData>
) => {
  return Promise.all(
    querySnap.docs.map(async (doc) => {
      const candidates = await getByPosition(doc.id)
      return { id: doc.id, ...doc.data(), candidates }
    })
  )
}

export async function getById(uid: string) {
  if (uid) {
    const docSnap = await getDoc(doc(positionsRef, uid))

    if (docSnap.exists()) {
      const candidates = await getByPosition(docSnap.id)
      return { id: docSnap.id, ...docSnap.data(), candidates }
    }
  }

  return null
}

export async function getAllByCreator(creator: string, first: number) {
  const q = query(positionsRef, where('creator', '==', creator), limit(first))
  const querySnap = await getDocs(q)
  const docs = await extractCandidatesInfo(querySnap)

  return docs
}

export async function getByStatus(
  status: 'ongoing' | 'concluded',
  first: number
) {
  const q = query(positionsRef, where('status', '==', status), limit(first))
  const querySnap = await getDocs(q)

  // For all the positions returned, get the candidates
  const docs = await extractCandidatesInfo(querySnap)

  return docs
}

export async function getByVoter(voterId: string, first: number) {
  let positions, error

  try {
    // Find the voter and extract their vote id's.
    const votersRef = doc(db, 'voters', voterId)
    const voterDoc = await getDoc(votersRef)

    if (voterDoc.exists()) {
      const votes: string[] = voterDoc.data().votes

      const q = query(positionsRef, where('votes', 'array-contains-any', votes), limit(first))
      const querySnap = await getDocs(q)
      
      // For all the positions returned, get the candidates
      const docs = await extractCandidatesInfo(querySnap)
    
      return docs
    } else throw new Error(`Voter with id: ${voterId}, not found`)
  } catch (e) {
    error = e
  }

  return { positions, error }
}

export async function getAll(first: number) {
  const q = query(positionsRef, limit(first))
  const querySnap = await getDocs(q)
  const docs = await extractCandidatesInfo(querySnap)

  return docs
}
