import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../types/models/User'
import useLocalStorage from '../hooks/useLocalStorage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Chat } from '../types/models/Chat'
import chatService from '../services/ChatService'
import UserContext from './UserContext'

interface ContextProps {
  readonly chats: Chat[]
  readonly setChats: (chats: Chat[]) => void
}

const ChatContext = createContext<ContextProps>({
  chats: [],
  setChats: () => null
})

export const ChatContextProvider: React.FC = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([])
  const [fetchFlag, setFetchFlag] = useState<boolean>(true)
  const { user } = useContext(UserContext)

  useEffect(() => {
    const getChat = async () => {
      if (!fetchFlag) setTimeout(() => setFetchFlag(true), 1000)
      else {
        try {
          setFetchFlag(false)
          if (user) {
            setChats([...(await chatService.getAll(user?.Id))])
            console.log('Fetching chats')
          }
        } catch (error) {
          console.log(error.message)
        }
      }
    }
    getChat()
  }, [fetchFlag])

  return <ChatContext.Provider value={{ chats, setChats }}>{children}</ChatContext.Provider>
}

export default ChatContext
