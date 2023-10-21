import FirebaseApp from '../firebase'
import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  collection,
  arrayUnion,
} from 'firebase/firestore'

const db = getFirestore(FirebaseApp)
const votesRef = collection(db, 'votes')

export default async function createVote(
  positionId: string,
  candidateId: string,
  voterId: string
) {
  let vote, error

  try {
    const voteData = {
      position_id: positionId,
      candidate_id: candidateId,
      voter_id: voterId,
    }
    const voteDoc = await addDoc(votesRef, voteData)

    // Add the vote id to the votes of position, candidate and voter.
    const positionRef = doc(db, 'positions', positionId)
    await setDoc(
      positionRef,
      { votes: arrayUnion(voteDoc.id) },
      { merge: true }
    )

    const candidateRef = doc(db, 'candidates', candidateId)
    await setDoc(
      candidateRef,
      { votes: arrayUnion(voteDoc.id) },
      { merge: true }
    )

    const voterRef = doc(db, 'voters', voterId)
    await setDoc(voterRef, { votes: arrayUnion(voteDoc.id) }, { merge: true })

    vote = voteDoc.id
  } catch (e) {
    error = e
  }

  return { vote, error }
}
