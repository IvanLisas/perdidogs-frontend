import React, { createContext, useState } from 'react'
import { Post } from '../types/models/Post'

interface ContextProps {
  readonly post: Post | undefined
  readonly setPost: (user: Post | undefined) => void
}

const PostContext = createContext<ContextProps>({
  post: undefined,
  setPost: () => null
})

export const PostContextProvider: React.FC = ({ children }) => {
  const [post, setPost] = useState<Post | undefined>()

  return <PostContext.Provider value={{ post, setPost }}>{children}</PostContext.Provider>
}

export default PostContext
