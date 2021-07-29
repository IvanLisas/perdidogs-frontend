import React from 'react'
import { Platform, StyleSheet, View, Text } from 'react-native'
import { BlurView } from 'expo-blur'
import useTheme from '../hooks/useTheme'
import { MyTheme } from '../styles/Theme'

const BlurredBackground = () => {
  const theme = useTheme()
  /*   Platform.OS === 'ios' ? (
    <View style={styles.container}>
      <BlurView intensity={80} style={styles.blurView} />
    </View>
  ) : ( */
  return <View style={[styles(theme).androidContainer]} />
}
/*  ) */

const styles = (theme: MyTheme) =>
  StyleSheet.create({
    blurView: {
      ...StyleSheet.absoluteFillObject
    },
    container: {
      ...StyleSheet.absoluteFillObject,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden'
    },
    androidContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.modal,
      borderRadius: 16
    }
  })
export default BlurredBackground
