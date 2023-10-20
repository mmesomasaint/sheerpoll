import FirebaseApp from '../firebase'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import type { CandidateType } from '@/app/admin/dashboard/create/page'

const db = getFirestore(FirebaseApp)
const positionsRef = collection(db, 'candidates')

export default async function createCandidate(candidate: CandidateType) {
  let candidateData, error

  try {
    candidateData = await addDoc(positionsRef, candidate)
  } catch (e) {
    error = e
  }

  return { candidateData, error }
}
