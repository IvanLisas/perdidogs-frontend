import axios from 'axios'
import { SERVER_URL } from '../constants/Rest'
import { User } from '../types/models/User'

class UserService {
  async login(email: string, password: string): Promise<User> {
    return (await axios.put<User>(`${SERVER_URL}/user/login`, { email, password })).data
  }

  async getUser(id: number): Promise<User> {
    return (await axios.put<User>(`${SERVER_URL}/user/${id}`)).data
  }

  async register(user: User): Promise<User> {
    return (await axios.post<User>(`${SERVER_URL}/user/`, user)).data
  }

  async update(user: User): Promise<User> {
    return (await axios.put<User>(`${SERVER_URL}/user/`, user)).data
  }

  async delete(id: number): Promise<User> {
    return (await axios.delete<User>(`${SERVER_URL}/user/${id}`)).data
  }
}

const userService = new UserService()

export default userService
