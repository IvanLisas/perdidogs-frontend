import * as React from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from '@react-navigation/native'

export type MyTheme = {
  navigation: string
  primary: string
  background: string
  card: string
  text: string
  border: string
  notification: string
  input: string
  loginBackground: string
  dark: boolean
}
export const MyDefaultTheme: MyTheme = {
  ...DefaultTheme.colors,
  navigation: '#B5B4FB',
  primary: '#E3BCFB',
  card: '#B5B4FB',
  text: '#3F414E',
  border: '#F7A59E',
  background: '#E8F7FB',
  input: '#F6F6F6',
  loginBackground: '#B4C4FB',
  dark: false
}

export const MyDarkTheme: MyTheme = {
  ...MyDefaultTheme,
  text: '#FFFF',
  navigation: '#19191B',
  background: '#101420',
  dark: true
}
