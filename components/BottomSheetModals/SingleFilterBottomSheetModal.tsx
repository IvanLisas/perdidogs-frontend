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

interface SingleFilterBottomSheetModalProps {
  modalRef: React.RefObject<BottomSheetModalMethods>
  list: any[] | undefined
  setFilter: (list: any) => void
  title: string
  filter: any
}

const SingleFilterBottomSheetModal: React.FC<SingleFilterBottomSheetModalProps> = (props) => {
  const theme = useTheme()
  const [change, setChange] = useState(false)
  const { filter, title, modalRef, list, setFilter } = props

  const [localFilter, setLocalFilter] = useState<any>(filter)

  const handleAppleFilter = (filter: any) => {
    /*   localFilter() */
    setLocalFilter({ ...filter })
  }

  useEffect(() => {
    setLocalFilter(() => ({ ...filter }))
  }, [filter])

  const TopBar = (
    <View style={styles.handleRoot}>
      <TouchableOpacity
        onPress={() => {
          modalRef.current?.dismiss()
        }}
        style={styles.button}
      >
        <Ionicons size={24} color="#8E8E93" name="close" />
      </TouchableOpacity>
      <MyText style={{ fontSize: 18 }}>{title}</MyText>
      <TouchableOpacity
        onPress={() => {
          setFilter({ ...localFilter })

          modalRef.current?.close()

          modalRef.current?.dismiss()
        }}
        style={styles.button}
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
      ref={modalRef}
      stackBehavior="replace"
      onDismiss={() => {
        if (!change) setLocalFilter(() => ({ ...filter }))
        setChange(false)
      }}
      backgroundComponent={() => <View style={{ backgroundColor: 'black' }}></View>}
      style={{ backgroundColor: theme.navigation, borderRadius: 12 }}
      handleComponent={() => TopBar}
    >
      <BottomSheetScrollView style={{ padding: 16 }}>
        <TouchableOpacity onPress={() => handleAppleFilter(null)} style={styles.row}>
          <MyText style={{ fontSize: 16 }}>Ninguno</MyText>
          <Ionicons size={24} color={undefined === localFilter?.description ? '#8E8E93' : 'transparent'} name="checkmark" />
        </TouchableOpacity>
        {list?.map((filter) => (
          <TouchableOpacity key={filter.description} onPress={() => handleAppleFilter(filter)} style={styles.row}>
            <MyText style={{ fontSize: 16 }} key={filter.description}>
              {filter.description}
            </MyText>
            <Ionicons size={24} color={filter.description === localFilter?.description ? '#8E8E93' : 'transparent'} name="checkmark" />
          </TouchableOpacity>
        ))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}
const styles = StyleSheet.create({
  handleRoot: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    padding: 16,
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    paddingVertical: 16,
    alignItems: 'center'
  },
  button: {
    /*     flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center' */
  }
})

export default SingleFilterBottomSheetModal
