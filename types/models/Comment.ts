import { Post } from './Post'
import { User } from './User'

export type Comment = {
  text?: string
  owner?: User
  creation?: Date
  post?: any
}
