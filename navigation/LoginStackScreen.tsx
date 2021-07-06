import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login/Login'
import EditProfile from '../screens/Login/Registration'
import LoginStackParamList from '../types/LoginStackParamList'
import useTheme from '../hooks/useTheme'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View, Image, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native'
import Registration from '../screens/Login/Registration'
import Icon from '../components/icon/index'

const HomeStack = createStackNavigator<LoginStackParamList>()

function ProfileStackScreen() {
  const colors = useTheme()
  return (
    /*   <LinearGradient colors={['#FFE5B2', '#EFB865']} style={styles.background}> */
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: '#3F414E',

        headerStyle: {
          backgroundColor: '#F0C591'
        },
        headerTitleStyle: {
          /*    fontFamily: 'LoveMeLikeASister' */
        },
        headerBackTitleStyle: {
          /*   fontFamily: 'LoveMeLikeASister' */
        },
        cardStyle: {
          backgroundColor: '#F9D394',
          padding: 0
        },
        headerBackImage: () => (
          <View style={{ paddingHorizontal: 16 }}>
            <Icon style={{ color: '#3F414E', fontSize: 22 }} name="left-arrow-hand-drawn-outline" />
          </View>
        ),

        headerBackTitleVisible: false
      }}
    >
      <HomeStack.Screen name="Main" options={{ headerShown: false }} component={Login} />
      <HomeStack.Screen name="Registration" options={{ title: 'Registro' }} component={Registration} />
      {/*  <HomeStack.Screen name="Details" component={TabOneScreen} /> */}
    </HomeStack.Navigator>
    /*   </LinearGradient> */
  )
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    width: '100%'
  }
})

export default ProfileStackScreen
