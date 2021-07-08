import { Input, InputProps } from 'react-native-elements'
import React from 'react'
import { StyleSheet, TextInput as DefaultTextInput } from 'react-native'
import useTheme from '../../hooks/useTheme'

type MyInputProps = {
  _ref?: React.RefObject<DefaultTextInput>
}

const MyInput: React.FC<React.ComponentProps<typeof Input> & MyInputProps> = (props) => {
  const theme = useTheme()

  const { style, _ref, ...otherProps } = props

  return (
    <Input
      ref={_ref}
      inputContainerStyle={{ borderBottomWidth: 0, alignSelf: 'center' }}
      containerStyle={{ paddingHorizontal: 0 }}
      placeholderTextColor={'grey'}
      errorStyle={{ color: 'red', fontSize: 14 }}
      style={[style, styles.input]}
      {...otherProps}
    />
  )
}

export default MyInput

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    padding: 16,
    backgroundColor: 'white',
    width: 234,
    //Shadoww
    shadowColor: '#0000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  }
})
