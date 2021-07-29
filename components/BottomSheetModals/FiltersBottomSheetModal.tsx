import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import useTheme from '../../hooks/useTheme'
import MyText from '../MyThemedComponents/MyText'
import { Ionicons } from '@expo/vector-icons'
import { Pet } from '../../types/models/Pet'

import dropDownService from '../../services/DropDownService'
import { Breed } from '../../types/models/Breed'
import { FurLength } from '../../types/models/FurLength'
import { Size } from '../../types/models/Size'
import { Color } from '../../types/models/Color'
import SingleFilterBottomSheetModal from './SingleFilterBottomSheetModal'
import { color } from 'react-native-elements/dist/helpers'
import MyButton from '../MyThemedComponents/MyButton'

interface FiltersBottomSheetModalProps {
  modalRef: React.RefObject<BottomSheetModalMethods>
  pet: Pet | undefined
  /*   setFilterModa: (boolean: boolean) => React.Dispatch<React.SetStateAction<boolean>> */
  /*   setPet: (pet: Pet) => void */
  handleApplyFilters: (pet: Pet | undefined) => void
  snapPoints: (string | number)[]
}

const FiltersBottomSheetModal: React.FC<FiltersBottomSheetModalProps> = ({ pet, modalRef, handleApplyFilters, snapPoints }) => {
  const [localPet, setLocalPet] = useState<Pet | undefined>(pet)
  const [colors, setColors] = useState<Color[]>()
  const [breeds, setBreeds] = useState<Breed[]>()
  const [lenghts, setLenghts] = useState<FurLength[]>()
  const [sizes, setSizes] = useState<Size[]>()

  const colorsModalRef = useRef<BottomSheetModal>(null)
  const breedsModalRef = useRef<BottomSheetModal>(null)
  const lenghtsModalRef = useRef<BottomSheetModal>(null)
  const sizesModalRef = useRef<BottomSheetModal>(null)

  let change = false

  useEffect(() => {
    const getParams = async () => {
      setColors(await dropDownService.getAllColors())
      setLenghts(await dropDownService.getAllLengths())
      setBreeds(await dropDownService.getAllBreeds())
      setSizes(await dropDownService.getAllSizes())
    }
    getParams()
  }, [])

  const cleanFilters = () => {
    setLocalPet(undefined)
  }

  const theme = useTheme()

  const TopBar = (
    <View style={styles.handleRoot}>
      <TouchableOpacity
        onPress={() => {
          modalRef.current?.dismiss()
          /*      setFilterModa(false) */
        }}
        /* style={styles.iconButton} */
      >
        <Ionicons size={24} color="#8E8E93" name="close" />
      </TouchableOpacity>
      <MyText style={{ fontSize: 18 }}>Filtros</MyText>
      <TouchableOpacity
        onPress={() => {
          setLocalPet((prev) => ({ ...localPet }))
          handleApplyFilters(localPet)
          change = true
          modalRef.current?.dismiss()
        }}
        /*   style={styles.iconButton} */
      >
        <Ionicons size={24} color="#8E8E93" name="checkmark" />
      </TouchableOpacity>
    </View>
  )

  return (
    <BottomSheetModal
      enableContentPanningGesture
      snapPoints={['90%']}
      index={0}
      key="filtersModal"
      ref={modalRef}
      onDismiss={() => {
        if (!change) {
          setLocalPet((prev) => ({ ...pet }))
        }
        /*  setChange(false) */
      }}
      stackBehavior="replace"
      backgroundComponent={() => <View style={{ backgroundColor: 'black' }}></View>}
      style={{ backgroundColor: theme.navigation, borderRadius: 12 }}
      handleComponent={() => TopBar}
    >
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
      <MyButton onPress={cleanFilters} title="Limpiar filtros"></MyButton>

      <BottomSheetScrollView style={{ padding: 16 }}>
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
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}
const styles = StyleSheet.create({
  handleRoot: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
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
    borderBottomWidth: 0.5,
    borderColor: 'grey',
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

export default FiltersBottomSheetModal
