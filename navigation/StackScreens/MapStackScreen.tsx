import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import useTheme from '../../hooks/useTheme'
import { View } from 'react-native'
import Icon from '../../components/icons/index'
import Map from '../../screens/Map'
import CreatePost from '../../screens/CreatePost'

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
      <MapStack.Screen name="CreatePost" options={{ title: 'Nueva publicacion' }} component={CreatePost} />
    </MapStack.Navigator>
  )
}

export default MapStackScreen
