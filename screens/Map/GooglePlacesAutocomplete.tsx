import React, { useContext } from 'react'
import { ScrollView, TextInput, StyleSheet } from 'react-native'

import { GooglePlacesAutocomplete as DefaultGooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapContext from '../../contexts/MapContext'
import useTheme from '../../hooks/useTheme'

interface GooglePlacesAutocompleteProps {
  handleNavigateToPoint: (id: any, lat: any, long: any) => void
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = () => {
  const colors = useTheme()

  const { mapRef, handleNavigateToPoint } = useContext(MapContext)

  return (
    <DefaultGooglePlacesAutocomplete
      placeholder="Buscar una zona aqui"
      /*  currentLocation={true} */
      textInputProps={{ placeholderTextColor: colors.text }}
      fetchDetails={true}
      suppressDefaultStyles={true}
      enablePoweredByContainer={false}
      /* onNotFound={() => <Text>No se encontaron resultados</Text>} */
      /*   currentLocation={true} */
      styles={{
        textInputContainer: {
          backgroundColor: colors.navigation,
          borderRadius: 16
        },
        textInput: {
          padding: 12,
          /*   fontFamily: 'LoveMeLikeASister', */
          paddingLeft: 18,
          color: colors.text
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        },
        listView: {
          borderRadius: 16,
          marginTop: 8,
          backgroundColor: colors.navigation
          /*   padding: 16, */

          /*   overflow: 'hidden' */
        },
        row: {
          overflow: 'hidden'
        },

        description: {
          fontSize: 12,
          padding: 16,
          color: colors.text
        },
        separator: {
          height: 0.5,
          backgroundColor: '#c8c7cc'
        },
        poweredContainer: {
          alignItems: 'flex-end',
          padding: 16,
          width: '100%'
        }
      }}
      /*   styles={{ position: 'absolute', top: 300 }} */
      onPress={(data, details, index = null) => {
        /*    console.log(data, details) */
        handleNavigateToPoint(details?.geometry.location.lat, details?.geometry.location.lng)
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
