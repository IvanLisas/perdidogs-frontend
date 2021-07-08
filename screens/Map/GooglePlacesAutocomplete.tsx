import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from '../../components/icon/index'
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete as DefaultGooglePlacesAutocomplete
} from 'react-native-google-places-autocomplete'
import useTheme from '../../hooks/useTheme'

interface GooglePlacesAutocompletesProps {
  handleSearch: (data: GooglePlaceData, detail: GooglePlaceDetail | null) => Promise<void>
}

interface ClearButtonProps {
  onPress: () => void
}

const ClearButton: React.FC<ClearButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={{ alignSelf: 'center', paddingRight: 16 }} onPress={onPress}>
    <Icon style={{ color: 'grey', fontSize: 22 }} name="cancel-circular-button-with-a-cross-inside-hand-drawn-outlines" />
  </TouchableOpacity>
)

const LeftButton: React.FC = () => (
  <Icon style={{ paddingLeft: 8, alignSelf: 'center', color: 'grey', fontSize: 18 }} name="compass-hand-drawn-circular-tool-outline" />
)

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompletesProps> = ({ handleSearch }) => {
  const theme = useTheme()

  const ref = React.createRef<any>()

  const crearText = () => ref.current?.setAddressText('')

  return (
    <DefaultGooglePlacesAutocomplete
      ref={ref}
      placeholder="¿Donde perdiste tu mascota?"
      textInputProps={{ placeholderTextColor: 'grey', fontSize: 16 }}
      fetchDetails={true}
      suppressDefaultStyles={true}
      enablePoweredByContainer={false}
      renderRightButton={() => <ClearButton onPress={crearText} />}
      renderLeftButton={() => <LeftButton />}
      onPress={(data, details) => handleSearch(data, details)}
      styles={{
        textInputContainer: {
          backgroundColor: theme.navigation,
          borderRadius: 8,
          flexDirection: 'row',
          borderWidth: 1.5,
          borderColor: 'grey',
          fontSize: 16
        },
        container: {
          flex: 1
        },
        textInput: {
          padding: 8,
          paddingLeft: 8,
          color: theme.text,
          justifyContent: 'space-between',
          flex: 1
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        },

        listView: {
          borderRadius: 12,
          marginTop: 8,
          backgroundColor: theme.navigation,
          /*    borderWidth: 1, */
          borderColor: 'grey'
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
          color: theme.text
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
      query={{
        key: 'AIzaSyCahzx0wpr4G7jiI_LfsAUf0JWJ3-FZVDs',
        language: 'es',
        components: 'country:arg'
      }}
    />
  )
}

export default GooglePlacesAutocomplete
