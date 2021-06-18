/*import axios from 'axios'
import { SERVER_URL } from '../constants/Rest'

class ChatService {
  async getAll(id: number): Promise<Chat> {
    return (await axios.get<Chat>(`${SERVER_URL}/chat/${id}`)).data
  }

  async sendMessage(message: Message): Promise<Chat> {
    return (await axios.post<Chat>(`${SERVER_URL}/chat/`, message)).data
  }
}

const chatService = new ChatService()

export default chatService
*/