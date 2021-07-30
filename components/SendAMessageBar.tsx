import React, { useContext } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Avatar, Input } from 'react-native-elements'
import UserContext from '../contexts/UserContext'
import { User } from '../types/models/User'
import Text from './MyThemedComponents/MyText'
import { format } from 'date-fns'
import moment from 'moment'
import useTheme from '../hooks/useTheme'

import Icon from './icons/index'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import MyInput from './MyThemedComponents/MyInput'
import { Ionicons } from '@expo/vector-icons'

interface SendAMessageBarProps {
  text: string
  setText: (text: string) => void
  onPress: () => void
}

const SendAMessageBar: React.FC<SendAMessageBarProps> = (props) => {
  const { text, setText, onPress } = props

  const theme = useTheme()

  return (
    <View
      style={{
        /*        width: 50,
        height: 50, */
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        paddingVertical: 16,
        paddingBottom: 8
      }}
    >
      {/*       <Input
        h={45}
        selectionColor={theme.primary}
        bgColor={theme.input}
        w={Dimensions.get('window').width - 28 - 16}
        value={text}
        onChangeText={setText}
        borderRadius={25}

        placeholder="Enviar un mensaje"
        placeholderTextColor={'black'}
      /> */}
      <View style={{ width: Dimensions.get('window').width - 28 - 16 }}>
        <Input
          placeholder="Enviar un mensaje"
          inputStyle={{ fontSize: 16, color: theme.text }}
          onChangeText={setText}
          value={text}
          renderErrorMessage={false}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          style={{
            borderRadius: 15,
            padding: 8,

            paddingLeft: 16,

            backgroundColor: theme.input
          }}
        ></Input>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Ionicons style={{ marginRight: 4 }} size={24} color="#5AC8FA" name="send" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'white',
    marginBottom: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#E0E0E0',
    borderBottomColor: '#E0E0E0'
  },
  title: {
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default SendAMessageBar
