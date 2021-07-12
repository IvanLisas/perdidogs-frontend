import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import { Post } from '../types/models/Post'
import useTheme from '../hooks/useTheme'
import { MyTheme } from '../styles/Theme'
import Text from '../components/MyThemedComponents/MyText'
import { LinearGradient } from 'expo-linear-gradient'
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView } from '@gorhom/bottom-sheet'
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
import { Length } from '../types/models/Lenght'
import { Size } from '../types/models/Size'
import MySelecter from '../components/MyThemedComponents/MySelecter'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import ImageChooser from '../components/ImageChooser'
import imageService from '../services/ImageService'
import postService from '../services/PostService'
import { Pet } from '../types/models/Pet'
import UserContext from '../contexts/UserContext'

import { Button, Box, NativeBaseProvider } from 'native-base'
/* interface PostPageProps {
  post: Post | undefined
} */

const CreatePost: React.FC = ({}) => {
  const theme = useTheme()
  const { user } = useContext(UserContext)
  const { setPost, posts, setPosts } = useContext(PostContext)
  const [color, setColor] = useState<Color>()
  const [breed, setBreed] = useState<Breed>()
  const [lenght, setLenght] = useState<Length>()
  const [size, setSize] = useState<Size>()
  const [colors, setColors] = useState<Color[]>()
  const [breeds, setBreeds] = useState<Breed[]>()
  const [lenghts, setLenghts] = useState<Length[]>()
  const [sizes, setSizes] = useState<Size[]>()
  const [image1, setImage1] = useState()
  const [image2, setImage2] = useState()
  const [image3, setImage3] = useState()
  const [image4, setImage4] = useState()
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation()
  const route = useRoute()
  const myLocation = route.params as any

  const createPost = async () => {
    if (color && lenght && size && breed) {
      setIsLoading(true)
      const pet: Pet = { fur: { color: color, length: lenght }, breed: breed, size: size }
      const im1 = await imageService.savePhoto(image1)
      const im2 = await imageService.savePhoto(image2)
      const im3 = await imageService.savePhoto(image3)
      const im4 = await imageService.savePhoto(image4)
      await postService.post({
        pet: pet,
        description: description,
        pictures: [im1 && { url: im1 }, im2 && { url: im2 }, im3 && { url: im3 }, im4 && { url: im4 }],
        owner: { Id: user?.Id },
        location: { lat: myLocation.latitude, long: myLocation.longitude }
      } as Post)

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
    <ScrollView style={styles.root}>
      <Text style={styles.title}>Datos obligatorios</Text>
      {/*    <Input
        bg={theme.primary}
        borderRadius={12}
        style={styles.input}
        marginBottom={4}
        w="100%"
        placeholder="Describi como lo encontraste"

        placeholderTextColor="grey"
      /> */}

      {breeds && <MySelecter value={breed} values={breeds} setValue={setBreed} label={'Raza'} />}

      {colors && <MySelecter value={color} values={colors} setValue={setColor} label={'Color'} />}

      {lenghts && <MySelecter value={lenght} values={lenghts} setValue={setLenght} label={'Largo del pelo'} />}

      {sizes && <MySelecter value={size} values={sizes} setValue={setSize} label={'Tamaño'} />}
      <Stack w="100%">
        <TextArea
          placeholderTextColor="grey"
          marginBottom={4}
          w="100%"
          /*   bg={theme.} */
          value={description}
          borderRadius={12}
          borderWidth={1}
          borderColor={theme.primary}
          onChangeText={setDescription}
          textAlignVertical="top"
          h={20}
          placeholder="Contanos como lo encontraste"
        />
      </Stack>
      <View style={{ marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
        <ImageChooser pickedImagePath={image1} setPickedImagePath={setImage1} />
        <ImageChooser pickedImagePath={image2} setPickedImagePath={setImage2} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <ImageChooser pickedImagePath={image3} setPickedImagePath={setImage3} />
        <ImageChooser pickedImagePath={image4} setPickedImagePath={setImage4} />
      </View>
      <Button isLoading={isLoading} onPress={createPost} style={{ marginVertical: 16, backgroundColor: theme.primary }}>
        Crear
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

    padding: 16,
    marginBottom: 16
  },
  title: {
    fontSize: 24,
    /*  fontFamily: 'LoveMeLikeASister', */
    paddingBottom: 16
  },
  input: {
    padding: 16
  }
})

export default CreatePost
