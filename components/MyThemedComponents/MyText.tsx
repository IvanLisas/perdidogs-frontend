import * as React from 'react'
import { Text } from 'react-native'

import useTheme from '../../hooks/useTheme'

type MyTextProps = Text['props']

function MyText(props: MyTextProps) {
  const { style, ...otherProps } = props

  const colors = useTheme()

  return <Text style={[{ color: colors.text }, style]} {...otherProps} />
}

export default MyText
