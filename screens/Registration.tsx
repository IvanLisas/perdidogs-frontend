import * as React from 'react'
import { StyleSheet, View, Text, Image, TextInput } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import LoginStackParamList from '../types/StackParamLists/LoginStackParamList'
import { useContext, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MyButton from '../components/MyThemedComponents/MyButton'
import userService from '../services/UserService'
import { User } from '../types/models/User'
import UserContext from '../contexts/UserContext'
import MyInput from '../components/MyThemedComponents/MyInput'
import showError from '../utils/Erros'
import { LinearGradient } from 'expo-linear-gradient'

type ProfileScreenNavigationProp = StackNavigationProp<LoginStackParamList, 'Registration'>

type Props = {
  navigation: ProfileScreenNavigationProp
}

type form = {
  data: {
    firstName: string
    lastName: string
    email: string
    password: string
    repetedPassword: string
  }
  error: {
    firstName: string
    lastName: string
    email: string
    password: string
    repetedPassword: string
  }
}

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repetedPassword: ''
}

const validateEmail = (email: string) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export default function Registration({ navigation }: Props) {
  const { setUser } = useContext(UserContext)

  const labrador = require('../assets/images/golden.png')

  const [form, setForm] = useState<form>({ data: initialState, error: initialState })

  const [loading, setLoading] = useState(false)

  const inputEmail = React.createRef<TextInput>()

  const inputPassword = React.createRef<TextInput>()

  const inputFirstName = React.createRef<TextInput>()

  const inputLastName = React.createRef<TextInput>()

  const inputRepetedPassword = React.createRef<TextInput>()

  let hasErrors = false

  const [error, setError] = useState('')

  const registration = async () => {
    hasErrors = false
    setForm((prevState) => ({ ...prevState, error: initialState }))
    setError('')

    if (!validateEmail(form.data.email)) {
      handleError('El formato del email no es valido', 'email', inputEmail)
    }

    if (form.data.firstName.length < 4) {
      handleError('Debe tener mas de 4 caracteres', 'firstName', inputFirstName)
    }
    if (form.data.lastName.length < 4) {
      handleError('Debe tener mas de 4 caracteres', 'lastName', inputLastName)
    }
    if (form.data.password.length < 8) {
      handleError('Debe tener mas de 8 caracteres', 'password', inputPassword)
    }

    if (form.data.password !== form.data.repetedPassword) {
      handleError('Las contrase??as no coinciden', 'repetedPassword', inputRepetedPassword)
    }
    if (!hasErrors) {
      try {
        setLoading(true)
        setUser(
          await userService.register({
            firstName: form.data.firstName,
            lastName: form.data.lastName,
            email: form.data.email,
            password: form.data.password
          } as User)
        )
      } catch (error) {
        setError(showError(error))
        setLoading(false)
      }
    }
  }

  const handleInputChange = (text: string, key: keyof typeof initialState) => {
    setForm((prevState) => ({ ...prevState, data: { ...prevState.data, [key]: text } }))
  }

  const handleError = (text: string, key: keyof typeof initialState, input: React.RefObject<TextInput>) => {
    ;(input.current as any).shake()
    setForm((prevState) => ({ ...prevState, error: { ...prevState.error, [key]: text } }))
    hasErrors = true
  }

  /*  const hasErrors2 = Object.values(form.error).some((value) => value !== '') */

  return (
    <LinearGradient colors={['#FFE5B2', '#EFB865']} style={styles.background}>
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
            value={form.data.firstName}
            errorMessage={form.error.firstName}
          />
          <MyInput
            _ref={inputLastName}
            textContentType="familyName"
            placeholder="Apellido"
            onChangeText={(text: string) => handleInputChange(text, 'lastName')}
            value={form.data.lastName}
            errorMessage={form.error.lastName}
          />
          <MyInput
            _ref={inputEmail}
            textContentType="emailAddress"
            placeholder="Email"
            autoCompleteType="email"
            onChangeText={(text: string) => handleInputChange(text, 'email')}
            value={form.data.email}
            errorMessage={form.error.email}
          />
          <MyInput
            _ref={inputPassword}
            textContentType="newPassword"
            placeholder="Contrase??a"
            autoCompleteType="password"
            onChangeText={(text: string) => handleInputChange(text, 'password')}
            secureTextEntry={true}
            value={form.data.password}
            style={styles.input}
            errorMessage={form.error.password}
          />

          <MyInput
            _ref={inputRepetedPassword}
            textContentType="password"
            placeholder="Repetir contrase??a"
            onChangeText={(text: string) => handleInputChange(text, 'repetedPassword')}
            value={form.data.repetedPassword}
            secureTextEntry={true}
            errorMessage={form.error.repetedPassword}
          />
          <Text style={{ color: 'red', fontSize: 14, marginHorizontal: 16, marginBottom: 16 }}>{error}</Text>
          <View style={styles.button}>
            <MyButton
              buttonStyle={{
                borderWidth: 1,
                borderColor: '#343434',

                padding: 12,
                borderRadius: 18,
                backgroundColor: 'transparent'
              }}
              titleStyle={{ color: '#343434', fontSize: 20, fontWeight: 'normal' }}
              loading={loading}
              title="Registrarse"
              onPress={registration}
            />
          </View>
        </View>
        {/*    </ScrollView> */}
        {/*   </LinearGradient> */}
      </KeyboardAwareScrollView>
    </LinearGradient>
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
    paddingHorizontal: 16
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
