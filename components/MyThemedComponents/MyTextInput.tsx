import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

import useTheme from '../../hooks/useTheme'

type MyTextInputProps = TextInput['props']

function MyTextInput(props: MyTextInputProps) {
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

  return <TextInput placeholderTextColor={'grey'} style={[style, styles.input]} {...otherProps} />
}

export default MyTextInput
