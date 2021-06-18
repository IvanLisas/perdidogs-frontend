import React, { useState, useContext } from 'react'

import UserContext from '../contexts/UserContext'
import { User } from '../types/models/User'

export default function useUser(): (User | ((user: User | undefined) => void) | undefined)[] {
  const { user, setUser, logout } = useContext(UserContext)

  return [user, setUser, logout]
}
