import { Post } from './Post'

export type NotificationDTO = {
  alertId: number
  postId: number
  url: string
  creationDate: Date
  lat: number
  long: number
  hasBeenRead: boolean
}
