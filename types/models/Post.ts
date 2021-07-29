import { Pet } from './Pet'
import { Picture } from './Picture'
import { User } from './User'
import { Location } from './Location'
import { Comment } from './Comment'
import { PostStatus } from './PostStatus'

export type Post = {
  Id: number
  description?: string
  creationDate?: Date
  owner?: User
  postStatus?: PostStatus
  pictures: Picture[]
  location: Location
  comments?: Comment[]
  pet?: Pet
  distance?: number
}
