import React, { useContext, useEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import UserContext from '../contexts/UserContext'
import { Chat } from '../types/models/Chat'
import chatService from '../services/ChatService'
import { Dimensions, View, StyleSheet } from 'react-native'
import MyText from '../components/MyThemedComponents/MyText'
import useTheme from '../hooks/useTheme'

const ListOfChats: React.FC = () => {
  const { user } = useContext(UserContext)

  const [chats, setChats] = useState<Chat[]>([])
  const [fetchFlag, setFetchFlag] = useState<boolean>(true) //Si es true traigo mensajes del backend
  const theme = useTheme()

  const navigation = useNavigation()

  useEffect(() => {
    const getChat = async () => {
      if (!fetchFlag) setTimeout(() => setFetchFlag(true), 3000)
      else await fetchChat()
    }
    getChat()
  }, [fetchFlag])

  const fetchChat = async () => {
    try {
      setChats(await chatService.getAll(user?.Id))

      setFetchFlag(false)
    } catch (errorMessage) {
      console.log(errorMessage)
    }
  }

  const goToChat = (chat: Chat) => {
    navigation.navigate('Chat', chat)
  }

  if (!user) return null

  return (
    <View style={styles.root}>
      <ScrollView>
        {chats.map((chat, index) => (
          <TouchableOpacity onPress={() => goToChat(chat)} key={'chat' + index}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Avatar
                key={'chat2' + index}
                size="medium"
                containerStyle={{ marginRight: 12 }}
                titleStyle={{ color: 'white' }}
                source={chat.owner.Id == user.Id ? { uri: chat.owner2.avatar } : { uri: chat.owner.avatar }}
                overlayContainerStyle={{ backgroundColor: 'grey' }}
                rounded
                title={
                  chat.owner.Id == user.Id ? chat.owner2.firstName[0] + chat.owner2.lastName[0] : chat.owner.firstName[0] + chat.owner.lastName[0]
                }
              />
              <View
                key={'chat3' + index}
                style={{ width: Dimensions.get('window').width - 90 /* , borderBottomWidth: 1, borderBottomColor: 'grey' */ }}
              >
                <MyText key={'chat4' + index} style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }} numberOfLines={1}>
                  {chat.owner.Id == user.Id ? chat.owner2.firstName + ' ' + chat.owner2.lastName : chat.owner.firstName + ' ' + chat.owner.lastName}
                </MyText>
                <MyText key={'chat5' + index} style={{ color: theme.textLabel }} numberOfLines={1}>
                  {chat?.messageList[chat.messageList.length - 1].body}
                </MyText>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default ListOfChats

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16
    /* 
    alignItems: 'center',
    justifyContent: 'center' */
  }
})
