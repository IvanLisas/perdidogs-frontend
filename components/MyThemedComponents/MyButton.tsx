import React from 'react'
import { Input, IInputProps, IButtonProps, Button } from 'native-base'
import useTheme from '../../hooks/useTheme'

export const MyButton = (props: IButtonProps) => {
  const theme = useTheme()

  return (
    <Button
      {...props}
      width="100%"
      _text={{ color: 'black', alignItems: 'center' }}
      style={{ borderRadius: 12, marginVertical: 16, backgroundColor: theme.primary, justifyContent: 'center' }}
    >
      {props.children}
    </Button>
  )
}
