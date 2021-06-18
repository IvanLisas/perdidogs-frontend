import axios from 'axios'
import { SERVER_URL } from '../constants/Rest'
import { Bounderies } from '../types/models/Bounderies'
import { Post } from '../types/models/Post'

class PostService {
  async get(id: number): Promise<Post> {
    return (await axios.get<Post>(`${SERVER_URL}/post/${id}`)).data
  }

  async getAll(): Promise<Post[]> {
    return (await axios.get<Post[]>(`${SERVER_URL}/post/getAll`)).data
  }

  async location(bounderies: Bounderies): Promise<Post[]> {
    return (await axios.put<Post[]>(`${SERVER_URL}/post/by-location}`, bounderies)).data
  }

  async create(id: number, post: Post): Promise<Post> {
    return (await axios.post<Post>(`${SERVER_URL}/post/${id}`, post)).data
  }

  async update(id: number, post: Post): Promise<Post> {
    return (await axios.put<Post>(`${SERVER_URL}/post/${id}`, post)).data
  }

  async delete(id: number): Promise<Post> {
    return (await axios.delete<Post>(`${SERVER_URL}/post/${id}`)).data
  }
}

const postService = new PostService()

export default postService
