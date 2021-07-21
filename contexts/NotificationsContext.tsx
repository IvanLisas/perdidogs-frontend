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
}

const NotificationsContext = createContext<ContextProps>({
  notifications: [],
  setNotifications: () => null
})

export const NotificationsContextProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationDTO[]>([])
  const [fetchFlag, setFetchFlag] = useState<boolean>(true)
  const { user } = useContext(UserContext)

  useEffect(() => {
    const getChat = async () => {
      if (!fetchFlag) setTimeout(() => setFetchFlag(true), 1000)
      else {
        setFetchFlag(false)
        if (user) {
          try {
            setNotifications([...(await alertService.getAllActiveAlerts(user?.Id))])
          } catch (error) {
            console.log('Fetching Fail')
            console.log(error.message)
          }
        }
      }
    }
    getChat()
  }, [fetchFlag])

  return <NotificationsContext.Provider value={{ notifications, setNotifications }}>{children}</NotificationsContext.Provider>
}

export default NotificationsContext
