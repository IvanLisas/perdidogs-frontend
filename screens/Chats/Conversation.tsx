import { StatusBar } from 'expo-status-bar'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Alert, ImageBackground, Image, Dimensions } from 'react-native'
import UserContext from '../../contexts/UserContext'
import { Avatar } from 'react-native-elements'
import Text from '../../components/MyThemedComponents/Text'
import chatService from '../../services/ChatService'
import { Chat } from '../../types/models/Chat'
import useTheme from '../../hooks/useTheme'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-android'
import SendBar from '../../components/SendBar'

const Conversation: React.FC = (props) => {
  const { user } = useContext(UserContext)

  const navigation = useNavigation()
  const route = useRoute()
  const [fetchFlag, setFetchFlag] = useState<boolean>(true) //Si es true traigo mensajes del backend
  const [chat, setChat] = useState<any>(route.params)
  const [text, setText] = useState('')

  /*   const chat = route.params as Chat */
  useEffect(() => {
    const getChat = async () => {
      if (!fetchFlag) setTimeout(() => setFetchFlag(true), 3000)
      else await fetchChat()
    }
    getChat()
  }, [fetchFlag])

  const fetchChat = async () => {
    try {
      const chatId = await chatService.getId({ user1Id: chat.owner.Id, user2Id: chat.owner2.Id })

      const chats = await chatService.getAll(user?.Id)
      const myChat = chats.find((_chat, index) => _chat.Id == chatId)
      if (myChat) setChat(myChat)
      setFetchFlag(false)
    } catch (errorMessage) {
      console.log(errorMessage)
    }
  }

  const sendMessage = async () => {
    const address = chat.owner.Id == user?.Id ? chat.owner2.Id : chat.owner.Id
    await chatService.sendMessage({ adressee: address, sender: user?.Id, chat: chat.Id, messageBody: text, read: false })
    setText('')
  }

  const theme = useTheme()

  if (!user) return null
  const scrollViewRef = useRef<any>()
  return (
    <View style={styles.root}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        <View style={{ padding: 16 }}>
          {chat.messageList.map((message: any, index: number) =>
            message.sender.Id == user.Id ? (
              <View key={index + 'avatar2'} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24, alignSelf: 'flex-end' }}>
                <Text
                  key={index + 'avatar3'}
                  style={{
                    color: 'white',
                    marginRight: 8,
                    maxWidth: 300,
                    padding: 16,
                    borderRadius: 24,
                    borderTopRightRadius: 0,
                    backgroundColor: '#1868FB'
                  }}
                >
                  {message.body}
                </Text>
                <Avatar
                  key={index + 'avatar'}
                  size="medium"
                  titleStyle={{ color: 'white' }}
                  source={{ uri: message.sender.avatar }}
                  overlayContainerStyle={{ backgroundColor: 'grey' }}
                  rounded
                  title={user.firstName[0] + user.lastName[0]}
                />
              </View>
            ) : (
              <View key={index + 'avatar4'} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24, alignSelf: 'flex-start' }}>
                <Avatar
                  key={index + 'avatar6'}
                  size="medium"
                  titleStyle={{ color: 'white' }}
                  source={{ uri: message.sender.avatar }}
                  overlayContainerStyle={{ backgroundColor: 'grey' }}
                  rounded
                  containerStyle={{ marginRight: 8 }}
                  title={user.firstName[0] + user.lastName[0]}
                />
                <Text style={{ color: 'white', maxWidth: 300, padding: 16, borderRadius: 24, borderTopLeftRadius: 0, backgroundColor: '#00BF9D' }}>
                  {message.body}
                </Text>
              </View>
            )
          )}
        </View>
      </ScrollView>

      <SendBar onPress={sendMessage} setText={setText} text={text}></SendBar>
    </View>
  )
}

export default Conversation

const styles = StyleSheet.create({
  root: {
    flex: 1
    /*  padding: 16 */
    /* 
    alignItems: 'center',
    justifyContent: 'center' */
  }
})
