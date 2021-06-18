import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, Text, TouchableOpacity, Button } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { mapStyleDay } from '../../styles/MapDay'
import { useMap } from '../../hooks/useMap'
import { Input } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Appearance } from 'react-native-appearance'
import { mapStyleNight } from '../../styles/MapNight'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { usePermissions } from 'expo-permissions'
import { ScrollView, TextInput } from 'react-native'
import { GoogleAutoComplete } from 'react-native-google-autocomplete'
import useTheme from '../../hooks/useTheme'
import { Post } from '../../types/models/Post'
import BottomSheetModal from './BottomSheetModal'
import { BottomSheetModal as DefaultBottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'

export default function Map() {
  const colorMode = Appearance.getColorScheme()

  const [data, askPermissions, getPermissions] = usePermissions('location')
  /* 
  const marca = {latlng:{lat:}} */

  const colors = useTheme()

  const navigation = useNavigation()

  const [keyword, setKeyword] = useState('')

  const [location, setLocation] = useState<Location.LocationObject>()

  const { mapRef, selectedMarker, handleNavigateToPoint, handelResetInitialPosition } = useMap()

  const ref = useRef<DefaultBottomSheetModal>(null)

  const [marker, setMarker] = useState()

  const post1 = { Id: 13, description: 'Post numero 1', location: { Id: 1, x: -34.54289695652187, y: -58.54144144943036 } } as Post
  const post2 = { Id: 24, description: 'Post numero 2', location: { Id: 1, x: -34.54309695652187, y: -58.54244144943036 } } as Post
  const post3 = { Id: 35, description: 'Post numero 3', location: { Id: 1, x: -34.54309695652187, y: -58.53244144943036 } } as Post
  const post4 = { Id: 46, description: 'Post numero 4', location: { Id: 1, x: -34.54309695652187, y: -58.52244144943036 } } as Post
  const posts: Post[] = [post1, post2, post3, post4]

  const snapPoints = useMemo(() => ['30%', '30%'], [])

  const findCurrentLocationAsync = async () => {
    await askPermissions()
    handlePresentModalPress()
    /*   if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      })
    } */
    ref.current?.present()
    let location = await Location.getCurrentPositionAsync({})
    handleNavigateToPoint(1, location.coords.latitude, location.coords.longitude)
    setLocation(location)
  }

  const handlePresentModalPress = useCallback(() => {
    console.log('hola')
    ref.current?.present()
    /*     bottomSheetModalRef.current?.close() */
  }, [])

  /*   useEffect(() => {
    findCoordinates()
  }, [])
 */
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <BottomSheetModalProvider>
        <View style={StyleSheet.absoluteFillObject}>
          {(console.disableYellowBox = true)}
          <MapView
            ref={mapRef}
            showsMyLocationButton={false}
            /*   mapPadding={{ top: 516, bottom: 16, left: 16, right: 16 }} */
            showsUserLocation={true}
            /* showsCompass={false} */
            /*    showsPointsOfInterest={false}
          showsBuildings={false}
          showsScale={false} */
            showsPointsOfInterest={false}
            customMapStyle={colorMode === 'dark' ? mapStyleNight : mapStyleDay}
            provider={PROVIDER_GOOGLE}
            /*    loadingEnabled={true} */

            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: -34.535532,
              longitude: -58.541518,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003
            }}
            /*   mapType="standard" */
            onPress={() => {
              Keyboard.dismiss()
              ref.current?.close()
            }}
          >
            {posts.map((post, index) => (
              <Marker
                onPress={() => {
                  handleNavigateToPoint(index, post.location.x, post.location.y)
                  ref.current?.present()
                }}
                key={post.Id}
                coordinate={{ latitude: post.location.x, longitude: post.location.y }}
                title={post.description}
              />
            ))}
          </MapView>

          {/*   <View style={{ position: 'absolute', top: 100 }} /> */}
          <TouchableOpacity style={{ position: 'absolute', top: 200 }} onPress={findCurrentLocationAsync}>
            <Text> Mi Ubicacion </Text>
          </TouchableOpacity>
          <View style={{ position: 'absolute', padding: 16, top: 20, width: '100%' }}>
            <GooglePlacesAutocomplete
              placeholder="Buscar"
              /*  currentLocation={true} */
              textInputProps={{ placeholderTextColor: colors.text }}
              fetchDetails={true}
              suppressDefaultStyles={true}
              renderRightButton={cargas el boton}
              /* onNotFound={() => <Text>No se encontaron resultados</Text>} */
              /*   currentLocation={true} */
              styles={{
                textInputContainer: {
                  backgroundColor: colors.background,
                  borderRadius: 16
                },
                textInput: {
                  padding: 12,
                  placeholderTextColor: 'black',
                  fontFamily: 'LoveMeLikeASister',
                  paddingLeft: 18,
                  color: colors.text
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                },
                listView: {
                  borderRadius: 16,
                  marginTop: 8,
                  backgroundColor: colors.background,
                  /*   padding: 16, */

                  overflow: 'scroll'
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
                console.log(data, details)
                handleNavigateToPoint('g' + index, details?.geometry.location.lat, details?.geometry.location.lng)
              }}
              query={{
                key: 'AIzaSyCahzx0wpr4G7jiI_LfsAUf0JWJ3-FZVDs',
                language: 'es',
                components: 'country:arg'
              }}
            />
          </View>
          <View style={{ position: 'absolute', padding: 16, bottom: 0, width: '100%' }}>
            <View style={styles.container}>
              {/*    <Button onPress={handlePresentModalPress} title="Present Modal" color="black" /> */}
              <DefaultBottomSheetModal ref={ref} index={1} snapPoints={snapPoints}>
                <View style={styles.contentContainer}>
                  <Text>hola</Text>
                </View>
              </DefaultBottomSheetModal>
            </View>
          </View>
        </View>
      </BottomSheetModalProvider>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapStyle: {
    width: '100%',
    height: '100%',
    padding: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  input: {
    marginVertical: 2,
    borderRadius: 15,
    padding: 16,
    backgroundColor: 'white'
    /*   alignSelf: 'center', */
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center'
    /*   backgroundColor: 'grey' */
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  }
})
