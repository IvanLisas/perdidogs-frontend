import { IconProps, Input, InputProps } from 'react-native-elements'
import React from 'react'
import { StyleProp, StyleSheet, TextInput as DefaultTextInput, TextStyle, TouchableOpacity, View } from 'react-native'
import useTheme from '../hooks/useTheme'
import Icon from './icons/index'
import MyIcon, { MyIconProps } from './MyThemedComponents/MyIcon'

type TouchableIconProps = {
  onPress: () => void
}

const TouchableIcon: React.FC<TouchableIconProps & MyIconProps> = (props) => {
  const theme = useTheme()

  const { onPress, ...otherProps } = props

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <MyIcon {...otherProps} />
    </TouchableOpacity>
  )
}

export default TouchableIcon
