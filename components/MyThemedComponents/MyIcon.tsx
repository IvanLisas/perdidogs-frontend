import { IconProps, Input, InputProps } from 'react-native-elements'
import React from 'react'
import { StyleProp, StyleSheet, TextInput as DefaultTextInput, TextStyle, TouchableOpacity, View } from 'react-native'
import useTheme from '../../hooks/useTheme'
import Icon from '../icons/index'
import { Ionicons } from '@expo/vector-icons'

export type MyIconProps = {
  size?: number
  color?: string
  backgroundColor?: string
  padding?: number
  name: string
} & IconProps

const MyIcon: React.FC<MyIconProps> = (props) => {
  const theme = useTheme()

  const { padding, backgroundColor, size, color, name, style, ...otherProps } = props

  return (
    <View>
      <View style={[style, { alignSelf: 'flex-start', borderRadius: 25, backgroundColor: backgroundColor ? backgroundColor : 'transparent' }]}>
        <Ionicons size={24} color="blue" name="pin" />
      </View>
    </View>
  )
}

export default MyIcon
