import { Chat } from './Chat'
import { User } from './User'

export type Message = {
  Id: number
  sender: User
  adressee: User
  chat: Chat
  body: string
  read: boolean
  creationDate: Date
}
