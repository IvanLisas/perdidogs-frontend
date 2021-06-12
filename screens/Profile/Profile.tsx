import * as React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import Text from '../../components/MyThemedComponents/Text'
import { ProfileStackParamList } from '../../types/ProfileStackParamList'
import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'

type authScreenProp = StackNavigationProp<ProfileStackParamList, 'Edit'>

export default function Profile() {
  const { colors } = useTheme()

  const { logout } = useContext(UserContext)

  const navigation = useNavigation<authScreenProp>()

  return (
    <View style={styles.container}>
      <Text>Tu perfil</Text>
      <Button title="Editar Perfil" onPress={() => navigation.navigate('Edit')} />
      <Button title="Salir" onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
