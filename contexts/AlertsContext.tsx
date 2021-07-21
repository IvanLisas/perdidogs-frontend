import React, { createContext, useState } from 'react'
import { Alert } from '../types/models/Alert'

interface ContextProps {
  readonly alerts: Alert[]
  readonly setAlerts: (alerts: Alert[]) => void
}

const AlertsContext = createContext<ContextProps>({
  alerts: [],
  setAlerts: () => null
})

export const AlertsContextProvider: React.FC = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([])

  return <AlertsContext.Provider value={{ alerts, setAlerts }}>{children}</AlertsContext.Provider>
}

export default AlertsContext
