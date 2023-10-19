import firebase_app from '../firebase'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import type { CandidateType } from '@/app/admin/dashboard/create/page'
import createCandidate from '../candidate/create'

const db = getFirestore(firebase_app)
const positionsRef = collection(db, 'positions')

export default async function createPosition(
  title: string,
  candidates: CandidateType[],
  creator: string
) {
  let position, error
  try {
    const candidatesId = candidates.map(async (candidate) => {
      const { candidateData } = await createCandidate(candidate)
      return candidateData?.id
    })

    const data = {
      title,
      candidates: [...candidatesId],
      creator,
    }

    position = await addDoc(positionsRef, data)
  } catch (e) {
    error = e
  }

  return { position, error }
}
