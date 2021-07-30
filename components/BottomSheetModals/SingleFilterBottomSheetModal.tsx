import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import useTheme from '../../hooks/useTheme'
import MyText from '../MyThemedComponents/MyText'
import { Ionicons } from '@expo/vector-icons'
import { Pet } from '../../types/models/Pet'

import dropDownService from '../../services/DropDownService'
import { Breed } from '../../types/models/Breed'
import { FurLength } from '../../types/models/FurLength'
import { Size } from '../../types/models/Size'
import { Color } from '../../types/models/Color'
import CustomBackdrop from '../CustomBackDrop'
import BlurredBackground from '../BlurredBackground'

const a = '#F8E8FF'
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
        style={{ padding: 16 }}
        onPress={() => {
          modalRef.current?.dismiss()
        }}
      >
        <Ionicons size={28} color="#8E8E93" name="close" />
      </TouchableOpacity>
      <MyText style={{ fontSize: 18, padding: 16 }}>{title}</MyText>
      <TouchableOpacity
        style={{ padding: 16 }}
        onPress={() => {
          setFilter({ ...localFilter })

          modalRef.current?.close()

          modalRef.current?.dismiss()
        }}
      >
        <Ionicons size={28} color="#8E8E93" name="checkmark" />
      </TouchableOpacity>
    </View>
  )
  /* 
  const [backdropPressBehavior, setBackdropPressBehavior] = useState<'none' | 'close' | 'collapse'>('collapse')

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        style={{
          backgroundColor: '#a8b5eb'
        }}
        {...props}
        pressBehavior={backdropPressBehavior}
      />
    ),
    [backdropPressBehavior]
  ) */

  return (
    <BottomSheetModal
      enableContentPanningGesture
      snapPoints={['90%']}
      backdropComponent={CustomBackdrop}
      index={0}
      ref={modalRef}
      stackBehavior="replace"
      onDismiss={() => {
        if (!change) setLocalFilter(() => ({ ...filter }))
        setChange(false)
      }}
      backgroundComponent={BlurredBackground}
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
    borderBottomWidth: 0.5,
    /*    backgroundColor: a, */
    borderTopLeftRadius: 12,
    borderColor: 'grey',
    borderTopRightRadius: 12,
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
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
