import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../screens/Profile/Profile'
import EditProfile from '../screens/Profile/EditProfile'
import { ProfileStackParamList } from '../types/ProfileStackParamList'
import useTheme from '../hooks/useTheme'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { View, Image, StyleSheet } from 'react-native'
import Icon from '../components/icon/index'
import Map from '../screens/Map/Map'
const MapStack = createStackNavigator()

function MapStackScreen() {
  const colors = useTheme()

  return (
    <MapStack.Navigator
      screenOptions={{
        headerTintColor: colors.text,
        cardStyle: {
          backgroundColor: colors.background
        },
        headerStyle: {
          backgroundColor: colors.navigation
        },
        headerTitleStyle: {
          fontFamily: 'LoveMeLikeASister'
        },
        headerBackTitleStyle: {
          fontFamily: 'LoveMeLikeASister'
        },
        headerBackImage: () => (
          <View style={{ paddingHorizontal: 16 }}>
            <Icon style={{ color: colors.text, fontSize: 18 }} name="arrow-pointing-to-left-hand-drawn-outline" />
          </View>
        ),

        headerBackTitleVisible: false
      }}
    >
      <MapStack.Screen name="Main" options={{ headerShown: false }} component={Map} />
      {/*  <MapStack.Screen name="Edit" component={EditProfile} /> */}
      {/*  <HomeStack.Screen name="Details" component={TabOneScreen} /> */}
    </MapStack.Navigator>
  )
}

export default MapStackScreen
