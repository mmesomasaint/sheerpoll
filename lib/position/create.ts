import firebase_app from '../firebase'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import type { CandidateType } from '@/app/admin/dashboard/create/page'
import createCandidate from '../candidate/create'

const db = getFirestore(firebase_app)
const positionsRef = collection(db, 'positions')

export default async function createPosition(
  title: string,
  candidates: CandidateType[],
  creator: string | undefined
) {
  let position, error
  try {
    const candidatesId = candidates.map(async (candidate) => {
      const { candidateData } = await createCandidate(candidate)
      return candidateData?.id
    })

    if (creator) {
      const data = {
        title,
        candidates: [...candidatesId],
        creator,
      }

      position = await addDoc(positionsRef, data)
    } else throw new Error('No creator signature')
  } catch (e) {
    error = e
  }

  return { position, error }
}
