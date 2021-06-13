import axios from 'axios'
import { SERVER_URL } from '../constants/Rest'
import { User } from '../types/User'

class UserService {
  async login(username: string, password: string): Promise<User> {
    console.log(username, password)
    return (await axios.put<User>(`${SERVER_URL}/user/login`, { username, password })).data
  }
}

const userService = new UserService()

export default userService
