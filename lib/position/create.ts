import firebase_app from '../firebase'
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import type { CandidateType } from '@/app/admin/dashboard/create/page'

const db = getFirestore(firebase_app)
const positionsRef = collection(db, 'positions')

export default async function create(title: string, candidates: CandidateType[], creator: string) {
  let position, error
  try {
    const data = {
      title,
      candidates,
      creator,
    }

    position = await addDoc(positionsRef, data)
  } catch (e) {
    error = e
  }

  return { position, error }
}
