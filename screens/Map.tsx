import React, { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Image, Keyboard, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
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
import PostPreview from '../components/BottomSheetModals/PostPreviewBottomSheetModal'
import PostContext from '../contexts/PostContext'
import Icon from '../components/icons/index'
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete'
import FiltersContext from '../contexts/FiltersContext'
import { PermissionStatus } from 'unimodules-permissions-interface'
import { Extrapolate, interpolateNode, useSharedValue } from 'react-native-reanimated'
import PetCard from '../components/PetCard'
import GooglePlacesSearch from '../components/BottomSheetModals/SearchPlacesBottomSheetModal'
import SearchPlacesBottomSheetModal from '../components/BottomSheetModals/SearchPlacesBottomSheetModal'
import FiltersBottomSheetModal from '../components/BottomSheetModals/FiltersBottomSheetModal'
import { Filter } from '../types/models/Filter'
import { Pet } from '../types/models/Pet'
import MapContext from '../contexts/MapContext'
import UserContext from '../contexts/UserContext'
import ResultsBottomSheetModal from '../components/BottomSheetModals/ResultsBottomSheetModal'
import PostPreviewBottomSheetModal from '../components/BottomSheetModals/PostPreviewBottomSheetModal'

const initialRegion = {
  latitude: -34.65023240988638,
  longitude: -58.495524767786264,
  latitudeDelta: 0.36431004148501245,
  longitudeDelta: 0.24489808827637916
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
  const { user } = useContext(UserContext)
  const { setPost, posts, setPosts, post } = useContext(PostContext)
  const { setMapRef, handleNavigateToPoint } = useContext(MapContext)
  const { setSearchLocation, setSearchLocationDelta } = useContext(FiltersContext)
  //Navigation
  const navigation = useNavigation()
  const [currentSearchPlaceName, setCurrentSearchPlaceName] = useState({ primaryText: '', secondaryText: '' })
  //Hook's
  const { mapRef, handleNavigateToRegion } = useMap()
  //Location
  const [myLocation, setMyLocation] = useState({ lat: 0, long: 0 })

  //Modals Ref's
  const resultsModalRef = useRef<BottomSheetModal>(null)
  const postPreviewModalRef = useRef<BottomSheetModal>(null)
  const searchModalRef = useRef<BottomSheetModal>(null)
  const filtersModalRef = useRef<BottomSheetModal>(null)
  /*   const [filterModa, setFilterModa] = useState(false) */
  //Modal handle
  const snapPoints = useMemo(() => [94, 370, '90%'], [])
  //Pin
  const [myMarket, setMyMarket] = useState<any>()
  const searchResultPin = require('../assets/images/Group.png')
  const myPostPin = require('../assets/images/Group-1.png')
  const newPostPin = require('../assets/images/Group-2.png')
  const [customPostId, setCustomPostId] = useState(0)
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
  let creating = false
  //Post
  const getPosts = async () => {
    try {
      setPosts(await postService.getAll())
    } catch (error) {
      console.log(error.response)
      setErrorMessage('Error al conectar con el servidor: ' + error.message)
    }
  }

  const createPost = () => {
    creating = true
    setMyMarket(undefined)
    navigation.navigate('CreatePost', myMarket)
  }

  const createMarker = (event: any) => setMyMarket(event.nativeEvent.coordinate)

  //Handle's

  const handleGoToPost = (post: Post) => {
    handleNavigateToPoint(post.location.lat, post.location.long)
    /* setPost(post) */

    postPreviewModalRef.current?.present()
    postPreviewModalRef.current?.snapToIndex(1)
  }

  const handleFiltersModal = () => {
    /*     setFilterModa(true) */
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
        setMyLocation({ lat: location.latitude, long: location.longitude })
        handleNavigateToPoint(location.latitude, location.longitude)
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
  }

  const handleApplyFilters = (pet: Pet | undefined) => {
    setFilter((prev) => ({ ...prev, pet: pet }))
  }

  /*const handleFilters = async () => {
    resultsModalRef.current?.snapTo(1)
  } */

  //Permissions
  const askForLocationPermissions = async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync()
      setForegroundPermissionsStatus(status)
      if (status === 'denied') {
        console.log('El permiso para obtener la localizacion fue denegado')
        return
      }
      //TODO guardala, lenta en IOS

      const location = (await getCurrentPositionAsync()).coords
      console.log(location)
      setFilter((prev) => ({ ...prev, myLocation: { lat: location.latitude, lng: location.longitude } }))

      handleNavigateToPoint(location.latitude, location.longitude)
      console.log('paso')
    } catch (error) {
      console.log('Error al obtener los permisos de localizacion:' + error.message)
    }
  }

  //UseEffect
  useLayoutEffect(() => {
    console.log('hola')
    setMapRef(mapRef)

    searchModalRef.current?.present()
    const init = async () => {
      await getPosts()
      await askForLocationPermissions()
      setIsMount(true)
    }
    init()
    return () => {
      console.log('demontado modal')
      postPreviewModalRef.current?.dismiss()
    }
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

  const route = useRoute()
  const param = route.params

  useFocusEffect(() => {
    if ((param as any)?.postId) setCustomPostId((param as any)?.postId as number)
  })

  /*   useEffect(() => {

  }, [customPostId]) */

  useEffect(() => {
    if (post && post.Id !== 0) handleGoToPost(post)
  }, [post])

  useEffect(() => {
    if (user) {
      const init = async () => {
        try {
          setPosts(await postService.getPostByFilters(filter))
        } catch (error) {
          console.log(error.message)
        }
        const currentPost = user?.post?.find((x) => x.Id == post?.Id)
        console.log(currentPost)
        if (currentPost) setPost(user?.post?.find((x) => x.Id == post?.Id))
        else {
          postPreviewModalRef.current?.dismiss()
          setPost({ Id: 0, pictures: [], location: { lat: 0, long: 0 } })
        }
      }
      init()
    } else {
      console.log('entra')
      postPreviewModalRef.current?.close()
    }
  }, [user])

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
          onMarkerPress={() => {
            if (post && post.Id !== 0 && !creating) {
              postPreviewModalRef.current?.present()
              postPreviewModalRef.current?.snapToIndex(1)
            }
            creating = false
          }}
          onRegionChangeComplete={(event) => console.log(event)}
          showsUserLocation={true}
          onLongPress={(event) => createMarker(event)}
          customMapStyle={colorMode === 'dark' ? mapStyleNight : mapStyleDay}
          provider={PROVIDER_GOOGLE}
          /*      onRegionChange={(event) => console.log(event)} */
          style={StyleSheet.absoluteFillObject}
          showsMyLocationButton={false}
          onTouchStart={() => dismissAll()}
          /*onPress={handleMapPress} */
          initialRegion={initialRegion}
        >
          {myMarket && <Marker image={newPostPin} onPress={createPost} coordinate={myMarket}></Marker>}
          {post && post.Id !== 0 && (
            <MarkerAnimated
              onPress={() => setPost(post)}
              stopPropagation={true}
              key={post.Id + Math.floor(Math.random() * 16777215)}
              coordinate={{ latitude: post.location.lat, longitude: post.location.long }}
              shouldRasterizeIOS
              style={{ width: 50, height: 50 }}
              image={searchResultPin}
            />
          )}
          {posts?.map((post, index) => (
            <MarkerAnimated
              onPress={() => {
                setPost(post)
              }}
              stopPropagation={true}
              key={post.Id + Math.floor(Math.random() * 16777215)}
              pinColor={theme.primary}
              coordinate={{ latitude: post.location.lat, longitude: post.location.long }}
              shouldRasterizeIOS
              image={searchResultPin}
            />
          ))}

          {user?.post?.map((post, index) => (
            <MarkerAnimated
              zIndex={100 + index}
              onPress={() => {
                setPost(post)
              }}
              stopPropagation={true}
              key={post.Id + Math.floor(Math.random() * 16777215)}
              pinColor={theme.primary}
              coordinate={{ latitude: post.location.lat, longitude: post.location.long }}
              shouldRasterizeIOS
              image={myPostPin}
            />
          ))}
        </MapView>

        <TouchableOpacity style={[styles.button, { top: 300 }]} onPress={handleGoToMyLocation}>
          <Icon style={styles.icon} name="target-hand-drawn-circle" />
        </TouchableOpacity>

        <View style={{ position: 'absolute', padding: 16, bottom: 0, width: '100%' }}>
          <SearchPlacesBottomSheetModal handleGoToPlace={handleGoToPlace} snapPoints={snapPoints} modalRef={searchModalRef} />

          <ResultsBottomSheetModal
            petFilter={filter.pet}
            handleGoToPost={handleGoToPost}
            handleFiltersModal={handleFiltersModal}
            snapPoints={snapPoints}
            modalRef={resultsModalRef}
            posts={posts}
            currentSearchPlaceName={currentSearchPlaceName}
          />

          <FiltersBottomSheetModal pet={filter.pet} handleApplyFilters={handleApplyFilters} modalRef={filtersModalRef} snapPoints={snapPoints} />

          <PostPreviewBottomSheetModal modalRef={postPreviewModalRef} snapPoints={useMemo(() => [94, 370], [])} />
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
