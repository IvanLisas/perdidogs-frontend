import * as React from 'react'
import { StyleSheet, View, Image, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Text from '../../components/MyThemedComponents/Text'
import LoginStackParamList from '../../types/LoginStackParamList'
import { StackNavigationProp } from '@react-navigation/stack'
import { useContext, useState } from 'react'
import UserContext from '../../contexts/UserContext'
import TextInput from '../../components/MyThemedComponents/TextInput'
import Button from '../../components/MyThemedComponents/Button'
import userService from '../../services/UserService'

type authScreenProp = StackNavigationProp<LoginStackParamList>

export default function Profile() {
  const { setUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const logo = require('../../assets/images/login-logo.png')

  const labrador = require('../../assets/images/logo3.png')

  const login = async () => {
    try {
      setUser(await userService.login(email, password))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    /*   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */
    <View style={styles.root2}>
      <View style={styles.root}>
        <View style={styles.titleContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={logo} />
          </View>
          <Text style={styles.tittleLabel}>Perdidogs</Text>
        </View>

        <TextInput
          textContentType="emailAddress"
          placeholder="Email"
          autoCompleteType="email"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
        />

        <TextInput
          textContentType="newPassword"
          placeholder="Contraseña"
          onChangeText={setPassword}
          autoCompleteType="password"
          value={password}
          secureTextEntry={true}
          style={styles.input}
        />

        <View style={styles.button}>
          <Button title="Ingresar" onPress={login} />
        </View>
        <View style={styles.linksContainer}>
          <Text style={styles.link}>Registrate con tu correo</Text>
          <Text style={styles.link}>Olvidaste tu contraseña?</Text>
        </View>
        {/*  <View style={styles.logoContainer}> */}
        {/*   <Image style={styles.labrador} source={labrador} /> */}
        {/*   </View> */}
      </View>
      <ImageBackground
        source={labrador}
        style={styles.labrador}
        imageStyle={{
          resizeMode: 'center',
          alignSelf: 'flex-end'
        }}
      ></ImageBackground>
    </View>
    /*    </TouchableWithoutFeedback> */
  )
}

const styles = StyleSheet.create({
  root2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',

    /*   width: 248, */
    alignSelf: 'center',
    paddingTop: 32
  },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    /*   width: 248, */
    alignSelf: 'center'
  },
  input: {
    alignSelf: 'stretch',
    marginVertical: 8
  },
  button: {
    alignSelf: 'stretch',
    marginTop: 16
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
    fontSize: 36
  },
  labrador: {
    width: 700,
    height: 142,
    /* position: 'absolute', */
    bottom: 0
    /*    alignSelf: 'stretch' */
  },
  link: {
    fontWeight: '600',
    paddingVertical: 2
  },
  linksContainer: {
    paddingTop: 16
  }
})
