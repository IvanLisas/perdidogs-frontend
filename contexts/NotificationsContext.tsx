import React, { createContext, useContext, useEffect, useState } from 'react'
import { NotificationDTO } from '../types/models/NotificationDTO'
import useLocalStorage from '../hooks/useLocalStorage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Chat } from '../types/models/Chat'
import chatService from '../services/ChatService'
import UserContext from './UserContext'
import alertService from '../services/AlertService'

interface ContextProps {
  readonly notifications: NotificationDTO[]
  readonly setNotifications: (notifications: NotificationDTO[]) => void
  readonly newNotification: number
}

const NotificationsContext = createContext<ContextProps>({
  notifications: [],
  setNotifications: () => null,
  newNotification: 0
})

export const NotificationsContextProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationDTO[]>([])
  const [fetchFlag, setFetchFlag] = useState<boolean>(true)
  const { user } = useContext(UserContext)

  const newNotification = notifications.filter((notification) => !notification.hasBeenRead).length

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

              setNotifications([...(await alertService.getAllActiveAlerts(user?.Id))])
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

  return <NotificationsContext.Provider value={{ notifications, setNotifications, newNotification }}>{children}</NotificationsContext.Provider>
}

export default NotificationsContext
