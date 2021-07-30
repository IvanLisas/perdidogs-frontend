import * as React from 'react'
import { Button, ButtonProps } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import useTheme from '../../hooks/useTheme'
import { MyTheme } from '../../styles/Theme'

function MyButton(props: ButtonProps) {
  const theme = useTheme()
  return (
    <Button
      buttonStyle={styles(theme).button}
      disabledStyle={{
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 25
      }}
      containerStyle={{}}
      loadingProps={{ color: theme.text }}
      disabledTitleStyle={{ color: '#00F' }}
      titleStyle={{ color: theme.icon, fontSize: 20 }}
      {...props}
    />
  )
}

const styles = (theme: MyTheme) =>
  StyleSheet.create({
    button: {
      borderWidth: 2,
      /*   borderColor: '#6879B1', */
      borderColor: theme.icon,
      padding: 12,
      borderRadius: 18,
      backgroundColor: 'transparent'
    }
  })

export default MyButton
