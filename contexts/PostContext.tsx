import React, { createContext, useState } from 'react'
import { Post } from '../types/models/Post'

interface ContextProps {
  readonly post: Post | undefined
  readonly posts: Post[]
  readonly setPost: (user: Post | undefined) => void
  readonly setPosts: (posts: Post[]) => void
}

const PostContext = createContext<ContextProps>({
  post: undefined,
  posts: [],
  setPost: () => null,
  setPosts: () => null
})

export const PostContextProvider: React.FC = ({ children }) => {
  const [post, setPost] = useState<Post | undefined>()
  const [posts, setPosts] = useState<Post[]>([])

  return <PostContext.Provider value={{ post, setPost, posts, setPosts }}>{children}</PostContext.Provider>
}

export default PostContext
