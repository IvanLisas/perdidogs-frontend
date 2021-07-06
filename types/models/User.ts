import { Post } from './Post'

export type User = {
  Id?: number
  firstName: string
  lastName: string
  email: string
  password?: string
  creationDate?: Date
  avatar?: string
  post?: Post[]
}
