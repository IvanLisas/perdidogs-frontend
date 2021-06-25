import React, { useContext } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import UserContext from '../contexts/UserContext'
import { User } from '../types/models/User'
import Text from './MyThemedComponents/Text'
import { format } from 'date-fns'
import moment from 'moment'
import useTheme from '../hooks/useTheme'
import { Input } from 'native-base'
import Icon from '../components/icon/index'
import { TouchableOpacity } from '@gorhom/bottom-sheet'

interface UserAvatarProps {
  text: string
  setText: (text: string) => void
  onPress: () => void
}

const SendBar: React.FC<UserAvatarProps> = (props) => {
  const { text, setText, onPress } = props

  const theme = useTheme()

  return (
    <View
      style={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: theme.navigation,
        borderTopColor: theme.text,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24
      }}
    >
      <Input
        h={45}
        selectionColor={theme.primary}
        bgColor={theme.primary}
        w={Dimensions.get('window').width - 80}
        mx={1}
        value={text}
        onChangeText={setText}
        borderColor={theme.primary}
        placeholder="Enviar un mensaje"
        placeholderTextColor={'black'}
      />
      <TouchableOpacity onPress={onPress}>
        <Icon style={{ color: theme.primary, fontSize: 28 }} name="arrow-pointing-up-hand-drawn-symbol" />
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

export default SendBar
