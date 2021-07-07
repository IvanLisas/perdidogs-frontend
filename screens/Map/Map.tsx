import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Image, Keyboard, StyleSheet, TouchableWithoutFeedback, View, Text, TouchableOpacity, TouchableOpacityBase, Dimensions } from 'react-native'
import { NavigationContainer, NavigationContainerProps, useNavigation } from '@react-navigation/native'
import MapView, { LatLng, Marker, MarkerAnimated, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { mapStyleDay } from '../../styles/MapDay'
import { useMap } from '../../hooks/useMap'
import { Appearance } from 'react-native-appearance'
import { mapStyleNight } from '../../styles/MapNight'
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location'
import GooglePlacesAutocomplete from './GooglePlacesAutocomplete'
import useTheme from '../../hooks/useTheme'
import { BottomSheetModal as DefaultBottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Post } from '../../types/models/Post'
import postService from '../../services/PostService'
import PostPreview from './PostPreview'
import { createStackNavigator, HeaderBackButton, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack'
import SearchByFilters from './SearchByFilters'
import SearchResults from './SearchResults'
import PostContext from '../../contexts/PostContext'
import Icon from '../../components/icon/index'
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete'
import { Bounderies } from '../../types/models/Bounderies'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FiltersContext from '../../contexts/FiltersContext'
import { borderColor } from 'styled-system'
import { Chat } from '../../types/models/Chat'
import Chats from '../Chats/Chats'
import Conversation from '../Chats/Conversation'

export default function Map() {
  const colorMode = Appearance.getColorScheme()

  const theme = useTheme()

  const [errorMessage, setErrorMessage] = useState('')

  const { setPost, posts, setPosts, post } = useContext(PostContext)

  const { setSearchLocation, setMyLocation, myLocation, searchLocation, pet, searchLocationDelta, setSearchLocationDelta } =
    useContext(FiltersContext)

  const navigation = useNavigation()

  const { mapRef, selectedMarker, handleNavigateToPoint, handelResetInitialPosition, handleNavigateToRegion } = useMap()

  const sheetModalef = useRef<DefaultBottomSheetModal>(null)

  const sheetModalef2 = useRef<DefaultBottomSheetModal>(null)

  const Stack = createStackNavigator()

  const getPosts = async () => {
    try {
      setPosts(await postService.getAll())
    } catch (error) {
      console.log(error.response)
      setErrorMessage('Error al conectar con el servidor: ' + error.message)
    }
  }

  const navigationRef = useRef<any>(null)

  const [marker, setMarker] = useState()

  const snapPoints = useMemo(() => [1, 350, '90%'], [])

  const handleMyLocation = () => handleNavigateToPoint(1, myLocation?.lat, myLocation?.lng)

  const handleMarketPress = (post: Post, index: number, lat: number, long: number) => {
    navigationRef.current?.navigate('PostPreview')
    setPost(post)
    handleNavigateToPoint(index, lat, long)
    /*sheetModalef.current?.present() */
    sheetModalef.current?.snapTo(1)
  }

  const handleGetPots = async () => {
    await getPosts()
  }

  const handleFilters = async () => {
    sheetModalef.current?.snapTo(1)
    navigationRef.current?.navigate('Filters')
  }

  const handleMapPress = () => {
    Keyboard.dismiss()
    sheetModalef.current?.snapTo(0)
  }

  useEffect(() => {
    const permission = async () => {
      await getPosts()
      /*   sheetModalef.current?.present() */

      const { status } = await requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied')
        return
      }
      const location = (await getCurrentPositionAsync()).coords
      setMyLocation({ lat: location.latitude, lng: location.longitude })
    }

    permission()
  }, [])

  const pin = require('../../assets/images/dogPin2.png')

  const imagePin = () => <Image source={pin} style={{ width: 20, height: 20 }} />

  const [myPin, setMyPin] = useState<any>()

  const createPost = () => {
    navigation.navigate('CreatePost', myPin)
  }

  const createMarker = (e: any) => {
    setMyPin(e.nativeEvent.coordinate)
  }

  const handleRegionChange = async (region: Region) => {
    setSearchLocation({ lat: region.latitude, lng: region.longitude })
    setSearchLocationDelta({ lat: region.latitudeDelta, lng: region.longitudeDelta })
    setPosts(
      await postService.getPostByFilters(
        pet,
        { lat: region.latitude, lng: region.longitude },
        { lat: region.latitudeDelta, lng: region.longitudeDelta }
      )
    )
  }

  //Revisado
  const handleSearch = async (data: GooglePlaceData, detail: GooglePlaceDetail | null) => {
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
  return (
    <BottomSheetModalProvider>
      {sheetModalef.current?.present()}
      {/*      {sheetModalef.current?.snapTo(0)} */}
      <View style={StyleSheet.absoluteFillObject}>
        <MapView
          ref={mapRef}
          onRegionChangeComplete={(e) => handleRegionChange(e)}
          // onUserLocationChange={(event) => setMyLocation({ lat: event.nativeEvent.coordinate.latitude, lng: event.nativeEvent.coordinate.longitude })}
          /*     showsMyLocationButton={true} */
          showsUserLocation={true}
          onLongPress={(e) => createMarker(e)}
          /*  showsPointsOfInterest={false} */
          customMapStyle={colorMode === 'dark' ? mapStyleNight : mapStyleDay}
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: -34.535532,
            longitude: -58.541518,
            latitudeDelta: 1.003,
            longitudeDelta: 1.003
          }}
          showsMyLocationButton={false}
          onPress={handleMapPress}
        >
          {myPin && <Marker onPress={createPost} coordinate={myPin}></Marker>}
          {posts?.map((marketPost, index) => (
            <MarkerAnimated
              /* tracksViewChanges={false} */
              zIndex={index}
              onPress={() => handleMarketPress(marketPost, index, marketPost.location.lat, marketPost.location.long)}
              stopPropagation={true}
              key={marketPost.Id + Math.floor(Math.random() * 16777215)}
              pinColor={theme.primary}
              coordinate={{ latitude: marketPost.location.lat, longitude: marketPost.location.long }}
              shouldRasterizeIOS
              /*   style={{ width: 20, height: 20 }} */
              /*  icon={pin} */

              image={pin}
              /*  image={pin} */
              /*  title={post.descripti on} */
            />
          ))}
        </MapView>

        {/*   <View style={{ position: 'absolute', top: 100 }} /> */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 200,
            marginRight: 16,
            right: 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            borderRadius: 25
          }}
          onPress={handleFilters}
        >
          <View
            style={{
              backgroundColor: theme.primary,
              borderRadius: 25,
              padding: 8,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65
            }}
          >
            <Icon style={{ color: 'black', fontSize: 28 }} name="settings-hand-drawn-symbol" />
          </View>
        </TouchableOpacity>
        {/*         <TouchableOpacity style={{ position: 'absolute', top: 300 }} onPress={handleFilters}>
          <Text> Actualizar </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 300,
            marginRight: 16,
            right: 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            borderRadius: 25
          }}
          onPress={handleMyLocation}
        >
          <View
            style={{
              backgroundColor: theme.primary,
              borderRadius: 25,
              padding: 8,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65
            }}
          >
            <Icon style={{ color: 'black', fontSize: 28 }} name="target-hand-drawn-circle" />
          </View>
        </TouchableOpacity>
        <View style={{ position: 'absolute', padding: 16, top: 20, width: '100%' }}>
          <GooglePlacesAutocomplete handleSearch={handleSearch} />
        </View>
        <View style={{ position: 'absolute', padding: 16, bottom: 0, width: '100%' }}>
          {/*    <Button onPress={handlePresentModalPress} title="Present Modal" color="black" /> */}
          <DefaultBottomSheetModal
            index={0}
            ref={sheetModalef}
            dismissOnPanDown={false}
            backgroundComponent={() => <View style={{ backgroundColor: 'black' }}></View>}
            style={{ backgroundColor: theme.navigation, borderRadius: 22 }}
            snapPoints={snapPoints}
          >
            {/*  <PostPreview post={selectedPost} /> */}
            <NavigationContainer ref={navigationRef} independent={true}>
              <Stack.Navigator
                screenOptions={{
                  /*       headerTintColor: colors.text,
                   */
                  headerStyle: {
                    backgroundColor: theme.navigation,
                    height: 30
                  },
                  headerBackTitleStyle: {
                    fontFamily: 'LoveMeLikeASister'
                  },
                  headerTitleStyle: {
                    /*   fontFamily: 'LoveMeLikeASister', */
                    /* color: '#3F414E' */
                  },
                  headerStatusBarHeight: 0,
                  headerBackTitleVisible: false,
                  cardStyle: {
                    backgroundColor: theme.background
                  },
                  headerBackImage: () => <Icon style={{ color: theme.text, fontSize: 22 }} name="left-arrow-hand-drawn-outline" />
                  /*    header: (props) => (
                      <View style={{ padding: 16 }}>
                      
                        <TouchableOpacity onPress={() => navigationRef.current?.goBack()}>
                          <Icon
                            onPress={() => navigationRef.current?.goBack()}
                            style={{ color: colors.text, fontSize: 18 }}
                            name="arrow-pointing-to-left-hand-drawn-outline"
                          />
                        </TouchableOpacity>
                      </View>
                    ) */
                }}
                initialRouteName="SearchResults"
              >
                <Stack.Screen name="SearchByFilters" options={{ title: 'Mascotas perdidas', headerShown: true }} component={SearchByFilters} />
                <Stack.Screen name="PostPreview" options={{ title: post?.pet.breed.description, headerShown: true }} component={PostPreview} />
                <Stack.Screen name="SearchResults" options={{ title: 'Mascotas perdidas' }} component={SearchResults} />
                <Stack.Screen name="Filters" options={{ title: 'Aplicar filtros' }} component={SearchByFilters} />
                <Stack.Screen name="Chat" options={{ title: 'Chat' }} component={Conversation} />
              </Stack.Navigator>
            </NavigationContainer>
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
