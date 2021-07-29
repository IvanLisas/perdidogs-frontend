import * as React from 'react'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import useTheme from '../../hooks/useTheme'
import { View } from 'react-native'
import Icon from '../../components/icons/index'
import ListOfChats from '../../screens/ListOfChats'
import ChatConversation from '../../screens/ChatConversation'
import MyText from '../../components/MyThemedComponents/MyText'
import { useNavigation } from '@react-navigation/native'
const ChatsStack = createStackNavigator()

function ProfileStackScreen() {
  const theme = useTheme()
  const navigation = useNavigation()
  return (
    <ChatsStack.Navigator
      screenOptions={{
        headerTintColor: theme.text,

        cardStyle: {
          backgroundColor: theme.background
        },
        headerStyle: {
          backgroundColor: theme.navigation
        },
        headerTitleStyle: {
          /*      fontFamily: 'LoveMeLikeASister' */
          fontSize: 22
        },
        headerBackTitleStyle: {
          fontFamily: 'LoveMeLikeASister'
        },
        /*      headerBackImage: () => (
          <View style={{ paddingHorizontal: 16 }}>
            <Icon style={{ color: colors.text, fontSize: 18 }} name="arrow-pointing-to-left-hand-drawn-outline" />
          </View>
        ),
 */
        headerBackTitleVisible: false
      }}
    >
      <ChatsStack.Screen name="Main" options={{ title: 'Chats' }} component={ListOfChats} />
      <ChatsStack.Screen
        name="Chat"
        options={{
          title: 'Chat',

          headerLeft: (props) => (
            <HeaderBackButton
              tintColor={theme.dark ? 'white' : 'black'}
              onPress={() =>
                navigation.navigate('Chats', {
                  screen: 'Main'
                })
              }
            ></HeaderBackButton>
          )
        }}
        component={ChatConversation}
      />
    </ChatsStack.Navigator>
  )
}

export default ProfileStackScreen
