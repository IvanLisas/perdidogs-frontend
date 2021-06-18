import React, { createContext, useState } from 'react'
import { User } from '../types/models/User'
import useLocalStorage from '../hooks/useLocalStorage'

interface ContextProps {
  readonly user: User | undefined
  readonly setUser: (user: User | undefined) => void
  readonly logout: () => void
}

const UserContext = createContext<ContextProps>({
  user: undefined,
  setUser: () => null,
  logout: () => null
})

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>()

  const logout = () => setUser(undefined)

  return <UserContext.Provider value={{ user, setUser, logout }}>{children}</UserContext.Provider>
}

export default UserContext
