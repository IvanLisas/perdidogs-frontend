import * as React from 'react'
import { Alert, Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

import { StackNavigationProp } from '@react-navigation/stack'
import Text from '../components/MyThemedComponents/MyText'
import { useContext, useEffect, useRef, useState } from 'react'
import UserContext from '../contexts/UserContext'
import { Input } from 'react-native-elements'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { Ionicons } from '@expo/vector-icons'
import MyText from '../components/MyThemedComponents/MyText'
import { Avatar } from 'react-native-elements'
import MyInput from '../components/MyThemedComponents/MyInput'
import useTheme from '../hooks/useTheme'
import userService from '../services/UserService'
import { useNavigation } from '@react-navigation/native'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import BlurredBackground from '../components/BlurredBackground'
import * as ImagePicker from 'expo-image-picker'
import imageService from '../services/ImageService'
import { ScrollView } from 'react-native-gesture-handler'

type RootStackParamList = {
  Profile: {}
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>

type Props = {
  navigation: ProfileScreenNavigationProp
}

export default function EditProfile() {
  const theme = useTheme()
  const { user, setUser, logout } = useContext(UserContext)
  const [firstName, setFirstName] = useState(user ? user?.firstName : '')
  const [lastName, setLastName] = useState(user ? user?.lastName : '')
  const [avatar, setAvatar] = useState(user ? user?.avatar : '')
  const navigation = useNavigation()
  const modalRef = useRef<BottomSheetModal>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const goToChangePassword = () => navigation.navigate('ChangePassword')

  const update = async () => {
    setErrorMessage('')
    if (user && firstName.length > 0 && lastName.length > 0) {
      try {
        await userService.update({
          Id: user.Id,
          email: user.email,
          firstName: firstName,
          lastName: lastName,
          avatar: avatar
        })
        setUser(await userService.getUser(user.Id))
      } catch (error) {
        console.log(error.message)
      }
    } else setErrorMessage('Los campos no pueden estar vacios')
  }

  const handleAvatarModal = () => {
    modalRef.current?.present()
  }

  const deleteAccount = async () => {
    if (user) {
      try {
        await userService.delete(user.Id)
        logout()
      } catch (error) {
        console.log(error.message)
      }
    }
  }

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

    if (!result.cancelled) {
      setAvatar(await imageService.savePhoto(result))
    }
  }

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!")
      return
    }
    const options = { quality: 0.7, base64: true }
    const result = await ImagePicker.launchImageLibraryAsync(options)

    if (!result.cancelled) {
      setAvatar(await imageService.savePhoto(result))
    }
  }

  useEffect(() => {
    const init = async () => {
      await update()
    }
    init()
  }, [avatar])

  const showAlert = () =>
    Alert.alert(
      'Borrar la cuenta',
      '¿Estas seguro que desesa borrar su cuenta?',
      [
        {
          text: 'Aceptar',
          style: 'default',
          onPress: () => deleteAccount()
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ],
      {
        cancelable: true
      }
    )

  if (!user) return null

  return (
    <BottomSheetModalProvider>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
          modalRef.current?.dismiss()
        }}
      >
        <ScrollView>
          <View style={styles.container}>
            <Avatar
              /*  size="medium" */
              titleStyle={{ color: 'white' }}
              containerStyle={{ marginTop: 8, alignSelf: 'center', marginBottom: 16 }}
              size={120}
              onPress={() => handleAvatarModal()}
              source={{ uri: user.avatar }}
              overlayContainerStyle={{ backgroundColor: 'grey' }}
              rounded
              title={user.firstName[0] + user.lastName[0]}
            />
            <View style={{ paddingVertical: 8 }}>
              <MyText style={{ fontSize: 20, fontWeight: 'bold', padding: 4, marginBottom: 8 }}> Informacion personal</MyText>
              <Input
                inputContainerStyle={{ borderBottomWidth: 0.5, alignSelf: 'center', paddingVertical: 0 }}
                onChangeText={setFirstName}
                onEndEditing={() => update()}
                inputStyle={{ fontSize: 18, color: theme.text }}
                clearButtonMode="always"
                placeholder="Nombre"
                value={firstName}
              ></Input>
              <Input
                placeholder="Apellido"
                inputContainerStyle={{ borderBottomWidth: 0.5, alignSelf: 'center' }}
                inputStyle={{ fontSize: 18, color: theme.text }}
                onChangeText={setLastName}
                onEndEditing={() => update()}
                value={lastName}
                errorStyle={{ color: 'red', fontSize: 14 }}
                errorMessage={errorMessage}
              ></Input>
            </View>
            <View style={{ paddingHorizontal: 4 }}>
              <TouchableOpacity onPress={() => goToChangePassword()} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                {/*   <Ionicons size={24} color="#8E8E93" name="key" /> */}
                <MyText style={{ fontSize: 16, color: '#0A84FF' }}> Cambiar contraseña</MyText>
              </TouchableOpacity>
              <TouchableOpacity onPress={showAlert} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <MyText style={{ fontSize: 16, color: '#0A84FF' }}> Borrar cuenta</MyText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logout()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/*  <Ionicons size={24} color="#8E8E93" name="log-out" /> */}
                <MyText style={{ fontSize: 16, color: '#0A84FF' }}> Salir</MyText>
              </TouchableOpacity>
              <BottomSheetModal
                snapPoints={[120]}
                index={0}
                enableContentPanningGesture
                key="resultsModal"
                ref={modalRef}
                stackBehavior="replace"
                enableDismissOnClose={true}
                backgroundComponent={BlurredBackground}
                style={{ borderRadius: 25 }}
              >
                <View>
                  <TouchableOpacity
                    onPress={openCamera}
                    style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 16 }}
                  >
                    <Ionicons size={30} color="#8E8E93" name="camera" />
                    <MyText style={{ fontSize: 20, marginLeft: 4 }}>Abrir camara</MyText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={showImagePicker} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
                    <Ionicons size={30} color="#8E8E93" name="image" />
                    <MyText style={{ fontSize: 20, marginLeft: 0 }}> Galeria</MyText>
                  </TouchableOpacity>
                </View>
              </BottomSheetModal>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
