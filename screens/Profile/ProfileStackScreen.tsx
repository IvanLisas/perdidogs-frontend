import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from './Profile'
import EditProfile from './EditProfile'
import { ProfileStackParamList } from '../../types/ProfileStackParamList'
import useTheme from '../../hooks/useTheme'

const HomeStack = createStackNavigator<ProfileStackParamList>()

function ProfileStackScreen() {
  const colors = useTheme()

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: '#000',
        cardStyle: {
          backgroundColor: colors.background
        },
        headerStyle: {
          backgroundColor: colors.navigation
        }
      }}
    >
      <HomeStack.Screen name="Main" options={{ title: 'Mi perfil' }} component={Profile} />
      <HomeStack.Screen name="Edit" component={EditProfile} />
      {/*  <HomeStack.Screen name="Details" component={TabOneScreen} /> */}
    </HomeStack.Navigator>
  )
}

export default ProfileStackScreen
