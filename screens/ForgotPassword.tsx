import * as React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
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

export default function ForgotPassword() {
  const { setUser } = useContext(UserContext)

  const [email, setEmail] = useState('')

  const [token, setToken] = useState('')

  const navigation = useNavigation()

  const [errorMessage, setErrorMessage] = useState('')

  const [mailWasSend, setMailWasSend] = useState(false)

  const sendToken = async () => {
    try {
      setErrorMessage('')
      await userService.sendToken(email)
      navigation.navigate('ChangeForgotPassword', { email: email })
    } catch (error) {
      setErrorMessage(showError(error))
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
          <MyText style={{ marginBottom: 8, fontSize: 22, fontWeight: '600' }}>¿Olvidaste tu contraseña?</MyText>
          <Image
            source={labrador}
            style={styles.labrador}
            /*    imageStyle={{
                  resizeMode: 'contain',
                }} */
          ></Image>
          <MyText style={{ marginBottom: 24, fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
            Te enviarmos un codigo al correo asociado a tu cuenta
          </MyText>

          <Input
            errorMessage={errorMessage}
            textContentType="emailAddress"
            placeholder="Email"
            autoCompleteType="email"
            onChangeText={setEmail}
            value={email}
            containerStyle={{ marginBottom: 16 }}
            renderErrorMessage={true}
          />

          <View style={styles.button}>
            <MyButton onPress={() => sendToken()} title="Enviar codigo" />
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
