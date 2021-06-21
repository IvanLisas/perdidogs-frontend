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
import { MapContextProvider } from './contexts/MapContext'

export default function App() {
  const isLoadingComplete = useCachedResources()

  const colorScheme = useColorScheme()
  //TODO loading screen?
  if (!isLoadingComplete) return null
  else {
    return (
      <SafeAreaProvider>
        <UserContextProvider>
          <MapContextProvider>
            <PostContextProvider>
              <ThemeContextProvider>
                <Navigation />
                <StatusBar />
              </ThemeContextProvider>
            </PostContextProvider>
          </MapContextProvider>
        </UserContextProvider>
      </SafeAreaProvider>
    )
  }
}
