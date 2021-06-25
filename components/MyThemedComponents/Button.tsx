import * as React from 'react'
import { Button as DefaultButton } from 'react-native-elements'
import useTheme from '../../hooks/useTheme'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { Button as DefaultButton2 } from 'react-native'

type ButtonProps = DefaultButton2['props'] & View['props']

function Button(props: ButtonProps) {
  const colors = useTheme()

  const { onPress, style, title, ...otherProps } = props

  const styles = StyleSheet.create({
    button: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 15,
      padding: 12,
      backgroundColor: 'transparent'
    },

    box: {
      /*      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2 */
      /*   elevation: 1 */
    }
  })

  return (
    <View style={[styles.box, style]}>
      <DefaultButton
        /*     ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
          colors: ['red', 'pink'],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 }
        }} */
        buttonStyle={styles.button}
        disabledStyle={{
          borderWidth: 1,
          borderColor: '#000',
          borderRadius: 15
        }}
        disabledTitleStyle={{ color: '#00F' }}
        loadingProps={{ animating: true }}
        loadingStyle={{}}
        title={title}
        onPress={onPress}
        titleProps={{}}
        titleStyle={{ marginHorizontal: 5, color: 'black', fontFamily: 'LoveMeLikeASister', fontSize: 14 }}
      />
    </View>
  )
}

export default Button
