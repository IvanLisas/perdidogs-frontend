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
import ChatContext from '../contexts/ChatsContext'

const ListOfChats: React.FC = () => {
  const { user } = useContext(UserContext)

  const { chats } = useContext(ChatContext)

  const theme = useTheme()

  const navigation = useNavigation()

  const goToChat = async (chat: Chat) => {
    const addressee = chat.owner.Id == user?.Id ? chat.owner2 : chat.owner
    try {
      await chatService.read(chat.Id)
    } catch (error) {
      console.log(error.messages)
    }
    navigation.navigate('Chat', { addressee: addressee })
  }

  if (!user) return null

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {chats.map((chat, index) => (
          <TouchableOpacity
            style={{
              paddingVertical: 16,
              borderBottomWidth: 0.5,

              borderColor: theme.border,
              flex: 1,
              alignSelf: 'flex-start',
              justifyContent: 'space-between',
              /*  alignItems: 'center', */
              flexDirection: 'row',
              width: '100%',
              flexWrap: 'nowrap'
            }}
            onPress={() => goToChat(chat)}
            key={'chat' + index}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
              <View key={'chat3' + index}>
                <MyText key={'chat4' + index} style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }} numberOfLines={1}>
                  {chat.owner.Id == user.Id ? chat.owner2.firstName + ' ' + chat.owner2.lastName : chat.owner.firstName + ' ' + chat.owner.lastName}
                </MyText>
                <View style={{ flex: 1 }}>
                  <MyText
                    key={'chat5' + index}
                    style={{
                      color: chat.messageList.some((message) => !message.read) ? theme.text : theme.textLabel,
                      fontWeight: chat.messageList.some((message) => !message.read) ? 'bold' : 'normal'
                    }}
                    numberOfLines={1}
                  >
                    {chat?.messageList[chat.messageList.length - 1].body}
                  </MyText>
                </View>
              </View>
            </View>
            <View
              style={{
                /*      alignSelf: 'center', */
                backgroundColor: chat.messageList.some((message) => !message.read) ? '#0A84FF' : 'transparent',
                width: 8,
                height: 8,
                borderRadius: 50
              }}
            />
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
