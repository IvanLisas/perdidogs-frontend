import * as React from 'react'
import { Button, ButtonProps } from 'react-native-elements'
import { StyleSheet } from 'react-native'

function MyButton(props: ButtonProps) {
  return (
    <Button
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

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    padding: 12,
    backgroundColor: '#E3BCFB'
  }
})

export default MyButton
