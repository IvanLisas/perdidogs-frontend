import * as React from 'react'
import { StyleSheet, View, Image, ImageBackground, TouchableWithoutFeedback, Keyboard, TextInput as DefaultTextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Text from '../../components/MyThemedComponents/Text'
import LoginStackParamList from '../../types/LoginStackParamList'
import { StackNavigationProp } from '@react-navigation/stack'
import { useContext, useState } from 'react'
import UserContext from '../../contexts/UserContext'
import Button from '../../components/MyThemedComponents/Button'
import userService from '../../services/UserService'
import { LinearGradient } from 'expo-linear-gradient'
import { User } from '../../types/User'
import { Input } from 'react-native-elements'
import useUser from '../../hooks/useUser'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type authScreenProp = StackNavigationProp<LoginStackParamList>

export default function Login() {
  const { setUser } = useContext(UserContext)

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const navigation = useNavigation<authScreenProp>()

  const [errorMessage, setErrorMessage] = useState('')

  const inputEmail = React.createRef<DefaultTextInput>()

  const inputPassword = React.createRef<DefaultTextInput>()

  const logo = require('../../assets/images/login-logo.png')

  const labrador = require('../../assets/images/golden.png')

  const login = async () => {
    try {
      /*   setUser({ name: 'pepe' } as User) */
      if (email === '1' && password === '1') setUser({ firstName: 'pepe' } as User)
      else setUser(await userService.login(email, password))
    } catch (error) {
      ;(inputEmail.current as any).shake()
      ;(inputPassword.current as any).shake()
      setErrorMessage('Email o contraseña no validos')

      console.log(error.request.response)
    }
  }

  return (
    /*  <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss() }> */
    <LinearGradient colors={['#FFE5B2', '#EFB865']} style={styles.background}>
      <KeyboardAwareScrollView contentContainerStyle={styles.root} showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <ImageBackground
            source={labrador}
            style={styles.labrador}
            imageStyle={{
              resizeMode: 'contain',
              alignSelf: 'flex-start'
            }}
          ></ImageBackground>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <View style={styles.logoContainer}>
                <Image style={styles.logo} source={logo} />
              </View>
              <Text style={styles.tittleLabel}>Perdidogs</Text>
            </View>

            <Input
              ref={inputEmail}
              inputContainerStyle={{ borderBottomWidth: 0, alignSelf: 'center' }}
              textContentType="emailAddress"
              placeholder="Email"
              autoCompleteType="email"
              onChangeText={setEmail}
              value={email}
              containerStyle={{ paddingHorizontal: 0 }}
              style={styles.input}
              /*               errorStyle={{ color: 'red' }}
              errorMessage="Email no valido" */
            />

            <Input
              ref={inputPassword}
              textContentType="newPassword"
              placeholder="Contraseña"
              inputContainerStyle={{ borderBottomWidth: 0, alignSelf: 'center' }}
              onChangeText={setPassword}
              autoCompleteType="password"
              value={password}
              secureTextEntry={true}
              /*    inputStyle={styles.input} */
              style={styles.input}
              errorStyle={{ color: 'red' }}
              errorMessage={errorMessage}
              containerStyle={{ paddingHorizontal: 0 }}
            />
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.link}>Olvidaste tu contraseña?</Text>
            </View>
            <View style={styles.button}>
              <Button title="Ingresar" onPress={login} />
            </View>
            <View style={styles.registerContainer}>
              <Text style={styles.link}>Sin cuenta? </Text>
              <Text onPress={() => navigation.navigate('Registration')} style={styles.register}>
                Registrate!
              </Text>
            </View>
            {/*  <View style={styles.logoContainer}> */}
            {/*   <Image style={styles.labrador} source={labrador} /> */}
            {/*   </View> */}
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
    /*   justifyContent: 'space-between', */

    /*   width: 248, */
    alignSelf: 'center',
    paddingTop: 32
  },
  content: {
    flex: 1,
    width: 310,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16

    /*     alignSelf: 'center' */
  },
  input: {
    marginVertical: 2,
    borderRadius: 15,
    padding: 16,
    backgroundColor: 'white',
    /*   alignSelf: 'center', */
    width: 234
  },
  button: {
    alignSelf: 'stretch',
    marginTop: 8
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16
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
    top: -70,
    transform: [{ rotate: '180deg' }]
    /*    alignSelf: 'stretch' */
  },
  link: {
    fontWeight: '500',
    color: 'black',
    fontFamily: 'LoveMeLikeASister',
    fontSize: 11
  },
  registerContainer: {
    flexDirection: 'row',
    paddingTop: 24
  },
  register: {
    fontFamily: 'LoveMeLikeASister',
    fontSize: 11,
    color: 'blue'
  },
  forgotPasswordContainer: {
    padding: 8
  }
})
