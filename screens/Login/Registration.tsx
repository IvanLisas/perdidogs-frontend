import * as React from 'react'
import { StyleSheet, View, Text, Image, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import LoginStackParamList from '../../types/LoginStackParamList'
import { useContext, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../components/MyThemedComponents/Button'
import userService from '../../services/UserService'
import { User } from '../../types/models/User'
import UserContext from '../../contexts/UserContext'
import MyInput from '../../components/MyThemedComponents/MyInput'
import showError from '../../utils/Erros'

type ProfileScreenNavigationProp = StackNavigationProp<LoginStackParamList, 'Registration'>

type Props = {
  navigation: ProfileScreenNavigationProp
}

export default function Registration({ navigation }: Props) {
  const { colors } = useTheme()

  const { setUser } = useContext(UserContext)

  const labrador = require('../../assets/images/golden.png')

  const [userToRegister, setUserToRegister] = useState<User>({ firstName: '', lastName: '', email: '', password: '' })

  const [repetedPassword, setRepetedPassword] = useState('')

  const inputEmail = React.createRef<TextInput>()

  const inputPassword = React.createRef<TextInput>()

  const inputFirstName = React.createRef<TextInput>()

  const inputLastName = React.createRef<TextInput>()

  const inputRepetedPassword = React.createRef<TextInput>()

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
    if (userToRegister.firstName.length < 1) {
      ;(inputFirstName.current as any).shake()
      setFirstNameError('Ingrese un nombre')
      hasErrors = true
    }
    if (userToRegister.lastName.length < 1) {
      ;(inputLastName.current as any).shake()
      setLastNameError('Ingrese un apellido')
      hasErrors = true
    }
    if (userToRegister.password && userToRegister.password.length < 8) {
      setPasswordError('Debe tener mas de 8 caracteres')
      ;(inputPassword.current as any).shake()
      hasErrors = true
    }
    if (!userToRegister.password) {
      ;(inputPassword.current as any).shake()
      hasErrors = true
    }
    if (userToRegister.email.indexOf('.') == -1 && userToRegister.email.indexOf('@') == -1) {
      setEmailError('El formato no es valido')
      ;(inputEmail.current as any).shake()
      hasErrors = true
    }
    if (userToRegister.password !== repetedPassword) {
      setRepetedPasswordError('Las contraseñas no coinciden')
      ;(inputRepetedPassword.current as any).shake()
      hasErrors = true
    }
    if (!hasErrors) {
      try {
        setUser(
          await userService.register({
            firstName: userToRegister.firstName,
            lastName: userToRegister.lastName,
            email: userToRegister.email,
            password: userToRegister.password
          } as User)
        )
      } catch (error) {
        setError(showError(error))
      }
    }
  }

  const handleInputChange = (text: string, key: keyof User) => {
    return setUserToRegister((prevState) => ({ ...prevState, [key]: text }))
  }

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Image source={labrador} style={styles.labrador} />
      <View style={styles.root}>
        {/*  <ScrollView style={{}} contentContainerStyle={styles.content}> */}
        <MyInput
          _ref={inputFirstName}
          textContentType="name"
          placeholder="Nombre"
          autoCompleteType="name"
          onChangeText={(text: string) => handleInputChange(text, 'firstName')}
          value={userToRegister.firstName}
          errorMessage={firstNameError}
        />
        <MyInput
          _ref={inputLastName}
          textContentType="familyName"
          placeholder="Apellido"
          onChangeText={(text: string) => handleInputChange(text, 'lastName')}
          value={userToRegister.lastName}
          errorMessage={lastNameError}
        />
        <MyInput
          _ref={inputEmail}
          textContentType="emailAddress"
          placeholder="Email"
          autoCompleteType="email"
          onChangeText={(text: string) => handleInputChange(text, 'email')}
          value={userToRegister.email}
          errorMessage={emailError}
        />
        <MyInput
          _ref={inputPassword}
          textContentType="newPassword"
          placeholder="Contraseña"
          autoCompleteType="password"
          onChangeText={(text: string) => handleInputChange(text, 'password')}
          secureTextEntry={true}
          value={userToRegister.password}
          style={styles.input}
          errorMessage={passwordError}
        />

        <MyInput
          _ref={inputRepetedPassword}
          textContentType="password"
          placeholder="Repetir contraseña"
          onChangeText={setRepetedPassword}
          value={repetedPassword}
          secureTextEntry={true}
          errorMessage={repetedPasswordError}
        />
        <Text style={{ color: 'red', fontSize: 14, marginBottom: 16 }}>{error}</Text>
        <View style={styles.button}>
          <Button title="Registrarse" onPress={registration} />
        </View>
      </View>
      {/*    </ScrollView> */}
      {/*   </LinearGradient> */}
    </KeyboardAwareScrollView>
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
    paddingTop: 150,
    padding: 20
    /*     paddingTop: 120  */
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
    /*    width: 200,
    height: 100, */
    position: 'absolute',
    top: -100,
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
