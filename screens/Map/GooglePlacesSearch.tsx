import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, StatusBar, View } from 'react-native'
import SearchBarWithAutocomplete from '../../components/SearchBarWithAutocomplete'
import googleService from '../../services/GoogleService'
import { Prediction } from '../../types/models/Prediction'
import { useDebounce } from '../../hooks/useDebounce'
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete'

interface PostPreviewProps {
  modalRef: React.RefObject<BottomSheetModalMethods>
  handleGoToPlace: (detail: GooglePlaceDetail | null) => Promise<void>
}

const GooglePlacesAutocomplete: React.FC<PostPreviewProps> = ({ modalRef, handleGoToPlace }) => {
  const [search, setSearch] = useState({ term: '', fetchPredictions: true })
  const { container, body } = styles
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [showPredictions, setShowPredictions] = useState(false)
  const handleModal = () => modalRef.current?.snapTo(2)

  const onChangeText = async () => {
    if (search.term.trim() === '') {
      setShowPredictions(false)
      return
    }
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
    <SafeAreaView style={container}>
      <View style={body}>
        <SearchBarWithAutocomplete
          value={search.term}
          onChangeText={(text) => {
            setSearch({ term: text, fetchPredictions: true })
            onChangeText()
          }}
          showPredictions={showPredictions}
          predictions={predictions}
          onTouchStart={handleModal}
          onPredictionTapped={onPredictionTapped}
        />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    paddingHorizontal: 20
  }
})

export default GooglePlacesAutocomplete
