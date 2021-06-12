import * as React from 'react'
import { StyleSheet, View, Image, ImageBackground } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Text from '../../components/MyThemedComponents/Text'
import LoginStackParamList from '../../types/LoginStackParamList'
import { StackNavigationProp } from '@react-navigation/stack'
import { useContext, useState } from 'react'
import UserContext from '../../contexts/UserContext'
import TextInput from '../../components/MyThemedComponents/TextInput'
import Button from '../../components/MyThemedComponents/Button'

type authScreenProp = StackNavigationProp<LoginStackParamList>

export default function Profile() {
  const { setUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const logo = require('../../assets/images/login-logo.png')

  const labrador = require('../../assets/images/logo3.png')

  const login = async () => {
    try {
      setUser({ id: 4, username: 'Pepe' })
    } catch (error) {
      console.log(error)
    }
  }

  return (
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
      <Text style={styles.link}>No tenes una cuenta? Registrate</Text>
      <Text style={styles.link}>Olvidaste tu contraseña?</Text>
      <Button title="Ingresar" style={styles.input} onPress={login} />
      {/*  <View style={styles.logoContainer}> */}
      {/*   <Image style={styles.labrador} source={labrador} /> */}
      {/*   </View> */}
      <ImageBackground
        source={labrador}
        style={styles.labrador}
        imageStyle={{
          resizeMode: 'center',
          alignSelf: 'flex-end'
        }}
      ></ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
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
    margin: 8
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
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
    /*    border: ' 1px solid #FFFFFF', */
    lineHeight: 19
  }
})
