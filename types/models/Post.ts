import { Pet } from './Pet'
import { Picture } from './Picture'
import { User } from './User'
import { Location } from './Location'
import { Comment } from './Comment'

export type Post = {
  Id: number
  description: string
  creationDate: Date
  owner: User
  /*status:PostStatus */
  pictures: Picture[]
  location: Location
  comments: Comment[]
  pet: Pet
}
