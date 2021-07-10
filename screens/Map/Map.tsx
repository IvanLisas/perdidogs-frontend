import React, { useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Image, Keyboard, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MapView, { Marker, MarkerAnimated, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { mapStyleDay } from '../../styles/MapDay'
import { useMap } from '../../hooks/useMap'
import { Appearance } from 'react-native-appearance'
import { mapStyleNight } from '../../styles/MapNight'
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location'
import GooglePlacesAutocomplete from './GooglePlacesAutocomplete'
import useTheme from '../../hooks/useTheme'
import { BottomSheetFlatList, BottomSheetModal as DefaultBottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Post } from '../../types/models/Post'
import postService from '../../services/PostService'
import PostPreview from './PostPreview'
import PostContext from '../../contexts/PostContext'
import Icon from '../../components/icon/index'
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete'
import FiltersContext from '../../contexts/FiltersContext'
import { PermissionStatus } from 'unimodules-permissions-interface'
import { Extrapolate, interpolateNode, useSharedValue } from 'react-native-reanimated'
import PetCard from '../../components/PetCard'

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
  const { setSearchLocation, setMyLocation, myLocation, setSearchLocationDelta } = useContext(FiltersContext)
  //Navigation
  const navigation = useNavigation()
  //Hook's
  const { mapRef, handleNavigateToPoint, handleNavigateToRegion } = useMap()
  //Modals Ref's
  const resultsModalRef = useRef<DefaultBottomSheetModal>(null)
  const postPreviewModalRef = useRef<DefaultBottomSheetModal>(null)
  const searchModalRef = useRef<DefaultBottomSheetModal>(null)
  //Modal handle
  const snapPoints = useMemo(() => [50, 350, '90%'], [])
  //Pin
  const [myMarket, setMyMarket] = useState<any>()
  const marketImage = require('../../assets/images/dogPin2.png')
  /*const imagePin = () => <Image source={pin} style={{ width: 20, height: 20 }} /> */

  //Post
  const getPosts = async () => {
    try {
      setPosts(await postService.getAll())
    } catch (error) {
      console.log(error.response)
      setErrorMessage('Error al conectar con el servidor: ' + error.message)
    }
  }

  const goToPost = useCallback((post: Post) => {
    setPost(post)
    postPreviewModalRef.current?.snapTo(1)
    postPreviewModalRef.current?.present()
  }, [])

  const createPost = () => navigation.navigate('CreatePost', myMarket)

  const createMarker = (event: any) => setMyMarket(event.nativeEvent.coordinate)

  //Handle's
  const handleMarketPress = (post: Post, index: number, lat: number, long: number) => {
    handleNavigateToPoint(index, lat, long)
    goToPost(post)
  }

  //TODO preguntar si estan presentes?
  //Hacer lista de modales?
  const handleMapPress = () => dismissAll()

  const dismissAll = () => {
    Keyboard.dismiss()
    searchModalRef.current?.snapTo(0)
    resultsModalRef.current?.snapTo(0)
    postPreviewModalRef.current?.snapTo(0)
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
      handleNavigateToPoint(1, myLocation?.lat, myLocation?.lng)
    } else console.log('No tiene permisos de localizacion')
  }

  /*   const handleFilters = async () => {
    resultsModalRef.current?.snapTo(1)
  } */

  //Revisado
  const handleSearch = async (data: GooglePlaceData, detail: GooglePlaceDetail | null) => {
    //TODO los dos presentes y hacer snap?
    resultsModalRef.current?.present()
    if (detail) {
      const { width, height } = Dimensions.get('window')
      const ASPECT_RATIO = width / height //No se usa
      //Calculo la zona
      const lat = detail.geometry.location.lat
      const lng = detail.geometry.location.lng
      const latDelta = detail.geometry.viewport.northeast.lat - detail.geometry.viewport.southwest.lat
      const lngDelta = latDelta
      handleNavigateToRegion({ latitude: lat, longitude: lng, latitudeDelta: latDelta, longitudeDelta: lngDelta })
      try {
        setPosts(await postService.geyByLocation(detail.geometry))
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  //Permissions
  const askForLocationPermissions = async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync()
      setForegroundPermissionsStatus(status)
      if (status !== 'granted') {
        console.log('El permiso para obtener la localizacion fue denegado')
        return
      }
      try {
        const location = (await getCurrentPositionAsync()).coords
        setMyLocation({ lat: location.latitude, lng: location.longitude })
      } catch (error) {
        console.log('Error al obtener la localizacion:' + error.message)
      }
    } catch (error) {
      console.log('Error al obtener los permisos de localizacion:' + error.message)
    }
  }

  //UseEffect

  //TODO ver diferencia entre este useEffect y el normal
  useLayoutEffect(() => {
    searchModalRef.current?.present()
    const init = async () => {
      await getPosts()
      await askForLocationPermissions()
    }
    init()
  }, [])

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
          onRegionChangeComplete={(event) => handleRegionChange(event)}
          showsUserLocation={true}
          onLongPress={(event) => createMarker(event)}
          customMapStyle={colorMode === 'dark' ? mapStyleNight : mapStyleDay}
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          showsMyLocationButton={false}
          onTouchStart={() => dismissAll()}
          onPress={handleMapPress}
          initialRegion={{
            latitude: -34.535532,
            longitude: -58.541518,
            latitudeDelta: 1.003,
            longitudeDelta: 1.003
          }}
        >
          {myMarket && <Marker onPress={createPost} coordinate={myMarket}></Marker>}
          {posts?.map((marketPost, index) => (
            <MarkerAnimated
              zIndex={index}
              onPress={() => handleMarketPress(marketPost, index, marketPost.location.lat, marketPost.location.long)}
              stopPropagation={true}
              key={marketPost.Id + Math.floor(Math.random() * 16777215)}
              pinColor={theme.primary}
              coordinate={{ latitude: marketPost.location.lat, longitude: marketPost.location.long }}
              shouldRasterizeIOS
              /*   style={{ width: 20, height: 20 }} */
              /*  icon={pin} */

              image={marketImage}
              /*  image={pin} */
              /*  title={post.descripti on} */
            />
          ))}
        </MapView>
        {/*      <TouchableOpacity onPress={() => sheetModalef.current?.present()} style={{ position: 'absolute', padding: 16, top: 20, width: '100%' }}>
          <GooglePlacesAutocomplete handleSearch={handleSearch} />
        </TouchableOpacity> */}
        {/*      <TouchableOpacity style={[styles.button, { top: 200 }]} onPress={handleFilters}>
          <Icon style={styles.icon} name="settings-hand-drawn-symbol" />
        </TouchableOpacity> */}

        <TouchableOpacity style={[styles.button, { top: 300 }]} onPress={handleGoToMyLocation}>
          <Icon style={styles.icon} name="target-hand-drawn-circle" />
        </TouchableOpacity>

        <View style={{ position: 'absolute', padding: 16, bottom: 0, width: '100%' }}>
          {/*    <Button onPress={handlePresentModalPress} title="Present Modal" color="black" /> */}
          <DefaultBottomSheetModal
            snapPoints={snapPoints}
            key="PoiDetailsSheet3"
            index={1}
            keyboardBlurBehavior="restore"
            ref={searchModalRef}
            /*         animatedPosition={currentPosition} */
            dismissOnPanDown={false}
            stackBehavior="replace"
            keyboardBehavior="fullScreen"
            backgroundComponent={() => <View style={{ backgroundColor: 'black' }}></View>}
            style={{ backgroundColor: theme.navigation, borderRadius: 5 }}
          >
            <GooglePlacesAutocomplete handleSearch={handleSearch} />
          </DefaultBottomSheetModal>

          <DefaultBottomSheetModal
            snapPoints={snapPoints}
            index={1}
            key="PoiDetailsSheet"
            ref={resultsModalRef}
            /*   dismissOnPanDown={false} */
            /*  stackBehavior="replace" */
            keyboardBehavior="interactive"
            backgroundComponent={() => <View style={{ backgroundColor: 'black' }}></View>}
            style={{ backgroundColor: theme.navigation, borderRadius: 5 }}
          >
            <TouchableOpacity onPress={() => resultsModalRef.current?.dismiss()}>
              <Icon style={{ color: theme.primary, fontSize: 28 }} name="cancel-circular-button-with-a-cross-inside-hand-drawn-outlines" />
            </TouchableOpacity>
            <BottomSheetFlatList
              data={posts}
              showsHorizontalScrollIndicator
              disableVirtualization={false}
              keyExtractor={(item) => item.description}
              renderItem={({ item }) => <PetCard post={item} handleOnPress={goToPost} />}
              style={{ flex: 1 }}
            />
          </DefaultBottomSheetModal>

          <DefaultBottomSheetModal
            snapPoints={snapPoints}
            key="PoiDetailsSheet2"
            index={1}
            ref={postPreviewModalRef}
            /*           animatedPosition={currentPosition} */
            /*   dismissOnPanDown={false} */
            stackBehavior="replace"
            keyboardBehavior="fullScreen"
            backgroundComponent={() => <View style={{ backgroundColor: 'black' }}></View>}
            style={{ backgroundColor: theme.navigation, borderRadius: 5 }}
          >
            {/*     <GooglePlacesAutocomplete handleSearch={handleSearch} />
             */}

            <PostPreview modalRef={postPreviewModalRef} />
          </DefaultBottomSheetModal>

          {/*     <DefaultBottomSheetModal
              ref={sheetModalef2}

              backgroundComponent={() => <View style={{ backgroundColor: 'black' }}></View>}
              style={{ backgroundColor: colors.navigation, borderRadius: 22 }}
              snapPoints={snapPoints}
            >
              <Navigator2 />
            </DefaultBottomSheetModal> */}
        </View>
      </View>
    </BottomSheetModalProvider>
  )
}

/* const Navigator = () => { */
/*   const screenOptions = useMemo<StackNavigationOptions>(
    () => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: true,
      safeAreaInsets: { top: 0 },
      headerLeft: ({ onPress, ...props }) => (
        <TouchableOpacity onPress={onPress}>
          <HeaderBackButton {...props} />
        </TouchableOpacity>
      ),
      cardStyle: {
        backgroundColor: 'white',
        overflow: 'visible'
      }
    }),
    []
  ) */

/*   const screenAOptions = useMemo(() => ({ headerLeft: () => null }), [])
  return (
    <Stack.Navigator initialRouteName="SearchResults">
      <Stack.Screen name="SearchByFilters" component={SearchByFilters} />
      <Stack.Screen name="PostPreview" component={PostPreview} />
      <Stack.Screen name="SearchResults" component={SearchResults} />
    </Stack.Navigator>
  )
} */

/* const Navigator2 = () => {
  const screenOptions = useMemo<StackNavigationOptions>(
    () => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: true,
      safeAreaInsets: { top: 0 },
      headerLeft: ({ onPress, ...props }) => (
        <TouchableOpacity onPress={onPress}>
          <HeaderBackButton {...props} />
        </TouchableOpacity>
      ),
      cardStyle: {
        backgroundColor: 'white',
        overflow: 'visible'
      }
    }),
    []
  )

  const screenAOptions = useMemo(() => ({ headerLeft: () => null }), [])
  return (
    <NavigationContainer independent={true}>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="SearchByFilters" component={SearchByFilters} />
          <Stack.Screen name="SearchResults" component={SearchResults} />
          <Stack.Screen name="PostPreview" component={PostPreview} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationContainer>
  )
} */

const styles = StyleSheet.create({
  icon: {
    color: 'black',
    fontSize: 28
  },
  button: {
    position: 'absolute',
    /*     top: 300, */
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
    justifyContent: 'center'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  }
})

/*   const post1 = { Id: 13, description: 'Post numero 1', location: { Id: 1, x: -34.54289695652187, y: -58.54144144943036 } } as Post
  const post2 = { Id: 24, description: 'Post numero 2', location: { Id: 1, x: -34.54309695652187, y: -58.54244144943036 } } as Post
  const post3 = { Id: 35, description: 'Post numero 3', location: { Id: 1, x: -34.54309695652187, y: -58.53244144943036 } } as Post
  const post4 = { Id: 46, description: 'Post numero 4', location: { Id: 1, x: -34.54309695652187, y: -58.52244144943036 } } as Post
  const posts: Post[] = [post1, post2, post3, post4] */
