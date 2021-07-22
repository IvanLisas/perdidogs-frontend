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

type authScreenProp = StackNavigationProp<LoginStackParamList>

export default function ForgotPassword() {
  const { setUser } = useContext(UserContext)

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [repeatPassword, setRepeatPassword] = useState('')

  const [token, setToken] = useState('')

  const navigation = useNavigation<authScreenProp>()

  const [errorMessage, setErrorMessage] = useState('')

  const [mailWasSend, setMailWasSend] = useState(false)

  const sendToken = async () => {
    try {
      await userService.sendToken(email)
      setMailWasSend(true)
    } catch (error) {
      console.log(error.message)
    }
  }

  const changePassword = async () => {
    try {
      await userService.changePasswordWithToken(email, password, token)
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

  return (
    /*  <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss() }> */
    <LinearGradient colors={['#FFE5B2', '#EFB865']} style={styles.background}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.root}>
          {/*           <ImageBackground
            source={labrador}
            style={styles.labrador}
            imageStyle={{
              resizeMode: 'contain',
              alignSelf: 'flex-start'
            }}
          ></ImageBackground> */}
          <View style={styles.content}>
            <View style={styles.content2}>
              {/* <MyInput placeholder="Email"  textContentType="emailAddress" onChangeText={setEmail}></MyInput> */}
              <Input textContentType="emailAddress" placeholder="Email" autoCompleteType="email" onChangeText={setEmail} value={email} />

              {/*      <Input
                textContentType="newPassword"
                placeholder="Contraseña"
                onChangeText={setPassword}
                autoCompleteType="password"
                value={password}
                secureTextEntry={true}
                errorMessage={errorMessage}
              />
 */}
              <View style={styles.button}>
                <MyButton onPress={() => sendToken()} title="Enviar codigo" />
              </View>
              {mailWasSend && (
                <View>
                  <Input maxLength={6} keyboardType="numeric" placeholder="Codigo" onChangeText={setToken} value={token} />
                  <Input textContentType="newPassword" placeholder="Contraseña" onChangeText={setPassword} value={password} />
                  <Input textContentType="password" placeholder="Repetir contraseña" onChangeText={setRepeatPassword} value={repeatPassword} />

                  <View style={styles.button}>
                    <MyButton onPress={() => changePassword()} title="Cambiar contraseña" />
                  </View>
                </View>
              )}

              {/*  <View style={styles.logoContainer}> */}
              {/*   <Image style={styles.labrador} source={labrador} /> */}
              {/*   </View> */}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
    /*  </KeyboardAwareScrollView> */
  )
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    width: '100%'
  },
  root: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    /*     top: -100, */
    justifyContent: 'center'
    /*   width: 248, */
    /*     alignSelf: 'center' */
  },
  content: {
    flex: 1,
    width: 310,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    height: '100%'
    /*     alignSelf: 'center' */
  },
  content2: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },

  button: {
    alignSelf: 'stretch',
    marginTop: 8
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 32
  },
  logoContainer: {
    paddingRight: 8
  },
  logo: {
    width: 50,
    height: 55,
    paddingRight: 50
  },
  tittleLabel: {
    fontFamily: 'LoveMeLikeASister',
    fontSize: 36,
    color: 'black'
  },
  labrador: {
    width: 300,
    height: 200,
    position: 'absolute',
    top: -100,
    transform: [{ rotate: '180deg' }]
    /*    alignSelf: 'stretch' */
  },
  link: {
    fontWeight: '500',
    color: 'black',
    /*     fontFamily: 'LoveMeLikeASister', */
    fontSize: 14
  },
  registerContainer: {
    flexDirection: 'row',
    paddingTop: 16
  },
  register: {
    /*     fontFamily: 'LoveMeLikeASister', */
    fontSize: 14,
    color: 'blue'
  },
  forgotPasswordContainer: {
    padding: 8
  }
})
