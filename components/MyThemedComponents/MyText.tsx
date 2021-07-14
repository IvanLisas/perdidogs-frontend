import * as React from 'react'
import { Text } from 'react-native'

import useTheme from '../../hooks/useTheme'

type MyTextProps = Text['props']

function MyText(props: MyTextProps) {
  const { style, ...otherProps } = props

  const theme = useTheme()

  return <Text style={[{ color: theme.text }, style]} {...otherProps} />
}

export default MyText
