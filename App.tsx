import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation/IndexNavigator'
import { UserContextProvider } from './contexts/UserContext'
import { ThemeContextProvider } from './contexts/ThemeContext'
import { PostContextProvider } from './contexts/PostContext'

export default function App() {
  const isLoadingComplete = useCachedResources()

  const colorScheme = useColorScheme()
  //TODO loading screen?
  if (!isLoadingComplete) return null
  else {
    return (
      <SafeAreaProvider>
        <UserContextProvider>
          <PostContextProvider>
            <ThemeContextProvider>
              <Navigation />
              <StatusBar />
            </ThemeContextProvider>
          </PostContextProvider>
        </UserContextProvider>
      </SafeAreaProvider>
    )
  }
}
