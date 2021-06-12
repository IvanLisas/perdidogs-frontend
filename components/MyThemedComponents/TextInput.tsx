import React from 'react'
import { StyleSheet, TextInput as DefaultTextInput } from 'react-native'

import useTheme from '../../hooks/useTheme'

type TextInputProps = DefaultTextInput['props']

function TextInput(props: TextInputProps) {
  const { style, ...otherProps } = props

  const colors = useTheme()

  return <DefaultTextInput style={[{ backgroundColor: colors.input }, style, styles.input]} {...otherProps} />
}

export default TextInput

const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    padding: 8
  }
})
