import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BottomTabParamList from '../types/StackParamLists/BottomTabParamList'
import useTheme from '../hooks/useTheme'
import Icon from '../components/icons/index'
import ChatsStackScreen from './StackScreens/ChatsStackScreen'
import MapStackScreen from './StackScreens/MapStackScreen'
import ProfileStackScreen from './StackScreens/ProfileStackScreen'
import AlertsStackScreen from './StackScreens/AlertsStackScreen'

const Tab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const theme = useTheme()
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled={true}>
      <Tab.Navigator
        tabBarOptions={{
          inactiveTintColor: 'grey',
          /*  keyboardHidesTabBar: true, */
          activeTintColor: theme.primary,
          showLabel: false,
          tabStyle: { backgroundColor: theme.navigation, borderTopWidth: 0.6 },
          style: {
            backgroundColor: theme.navigation,
            borderRadius: 16
          }
        }}
        initialRouteName="Mapa"
      >
        <Tab.Screen
          name="Chats"
          component={ChatsStackScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon style={[{ color: color }, styles.icon]} name="chat-bubbles-couple-hand-drawn-outlines" />
          }}
        />
        <Tab.Screen
          name="Mapa"
          component={MapStackScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon style={[{ color: color }, styles.icon]} name="compass-hand-drawn-circular-tool-outline" />
          }}
        />
        <Tab.Screen
          name="Alertas"
          component={AlertsStackScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon style={[{ color: color }, styles.icon]} name="bell-hand-drawn-interface-symbol" />
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileStackScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon style={[{ color: color }, styles.icon]} name="user-list-hand-drawn-interface-symbol-outline" />
          }}
        />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  icon: { fontSize: 30 }
})
