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
import MyButton from '../components/MyThemedComponents/MyButton'

const Alerts: React.FC = () => {
  const { user } = useContext(UserContext)

  const { chats } = useContext(ChatContext)

  const theme = useTheme()

  const navigation = useNavigation()

  const goToNewAlert = () => {
    navigation.navigate('newAlert')
  }

  if (!user) return null

  return (
    <View style={styles.root}>
      <ScrollView>
        <MyText>Lista de alertas</MyText>
        <MyButton onPress={goToNewAlert} title="+"></MyButton>
      </ScrollView>
    </View>
  )
}

export default Alerts

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16
    /* 
    alignItems: 'center',
    justifyContent: 'center' */
  }
})
