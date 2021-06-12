import React, { createContext, useState } from 'react'
import { MyTheme, MyDefaultTheme, MyDarkTheme } from '../constants/Theme'
import { useColorScheme } from 'react-native'
import { Appearance, AppearanceProvider } from 'react-native-appearance'
import { useEffect } from 'react'

const defaultMode = Appearance.getColorScheme() || 'light'

interface ContextProps {
  readonly theme: MyTheme
  readonly setTheme: (theme: MyTheme) => void
}

export const ThemeContext = createContext<ContextProps>({
  theme: MyDefaultTheme,
  setTheme: () => null
})

export const ThemeContextProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(defaultMode == 'dark' ? MyDarkTheme : MyDefaultTheme)

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme == 'dark' ? MyDarkTheme : MyDefaultTheme)
    })
    return () => subscription.remove()
  }, [])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeContext
