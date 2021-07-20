import { AlertStatus } from './AlertStatus'
import { Pet } from './Pet'
import { Post } from './Post'
import { User } from './User'
import { Location } from './Location'

export type Alert = {
  Id?: number
  owner?: User
  pet?: Pet
  location?: Location
  creationDate?: Date
  alertStatus?: AlertStatus
}
