import * as React from 'react'
import { StyleSheet, View, Text, Button, Alert } from 'react-native'
import { useTheme } from '@react-navigation/native'
/* import { Text, View } from '../components/Themed'; */
import { StackNavigationProp } from '@react-navigation/stack'
import LoginStackParamList from '../../types/LoginStackParamList'

type RootStackParamList = {
  Profile: {}
}

type ProfileScreenNavigationProp = StackNavigationProp<LoginStackParamList, 'Registration'>

type Props = {
  navigation: ProfileScreenNavigationProp
}

export default function EditProfile({ navigation }: Props) {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Tab Two</Text>
      <View />
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
