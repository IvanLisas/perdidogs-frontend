import React, { ComponentProps } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BottomTabParamList from '../types/BottomTabParamList'
import ProfileStackScreen from './ProfileStackScreen'
import useTheme from '../hooks/useTheme'
import { HeaderBackground } from '@react-navigation/stack'
import Icon from '../components/icon/index'

const Tab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const colors = useTheme()

  function TabBarIcon(props: { name: ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: 'grey',
        activeTintColor: '#F7A59E',
        showLabel: false,
        style: {
          backgroundColor: colors.navigation
        }
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Camara"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon style={{ color: color, fontSize: 30 }} name="arrow-pointing-to-left-hand-drawn-outline" />
        }}
      />
      <Tab.Screen
        name="Home"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-map" color={color} />
        }}
      />

      <Tab.Screen
        name="Alertas"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'ios-notifications' : 'ios-notifications-outline'} color={color} />
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-person" color={color} />
        }}
      />
      {/*       <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />
        }}
      /> */}
    </Tab.Navigator>
  )
}
/* // You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>()

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator
      screenOptions={{
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <TabOneStack.Screen name="TabOneScreen" component={TabOneScreen} />
    </TabOneStack.Navigator>
  )
}

const TabTwoStack = createStackNavigator<TabTwoParamList>()

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen name="TabTwoScreen" component={TabTwoScreen} options={{ headerTitle: 'Tab Two Title' }} />
    </TabTwoStack.Navigator>
  )
}


const styles = StyleSheet.create({
  label: {
    color: 'black'
  }
})
 */
