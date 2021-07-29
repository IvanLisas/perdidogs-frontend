import axios from 'axios'
import { Geometry, Point } from 'react-native-google-places-autocomplete'
import { SERVER_URL } from '../constants/Rest'
import { Bounderies } from '../types/models/Bounderies'
import { Filter } from '../types/models/Filter'
import { Pet } from '../types/models/Pet'
import { Post } from '../types/models/Post'

class PostService {
  async get(id: number): Promise<Post> {
    return (await axios.get<Post>(`${SERVER_URL}/post/${id}`)).data
  }

  async getAll(): Promise<Post[]> {
    return (await axios.get<Post[]>(`${SERVER_URL}/post/getAll`)).data
  }

  async getPostsByUserId(userId: number): Promise<Post[]> {
    return (await axios.get<Post[]>(`${SERVER_URL}/post/getAll`)).data
  }

  async geyByLocation(geometry: Geometry | undefined): Promise<Post[]> {
    return (await axios.put<Post[]>(`${SERVER_URL}/post/by-location`, geometry)).data
  }

  async create(id: number, post: Post): Promise<Post> {
    return (await axios.post<Post>(`${SERVER_URL}/post/${id}`, post)).data
  }

  async update(post: any): Promise<Post> {
    return (await axios.put<Post>(`${SERVER_URL}/post`, post)).data
  }

  async delete(id: number): Promise<Post> {
    return (await axios.delete<Post>(`${SERVER_URL}/post/${id}`)).data
  }

  async changeoStatusToFound(postId: number, userId: number): Promise<Post> {
    console.log((await axios.put<Post>(`${SERVER_URL}/post/dogFoundStatus/${postId}/${userId}`)).data)
    return (await axios.put<Post>(`${SERVER_URL}/post/dogFoundStatus/${postId}/${userId}`)).data
  }

  async changeoStatusToNotFound(postId: number, userId: number): Promise<Post> {
    return (await axios.put<Post>(`${SERVER_URL}/post/dogNotFoundStatus/${postId}/${userId}`)).data
  }

  //TODO hacer DTO
  async post(post: any): Promise<Post> {
    return (await axios.post<Post>(`${SERVER_URL}/post`, post)).data
  }

  async getPostByFilters(filter: Filter): Promise<Post[]> {
    return (await axios.put<Post[]>(`${SERVER_URL}/post/by-filter`, filter)).data
  }

  async getPostByUser(userId: number): Promise<Post[]> {
    return (await axios.get<Post[]>(`${SERVER_URL}/post/by-user${userId}`)).data
  }
}

const postService = new PostService()

export default postService
