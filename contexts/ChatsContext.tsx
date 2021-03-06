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
  readonly newChats: number
}

const ChatContext = createContext<ContextProps>({
  chats: [],
  setChats: () => null,
  findChatId: (addresseeId: number) => addresseeId,
  newChats: 0
})

export const ChatContextProvider: React.FC = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([])
  const [fetchFlag, setFetchFlag] = useState<boolean>(true)
  const { user } = useContext(UserContext)

  const newChats = chats.filter((chat) => chat.messageList.some((message) => !message.read)).length

  const findChatId = (addresseeId: number) =>
    chats.find((chat) => (chat.owner.Id == user?.Id && chat.owner2.Id == addresseeId) || (chat.owner2.Id == user?.Id && chat.owner.Id == addresseeId))
      ?.Id

  useEffect(() => {
    let isActive = true
    let timer1 = setTimeout(() => {
      if (!fetchFlag) setFetchFlag(true)
    }, 1000)

    const getChat = async () => {
      if (fetchFlag) {
        setFetchFlag(false)

        if (user) {
          try {
            if (isActive) {
              const chats = await chatService.getAll(user?.Id)

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
    return () => {
      clearTimeout(timer1)
      isActive = false
    }
  }, [fetchFlag])

  return <ChatContext.Provider value={{ newChats, chats, setChats, findChatId }}>{children}</ChatContext.Provider>
}

export default ChatContext
