import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import React, { useState } from 'react'
import { StyleSheet, View, Keyboard, TouchableOpacity } from 'react-native'
import googleService from '../../services/GoogleService'
import { Prediction } from '../../types/models/Prediction'
import { useDebounce } from '../../hooks/useDebounce'
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import MyInput from '../MyThemedComponents/MyInput'
import MyText from '../MyThemedComponents/MyText'
import useTheme from '../../hooks/useTheme'

interface SearchPlacesBottomSheetModalProps {
  modalRef: React.RefObject<BottomSheetModalMethods>
  handleGoToPlace: (detail: GooglePlaceDetail | null) => Promise<void>
  snapPoints: (string | number)[]
}

const SearchPlacesBottomSheetModal: React.FC<SearchPlacesBottomSheetModalProps> = ({ modalRef, handleGoToPlace, snapPoints }) => {
  const [search, setSearch] = useState({ term: '', fetchPredictions: true })
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [showPredictions, setShowPredictions] = useState(true)
  const theme = useTheme()

  const handleModal = () => {
    modalRef.current?.expand()
  }

  const onChangeText = async () => {
    /*     if (search.term.trim() === '') {
      setShowPredictions(false)
      return
    } */
    if (!search.fetchPredictions) return
    console.log(search.term)
    try {
      setShowPredictions(true)
      setPredictions((await googleService.getPredictions(search.term)).predictions)
    } catch (e) {
      console.log(e)
    }
  }
  useDebounce(onChangeText, 1000, [search.term])

  const onPredictionTapped = async (placeId: string, description: string) => {
    try {
      const details = (await googleService.get(placeId)).result as GooglePlaceDetail

      handleGoToPlace(details)
      /*  setSearch((prevState) => ({ ...prevState, term: description })) */
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      key="searchModal"
      index={0}
      enableContentPanningGesture
      /*   keyboardBlurBehavior="restore" */
      ref={modalRef}
      dismissOnPanDown={false}
      onDismiss={() => Keyboard.dismiss()}
      onChange={(index) => {
        console.log(index == 0)
        index == 0 ? Keyboard.dismiss() : null
      }}
      /*  onAnimate={() => Keyboard.dismiss()} */
      stackBehavior="replace"
      backgroundComponent={() => <View style={{ backgroundColor: 'black' }}></View>}
      style={{ backgroundColor: theme.navigation, borderRadius: 5 }}
    >
      <MyInput
        placeholder="¿Donde perdiste tu mascota?"
        value={search.term}
        onTouchStart={() => handleModal()}
        onChangeText={(text) => {
          setSearch({ term: text, fetchPredictions: true })
          onChangeText()
        }}
        /* returnKeyType="search" */
      />

      {showPredictions && (
        <BottomSheetFlatList
          data={predictions}
          scrollEnabled
          onScroll={() => Keyboard.dismiss}
          onTouchStart={() => Keyboard.dismiss}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.predictionRow} onPress={() => onPredictionTapped(item.place_id, item.description)}>
                <MyText style={styles.result} numberOfLines={1}>
                  {item.description}
                </MyText>
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item) => item.place_id}

          /* style={[predictionsContainer, calculatedStyle]} */
        />
      )}
    </BottomSheetModal>
  )
}
const styles = StyleSheet.create({
  predictionRow: {
    paddingBottom: 16,
    marginBottom: 116,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  result: {
    fontSize: 20
  }
})

export default SearchPlacesBottomSheetModal
