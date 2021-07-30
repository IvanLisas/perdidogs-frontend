import React, { useContext } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BottomTabParamList from '../types/StackParamLists/BottomTabParamList'
import useTheme from '../hooks/useTheme'
import Icon from '../components/icons/index'
import ChatsStackScreen from './StackScreens/ChatsStackScreen'
import MapStackScreen from './StackScreens/MapStackScreen'
import ProfileStackScreen from './StackScreens/ProfileStackScreen'
import AlertsStackScreen from './StackScreens/AlertsStackScreen'
import { Ionicons } from '@expo/vector-icons'
import NotificationsContext from '../contexts/NotificationsContext'
import ChatContext from '../contexts/ChatsContext'

const Tab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const theme = useTheme()
  const { newNotification } = useContext(NotificationsContext)
  const { newChats } = useContext(ChatContext)

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
            tabBarBadge: newChats,
            tabBarIcon: ({ color }) => <Ionicons style={[{ color: color }, styles.icon]} color={theme.primary} name="chatbox" />
          }}
        />
        <Tab.Screen
          name="Mapa"
          component={MapStackScreen}
          options={{
            tabBarIcon: ({ color }) => <Ionicons style={[{ color: color }, styles.icon, { fontSize: 35 }]} color={theme.primary} name="compass" />
          }}
        />
        <Tab.Screen
          name="Alertas"
          component={AlertsStackScreen}
          options={{
            tabBarBadge: newNotification,
            tabBarIcon: ({ color }) => <Ionicons style={[{ color: color }, styles.icon]} color={theme.primary} name="notifications" />
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileStackScreen}
          options={{
            tabBarIcon: ({ color }) => <Ionicons style={[{ color: color }, styles.icon]} color={theme.primary} name="person" />
          }}
        />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  icon: { fontSize: 30 }
})
