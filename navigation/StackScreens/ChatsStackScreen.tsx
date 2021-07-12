import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import useTheme from '../../hooks/useTheme'
import { View } from 'react-native'
import Icon from '../../components/icons/index'
import ListOfChats from '../../screens/ListOfChats'
import ChatConversation from '../../screens/ChatConversation'
const ChatsStack = createStackNavigator()

function ProfileStackScreen() {
  const colors = useTheme()

  return (
    <ChatsStack.Navigator
      screenOptions={{
        headerTintColor: colors.text,
        cardStyle: {
          backgroundColor: colors.background
        },
        headerStyle: {
          backgroundColor: colors.navigation
        },
        headerTitleStyle: {
          /*      fontFamily: 'LoveMeLikeASister' */
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
      <ChatsStack.Screen name="Main" options={{ title: 'Chats' }} component={ListOfChats} />
      <ChatsStack.Screen name="Chat" options={{ title: 'Chat' }} component={ChatConversation} />
    </ChatsStack.Navigator>
  )
}

export default ProfileStackScreen
