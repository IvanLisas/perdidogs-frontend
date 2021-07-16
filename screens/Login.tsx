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

type authScreenProp = StackNavigationProp<LoginStackParamList>

export default function Login() {
  const { setUser } = useContext(UserContext)

  const [email, setEmail] = useState('ivanelisas@gmail.com')

  const [password, setPassword] = useState('12345678')

  const [loading, setLoading] = useState(false)

  const navigation = useNavigation<authScreenProp>()

  const [errorMessage, setErrorMessage] = useState('')

  /*   const inputEmail = React.createRef<DefaultTextInput>()

  const inputPassword = React.createRef<DefaultTextInput>() */

  const logo = require('../assets/images/login-logo.png')

  const labrador = require('../assets/images/golden.png')

  const login = async () => {
    try {
      setLoading(true)
      setErrorMessage('')
      setUser(await userService.login(email, password))
    } catch (error) {
      setErrorMessage(showError(error))
    }
    setLoading(false)
  }

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
              <View style={styles.titleContainer}>
                <View style={styles.logoContainer}>
                  <Image style={styles.logo} source={logo} />
                </View>
                <Text style={styles.tittleLabel}>Perdidogs</Text>
              </View>

              {/* <MyInput placeholder="Email"  textContentType="emailAddress" onChangeText={setEmail}></MyInput> */}
              <Input textContentType="emailAddress" placeholder="Email" autoCompleteType="email" onChangeText={setEmail} value={email} />

              <Input
                textContentType="newPassword"
                placeholder="Contraseña"
                onChangeText={setPassword}
                autoCompleteType="password"
                value={password}
                secureTextEntry={true}
                errorMessage={errorMessage}
              />

              <View style={styles.button}>
                <MyButton title="Ingresar" loading={loading} onPress={login} />
              </View>

              <View style={styles.registerContainer}>
                <Text style={styles.link}>Sin cuenta? </Text>
                <Text onPress={() => navigation.navigate('Registration')} style={styles.register}>
                  Registrate!
                </Text>
              </View>
              <View style={styles.forgotPasswordContainer}>
                <Text style={styles.link}>Olvidaste tu contraseña?</Text>
              </View>
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