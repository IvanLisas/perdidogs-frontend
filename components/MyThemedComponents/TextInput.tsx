import React from 'react'
import { StyleSheet, TextInput as DefaultTextInput } from 'react-native'

import useTheme from '../../hooks/useTheme'

type TextInputProps = DefaultTextInput['props']

function TextInput(props: TextInputProps) {
  const colors = useTheme()

  const { style, ...otherProps } = props

  const styles = StyleSheet.create({
    input: {
      borderRadius: 15,
      padding: 16,
      backgroundColor: colors.input,
      color: 'black'
    }
  })

  return <DefaultTextInput placeholderTextColor={'grey'} style={[style, styles.input]} {...otherProps} />
}

export default TextInput
