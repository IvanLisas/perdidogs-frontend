import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import React, { useState } from 'react'
import { StyleSheet, View, Keyboard, Image, SafeAreaView } from 'react-native'
import googleService from '../../services/GoogleService'
import { Prediction } from '../../types/models/Prediction'
import { useDebounce } from '../../hooks/useDebounce'
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import MyInput from '../MyThemedComponents/MyInput'
import MyText from '../MyThemedComponents/MyText'
import useTheme from '../../hooks/useTheme'
import { Input } from 'react-native-elements'
import MyIcon from '../MyThemedComponents/MyIcon'
import PlaceBar from '../PlaceBar'
import { Ionicons } from '@expo/vector-icons'
import { MyTheme } from '../../styles/Theme'

interface SearchPlacesBottomSheetModalProps {
  modalRef: React.RefObject<BottomSheetModalMethods>
  handleGoToPlace: (detail: GooglePlaceDetail, primaryPlaceText: string, secondaryPlaceText: string) => Promise<void>
  snapPoints: (string | number)[]
}

const SearchPlacesBottomSheetModal: React.FC<SearchPlacesBottomSheetModalProps> = ({ modalRef, handleGoToPlace, snapPoints }) => {
  const [search, setSearch] = useState({ term: '', fetchPredictions: true })
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [showPredictions, setShowPredictions] = useState(false)
  const theme = useTheme()

  const stylesWithTheme = styles(theme)

  const labrador = require('../../assets/images/labrador-abajo.png')

  const handleModal = () => {
    modalRef.current?.expand()
  }

  const onChangeText = async () => {
    /*     if (search.term.trim() === '') {
      setShowPredictions(false)
      return
    } */
    if (!search.fetchPredictions) return
    try {
      setShowPredictions(true)
      setPredictions((await googleService.getPredictions(search.term)).predictions)
    } catch (error) {
      console.log(error)
    }
  }
  useDebounce(onChangeText, 1000, [search.term])

  const onPredictionTapped = async (placeId: string, primaryPlaceText: string, secondaryPlaceText: string) => {
    try {
      const details = (await googleService.get(placeId)).result as GooglePlaceDetail
      Keyboard.dismiss()
      handleGoToPlace(details, primaryPlaceText, secondaryPlaceText)
      /*  setSearch((prevState) => ({ ...prevState, term: description })) */
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      key="searchModal"
      enablePanDownToClose={false}
      enableDismissOnClose={false}
      index={0}
      ref={modalRef}
      onAnimate={() => Keyboard.dismiss()}
      android_keyboardInputMode="adjustPan"
      stackBehavior="replace"
      backgroundComponent={() => <View style={{ backgroundColor: 'black' }}></View>}
      style={{ backgroundColor: theme.navigation, borderRadius: 5 }}
    >
      {/*    <View style={{ paddingTop: 8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'grey', width: 48, height: 4, borderRadius: 50, marginBottom: 8 }}></View>
       */}
      <Input
        placeholder="¿Dónde perdiste tu mascota?"
        style={stylesWithTheme.input}
        value={search.term}
        inputStyle={{ color: theme.text }}
        inputContainerStyle={{ borderBottomWidth: 0, alignSelf: 'center' }}
        onTouchStart={() => handleModal()}
        onChange={(text) => {
          setSearch({ term: text.nativeEvent.text, fetchPredictions: true })
          /*   onChangeText() */
        }}
        /* returnKeyType="search" */
      />
      {search.term.length !== 0 ? (
        <BottomSheetFlatList
          data={predictions}
          scrollEnabled
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          renderItem={({ item }) => {
            return (
              <PlaceBar
                style={{ marginLeft: 16, paddingVertical: 16, borderBottomWidth: 0.5, borderColor: 'grey' }}
                onPress={() => onPredictionTapped(item.place_id, item.structured_formatting.main_text, item.structured_formatting.secondary_text)}
                primaryText={item.structured_formatting.main_text}
                secondaryText={item.structured_formatting.secondary_text}
              ></PlaceBar>
            )
          }}
          keyExtractor={(item: Prediction) => item.place_id}
        />
      ) : (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image source={labrador} style={stylesWithTheme.labrador} />
          <View style={{ marginTop: 64, alignItems: 'center', paddingHorizontal: 8 }}>
            <Ionicons style={{ marginBottom: 8 }} size={44} color="#f0b966" name="search" />
            <MyText style={{ fontSize: 17, textAlign: 'center' }}>Empieza buscando una zona</MyText>
          </View>
        </View>
      )}
    </BottomSheetModal>
  )
}
const styles = (theme: MyTheme) =>
  StyleSheet.create({
    predictionRow: {
      paddingVertical: 16,
      marginLeft: 16,
      borderBottomWidth: 1,
      borderColor: '#DEDEDE',
      flexDirection: 'row',
      alignItems: 'center'
    },
    result: {
      fontSize: 20
    },
    input: {
      borderRadius: 15,
      padding: 16,
      backgroundColor: theme.input,
      width: 234
    },
    labrador: {
      width: 200,
      height: 200,
      marginLeft: 24,
      marginTop: 50,
      position: 'absolute',
      bottom: -65,
      /*     left: 50, */
      /* transform: [{ rotate: '-180deg' }], */
      alignSelf: 'center'
    }
  })

export default SearchPlacesBottomSheetModal
