import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import useTheme from '../hooks/useTheme'
import Text from '../components/MyThemedComponents/MyText'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from '../components/icons/index'
import { useNavigation } from '@react-navigation/native'
import PostContext from '../contexts/PostContext'
import dropDownService from '../services/DropDownService'
import { Color } from '../types/models/Color'
import { Breed } from '../types/models/Breed'
import { Length } from '../types/models/Lenght'
import { Size } from '../types/models/Size'
import MySelecter from '../components/MyThemedComponents/MySelecter'
import { Pet } from '../types/models/Pet'
import postService from '../services/PostService'
import FiltersContext from '../contexts/FiltersContext'
import { Button } from 'native-base'

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
  const { setSearchLocation, setMyLocation, myLocation, searchLocation, pet, setPet, searchLocationDelta, setSearchLocationDelta } =
    useContext(FiltersContext)
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

  const search = async () => {
    const newFilter = { breed: breed, fur: { color: color, length: lenght }, size: size } as Pet
    setPet(newFilter)

    try {
      setPosts(await postService.getPostByFilters(newFilter, searchLocation, searchLocationDelta))
      navigation.goBack()
    } catch (error) {
      console.log(error.message)
    }
  }

  const cleanFilters = () => {
    setPet(undefined)
    setLenght(undefined)
    setSize(undefined)
    setBreed(undefined)
    setColor(undefined)
  }

  useEffect(() => {
    const getParams = async () => {
      setLenght(pet?.fur.length)
      setSize(pet?.size)
      setBreed(pet?.breed)
      setColor(pet?.fur.color)

      setColors(await dropDownService.getAllColors())
      setLenghts(await dropDownService.getAllLengths())
      setBreeds(await dropDownService.getAllBreeds())
      setSizes(await dropDownService.getAllSizes())
    }
    getParams()
  }, [])

  return (
    <ScrollView style={styles.root}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.title}>Filtros</Text>
        <TouchableOpacity onPress={cleanFilters}>
          <Icon style={{ color: theme.primary, fontSize: 28 }} name="cancel-circular-button-with-a-cross-inside-hand-drawn-outlines" />
        </TouchableOpacity>
      </View>

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
      {/* 
      <Selecter value={hasCollar} values={['Si', 'No']} setValue={setSize} label={'Tiene collar'} />

      <Selecter value={sex} values={['Macho', 'Hembra']} setValue={setSize} label={'Sexo'} />
 */}
      {/*       <TouchableOpacity onPress={search}>
        <Text>Buscar</Text>
      </TouchableOpacity> */}
      <Button onPress={search} style={{ backgroundColor: theme.primary }}>
        Buscar
      </Button>
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
