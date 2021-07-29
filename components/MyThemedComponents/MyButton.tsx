import * as React from 'react'
import { Button, ButtonProps } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import useTheme from '../../hooks/useTheme'
import { MyTheme } from '../../styles/Theme'

function MyButton(props: ButtonProps) {
  const theme = useTheme()
  return (
    <Button
      {...props}
      buttonStyle={styles(theme).button}
      disabledStyle={{
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 25
      }}
      containerStyle={{}}
      loadingProps={{ color: 'black' }}
      disabledTitleStyle={{ color: '#00F' }}
      titleStyle={{ color: theme.primary, fontSize: 20 }}
    />
  )
}

const styles = (theme: MyTheme) =>
  StyleSheet.create({
    button: {
      borderWidth: 1.2,
      /*   borderColor: '#6879B1', */
      borderColor: theme.primary,
      padding: 12,
      borderRadius: 18,
      backgroundColor: 'transparent'
    }
  })

export default MyButton
