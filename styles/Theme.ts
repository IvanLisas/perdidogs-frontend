import * as React from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from '@react-navigation/native'

export type MyTheme = {
  navigation: string
  primary: string
  background: string
  card: string
  textLabel: string
  text: string
  border: string
  notification: string
  input: string
  loginBackground: string
  dark: boolean
  modal: string
  icon: string
}
export const MyDefaultTheme: MyTheme = {
  ...DefaultTheme.colors,
  textLabel: 'grey',
  navigation: 'white',
  primary: '#c99a53',
  card: '#B5B4FB',
  text: '#000',
  background: 'white',
  input: '#F6F6F6',
  loginBackground: '#B4C4FB',
  dark: false,
  modal: '#F8E8FF',
  border: '#DEDEDE',
  icon: '#5AC8FA'
}

export const MyDarkTheme: MyTheme = {
  ...MyDefaultTheme,
  text: 'white',
  primary: '#f0b966',
  textLabel: '#7f91a4',
  navigation: '#1D1D1D',
  background: '#1D1D1D',
  input: '#2C2C2E',
  dark: true,
  modal: '#2C2C2E',
  border: '#303032'
}
