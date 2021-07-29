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
}
export const MyDefaultTheme: MyTheme = {
  ...DefaultTheme.colors,
  textLabel: 'grey',
  navigation: 'white',
  primary: '#c99a53',
  card: '#B5B4FB',
  text: '#000',
  border: '#F7A59E',
  background: 'white',
  input: '#F6F6F6',
  loginBackground: '#B4C4FB',
  dark: false,
  modal: '#F8E8FF'
}

export const MyDarkTheme: MyTheme = {
  ...MyDefaultTheme,
  text: 'white',
  primary: '#f0b966',
  textLabel: '#7f91a4',
  navigation: '#1D1D1D',
  background: '#1D1D1D',
  dark: true,
  modal: '#2C2C2E'
}
