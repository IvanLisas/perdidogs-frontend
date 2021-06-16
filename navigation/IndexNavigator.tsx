import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import { ColorSchemeName } from 'react-native'
import RootStackParamList from '../types/RootStackParamList'
import BottomTabNavigator from './BottomTabNavigator'
import LinkingConfiguration from '../types/LinkingConfiguration'
import { MyDefaultTheme, MyDarkTheme } from '../styles/Theme'
import { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import LoginStackScreen from './LoginStackScreen'

export default function Navigation() {
  const Stack = createStackNavigator<RootStackParamList>()
  const { user } = useContext(UserContext)
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user && <Stack.Screen name="Root" component={BottomTabNavigator} />}
        {!user && <Stack.Screen name="Login" component={LoginStackScreen} />}
        {/*  <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
