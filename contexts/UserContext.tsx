import React, { createContext, useState } from 'react'
import { User } from '../types/models/User'
import useLocalStorage from '../hooks/useLocalStorage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

interface ContextProps {
  readonly user: User | undefined
  readonly setUser: (user: User | undefined) => void
  readonly logout: () => void
  readonly Tab: any
}

const UserContext = createContext<ContextProps>({
  user: undefined,
  setUser: () => null,
  logout: () => null,
  Tab: () => null
})

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>()

  const logout = () => setUser(undefined)
  const Tab = createBottomTabNavigator()
  return <UserContext.Provider value={{ user, setUser, logout, Tab }}>{children}</UserContext.Provider>
}

export default UserContext
