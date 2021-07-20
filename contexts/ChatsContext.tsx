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
  readonly findChatId: (addresseeId: number) => number | undefined
}

const ChatContext = createContext<ContextProps>({
  chats: [],
  setChats: () => null,
  findChatId: (addresseeId: number) => addresseeId
})

export const ChatContextProvider: React.FC = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([])
  const [fetchFlag, setFetchFlag] = useState<boolean>(true)
  const { user } = useContext(UserContext)

  const findChatId = (addresseeId: number) =>
    chats.find((chat) => (chat.owner.Id == user?.Id && chat.owner2.Id == addresseeId) || (chat.owner2.Id == user?.Id && chat.owner.Id == addresseeId))
      ?.Id

  useEffect(() => {
    let isActive = true
    const getChat = async () => {
      if (!fetchFlag) setTimeout(() => setFetchFlag(true), 1000)
      else {
        setFetchFlag(false)

        if (user) {
          try {
            const chats = await chatService.getAll(user?.Id)
            if (isActive) {
              setChats([...chats])
            }
          } catch (error) {
            console.log('Fetching Fail')
            console.log(error.message)
          }
        }
      }
    }
    getChat()
    /*     return () => {
      console.log('Desmontado')
      isActive = false
    } */
  }, [fetchFlag])

  return <ChatContext.Provider value={{ chats, setChats, findChatId }}>{children}</ChatContext.Provider>
}

export default ChatContext
