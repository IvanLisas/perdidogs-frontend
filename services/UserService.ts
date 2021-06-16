import axios from 'axios'
import { SERVER_URL } from '../constants/Rest'
import { User } from '../types/User'

class UserService {
  async login(email: string, password: string): Promise<User> {
    return (await axios.put<User>(`${SERVER_URL}/user/login`, { email, password })).data
  }

  async registration(user: User): Promise<User> {
    console.log(user)
    return (await axios.post<User>(`${SERVER_URL}/user/registration`, user)).data
  }
}

const userService = new UserService()

export default userService
