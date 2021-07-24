import * as React from 'react'
import { StyleSheet, View, Image, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Text from '../components/MyThemedComponents/MyText'

import { StackNavigationProp } from '@react-navigation/stack'
import { useContext, useState } from 'react'
import UserContext from '../contexts/UserContext'
import MyButton from '../components/MyThemedComponents/MyButton'
import userService from '../services/UserService'
import { LinearGradient } from 'expo-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import showError from '../utils/Erros'
import Input from '../components/MyThemedComponents/MyInput'
import LoginStackParamList from '../types/StackParamLists/LoginStackParamList'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import MyText from '../components/MyThemedComponents/MyText'

type authScreenProp = StackNavigationProp<LoginStackParamList>

export default function ChangeForgotPassword() {
  const { setUser } = useContext(UserContext)
  const route = useRoute()
  const initialEmail = (route.params as any).email as string
  const [email, setEmail] = useState(initialEmail)

  const [token1, setToken1] = useState('')
  const [token2, setToken2] = useState('')
  const [token3, setToken3] = useState('')
  const [token4, setToken4] = useState('')
  const [token5, setToken5] = useState('')
  const [token6, setToken6] = useState('')

  const refToken1 = React.createRef<TextInput>()
  const refToken2 = React.createRef<TextInput>()
  const refToken3 = React.createRef<TextInput>()
  const refToken4 = React.createRef<TextInput>()
  const refToken5 = React.createRef<TextInput>()
  const refToken6 = React.createRef<TextInput>()

  const navigation = useNavigation<authScreenProp>()

  const [errorMessage, setErrorMessage] = useState('')

  const [mailWasSend, setMailWasSend] = useState(false)

  const [password, setPassword] = useState('')

  const [repeatPassword, setRepeatPassword] = useState('')

  const sendToken = async () => {
    try {
      setErrorMessage('')
      await userService.sendToken(email)
      setMailWasSend(true)
    } catch (error) {
      setErrorMessage(showError(error))
      console.log(error.message)
    }
  }

  const changePassword = async () => {
    try {
      await userService.changePasswordWithToken(email, password, token1 + token2 + token3 + token4 + token5 + token6)
      setUser(await userService.login(email, password))
    } catch (error) {
      console.log(error.message)
    }
  }
  /* 
  const login = async () => {
    try {
      setLoading(true)
      setErrorMessage('')
      setUser(await userService.login(email, password))
    } catch (error) {
      setErrorMessage(showError(error))
    }
    setLoading(false)
  } */

  const labrador = require('../assets/images/golden.png')

  return (
    /*  <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss() }> */
    <LinearGradient colors={['#FFE5B2', '#EFB865']}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.root}>
          <View>
            <MyText style={{ marginBottom: 8 }}>Te enviamos un correo a </MyText>
            <View>
              <Input textContentType="emailAddress" placeholder="Email" autoCompleteType="email" onChangeText={setEmail} value={email} />
            </View>
            <MyText style={{ marginBottom: 8 }}>Ingresa el codigo que recibiste </MyText>

            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <Input
                style={{ alignItems: 'center', textAlign: 'center', paddingHorizontal: 0, paddingVertical: 16 }}
                maxLength={1}
                containerStyle={{ width: 60, alignItems: 'center' }}
                keyboardType="numeric"
                _ref={refToken1}
                onChangeText={(text) => {
                  if (text) {
                    console.log(text)
                    ;(refToken2.current as any).focus()
                  }
                  setToken1(text)
                }}
                value={token1}
              />
              <Input
                style={{ alignItems: 'center', textAlign: 'center', paddingHorizontal: 0, paddingVertical: 16 }}
                maxLength={1}
                _ref={refToken2}
                containerStyle={{ padding: 0, width: 60, alignItems: 'center' }}
                keyboardType="numeric"
                onChangeText={(text) => {
                  if (text) {
                    console.log(text)
                    ;(refToken3.current as any).focus()
                  }
                  setToken2(text)
                }}
                value={token2}
                onKeyPress={(event) => {
                  if (event.nativeEvent.key === 'Backspace') (refToken1.current as any).focus()
                }}
              />
              <Input
                style={{ alignItems: 'center', textAlign: 'center', paddingHorizontal: 0, paddingVertical: 16 }}
                maxLength={1}
                _ref={refToken3}
                containerStyle={{ padding: 0, width: 60, alignItems: 'center' }}
                keyboardType="numeric"
                onChangeText={(text) => {
                  if (text) {
                    console.log(text)
                    ;(refToken4.current as any).focus()
                  }
                  setToken3(text)
                }}
                value={token3}
                onKeyPress={(event) => {
                  if (event.nativeEvent.key === 'Backspace') (refToken2.current as any).focus()
                }}
              />
              <Input
                style={{ alignItems: 'center', textAlign: 'center', paddingHorizontal: 0, paddingVertical: 16 }}
                maxLength={1}
                _ref={refToken4}
                containerStyle={{ padding: 0, width: 60, alignItems: 'center' }}
                keyboardType="numeric"
                onChangeText={(text) => {
                  if (text) {
                    console.log(text)
                    ;(refToken5.current as any).focus()
                  }
                  setToken4(text)
                }}
                value={token4}
                onKeyPress={(event) => {
                  if (event.nativeEvent.key === 'Backspace') (refToken3.current as any).focus()
                }}
              />
              <Input
                style={{ alignItems: 'center', textAlign: 'center', paddingHorizontal: 0, paddingVertical: 16 }}
                maxLength={1}
                _ref={refToken5}
                containerStyle={{ padding: 0, width: 60, alignItems: 'center' }}
                keyboardType="numeric"
                onChangeText={(text) => {
                  if (text) {
                    console.log(text)
                    ;(refToken6.current as any).focus()
                  }
                  setToken5(text)
                }}
                value={token5}
                onKeyPress={(event) => {
                  if (event.nativeEvent.key === 'Backspace') (refToken4.current as any).focus()
                }}
              />
              <Input
                style={{ alignItems: 'center', textAlign: 'center', paddingHorizontal: 0, paddingVertical: 16 }}
                maxLength={2}
                _ref={refToken6}
                containerStyle={{ padding: 0, width: 60, alignItems: 'center' }}
                keyboardType="numeric"
                onTextInput={(event) => setToken6(event.nativeEvent.text)}
                onKeyPress={(event) => {
                  if (event.nativeEvent.key === 'Backspace') (refToken5.current as any).focus()
                  else if (event.nativeEvent.key === '1') setToken6(event.nativeEvent.key)
                  console.log(event.nativeEvent.key)
                }}
                value={token6}
              />
            </View>
            {/*   <Input maxLength={6} keyboardType="numeric" placeholder="Codigo" onChangeText={setToken} value={token} /> */}

            <MyText style={{ marginBottom: 8 }}>Ingresa tu nueva contraseña </MyText>
            <View>
              <Input textContentType="newPassword" placeholder="Contraseña" onChangeText={setPassword} value={password} />
            </View>
            <View>
              <Input textContentType="password" placeholder="Repetir contraseña" onChangeText={setRepeatPassword} value={repeatPassword} />
            </View>
            <View style={styles.button}>
              <MyButton onPress={() => changePassword()} title="Cambiar contraseña" />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
    /*  </KeyboardAwareScrollView> */
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    width: 310,
    justifyContent: 'center'
  },
  button: {
    alignSelf: 'stretch'
  },
  labrador: {
    marginBottom: 16
    /*    alignSelf: 'center' */
    /*     width: 200,
    height: 200 */
  }
})
