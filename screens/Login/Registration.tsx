import * as React from 'react'
import { StyleSheet, View, Text, Image, ImageBackground, TouchableWithoutFeedback, Keyboard, TextInput as DefaultTextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useTheme } from '@react-navigation/native'
import { Input } from 'react-native-elements'
import { StackNavigationProp } from '@react-navigation/stack'
import LoginStackParamList from '../../types/LoginStackParamList'
import { useContext, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../components/MyThemedComponents/Button'
import userService from '../../services/UserService'
import { User } from '../../types/User'
import UserContext from '../../contexts/UserContext'

type ProfileScreenNavigationProp = StackNavigationProp<LoginStackParamList, 'Registration'>

type Props = {
  navigation: ProfileScreenNavigationProp
}

export default function Registration({ navigation }: Props) {
  const { colors } = useTheme()

  const { setUser } = useContext(UserContext)

  const labrador = require('../../assets/images/golden.png')

  const [email, setEmail] = useState('')

  const [firstName, setFirstName] = useState('')

  const [lastName, setLastName] = useState('')

  const [password, setPassword] = useState('')

  const [repetedPassword, setRepetedPassword] = useState('')

  const inputEmail = React.createRef<DefaultTextInput>()

  const inputPassword = React.createRef<DefaultTextInput>()

  const inputFirstName = React.createRef<DefaultTextInput>()

  const inputLastName = React.createRef<DefaultTextInput>()

  const inputRepetedPassword = React.createRef<DefaultTextInput>()

  const [firstNameError, setFirstNameError] = useState('')

  const [lastNameError, setLastNameError] = useState('')

  const [passwordError, setPasswordError] = useState('')

  const [repetedPasswordError, setRepetedPasswordError] = useState('')

  const [emailError, setEmailError] = useState('')

  const [error, setError] = useState('')

  const registration = async () => {
    let hasErrors = false
    setRepetedPasswordError('')
    setPasswordError('')
    setEmailError('')
    setLastNameError('')
    setFirstNameError('')
    if (firstName.length < 1) {
      ;(inputFirstName.current as any).shake()
      setFirstNameError('Ingrese un nombre')
      hasErrors = true
    }
    if (lastName.length < 1) {
      ;(inputLastName.current as any).shake()
      setLastNameError('Ingrese un apellido')
      hasErrors = true
    }
    if (password.length < 8) {
      setPasswordError('Debe tener mas de 8 caracteres')
      ;(inputPassword.current as any).shake()
      hasErrors = true
    }
    if (email.indexOf('.') == -1 && email.indexOf('@') == -1) {
      setEmailError('El formato no es valido')
      ;(inputEmail.current as any).shake()
      hasErrors = true
    }
    if (password !== repetedPassword) {
      setRepetedPasswordError('Las contraseñas no coinciden')
      ;(inputRepetedPassword.current as any).shake()
      hasErrors = true
    }
    if (!hasErrors) {
      try {
        setUser(await userService.registration({ firstName: firstName, lastName: lastName, email: email, password: password } as User))
      } catch (error) {
        console.log(error.response)
        setError('Error al conectar con el servidor: ' + error.message)
      }
    }
  }

  return (
    <View>
      {/* TODO: cortar imagen  */}
      <ImageBackground
        source={labrador}
        style={styles.labrador}
        imageStyle={{
          resizeMode: 'contain'
        }}
      />
      {/*   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
      {/*  <LinearGradient colors={['#FFE5B2', '#EFB865']} style={styles.background}> */}
      <KeyboardAwareScrollView style={{}} showsVerticalScrollIndicator={false}>
        {/*   <LinearGradient colors={['#FFE5B2', '#EFB865']} style={styles.background}> */}
        <View style={styles.root}>
          {/*  <ScrollView style={{}} contentContainerStyle={styles.content}> */}

          <Input
            ref={inputFirstName}
            inputContainerStyle={{ borderBottomWidth: 0, width: '100%' }}
            textContentType="name"
            placeholder="Nombre"
            autoCompleteType="name"
            onChangeText={setFirstName}
            value={firstName}
            containerStyle={{ paddingHorizontal: 0 }}
            style={styles.input}
            errorStyle={{ color: 'red' }}
            errorMessage={firstNameError}
          />
          <Input
            ref={inputLastName}
            inputContainerStyle={{ borderBottomWidth: 0, width: '100%' }}
            textContentType="familyName"
            placeholder="Apellido"
            onChangeText={setLastName}
            value={lastName}
            containerStyle={{ paddingHorizontal: 0 }}
            style={styles.input}
            errorStyle={{ color: 'red' }}
            errorMessage={lastNameError}
          />
          <Input
            ref={inputEmail}
            inputContainerStyle={{ borderBottomWidth: 0, width: '100%' }}
            textContentType="emailAddress"
            placeholder="Email"
            autoCompleteType="email"
            onChangeText={setEmail}
            value={email}
            containerStyle={{ paddingHorizontal: 0 }}
            style={styles.input}
            errorStyle={{ color: 'red' }}
            errorMessage={emailError}
          />
          <Input
            ref={inputPassword}
            inputContainerStyle={{ borderBottomWidth: 0, width: '100%' }}
            textContentType="newPassword"
            placeholder="Contraseña"
            autoCompleteType="password"
            onChangeText={setPassword}
            secureTextEntry={true}
            value={password}
            containerStyle={{ paddingHorizontal: 0 }}
            style={styles.input}
            errorStyle={{ color: 'red' }}
            errorMessage={passwordError}
          />
          <Input
            ref={inputRepetedPassword}
            inputContainerStyle={{ borderBottomWidth: 0, width: '100%' }}
            textContentType="password"
            placeholder="Repetir contraseña"
            onChangeText={setRepetedPassword}
            value={repetedPassword}
            containerStyle={{ paddingHorizontal: 0 }}
            style={styles.input}
            secureTextEntry={true}
            errorStyle={{ color: 'red' }}
            errorMessage={repetedPasswordError}
          />
          <Text style={{ color: 'red', fontSize: 12 }}>{error}</Text>
          <View style={styles.button}>
            <Button title="Ingresar" onPress={registration} />
          </View>
        </View>

        {/*    </ScrollView> */}

        {/*   </LinearGradient> */}
      </KeyboardAwareScrollView>
      {/*   </LinearGradient> */}
      {/* </TouchableWithoutFeedback> */}
    </View>
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
    /*     flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center' */
    /*  paddingTop: 32 */
    padding: 20,
    paddingTop: 120
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    /*    padding: 16, */
    alignSelf: 'center'
  },
  content2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  input: {
    marginVertical: 2,
    borderRadius: 15,
    padding: 16,
    backgroundColor: 'white',
    alignSelf: 'stretch'
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
    top: -80,
    /*     left: 50, */
    transform: [{ rotate: '-180deg' }],
    alignSelf: 'center'
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
