import { User } from "firebase/auth"

export interface Voter extends User {
  votes: string[]
}