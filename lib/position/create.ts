import FirebaseApp from '../firebase'
import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore'
import type { CandidateType } from '@/app/admin/dashboard/create/page'
import createCandidate from '../candidate/create'

const db = getFirestore(FirebaseApp)
const positionsRef = collection(db, 'positions')

export default async function createPosition(
  title: string,
  candidates: CandidateType[],
  creator: string | undefined
) {
  let position, error

  try {
    if (creator) {
      const data = {
        title,
        candidates: [],
        status: 'ongoing', // 'ongoing' | 'concluded'
        creator,
        createdAt: serverTimestamp(),
      }

      const positionDoc = await addDoc(positionsRef, data)

      if (positionDoc) {
        const newPositionRef = doc(positionsRef, positionDoc.id)

        const candidateIDs = await Promise.all(
          candidates.map(async (candidate: CandidateType) => {
            const { candidateData, error } = await createCandidate({
              ...candidate,
              position_id: positionDoc.id,
            })
            if (error) throw error
            else return candidateData?.id
          })
        )

        await setDoc(
          newPositionRef,
          { candidates: [...candidateIDs] },
          { merge: true }
        )
      } else throw new Error('No position document')
    } else throw new Error('No creator signature')
  } catch (e) {
    error = e
  }

  return { position, error }
}
