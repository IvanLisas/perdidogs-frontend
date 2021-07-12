import React from 'react'
import { Platform, StyleSheet, View, Text } from 'react-native'
import { BlurView } from 'expo-blur'

const BlurredBackground = () =>
  Platform.OS === 'ios' ? (
    <View style={styles.container}>
      <BlurView intensity={100} style={styles.blurView} />
    </View>
  ) : (
    <View style={[styles.container, styles.androidContainer]} />
  )

const styles = StyleSheet.create({
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
    /*  backgroundColor: 'rgba(255,255,255, 0.95)' */
  }
})
export default BlurredBackground
