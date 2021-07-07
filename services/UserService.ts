import axios from 'axios'
import { SERVER_URL } from '../constants/Rest'
import { User } from '../types/models/User'

class UserService {
  axiosConfig = { timeout: 3000 }

  async login(email: string, password: string): Promise<User> {
    return (await axios.put<User>(`${SERVER_URL}/user/login`, { email, password }, this.axiosConfig)).data
  }

  async getUser(id: number): Promise<User> {
    return (await axios.put<User>(`${SERVER_URL}/user/${id}`, this.axiosConfig)).data
  }

  async register(user: User): Promise<User> {
    return (await axios.post<User>(`${SERVER_URL}/user/registration`, user, this.axiosConfig)).data
  }

  async update(user: User): Promise<User> {
    return (await axios.put<User>(`${SERVER_URL}/user/`, user, this.axiosConfig)).data
  }

  async delete(id: number): Promise<User> {
    return (await axios.delete<User>(`${SERVER_URL}/user/${id}`, this.axiosConfig)).data
  }
}

const userService = new UserService()

export default userService
