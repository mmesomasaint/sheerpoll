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
import { getByPosition } from '../candidate/get'

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

export async function getByStatus(
  status: 'ongoing' | 'concluded',
  first: number
) {
  const q = query(positionsRef, where('status', '==', status), limit(first))
  const querySnap = await getDocs(q)

  // For all the positions returned, get the candidates
  const docs = await Promise.all(
    querySnap.docs.map(async (doc) => {
      const candidates = await getByPosition(doc.id)
      return { id: doc.id, ...doc.data(), candidates }
    })
  )

  return docs
}

export async function getByVoter(voterId: string, first: number) {
  let positions = [], error

  try {
    // Find the voter and extract their vote id's.
  const votersRef = doc(db, 'voters', voterId)
  const voterDoc = await getDoc(votersRef)

  if (voterDoc.exists()) {
    const votes: string[] = voterDoc.data().votes
    
    positions = await Promise.all(votes.map(async (vote) => {
      const votesRef = doc(db, 'votes', vote)
      const voteDoc = await getDoc(votesRef)

      if (voteDoc.exists()) {
        const positionId: string = voteDoc.data().position_id
        const positionRef = doc(positionsRef, positionId)
        const positionDoc = await getDoc(positionRef)

        if (positionDoc) {
          return {id: positionDoc.id, ...positionDoc.data()}
        }
      } else throw new Error(`Vote with id: ${vote}, not found.`)
    }))

    
  } else throw new Error(`Voter with id: ${voterId}, not found`)
  } catch(e) {
    error = e
  }
}

export async function getAll(first: number) {
  const q = query(positionsRef, limit(first))
  const querySnap = await getDocs(q)
  const docs = querySnap.docs.map((doc) => doc.data())

  return docs
}
