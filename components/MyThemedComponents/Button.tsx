import * as React from 'react'
import { Button as DefaultButton, ButtonProps } from 'react-native-elements'
import useTheme from '../../hooks/useTheme'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

function Button(props: ButtonProps) {
  const colors = useTheme()

  const styles = StyleSheet.create({
    button: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 15,
      padding: 12,
      backgroundColor: '#E3BCFB'
    }
  })

  return (
    <DefaultButton
      /*       ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: ['#E3BCFB', 'pink'],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 }
      }} */
      {...props}
      buttonStyle={styles.button}
      disabledStyle={{
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 15
      }}
      containerStyle={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        borderRadius: 12,
        elevation: 7
      }}
      loadingProps={{ color: 'black' }}
      disabledTitleStyle={{ color: '#00F' }}
      titleStyle={{ marginHorizontal: 5, color: 'black', fontFamily: 'LoveMeLikeASister', fontSize: 14 }}
    />
  )
}

export default Button
