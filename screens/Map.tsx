import React, { useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Image, Keyboard, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MapView, { Marker, MarkerAnimated, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { mapStyleDay } from '../styles/MapDay'
import { useMap } from '../hooks/useMap'
import { Appearance } from 'react-native-appearance'
import { mapStyleNight } from '../styles/MapNight'
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location'
import useTheme from '../hooks/useTheme'
import { BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Post } from '../types/models/Post'
import postService from '../services/PostService'
import PostPreview from '../components/PostPreview'
import PostContext from '../contexts/PostContext'
import Icon from '../components/icons/index'
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete'
import FiltersContext from '../contexts/FiltersContext'
import { PermissionStatus } from 'unimodules-permissions-interface'
import { Extrapolate, interpolateNode, useSharedValue } from 'react-native-reanimated'
import PetCard from '../components/PetCard'
import GooglePlacesSearch from '../components/BottomSheetModals/SearchPlacesBottomSheetModal'
import SearchPlacesBottomSheetModal from '../components/BottomSheetModals/SearchPlacesBottomSheetModal'
import PostResultsBottomSheetModal from '../components/BottomSheetModals/PostResultsBottomSheetModal'
import FiltersBottomSheetModal from '../components/BottomSheetModals/FiltersBottomSheetModal'
import { Filter } from '../types/models/Filter'

const initialRegion = {
  latitude: -38.535532,
  longitude: -58.541518,
  latitudeDelta: 1.003,
  longitudeDelta: 1.003
}

export default function Map() {
  //Theme
  const colorMode = Appearance.getColorScheme()
  const theme = useTheme()
  //Permissions
  const [foregroundPermissionsStatus, setForegroundPermissionsStatus] = useState<PermissionStatus>(PermissionStatus.UNDETERMINED)
  //Errors
  const [errorMessage, setErrorMessage] = useState('')
  //Contexts
  const { setPost, posts, setPosts, post } = useContext(PostContext)
  const { setSearchLocation, setSearchLocationDelta } = useContext(FiltersContext)
  //Navigation
  const navigation = useNavigation()
  const [currentSearchPlaceName, setCurrentSearchPlaceName] = useState({ primaryText: '', secondaryText: '' })
  //Hook's
  const { mapRef, handleNavigateToPoint, handleNavigateToRegion } = useMap()
  //Modals Ref's
  const resultsModalRef = useRef<BottomSheetModal>(null)
  const postPreviewModalRef = useRef<BottomSheetModal>(null)
  const searchModalRef = useRef<BottomSheetModal>(null)
  const filtersModalRef = useRef<BottomSheetModal>(null)
  //Modal handle
  const snapPoints = useMemo(() => [94, '45%', '90%'], [])
  //Pin
  const [myMarket, setMyMarket] = useState<any>()
  const marketImage = require('../assets/images/dogPin2.png')
  //Filters
  const [filter, setFilter] = useState<Filter>({
    searchLocation: { lat: initialRegion.latitude, lng: initialRegion.longitude },
    deltaLocation: { lat: initialRegion.latitudeDelta, lng: initialRegion.longitudeDelta }
  })
  //Dimensions
  const { width, height } = Dimensions.get('window')
  const ASPECT_RATIO = width / height //No se usa
  //Others
  const [isMount, setIsMount] = useState(false)

  //Post
  const getPosts = async () => {
    try {
      setPosts(await postService.getAll())
    } catch (error) {
      console.log(error.response)
      setErrorMessage('Error al conectar con el servidor: ' + error.message)
    }
  }

  const createPost = () => navigation.navigate('CreatePost', myMarket)

  const createMarker = (event: any) => setMyMarket(event.nativeEvent.coordinate)

  //Handle's

  const handleGoToPost = (post: Post) => {
    handleNavigateToPoint(1, post.location.lat, post.location.long)
    setPost(post)
    postPreviewModalRef.current?.snapToIndex(1)
    postPreviewModalRef.current?.present()
  }

  const handleFiltersModal = () => {
    filtersModalRef.current?.present()
  }

  //TODO preguntar si estan presentes?
  //Hacer lista de modales?
  const handleMapPress = () => dismissAll()

  const dismissAll = () => {
    Keyboard.dismiss()
    searchModalRef.current?.collapse()
    resultsModalRef.current?.collapse()
    postPreviewModalRef.current?.collapse()
  }

  const handleRegionChange = async (region: Region) => {
    setSearchLocation({ lat: region.latitude, lng: region.longitude })
    setSearchLocationDelta({ lat: region.latitudeDelta, lng: region.longitudeDelta })
    /*    setPosts(
      await postService.getPostByFilters(
        pet,
        { lat: region.latitude, lng: region.longitude },
        { lat: region.latitudeDelta, lng: region.longitudeDelta }
      )
    ) */
  }

  const handleGoToMyLocation = async () => {
    if (foregroundPermissionsStatus == PermissionStatus.GRANTED) {
      try {
        const location = (await getCurrentPositionAsync()).coords
        handleNavigateToPoint(10, location.latitude, location.longitude)
      } catch (error) {
        console.log('Error al obtener la localizacion:' + error.message)
      }
    } else console.log('No tiene permisos de localizacion')
  }

  const handleSearch = async () => {
    try {
      setPosts(await postService.getPostByFilters(filter))
    } catch (error) {
      console.log(error)
    }
  }

  // TODO: No agarra los paises
  const handleGoToPlace = async (detail: GooglePlaceDetail, primaryPlaceText: string, secondaryPlaceText: string) => {
    setCurrentSearchPlaceName({ primaryText: primaryPlaceText, secondaryText: secondaryPlaceText })
    //Calculo la zona
    const lat = detail.geometry.location.lat
    const lng = detail.geometry.location.lng
    const latDelta = detail.geometry.viewport.northeast.lat - detail.geometry.viewport.southwest.lat
    const lngDelta = latDelta
    handleNavigateToRegion({ latitude: lat, longitude: lng, latitudeDelta: latDelta, longitudeDelta: lngDelta })
    setFilter((preState) => ({ ...preState, searchLocation: { lat: lat, lng: lng }, deltaLocation: { lat: latDelta, lng: lngDelta } }))

    await handleSearch()
  }

  /*const handleFilters = async () => {
    resultsModalRef.current?.snapTo(1)
  } */

  //Permissions
  const askForLocationPermissions = async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync()
      setForegroundPermissionsStatus(status)
      if (status !== 'granted') {
        console.log('El permiso para obtener la localizacion fue denegado')
        return
      }
      //TODO guardala, lenta en IOS
      const location = (await getCurrentPositionAsync()).coords
      handleNavigateToPoint(10, location.latitude, location.longitude)
    } catch (error) {
      console.log('Error al obtener los permisos de localizacion:' + error.message)
    }
  }

  //UseEffect
  useLayoutEffect(() => {
    searchModalRef.current?.present()
    const init = async () => {
      await getPosts()
      await askForLocationPermissions()
      setIsMount(true)
    }
    init()
  }, [])

  useLayoutEffect(() => {
    if (isMount) {
      resultsModalRef.current?.present()
      const search = async () => {
        await handleSearch()
      }
      search()
    }
  }, [filter])

  /* 
  const currentPosition = useSharedValue(0)

  const elementTranslateY = useMemo(
    () =>
      interpolateNode(currentPosition.value, {
        inputRange: [100, 300],
        outputRange: [0, 200],
        extrapolate: Extrapolate.CLAMP
      }),
    [snapPoints]
  ) */

  return (
    <BottomSheetModalProvider>
      <View style={StyleSheet.absoluteFillObject}>
        <MapView
          ref={mapRef}
          /*onRegionChangeComplete={(event) => handleRegionChange(event)} */
          showsUserLocation={true}
          onLongPress={(event) => createMarker(event)}
          customMapStyle={colorMode === 'dark' ? mapStyleNight : mapStyleDay}
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          showsMyLocationButton={false}
          onTouchStart={() => dismissAll()}
          /*onPress={handleMapPress} */
          initialRegion={{
            latitude: -38.535532,
            longitude: -58.541518,
            latitudeDelta: 1.003,
            longitudeDelta: 1.003
          }}
        >
          {myMarket && <Marker onPress={createPost} coordinate={myMarket}></Marker>}
          {posts?.map((post, index) => (
            <MarkerAnimated
              zIndex={index}
              onPress={() => handleGoToPost(post)}
              stopPropagation={true}
              key={post.Id + Math.floor(Math.random() * 16777215)}
              pinColor={theme.primary}
              coordinate={{ latitude: post.location.lat, longitude: post.location.long }}
              shouldRasterizeIOS
              image={marketImage}
            />
          ))}
        </MapView>

        <TouchableOpacity style={[styles.button, { top: 300 }]} onPress={handleGoToMyLocation}>
          <Icon style={styles.icon} name="target-hand-drawn-circle" />
        </TouchableOpacity>

        <View style={{ position: 'absolute', padding: 16, bottom: 0, width: '100%' }}>
          <SearchPlacesBottomSheetModal handleGoToPlace={handleGoToPlace} snapPoints={snapPoints} modalRef={searchModalRef} />

          <PostResultsBottomSheetModal
            handleGoToPost={handleGoToPost}
            handleFiltersModal={handleFiltersModal}
            snapPoints={snapPoints}
            modalRef={resultsModalRef}
            posts={posts}
            currentSearchPlaceName={currentSearchPlaceName}
          />

          <FiltersBottomSheetModal modalRef={filtersModalRef} snapPoints={snapPoints} />

          <BottomSheetModal
            snapPoints={snapPoints}
            key="PoiDetailsSheet2"
            index={1}
            ref={postPreviewModalRef}
            stackBehavior="replace"
            backgroundComponent={() => <View style={{ backgroundColor: theme.background }}></View>}
            style={{ backgroundColor: theme.navigation, borderRadius: 5 }}
          >
            <PostPreview modalRef={postPreviewModalRef} />
          </BottomSheetModal>
        </View>
      </View>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  icon: {
    color: 'black',
    fontSize: 28
  },
  button: {
    position: 'absolute',
    marginRight: 16,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    borderRadius: 25,
    backgroundColor: 'yellow',
    padding: 8
  },
  mapStyle: {
    width: '100%',
    height: '100%',
    padding: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  }
})
