import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EditProfile from '../../screens/EditProfile'
import { ProfileStackParamList } from '../../types/StackParamLists/ProfileStackParamList'
import useTheme from '../../hooks/useTheme'
import { View } from 'react-native'
import Icon from '../../components/icons/index'
import Profile from '../../screens/Profile'

const HomeStack = createStackNavigator<ProfileStackParamList>()

function ProfileStackScreen() {
  const colors = useTheme()

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: colors.text,
        cardStyle: {
          backgroundColor: colors.background
        },
        headerStyle: {
          backgroundColor: colors.navigation
        },
        headerTitleStyle: {
          /*  fontFamily: 'LoveMeLikeASister' */
          fontSize: 22
        },
        headerBackTitleStyle: {
          fontFamily: 'LoveMeLikeASister'
        },
        headerBackImage: () => (
          <View style={{ paddingHorizontal: 16 }}>
            <Icon style={{ color: colors.text, fontSize: 18 }} name="arrow-pointing-to-left-hand-drawn-outline" />
          </View>
        ),

        headerBackTitleVisible: false
      }}
    >
      <HomeStack.Screen name="Main" options={{ title: 'Perfil' }} component={Profile} />
      <HomeStack.Screen name="Edit" options={{ title: 'Editar Perfil' }} component={EditProfile} />
    </HomeStack.Navigator>
  )
}

export default ProfileStackScreen
