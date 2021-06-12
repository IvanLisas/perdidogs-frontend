import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from './Login'
import EditProfile from './Registration'
import LoginStackParamList from '../../types/LoginStackParamList'
import useTheme from '../../hooks/useTheme'

const HomeStack = createStackNavigator<LoginStackParamList>()

function ProfileStackScreen() {
  const colors = useTheme()
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.background
        }
      }}
    >
      <HomeStack.Screen name="Main" component={Profile} />
      <HomeStack.Screen name="Registration" component={EditProfile} />
      {/*  <HomeStack.Screen name="Details" component={TabOneScreen} /> */}
    </HomeStack.Navigator>
  )
}

export default ProfileStackScreen
