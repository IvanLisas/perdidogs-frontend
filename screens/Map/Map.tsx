import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Image, Keyboard, StyleSheet, TouchableWithoutFeedback, View, Text, TouchableOpacity, TouchableOpacityBase } from 'react-native'
import { NavigationContainer, NavigationContainerProps, useNavigation } from '@react-navigation/native'
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { mapStyleDay } from '../../styles/MapDay'
import { useMap } from '../../hooks/useMap'
import { Appearance } from 'react-native-appearance'
import { mapStyleNight } from '../../styles/MapNight'
import { requestForegroundPermissionsAsync } from 'expo-location'
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

export default function Map() {
  /*   const { setPost } = useContext(PostContext) */

  const colorMode = Appearance.getColorScheme()

  const [errorMessage, setErrorMessage] = useState('')

  const [selectedPost, setSelectedPost] = useState<Post>()

  const [myLocation, setMyLocation] = useState<LatLng>()

  const { setPost, posts, setPosts, post } = useContext(PostContext)

  /* const [posts, setPosts] = useState<Post[]>([]) */

  const colors = useTheme()

  const navigation = useNavigation()

  const [goTo, setGoTo] = useState('SearchByFilters')

  const { mapRef, selectedMarker, handleNavigateToPoint, handelResetInitialPosition } = useMap()

  const sheetModalef = useRef<DefaultBottomSheetModal>(null)

  const sheetModalef2 = useRef<DefaultBottomSheetModal>(null)

  const Stack = createStackNavigator()

  useEffect(() => {
    getPosts()
  }, [])

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

  const snapPoints = useMemo(() => [45, 330, '90%'], [])

  const handleMyLocation = () => handleNavigateToPoint(1, myLocation?.latitude, myLocation?.longitude)

  const handleMarketPress = (post: Post, index: number, lat: number, long: number) => {
    navigationRef.current?.navigate('PostPreview')
    setPost(post)
    handleNavigateToPoint(index, lat, long)

    /* sheetModalef.current?.present() */
    sheetModalef.current?.snapTo(1)
  }

  const handleFilters = async () => {
    await getPosts()
  }

  const handleMapPress = () => {
    Keyboard.dismiss()
    sheetModalef.current?.snapTo(0)
  }

  useEffect(() => {
    const permission = async () => {
      await getPosts()

      sheetModalef.current?.present()

      const { status } = await requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied')
        return
      }
      /*let location = await Location.getCurrentPositionAsync({});
        setLocation(location); */
    }
    permission()
  }, [])

  const pin = require('../../assets/images/pin2.png')

  const imagePin = () => <Image source={pin} style={{ width: 20, height: 20 }} />

  const [myPin, setMyPin] = useState<any>()

  const createPost = () => {
    navigation.navigate('CreatePost')
  }

  const createMarker = (e: any) => {
    setMyPin(e.nativeEvent.coordinate)
  }

  return (
    <TouchableWithoutFeedback /* onPress={() => sheetModalef.current?.close()} */>
      <BottomSheetModalProvider>
        {sheetModalef.current?.present()}
        {/*  {sheetModalef.current?.snapTo(0)} */}
        <View style={StyleSheet.absoluteFillObject}>
          <MapView
            ref={mapRef}
            /*onRegionChange={(region) => console.log(region)} */
            onUserLocationChange={(event) => setMyLocation(event.nativeEvent.coordinate)}
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
            onPress={handleMapPress}
          >
            {/*   {console.log(post?.Id)} */}
            {myPin && <Marker onPress={createPost} coordinate={myPin}></Marker>}
            {posts.map((marketPost, index) => (
              <Marker
                /* tracksViewChanges={false} */
                zIndex={index}
                onPress={() => handleMarketPress(marketPost, index, marketPost.location.lat, marketPost.location.long)}
                stopPropagation={true}
                key={marketPost.Id + Math.floor(Math.random() * 16777215)}
                /*     pinColor={HandlePinColor(marketPost.Id)} */
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
          <TouchableOpacity style={{ position: 'absolute', top: 200 }} onPress={handleMyLocation}>
            <Text> Mi Ubicacion </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ position: 'absolute', top: 300 }} onPress={handleFilters}>
            <Text> Actualizar </Text>
          </TouchableOpacity>
          <View style={{ position: 'absolute', padding: 16, top: 20, width: '100%' }}>
            <GooglePlacesAutocomplete handleNavigateToPoint={handleNavigateToPoint} />
          </View>
          <View style={{ position: 'absolute', padding: 16, bottom: 0, width: '100%' }}>
            {/*    <Button onPress={handlePresentModalPress} title="Present Modal" color="black" /> */}
            <DefaultBottomSheetModal
              index={0}
              ref={sheetModalef}
              dismissOnPanDown={false}
              backgroundComponent={() => <View style={{ backgroundColor: 'black' }}></View>}
              style={{ backgroundColor: colors.navigation, borderRadius: 22 }}
              snapPoints={snapPoints}
            >
              {/*  <PostPreview post={selectedPost} /> */}
              <NavigationContainer ref={navigationRef} independent={true}>
                <Stack.Navigator
                  screenOptions={{
                    headerTintColor: colors.text,
                    headerStyle: {
                      backgroundColor: colors.navigation
                    },
                    headerBackTitleStyle: {
                      /*  fontFamily: 'LoveMeLikeASister' */
                    },
                    headerTitleStyle: {
                      /*  fontFamily: 'LoveMeLikeASister' */
                    },
                    headerStatusBarHeight: 0,
                    headerBackTitleVisible: false,
                    cardStyle: {
                      backgroundColor: colors.background
                    },
                    headerBackImage: () => (
                      <View style={{ paddingHorizontal: 16 }}>
                        <Icon style={{ color: colors.text, fontSize: 18 }} name="arrow-pointing-to-left-hand-drawn-outline" />
                      </View>
                    )
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
                  <Stack.Screen name="PostPreview" options={{ title: 'Publicacion', headerShown: true }} component={PostPreview} />
                  <Stack.Screen name="SearchResults" options={{ title: 'Mascotas perdidas' }} component={SearchResults} />
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
    </TouchableWithoutFeedback>
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
