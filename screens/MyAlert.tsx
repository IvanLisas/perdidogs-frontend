import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { PermissionStatus } from 'unimodules-permissions-interface'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
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

  const [errorTitle, setErrorTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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
    setErrorMessage('')
    setErrorTitle('')
    if (title && localPet?.breed?.Id) {
      try {
        if (localPet?.breed || localPet?.color || localPet?.furLength || localPet?.size) {
          await alertService.update({ Id: (route.params as any).alert.Id, pet: localPet, title: title })
          if (user) setAlerts([...(await alertService.getAll(user.Id))])
          navigation.navigate('myAlerts')
        } else console.log('no no')
      } catch (error) {
        console.log(error.message)
      }
    } else {
      if (!title) setErrorTitle('Ingrese un titulo')
      if (!localPet?.breed?.Id) setErrorMessage('Ingrese una raza')
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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ padding: 8 }}>
        <ScrollView>
          <Input
            errorMessage={errorTitle}
            autoCapitalize="sentences"
            inputContainerStyle={{
              marginTop: 8,

              borderColor: 'grey',
              borderBottomWidth: 0.5,
              alignSelf: 'center',
              paddingVertical: 0
            }}
            errorStyle={{ color: '#FF453A', fontSize: 15 }}
            onChangeText={setTitle}
            inputStyle={{ fontSize: 18, color: theme.text }}
            clearButtonMode="always"
            placeholder="Titulo de la alerta"
            value={title}
          ></Input>

          <View>
            <TouchableOpacity onPress={() => breedsModalRef.current?.present()} style={styles.row}>
              <MyText style={{ fontSize: 18, color: 'grey' }}>Raza</MyText>
              <MyText style={{ fontSize: 18, color: 'grey' }}>{localPet?.breed?.description ? localPet.breed.description : 'Ninguno'}</MyText>
            </TouchableOpacity>
            <Text style={{ marginLeft: 16, marginTop: 16, color: '#FF453A', fontSize: 15 }}>{errorMessage}</Text>
          </View>
          <TouchableOpacity onPress={() => colorsModalRef.current?.present()} style={styles.row}>
            <MyText style={{ fontSize: 18, color: 'grey' }}>Colores</MyText>
            <MyText style={{ fontSize: 18, color: 'grey' }}>{localPet?.color?.description ? localPet?.color?.description : 'Ninguno'}</MyText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => lenghtsModalRef.current?.present()} style={styles.row}>
            <MyText style={{ fontSize: 18, color: 'grey' }}>Pelaje</MyText>
            <MyText style={{ fontSize: 18, color: 'grey' }}>{localPet?.furLength?.description ? localPet?.furLength?.description : 'Ninguno'}</MyText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sizesModalRef.current?.present()} style={styles.row}>
            <MyText style={{ fontSize: 18, color: 'grey' }}>Tamaño</MyText>
            <MyText style={{ fontSize: 18, color: 'grey' }}>{localPet?.size?.description ? localPet.size.description : 'Ninguno'}</MyText>
          </TouchableOpacity>

          <ScrollView>
            <SingleFilterBottomSheetModal
              title="Colores"
              list={colors}
              setFilter={(color: Color) => setLocalPet((prev) => ({ ...prev, color: color }))}
              filter={localPet?.color}
              modalRef={colorsModalRef}
            />
            <SingleFilterBottomSheetModal
              title="Pelaje"
              list={lenghts}
              setFilter={(length: FurLength) => setLocalPet((prev) => ({ ...prev, furLength: length }))}
              filter={localPet?.furLength}
              modalRef={lenghtsModalRef}
            />
            <SingleFilterBottomSheetModal
              title="Tamaño"
              list={sizes}
              setFilter={(size: Size) => setLocalPet((prev) => ({ ...prev, size: size }))}
              filter={localPet?.size}
              modalRef={sizesModalRef}
            />
            <SingleFilterBottomSheetModal
              title="Raza"
              list={breeds}
              setFilter={(breed: Breed) => setLocalPet((prev) => ({ ...prev, breed: breed }))}
              filter={localPet?.breed}
              modalRef={breedsModalRef}
            />

            <View style={{ marginTop: 16 }}>
              <MyButton onPress={createAlert} title="Modificar Alerta"></MyButton>
            </View>

            <View style={{ marginTop: 16 }}>
              <MyButton
                buttonStyle={{
                  borderWidth: 1.5,
                  borderColor: '#FF453A',
                  padding: 12,
                  borderRadius: 18,
                  backgroundColor: 'transparent'
                }}
                titleStyle={{ color: '#FF453A', fontSize: 20 }}
                title="Borrar"
                onPress={deleteAlert}
              />
            </View>
          </ScrollView>
        </ScrollView>
      </TouchableWithoutFeedback>
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
