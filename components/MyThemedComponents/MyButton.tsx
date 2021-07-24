import * as React from 'react'
import { Button, ButtonProps } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import useTheme from '../../hooks/useTheme'

function MyButton(props: ButtonProps) {
  const theme = useTheme()
  return (
    <Button
      {...props}
      buttonStyle={styles.button}
      disabledStyle={{
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 25
      }}
      containerStyle={{}}
      loadingProps={{ color: 'black' }}
      disabledTitleStyle={{ color: '#00F' }}
      titleStyle={{ color: 'black', fontSize: 20, fontFamily: 'sans-serif' }}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1.2,
    /*   borderColor: '#6879B1', */
    borderColor: 'black',
    padding: 12,
    borderRadius: 18,
    backgroundColor: 'transparent'
  }
})

export default MyButton
