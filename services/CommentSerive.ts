import axios from 'axios'
import { SERVER_URL } from '../constants/Rest'
import { Chat } from '../types/models/Chat'
import { Comment } from '../types/models/Comment'
import { Message } from '../types/models/Message'
import { Post } from '../types/models/Post'

class CommentService {
  async save(comment: Comment): Promise<Post> {
    return (await axios.post<Post>(`${SERVER_URL}/comment/`, comment)).data
  }
}

const commentService = new CommentService()

export default commentService
