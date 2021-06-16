import { Input as DefaultInput, InputProps } from 'react-native-elements'
import React from 'react'
import { StyleSheet } from 'react-native'

import useTheme from '../../hooks/useTheme'

function Input(props: InputProps) {
  const colors = useTheme()

  const { style, ...otherProps } = props

  const styles = StyleSheet.create({
    input: {
      borderRadius: 15,
      padding: 16,
      backgroundColor: colors.input
    }
  })

  return (
    <DefaultInput
      inputContainerStyle={{ borderBottomWidth: 0 }}
      placeholderTextColor={'grey'}
      style={[style, styles.input]}
      {...otherProps}
    />
  )
}

export default Input
