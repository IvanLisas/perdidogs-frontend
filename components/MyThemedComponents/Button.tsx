import * as React from 'react'
import { Button as DefaultButton } from 'react-native-elements'
import useTheme from '../../hooks/useTheme'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { Button as DefaultButton2 } from 'react-native'

type ButtonProps = DefaultButton2['props'] & View['props']

function Button(props: ButtonProps) {
  const colors = useTheme()

  const { onPress, style, ...otherProps } = props

  const styles = StyleSheet.create({
    button: {
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 15,
      padding: 8,
      backgroundColor: colors.primary
    }
  })

  return (
    <View style={style}>
      <DefaultButton
        buttonStyle={styles.button}
        disabledStyle={{
          borderWidth: 1,
          borderColor: '#000',
          borderRadius: 15
        }}
        disabledTitleStyle={{ color: '#00F' }}
        loadingProps={{ animating: true }}
        loadingStyle={{}}
        title="Ingrese"
        onPress={onPress}
        titleProps={{}}
        titleStyle={{ marginHorizontal: 5, color: 'black', fontFamily: 'LoveMeLikeASister', fontSize: 16 }}
      />
    </View>
  )
}

export default Button
