import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import { Post } from '../types/models/Post'
import useTheme from '../hooks/useTheme'
import { MyTheme } from '../styles/Theme'
import Text from '../components/MyThemedComponents/MyText'
import { LinearGradient } from 'expo-linear-gradient'
import BottomSheet, { BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from '../components/icons/index'
import UserAvatar from '../components/UserAvatar'
import { useNavigation, useRoute } from '@react-navigation/native'
import PostContext from '../contexts/PostContext'
import { Input } from 'react-native-elements'
import { Center, CheckIcon, Select, Stack, TextArea, useColorModeValue } from 'native-base'
import { background, backgroundColor } from 'styled-system'
import dropDownService from '../services/DropDownService'
import { Color } from '../types/models/Color'
import { Breed } from '../types/models/Breed'
import { FurLength } from '../types/models/FurLength'
import { Size } from '../types/models/Size'
import MySelecter from '../components/MyThemedComponents/MySelecter'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import ImageChooser from '../components/ImageChooser'
import imageService from '../services/ImageService'
import postService from '../services/PostService'
import { Pet } from '../types/models/Pet'
import UserContext from '../contexts/UserContext'

import { Button, Box, NativeBaseProvider } from 'native-base'
import SingleFilterBottomSheetModal from '../components/BottomSheetModals/SingleFilterBottomSheetModal'
import MyButton from '../components/MyThemedComponents/MyButton'
import MyText from '../components/MyThemedComponents/MyText'

import userService from '../services/UserService'
/* interface PostPageProps {
  post: Post | undefined
} */

const CreatePost: React.FC = ({}) => {
  const theme = useTheme()
  const { user, setUser } = useContext(UserContext)
  const { setPost } = useContext(PostContext)

  const [localPet, setLocalPet] = useState<Pet | undefined>(undefined)
  const [colors, setColors] = useState<Color[]>()
  const [breeds, setBreeds] = useState<Breed[]>()
  const [lenghts, setLenghts] = useState<FurLength[]>()
  const [sizes, setSizes] = useState<Size[]>()

  const colorsModalRef = useRef<BottomSheetModal>(null)
  const breedsModalRef = useRef<BottomSheetModal>(null)
  const lenghtsModalRef = useRef<BottomSheetModal>(null)
  const sizesModalRef = useRef<BottomSheetModal>(null)

  const [image1, setImage1] = useState()
  const [image2, setImage2] = useState()
  const [image3, setImage3] = useState()
  const [image4, setImage4] = useState()
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation()
  const route = useRoute()
  const myLocation = route.params as any

  const [errorMessage, setErrorMessage] = useState('')

  const stylesWithTheme = styles(theme)

  const createPost = async () => {
    setErrorMessage('')
    setIsLoading(true)
    try {
      if (localPet?.color && localPet?.breed && localPet?.furLength && localPet?.size && description) {
        const im1 = await imageService.savePhoto(image1)
        const im2 = await imageService.savePhoto(image2)
        const im3 = await imageService.savePhoto(image3)
        const im4 = await imageService.savePhoto(image4)

        if (im1 || im2 || im3 || im4) {
          try {
            const newPost = await postService.post({
              pet: localPet,
              description: description,
              pictures: [im1 && { url: im1 }, im2 && { url: im2 }, im3 && { url: im3 }, im4 && { url: im4 }],
              owner: user?.Id,
              postStatus: 1,
              location: { lat: myLocation.latitude, long: myLocation.longitude }
            })
            if (user) {
              setPost({ ...newPost })
              setUser(await userService.getUser(user?.Id))

              console.log(newPost)

              navigation.navigate('Main')
            }
          } catch (error) {
            console.log(error.message)
          } finally {
            setIsLoading(false)
          }
        } else setErrorMessage('Suba por lo menos una imagen')
      } else setErrorMessage('Faltan completar algunos datos')
    } catch (error) {
      setErrorMessage(error.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const getParams = async () => {
      setColors(await dropDownService.getAllColors())
      setLenghts(await dropDownService.getAllLengths())
      setBreeds(await dropDownService.getAllBreeds())
      setSizes(await dropDownService.getAllSizes())
    }
    getParams()
  }, [])

  return (
    <BottomSheetModalProvider>
      <ScrollView style={stylesWithTheme.root}>
        <View>
          <TouchableOpacity onPress={() => breedsModalRef.current?.present()} style={stylesWithTheme.row}>
            <MyText style={{ fontSize: 18 }}>Raza</MyText>
            <MyText style={{ fontSize: 18, color: 'grey' }}>{localPet?.breed?.description ? localPet.breed.description : 'Seleccionar'}</MyText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => colorsModalRef.current?.present()} style={stylesWithTheme.row}>
            <MyText style={{ fontSize: 18 }}>Colores</MyText>
            <MyText style={{ fontSize: 18, color: 'grey' }}>{localPet?.color?.description ? localPet?.color?.description : 'Seleccionar'}</MyText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => lenghtsModalRef.current?.present()} style={stylesWithTheme.row}>
            <MyText style={{ fontSize: 18 }}>Pelaje</MyText>
            <MyText style={{ fontSize: 18, color: 'grey' }}>
              {localPet?.furLength?.description ? localPet?.furLength?.description : 'Seleccionar'}
            </MyText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sizesModalRef.current?.present()} style={stylesWithTheme.row}>
            <MyText style={{ fontSize: 18 }}>Tamaño</MyText>
            <MyText style={{ fontSize: 18, color: 'grey' }}>{localPet?.size?.description ? localPet.size.description : 'Seleccionar'}</MyText>
          </TouchableOpacity>

          {/*  <MyInput value={description} onChangeText={(text) => setDescription(text)}></MyInput>
           */}

          <Input
            inputContainerStyle={{
              marginTop: 8,
              marginLeft: 4,
              borderColor: 'grey',
              borderBottomWidth: 0.5,
              alignSelf: 'center',
              paddingVertical: 0
            }}
            inputStyle={{ fontSize: 18, color: theme.text }}
            numberOfLines={2}
            autoCapitalize="sentences"
            clearButtonMode="always"
            placeholderTextColor="grey"
            placeholder="Contanos como la encontraste"
            value={description}
            onChangeText={setDescription}
          ></Input>
          <SingleFilterBottomSheetModal
            title="Colores"
            list={colors}
            setFilter={(color: Color) => setLocalPet((prev) => ({ ...prev, color: color.Id !== undefined ? color : null }))}
            filter={localPet?.color}
            modalRef={colorsModalRef}
          />
          <SingleFilterBottomSheetModal
            title="Pelaje"
            list={lenghts}
            setFilter={(furLength: FurLength) => setLocalPet((prev) => ({ ...prev, furLength: furLength.Id !== undefined ? furLength : null }))}
            filter={localPet?.furLength}
            modalRef={lenghtsModalRef}
          />
          <SingleFilterBottomSheetModal
            title="Tamaño"
            list={sizes}
            setFilter={(size: Size) => setLocalPet((prev) => ({ ...prev, size: size.Id !== undefined ? size : null }))}
            filter={localPet?.size}
            modalRef={sizesModalRef}
          />
          <SingleFilterBottomSheetModal
            title="Raza"
            list={breeds}
            setFilter={(breed: Breed) => setLocalPet((prev) => ({ ...prev, breed: breed.Id !== undefined ? breed : null }))}
            filter={localPet?.breed}
            modalRef={breedsModalRef}
          />
        </View>

        <View style={{ margin: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
          <ImageChooser pickedImagePath={image1} setPickedImagePath={setImage1} />
          <ImageChooser pickedImagePath={image2} setPickedImagePath={setImage2} />
        </View>
        <View style={{ marginHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
          <ImageChooser pickedImagePath={image3} setPickedImagePath={setImage3} />
          <ImageChooser pickedImagePath={image4} setPickedImagePath={setImage4} />
        </View>
        <Text style={{ marginLeft: 16, marginTop: 16, color: '#FF453A', fontSize: 17 }}>{errorMessage}</Text>
        <View style={stylesWithTheme.button}>
          <MyButton title="Crear" loading={isLoading} onPress={createPost} />
        </View>
      </ScrollView>
    </BottomSheetModalProvider>
  )
}

const styles = (theme: MyTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      paddingVertical: 16
    },
    title: {
      fontSize: 24,
      /*  fontFamily: 'LoveMeLikeASister', */
      paddingBottom: 16
    },
    input: {
      paddingHorizontal: 16
    },
    button: {
      alignSelf: 'stretch',
      marginVertical: 8,
      padding: 16
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: theme.border,
      margin: 8,
      marginHorizontal: 16,
      paddingBottom: 16,
      alignItems: 'center'
    }
  })

export default CreatePost
