/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from 'react'
import { Text as DefaultText, View as DefaultView } from 'react-native'

import { NativeViewGestureHandler } from 'react-native-gesture-handler'
import useTheme from '../../hooks/useTheme'

type TextProps = DefaultText['props']

function MyText(props: TextProps) {
  const { style, ...otherProps } = props

  const colors = useTheme()

  return <DefaultText style={[{ color: colors.text }, style]} {...otherProps} />
}

export default MyText

/*  export function Text(props: TextProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  
    return <DefaultText style={[{ color }, style]} {...otherProps} />;
  } */
