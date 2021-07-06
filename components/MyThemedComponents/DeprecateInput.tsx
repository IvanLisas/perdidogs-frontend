import React from 'react'
import { Input, IInputProps } from 'native-base'
import useTheme from '../../hooks/useTheme'

export const MyInput = (props: IInputProps) => {
  const theme = useTheme()

  return <Input w="100%" borderRadius={12} bgColor={theme.background} placeholderTextColor={theme.text} {...props} />
}
