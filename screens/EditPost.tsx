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
/* import Input from '../../components/MyThemedComponents/Input' */
import { Center, CheckIcon, Input, Select, Stack, TextArea, useColorModeValue } from 'native-base'
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
import MyInput from '../components/MyThemedComponents/MyInput'
import userService from '../services/UserService'
/* interface PostPageProps {
  post: Post | undefined
} */

const EditPost: React.FC = ({}) => {
  const theme = useTheme()
  const { user, setUser } = useContext(UserContext)
  const { post, setPost } = useContext(PostContext)

  const [localPet, setLocalPet] = useState<Pet | undefined>(post?.pet)
  const [localDescription, setLocalDescription] = useState(post?.description)
  const [colors, setColors] = useState<Color[]>()
  const [breeds, setBreeds] = useState<Breed[]>()
  const [lenghts, setLenghts] = useState<FurLength[]>()
  const [sizes, setSizes] = useState<Size[]>()

  const colorsModalRef = useRef<BottomSheetModal>(null)
  const breedsModalRef = useRef<BottomSheetModal>(null)
  const lenghtsModalRef = useRef<BottomSheetModal>(null)
  const sizesModalRef = useRef<BottomSheetModal>(null)

  const [image1, setImage1] = useState(post?.pictures[0])
  const [image2, setImage2] = useState(post?.pictures[1])
  const [image3, setImage3] = useState(post?.pictures[2])
  const [image4, setImage4] = useState(post?.pictures[3])
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation()
  const route = useRoute()
  const myLocation = route.params as any

  const deletePost = async () => {
    try {
      if (post) {
        await postService.delete(post?.Id)
        console.log('borrado')
      }
      if (user) setUser(await userService.getUser(user?.Id))
      navigation.navigate('Main')
    } catch (error) {
      console.log(error.message)
    }
  }

  const updatePost = async () => {
    if (localPet?.color && localPet?.breed && localPet?.furLength && localPet?.size) {
      setIsLoading(true)
      console.log(image1, image2, image3, image4)
      const im1 = image1?.url ? image1 : await imageService.savePhoto(image1)
      const im2 = image2?.url ? image2 : await imageService.savePhoto(image2)
      const im3 = image3?.url ? image3 : await imageService.savePhoto(image3)
      const im4 = image4?.url ? image4 : await imageService.savePhoto(image4)
      console.log(image1, image2, image3, image4)

      const pictures = [im1?.url ? im1 : { url: im1 }, im2?.url ? im2 : { url: im2 }, im3?.url ? im3 : { url: im3 }, im4?.url ? im4 : { url: im4 }]
      console.log(pictures)
      console.log(pictures.filter((x) => x.uri || x.url))
      try {
        await postService.update({
          ...post,

          description: localDescription,
          pet: localPet,
          pictures: pictures.filter((x) => x.uri || x.url)
        })

        if (user) setUser(await userService.getUser(user?.Id))
      } catch (error) {
        console.log(error.message)
      }
      navigation.navigate('Main')
    }
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
      <ScrollView style={styles.root}>
        <View>
          <TouchableOpacity onPress={() => breedsModalRef.current?.present()} style={styles.row}>
            <MyText style={{ fontSize: 16 }}>Raza</MyText>
            <MyText style={{ fontSize: 16 }}>{localPet?.breed?.description ? localPet.breed.description : 'Seleccionar'}</MyText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => colorsModalRef.current?.present()} style={styles.row}>
            <MyText style={{ fontSize: 16 }}>Colores</MyText>
            <MyText style={{ fontSize: 16 }}>{localPet?.color?.description ? localPet?.color?.description : 'Seleccionar'}</MyText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => lenghtsModalRef.current?.present()} style={styles.row}>
            <MyText style={{ fontSize: 16 }}>Pelaje</MyText>
            <MyText style={{ fontSize: 16 }}>{localPet?.furLength?.description ? localPet?.furLength?.description : 'Seleccionar'}</MyText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sizesModalRef.current?.present()} style={styles.row}>
            <MyText style={{ fontSize: 16 }}>Tamaño</MyText>
            <MyText style={{ fontSize: 16 }}>{localPet?.size?.description ? localPet.size.description : 'Seleccionar'}</MyText>
          </TouchableOpacity>
          <MyInput value={localDescription} onChangeText={(text) => setLocalDescription(text)}></MyInput>

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

        <View style={styles.button}>
          <MyButton title="Modificar" loading={isLoading} onPress={updatePost} />
        </View>
        <View style={styles.button}>
          <MyButton title="Borrar" loading={isLoading} onPress={deletePost} />
        </View>
      </ScrollView>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
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
    marginTop: 8,
    padding: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    padding: 16,
    alignItems: 'center'
  }
})

export default EditPost
