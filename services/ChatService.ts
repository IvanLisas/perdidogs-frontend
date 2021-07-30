import axios from 'axios'
import { SERVER_URL } from '../constants/Rest'
import { Chat } from '../types/models/Chat'
import { Message } from '../types/models/Message'

class ChatService {
  axiosConfig = { timeout: 3000 }

  async getAll(id: number | undefined): Promise<Chat[]> {
    return (await axios.get<Chat[]>(`${SERVER_URL}/chat/${id}`, this.axiosConfig)).data
  }

  async sendMessage(message: MessageDTO): Promise<Chat> {
    return (await axios.post<Chat>(`${SERVER_URL}/chat/`, message, this.axiosConfig)).data
  }

  async getId(user1Id: ChatDTO): Promise<Number> {
    return (await axios.post<Number>(`${SERVER_URL}/chat/find`, user1Id, this.axiosConfig)).data
  }

  async read(chatId: number): Promise<Number> {
    return (await axios.put<Number>(`${SERVER_URL}/chat/${chatId}`, {}, this.axiosConfig)).data
  }
}

const chatService = new ChatService()

export default chatService

export type MessageDTO = {
  sender: number | undefined
  chat: number
  adressee: number | undefined
  messageBody: string
  read: boolean
  Id?: number
}

export type ChatDTO = {
  user1Id: number
  user2Id: number
}
