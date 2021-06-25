import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View, Button, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import { Post } from '../../types/models/Post'
import useTheme from '../../hooks/useTheme'
import { MyTheme } from '../../styles/Theme'
import Text from '../../components/MyThemedComponents/Text'
import { LinearGradient } from 'expo-linear-gradient'
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from '../../components/icon/index'
import UserAvatar from '../../components/UserAvatar'
import { useNavigation } from '@react-navigation/native'
import PostContext from '../../contexts/PostContext'
/* import Input from '../../components/MyThemedComponents/Input' */
import { Center, CheckIcon, Input, Select, Stack, TextArea, useColorModeValue } from 'native-base'
import { background, backgroundColor } from 'styled-system'
import dropDownService from '../../services/DropDownService'
import { Color } from '../../types/models/Color'
import { Breed } from '../../types/models/Breed'
import { Length } from '../../types/models/Lenght'
import { Size } from '../../types/models/Size'
import Selecter from '../../components/MyThemedComponents/Selecter'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import ImageChooser from './ImageChooser'
import { Pet } from '../../types/models/Pet'
import postService from '../../services/PostService'
import { getCurrentPositionAsync } from 'expo-location'
import { Location } from '../../types/models/Location'

export type Sex = {
  Id: string
  description: string
}

export type HasCollar = {
  Id: string
  description: string
}

/* const HasCollars:HasCollar[] = [{{ Id: 1, description: 'Si' } as HasCollar}, { Id: 2, description: 'No' } as HasCollar]
 */
const SearchByFilters: React.FC = ({}) => {
  const theme = useTheme()
  const { setPost, posts, setPosts } = useContext(PostContext)
  const [color, setColor] = useState<Color>()
  const [breed, setBreed] = useState<Breed>()
  const [lenght, setLenght] = useState<Length>()
  const [size, setSize] = useState<Size>()
  const [colors, setColors] = useState<Color[]>()
  const [breeds, setBreeds] = useState<Breed[]>()
  const [lenghts, setLenghts] = useState<Length[]>()
  const [sizes, setSizes] = useState<Size[]>()

  const [hasCollar, setHasCollar] = useState<HasCollar>()
  const [sex, setSex] = useState<Sex>()
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')

  const navigation = useNavigation()

  const createPost = async () => {
    /* navigation.navigate('Main') */
    const pet = { breed: breed, fur: { color: color, length: lenght }, sex: 'Macho', hasCollar: true, size: size } as Pet
    const myLocation = (await getCurrentPositionAsync()).coords
    try {
      console.log((await getCurrentPositionAsync()).coords)
      /*   setPosts(await postService.getPostByFilters(pet, myLocation)) */
    } catch (error) {
      console.log(error.message)
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
      <Text style={styles.title}>Filtros</Text>
      {/*    <Input
        bg={theme.primary}
        borderRadius={12}
        style={styles.input}
        marginBottom={4}
        w="100%"
        placeholder="Describi como lo encontraste"

        placeholderTextColor="grey"
      /> */}

      {breeds && <Selecter value={breed} values={breeds} setValue={setBreed} label={'Raza'} />}

      {colors && <Selecter value={color} values={colors} setValue={setColor} label={'Color'} />}

      {lenghts && <Selecter value={lenght} values={lenghts} setValue={setLenght} label={'Largo del pelo'} />}

      {sizes && <Selecter value={size} values={sizes} setValue={setSize} label={'Tamaño'} />}

      <Selecter value={hasCollar} values={['Si', 'No']} setValue={setSize} label={'Tiene collar'} />

      <Selecter value={sex} values={['Macho', 'Hembra']} setValue={setSize} label={'Sexo'} />

      <TouchableOpacity onPress={createPost}>
        <Text>Buscar</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

    padding: 16
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

export default SearchByFilters
