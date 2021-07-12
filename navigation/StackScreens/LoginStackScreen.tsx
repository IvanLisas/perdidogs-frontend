import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from '../../components/icons/index'
import { StyleSheet, View } from 'react-native'
import LoginStackParamList from '../../types/StackParamLists/LoginStackParamList'
import useTheme from '../../hooks/useTheme'
import Login from '../../screens/Login'
import Registration from '../../screens/Registration'

const HomeStack = createStackNavigator<LoginStackParamList>()

function ProfileStackScreen() {
  const theme = useTheme()
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: '#3F414E',
        headerStyle: {
          backgroundColor: '#F0C591'
        },
        headerTitleStyle: {
          /*fontFamily: 'LoveMeLikeASister' */
        },
        headerBackTitleStyle: {
          /*fontFamily: 'LoveMeLikeASister' */
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
