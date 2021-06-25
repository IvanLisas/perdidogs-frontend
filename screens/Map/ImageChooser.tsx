// App.js
import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Button, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'
import { paddingRight } from 'styled-system'
import Icon from '../../components/icon/index'

interface ImageChooserProps {
  pickedImagePath: any
  setPickedImagePath: (value: any) => void
}

const ImageChooser: React.FC<ImageChooserProps> = (props) => {
  // The path of the picked image
  /*   const [pickedImagePath, setPickedImagePath] = useState(''); */
  const { pickedImagePath, setPickedImagePath } = props

  const deletePhoto = () => {
    setPickedImagePath(undefined)
  }

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!")
      return
    }
    const options = { quality: 0.7, base64: true }
    const result = await ImagePicker.launchImageLibraryAsync(options)

    // Explore the result
    console.log(result)

    if (!result.cancelled) {
      setPickedImagePath(result)
    }
  }

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!")
      return
    }
    const options = { quality: 0.7, base64: true }
    const result = await ImagePicker.launchCameraAsync(options)

    // Explore the result
    console.log(result)

    if (!result.cancelled) {
      setPickedImagePath(result)
      console.log(result.uri)
    }
  }

  return (
    /*     <View style={styles.screen}>
      <View key={pickedImagePath + 'container'}> */
    <View>
      {!pickedImagePath && (
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: '#C5BBBB',
            height: 180,
            /*  borderWidth: 0.5, */
            width: Dimensions.get('window').width / 2 - 24,
            borderRadius: 13
          }}
        >
          <View style={styles.buttonContainer2}>
            {/*  <Button onPress={showImagePicker} title="Select an image" />
        <Button onPress={openCamera} title="Open camera" /> */}
            <TouchableOpacity onPress={openCamera}>
              <Icon style={{ color: 'white', fontSize: 28, padding: 8 }} name="instagram-hand-drawn-logo" />
            </TouchableOpacity>
            <TouchableOpacity onPress={showImagePicker}>
              <Icon style={{ color: 'white', fontSize: 28, padding: 8 }} name="picture-hanging-in-a-frame-hand-drawn-symbol" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {pickedImagePath && (
        <ImageBackground
          key={pickedImagePath + 'photo'}
          imageStyle={{ borderRadius: 12, width: '100%', resizeMode: 'cover' }}
          style={{
            width: Dimensions.get('window').width / 2 - 24,
            height: 180,
            borderRadius: 20,
            flexDirection: 'column',
            justifyContent: 'flex-end'
            /*     marginRight: 8 */
            /* marginRight: 8 */
          }}
          onError={() => console.log('error al cargar')}
          source={{ uri: pickedImagePath.uri }}
        >
          <LinearGradient
            /*   colors={['rgba(0,0,0,0.5)', 'transparent']} */
            colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.9)']}
            style={{
              position: 'absolute',
              height: 180,
              width: Dimensions.get('window').width / 2 - 24,
              borderRadius: 12
            }}
          />
          <View style={styles.buttonContainer}>
            {/*  <Button onPress={showImagePicker} title="Select an image" />
        <Button onPress={openCamera} title="Open camera" /> */}
            {/*             <TouchableOpacity onPress={openCamera}>
              <Icon style={{ color: '#BEBEBE', fontSize: 28, padding: 8 }} name="instagram-hand-drawn-logo" />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={deletePhoto}>
              <Icon style={{ color: '#BEBEBE', fontSize: 32, padding: 8 }} name="cancel-circular-button-with-a-cross-inside-hand-drawn-outlines" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </View>
  )

  /*    </View>
   */
  /*  <View style={styles.imageContainer}>{pickedImagePath !== '' && <Image source={{ uri: pickedImagePath }} style={styles.image} />}</View> */
  /*     </View> */
}

export default ImageChooser

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1
    /*  justifyContent: 'center', */
    /*   alignItems: 'center' */
  },
  buttonContainer: {
    flexDirection: 'row',
    /*  justifyContent: 'space-around', */
    /*    padding: 8 */
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  buttonContainer2: {
    flexDirection: 'row',
    /*  justifyContent: 'space-around', */
    /*    padding: 8 */
    alignSelf: 'center'
  },
  imageContainer: {
    /* padding: 30 */
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover'
  }
})
