import axios from 'axios'
import { Geometry, Point } from 'react-native-google-places-autocomplete'
import { SERVER_URL } from '../constants/Rest'
import { Bounderies } from '../types/models/Bounderies'
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

  async post(post: Post): Promise<Post> {
    console.log(post)
    return (await axios.post<Post>(`${SERVER_URL}/post`, post)).data
  }

  async getPostByFilters(pet: Pet | undefined, myLocation: Point | undefined, delta: Point | undefined): Promise<Post[]> {
    console.log({ pet, myLocation, delta })
    return (await axios.put<Post[]>(`${SERVER_URL}/post/by-filter`, { pet, myLocation, delta })).data
  }
}

const postService = new PostService()

export default postService
