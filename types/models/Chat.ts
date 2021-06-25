import { Message } from './Message'
import { User } from './User'

export type Chat = {
  Id: number
  owner: User
  owner2: User
  messageList: Message[]
  creationDate?: Date
}
