import { Post } from './Post'
import { Comment } from './Comment'

export type User = {
  Id: number
  firstName: string
  lastName: string
  email: string
  password?: string
  creationDate?: Date
  avatar?: string
  post?: Post[]
  comments?: Comment[]
}
