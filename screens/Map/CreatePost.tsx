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
import Input from '../../components/MyThemedComponents/Input'
import { CheckIcon, Select } from 'native-base'
import { background } from 'styled-system'
import dropDownService from '../../services/DropDownService'
import { Color } from '../../types/models/Color'
import { Breed } from '../../types/models/Breed'
import { Length } from '../../types/models/Lenght'
import { Size } from '../../types/models/Size'
/* interface PostPageProps {
  post: Post | undefined
} */

const CreatePost: React.FC = ({}) => {
  const theme = useTheme()
  const { setPost, posts, setPosts } = useContext(PostContext)
  const [color, setColor] = useState('')
  const [breed, setBreed] = useState('')
  const [lenght, setLenght] = useState('')
  const [size, setSize] = useState('')
  const [colors, setColors] = useState<Color[]>()
  const [breeds, setBreeds] = useState<Breed[]>()
  const [lenghts, setLenghts] = useState<Length[]>()
  const [sizes, setSizes] = useState<Size[]>()

  const navigation = useNavigation()

  const createPost = () => {
    navigation.navigate('Main')
  }

  useEffect(() => {
    const getParams = async () => {
      /*       setColors(await dropDownService.getAllColors())
      console.log(await dropDownService.getAllColors()) */
      setBreeds(await dropDownService.getAllBreeds())
      //setLenghts(await dropDownService.getAllLengths())
      //setSizes(await dropDownService.getAllSizes()) */
    }
    getParams()
  }, [])

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>Datos obligatorios</Text>
      <Input
        /*   ref={inputLastName} */
        inputContainerStyle={{ borderBottomWidth: 0, width: '100%' }}
        placeholder="Describi como lo encontraste"
        /* onChangeText={setLastName} */
        /* value={lastName} */
        containerStyle={{ paddingHorizontal: 0 }}
        style={styles.input}
        errorStyle={{ color: 'red' }}
        /*   errorMessage={lastNameError} */
      />

      {breeds && (
        <Select
          selectedValue={breed}
          style={{ backgroundColor: 'white' }}
          placeholder="Raza"
          _item={{
            backgroundColor: 'white',
            color: 'white'
          }}
          /*  _actionSheetContent={{ backgroundColor: 'transparent' }} */
          onValueChange={(itemValue) => setBreed(itemValue)}
          _selectedItem={{
            bg: 'cyan.600',

            endIcon: <CheckIcon size={4} />
          }}
        >
          {breeds?.map((breed, index) => (
            <Select.Item key={index + 'selected'} label={breed.description} value={breed.description} />
          ))}
        </Select>
      )}
      <TouchableOpacity onPress={createPost}>
        <Text>Crear</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

    paddingTop: 32
  },
  title: {
    fontSize: 20,
    fontFamily: 'LoveMeLikeASister'
  },
  input: {
    marginVertical: 2,
    borderRadius: 15,
    padding: 16,
    backgroundColor: 'white',
    /*   alignSelf: 'center', */
    width: 234
  }
})

export default CreatePost
