import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import { Camera } from 'expo-camera'
let camera: Camera | null
export default function Profile() {
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState<any>(null)
  const [cameraType, setCameraType] = React.useState<number | 'back' | 'front' | undefined>('back')
  const [flashMode, setFlashMode] = React.useState<number | 'off' | 'auto' | 'on' | 'torch' | undefined>('off')

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  const __takePicture = async () => {
    const options = { quality: 0.7, base64: true }
    const photo: any = await camera?.takePictureAsync(options)
    console.log(photo)
    setPreviewVisible(true)
    //setStartCamera(false)
    setCapturedImage(photo)
  }
  const __savePhoto = () => {
    const source = capturedImage?.base64
    console.log(source)
    if (source) {
      let base64Img = `data:image/jpg;base64,${source}`
      let apiUrl = 'https://api.cloudinary.com/v1_1/ivanlisas/image/upload'
      let data = {
        file: base64Img,
        upload_preset: 'MyUploadPresent'
      }

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
        .then(async (response) => {
          let data = await response.json()
          if (data.secure_url) {
            alert('Upload successful')
            setStartCamera(false)
            console.log(data)
          }
        })
        .catch((err) => {
          alert('Cannot upload')
        })
    }
  }

  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }
  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }
  }
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
  }
  return (
    <View style={styles.container}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{ flex: 1 }}
              ref={(r) => {
                camera = r
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: '5%',
                    top: '10%',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={{
                      backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                      borderRadius: 15,
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      ⚡️
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={__switchCamera}
                    style={{
                      marginTop: 20,
                      borderRadius: 15,
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      {cameraType === 'front' ? '🤳' : '📷'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
  console.log('sdsfds', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

/* 
import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Image } from 'react-native'
import { Camera, CameraCapturedPicture, CameraProps } from 'expo-camera'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

const WINDOW_HEIGHT = Dimensions.get('window').height
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08)

let cameraRef: Camera | null

const Profile = () => {
  /*   const cameraRef = useRef<any>(null) 
  const [hasPermission, setHasPermission] = useState(Boolean)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [isPreview, setIsPreview] = useState(false)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [photos, setPhotos] = useState<CameraCapturedPicture[]>([])
  const [photo, setPhoto] = useState<CameraCapturedPicture>()

  useEffect(() => {
    onHandlePermission()
  }, [])

  const onHandlePermission = async () => {
    const { status } = await Camera.requestPermissionsAsync()
    setHasPermission(status === 'granted')
  }

  const onCameraReady = () => {
    setIsCameraReady(true)
  }

  const switchCamera = () => {
    if (isPreview) {
      return
    }
    setCameraType((prevCameraType) => (prevCameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back))
  }

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>
  }

  const cancelPreview = async () => {
    cameraRef?.resumePreview()
    setIsPreview(false)
  }

  const aceptPhoto = async () => {
    const source = photo?.base64
    if (source) {
      let base64Img = `data:image/jpg;base64,${source}`
      let apiUrl = 'https://api.cloudinary.com/v1_1/ivanlisas/image/upload'
      let data = {
        file: base64Img,
        upload_preset: 'MyUploadPresent'
      }

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
        .then(async (response) => {
          let data = await response.json()
          if (data.secure_url) {
            alert('Upload successful')

            console.log(data)
          }
        })
        .catch((err) => {
          alert('Cannot upload')
        })
    }
    cameraRef?.resumePreview()
    setIsPreview(false)
  }

  const onSnap = async () => {
    const options = { quality: 0.7, base64: true }

    const photo: any = await cameraRef?.takePictureAsync()
    await cameraRef?.pausePreview()
    setIsPreview(true)

    setPhoto(photo)
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={(r) => {
          cameraRef = r
        }}
        style={styles.container}
        type={cameraType}
        onCameraReady={onCameraReady}
      />
      {isPreview && (
        <View>
          <TouchableOpacity onPress={cancelPreview} style={styles.closeButton} activeOpacity={0.7}>
            <AntDesign name="close" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={aceptPhoto} style={styles.aceptButton} activeOpacity={0.7}>
            <AntDesign name="filter" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {!isPreview && (
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
            <MaterialIcons name="flip-camera-ios" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} disabled={!isCameraReady} onPress={onSnap} style={styles.capture} />
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  text: {
    color: '#fff'
  },
  bottomButtonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 28,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  capture: {
    backgroundColor: '#5A45FF',

    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A45FF',
    opacity: 0.7
  },
  aceptButton: {
    position: 'absolute',
    top: 35,
    right: 220,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A45FF',
    opacity: 0.7
  }
})
export default Profile
 */
