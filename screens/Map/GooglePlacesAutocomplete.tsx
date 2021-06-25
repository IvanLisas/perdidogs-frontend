import React, { useContext, useRef } from 'react'
import { ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from '../../components/icon/index'
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete as DefaultGooglePlacesAutocomplete,
  GooglePlacesAutocompleteProps
} from 'react-native-google-places-autocomplete'
import MapContext from '../../contexts/MapContext'
import useTheme from '../../hooks/useTheme'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface GooglePlacesAutocompletesProps {
  handleSearch: (details: GooglePlaceDetail | null) => Promise<void>
}

interface ClearButtonProps {
  onPress: () => void
}

const ClearButton: React.FC<ClearButtonProps> = (prop) => (
  <TouchableOpacity style={{ alignSelf: 'center', paddingRight: 16 }} onPress={prop.onPress}>
    <Icon style={{ color: 'grey', fontSize: 22 }} name="cancel-circular-button-with-a-cross-inside-hand-drawn-outlines" />
  </TouchableOpacity>
)

const LeftButton: React.FC = () => (
  <Icon style={{ paddingLeft: 8, alignSelf: 'center', color: 'grey', fontSize: 18 }} name="compass-hand-drawn-circular-tool-outline" />
)

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompletesProps> = (props) => {
  const colors = useTheme()

  const ref = React.createRef<any>()

  const { handleSearch } = props

  const crearText = () => ref.current?.setAddressText('')

  return (
    <DefaultGooglePlacesAutocomplete
      ref={ref}
      placeholder="Buscar una zona aqui"
      textInputProps={{ placeholderTextColor: 'grey', fontSize: 16 }}
      fetchDetails={true}
      suppressDefaultStyles={true}
      enablePoweredByContainer={false}
      renderRightButton={() => <ClearButton onPress={crearText} />}
      renderLeftButton={() => <LeftButton />}
      /* onNotFound={() => <Text>No se encontaron resultados</Text>} */
      /*   currentLocation={true} */
      styles={{
        textInputContainer: {
          backgroundColor: colors.navigation,
          borderRadius: 8,
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: 'grey',
          fontSize: 16
        },
        container: {
          flex: 1
        },
        textInput: {
          padding: 8,
          /*   fontFamily: 'LoveMeLikeASister', */
          paddingLeft: 8,
          color: colors.text,
          justifyContent: 'space-between',
          flex: 1
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        },

        listView: {
          borderRadius: 12,
          marginTop: 8,
          backgroundColor: colors.navigation,
          borderWidth: 1,
          borderColor: 'grey'
          /*   padding: 16, */

          /*   overflow: 'hidden' */
        },
        row: {
          overflow: 'hidden'
        },
        loader: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          height: 20
        },
        description: {
          fontSize: 12,
          padding: 16,
          color: colors.text
        },
        separator: {
          height: 0,
          backgroundColor: 'grey'
        },

        poweredContainer: {
          alignItems: 'flex-end',
          padding: 16,
          width: '100%'
        }
      }}
      /*   styles={{ position: 'absolute', top: 300 }} */
      onPress={(data, details, index = null) => {
        /*  console.log(details) */

        handleSearch(details)
      }}
      query={{
        key: 'AIzaSyCahzx0wpr4G7jiI_LfsAUf0JWJ3-FZVDs',
        language: 'es',
        components: 'country:arg'
      }}
    />
  )
}

export default GooglePlacesAutocomplete
