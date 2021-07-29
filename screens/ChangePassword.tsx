import * as React from 'react'
import { Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

import { StackNavigationProp } from '@react-navigation/stack'
import Text from '../components/MyThemedComponents/MyText'
import { useContext, useState } from 'react'
import UserContext from '../contexts/UserContext'
import { Input } from 'react-native-elements'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { Ionicons } from '@expo/vector-icons'
import MyText from '../components/MyThemedComponents/MyText'
import { Avatar } from 'react-native-elements'
import MyInput from '../components/MyThemedComponents/MyInput'
import useTheme from '../hooks/useTheme'
import userService from '../services/UserService'
import MyButton from '../components/MyThemedComponents/MyButton'
import { useNavigation } from '@react-navigation/native'

type RootStackParamList = {
  Profile: {}
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>

type Props = {
  navigation: ProfileScreenNavigationProp
}

export default function ChangePassword() {
  const theme = useTheme()
  const { user, setUser, logout } = useContext(UserContext)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repetedNewPassword, setRepetedNewPassword] = useState('')
  const navigation = useNavigation()

  const changePassword = async () => {
    if (user) {
      try {
        if (user && newPassword === repetedNewPassword) {
          await userService.changePassword(user.Id, password, newPassword)
          navigation.goBack()
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  if (!user) return null

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{ paddingVertical: 8 }}>
          {/*  <MyText style={{ fontSize: 20, fontWeight: 'bold', padding: 4, marginBottom: 8 }}> Contraseña actual</MyText> */}
          <Input
            inputContainerStyle={{ borderBottomWidth: 0.5, alignSelf: 'center', paddingVertical: 0 }}
            onChangeText={setPassword}
            inputStyle={{ fontSize: 16, color: theme.text }}
            clearButtonMode="always"
            placeholder="Contraseña actual"
            value={password}
          ></Input>
          <Input
            placeholder="Nueva contraseña"
            inputContainerStyle={{ borderBottomWidth: 0.5, alignSelf: 'center' }}
            inputStyle={{ fontSize: 16, color: theme.text }}
            onChangeText={setNewPassword}
            value={newPassword}
          ></Input>
          <Input
            placeholder="Repetir nueva contraseña"
            inputContainerStyle={{ borderBottomWidth: 0.5, alignSelf: 'center' }}
            inputStyle={{ fontSize: 16, color: theme.text }}
            onChangeText={setRepetedNewPassword}
            value={repetedNewPassword}
          ></Input>
        </View>
        <View style={{ paddingHorizontal: 4 }}>
          <MyButton onPress={() => changePassword()} title="Cambiar contraseña"></MyButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
