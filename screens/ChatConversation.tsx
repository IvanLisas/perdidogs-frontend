import React, { useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import UserContext from '../contexts/UserContext'
import { Avatar } from 'react-native-elements'
import chatService from '../services/ChatService'
import useTheme from '../hooks/useTheme'

import { useNavigation, useRoute } from '@react-navigation/native'
import SendAMessageBar from '../components/SendAMessageBar'
import MyText from '../components/MyThemedComponents/MyText'
import ChatContext from '../contexts/ChatsContext'
import { Chat } from '../types/models/Chat'
import { User } from '../types/models/User'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { flexWrap } from 'styled-system'

const ChatConversation: React.FC = (props) => {
  const { user } = useContext(UserContext)
  const { chats, findChatId } = useContext(ChatContext)
  const route = useRoute()
  const [scrollPosition, setScrollPosition] = useState(0)

  const addressee = (route.params as any).addressee as User
  const chatId = findChatId(addressee.Id)
  console.log(addressee.Id, chatId)
  const chat = chatId ? chats.filter((chat) => chat.Id == chatId)[0] : ({} as Chat)

  const [text, setText] = useState('')

  const sendMessage = async () => {
    await chatService.sendMessage({ adressee: addressee.Id, sender: user?.Id, chat: chat.Id ? chat.Id : 0, messageBody: text, read: false })
    setText('')
  }

  const theme = useTheme()

  if (!user) return null
  const scrollViewRef = useRef<ScrollView>(null)
  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} enabled={false}>
      <View style={styles.root}>
        <KeyboardAwareScrollView>
          {chatId && (
            <View style={{ padding: 16 }}>
              {chat.messageList.map((message: any, index: number) =>
                message.sender.Id == user.Id ? (
                  <View key={index + 'avatar2'} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24, alignSelf: 'flex-end' }}>
                    <MyText
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
                    </MyText>
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
                    <MyText
                      style={{ color: 'white', maxWidth: 300, padding: 16, borderRadius: 24, borderTopLeftRadius: 0, backgroundColor: '#00BF9D' }}
                    >
                      {message.body}
                    </MyText>
                  </View>
                )
              )}
            </View>
          )}
        </KeyboardAwareScrollView>

        <View
          style={{
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0
          }}
        >
          {/*   <TextInput /> */}
          <SendAMessageBar onPress={sendMessage} setText={setText} text={text}></SendAMessageBar>
        </View>
        {/* <SendAMessageBar onPress={sendMessage} setText={setText} text={text}></SendAMessageBar> */}
      </View>
    </KeyboardAvoidingView>
  )
}

export default ChatConversation

const styles = StyleSheet.create({
  root: {
    /*  flexDirection: 'column' */
    flex: 1

    /*  padding: 16 */
    /* 
    alignItems: 'center',
    justifyContent: 'center' */
  }
})
