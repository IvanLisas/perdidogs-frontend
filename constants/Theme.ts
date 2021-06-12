import * as React from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from '@react-navigation/native'

export type MyTheme = {
  dark: boolean
  colors: {
    navigation: string
    primary: string
    background: string
    card: string
    text: string
    border: string
    notification: string
    input: string
  }
}
export const MyDefaultTheme: MyTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    navigation: '#B5B4FB',
    primary: '#E3BCFB',
    card: '#B5B4FB',
    text: '#3F414E',
    border: '#1C1C1E',
    background: '#B4C4FB',
    input: '#F6F6F6'
  }
}

export const MyDarkTheme: MyTheme = {
  dark: true,
  colors: {
    ...MyDefaultTheme.colors,
    text: '#FFFF',
    background: 'rgb(8, 6, 11)'
  }
}
