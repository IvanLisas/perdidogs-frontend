import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { PermissionStatus } from 'unimodules-permissions-interface'
import { ScrollView } from 'react-native-gesture-handler'
import { Pet } from '../types/models/Pet'
import { Color } from '../types/models/Color'
import { Location } from '../types/models/Location'
import { Input } from 'react-native-elements'
import SingleFilterBottomSheetModal from '../components/BottomSheetModals/SingleFilterBottomSheetModal'
import MyText from '../components/MyThemedComponents/MyText'
import dropDownService from '../services/DropDownService'
import { Breed } from '../types/models/Breed'
import { FurLength } from '../types/models/FurLength'
import { Size } from '../types/models/Size'
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import MyButton from '../components/MyThemedComponents/MyButton'
import alertService from '../services/AlertService'
import UserContext from '../contexts/UserContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'
import { Alert } from '../types/models/Alert'
import AlertsContext from '../contexts/AlertsContext'
import useTheme from '../hooks/useTheme'

interface FiltersBottomSheetModalProps {}

const MyAlert: React.FC<FiltersBottomSheetModalProps> = () => {
  /* const [color, setColor] = useState<Color>()
  const [breed, setBreed] = useState<Breed>()
  const [lenght, setLenght] = useState<Length>()
  const [size, setSize] = useState<Size>() */
  const [localPet, setLocalPet] = useState<Pet | undefined>(undefined)
  const [colors, setColors] = useState<Color[]>()
  const [breeds, setBreeds] = useState<Breed[]>()
  const [lenghts, setLenghts] = useState<FurLength[]>()
  const [sizes, setSizes] = useState<Size[]>()

  const [title, setTitle] = useState('')
  const [id, setId] = useState(0)

  const colorsModalRef = useRef<BottomSheetModal>(null)
  const breedsModalRef = useRef<BottomSheetModal>(null)
  const lenghtsModalRef = useRef<BottomSheetModal>(null)
  const sizesModalRef = useRef<BottomSheetModal>(null)

  //Permissions
  const [foregroundPermissionsStatus, setForegroundPermissionsStatus] = useState<PermissionStatus>(PermissionStatus.UNDETERMINED)
  const navigation = useNavigation()
  const [myLocation, setMyLocation] = useState<Location>()
  const { alerts, setAlerts } = useContext(AlertsContext)
  const { user } = useContext(UserContext)

  const route = useRoute()

  useEffect(() => {
    setLocalPet(() => ({ ...((route.params as any).alert.pet as Pet) }))
    setTitle(() => (route.params as any).alert.title as string)

    setId(() => (route.params as any).alert.Id as number)
    const getParams = async () => {
      setColors(await dropDownService.getAllColors())
      setLenghts(await dropDownService.getAllLengths())
      setBreeds(await dropDownService.getAllBreeds())
      setSizes(await dropDownService.getAllSizes())
    }
    getParams()
  }, [])

  useEffect(() => {}, [localPet])

  const createAlert = async () => {
    try {
      if (localPet?.breed || localPet?.color || localPet?.furLength || localPet?.size) {
        await alertService.update({ Id: (route.params as any).alert.Id, pet: localPet, title: title })
        if (user) setAlerts([...(await alertService.getAll(user.Id))])
        navigation.navigate('myAlerts')
      } else console.log('no no')
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteAlert = async () => {
    try {
      console.log(id)
      await alertService.delete(id)
      if (user) setAlerts([...(await alertService.getAll(user.Id))])
      navigation.navigate('myAlerts')
    } catch (error) {
      console.log(error.message)
    }
  }

  const theme = useTheme()

  return (
    <BottomSheetModalProvider>
      <View>
        <Input
          /*      inputContainerStyle={{ borderBottomWidth: 0.5, alignSelf: 'center' }} */
          onChangeText={setTitle}
          inputStyle={{ fontSize: 16, color: theme.text }}
          clearButtonMode="always"
          placeholder="Titulo"
          value={title}
        ></Input>

        <TouchableOpacity onPress={() => breedsModalRef.current?.present()} style={styles.row}>
          <MyText style={{ fontSize: 16 }}>Raza</MyText>
          <MyText style={{ fontSize: 16 }}>{localPet?.breed?.description ? localPet.breed.description : 'Ninguno'}</MyText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => colorsModalRef.current?.present()} style={styles.row}>
          <MyText style={{ fontSize: 16 }}>Colores</MyText>
          <MyText style={{ fontSize: 16 }}>{localPet?.color?.description ? localPet?.color?.description : 'Ninguno'}</MyText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => lenghtsModalRef.current?.present()} style={styles.row}>
          <MyText style={{ fontSize: 16 }}>Pelaje</MyText>
          <MyText style={{ fontSize: 16 }}>{localPet?.furLength?.description ? localPet?.furLength?.description : 'Ninguno'}</MyText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sizesModalRef.current?.present()} style={styles.row}>
          <MyText style={{ fontSize: 16 }}>Tamaño</MyText>
          <MyText style={{ fontSize: 16 }}>{localPet?.size?.description ? localPet.size.description : 'Ninguno'}</MyText>
        </TouchableOpacity>

        <ScrollView style={{ padding: 16 }}>
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
          <MyButton onPress={createAlert} title="Crear Alerta"></MyButton>
          <MyButton onPress={deleteAlert} title="Borrar Alerta"></MyButton>
        </ScrollView>
      </View>
    </BottomSheetModalProvider>
  )
}
const styles = StyleSheet.create({
  handleRoot: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    padding: 16,
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  iconButton: {
    backgroundColor: '#E5E5EA',
    borderRadius: 50,
    width: 28,
    height: 28,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    padding: 16,
    alignItems: 'center'
  },
  chipText: {
    color: 'white',
    fontSize: 11
  },
  scrollContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filterContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default MyAlert
