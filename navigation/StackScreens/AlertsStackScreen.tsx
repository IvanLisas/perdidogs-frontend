import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import useTheme from '../../hooks/useTheme'
import { View } from 'react-native'
import Icon from '../../components/icons/index'
import ListOfChats from '../../screens/ListOfChats'
import ChatConversation from '../../screens/ChatConversation'
import Alerts from '../../screens/Alerts'
import NewAlert from '../../screens/NewAlert'
import MyAlerts from '../../screens/MyAlerts'
import MyAlert from '../../screens/MyAlert'
const AlertsStack = createStackNavigator()

function AlertsStackScreen() {
  const colors = useTheme()

  return (
    <AlertsStack.Navigator
      screenOptions={{
        headerTintColor: colors.text,

        cardStyle: {
          backgroundColor: colors.background
        },
        headerStyle: {
          backgroundColor: '#CEDAFF'
        },
        headerTitleStyle: {
          /*      fontFamily: 'LoveMeLikeASister' */
          /*    fontSize: 22 */

          fontFamily: 'sans-serif'
        },

        headerBackTitleStyle: {
          fontFamily: 'LoveMeLikeASister',
          color: '#6879B1'
        },
        headerBackImage: () => (
          <View style={{ paddingHorizontal: 8 }}>
            <Icon style={{ color: 'black', fontSize: 18 }} name="arrow-pointing-to-left-hand-drawn-outline" />
          </View>
        ),

        headerBackTitleVisible: false
      }}
    >
      <AlertsStack.Screen name="Main" options={{ title: 'Notificaciones' }} component={Alerts} />
      <AlertsStack.Screen name="newAlert" options={{ title: 'Nueva Alerta' }} component={NewAlert} />
      <AlertsStack.Screen name="myAlerts" options={{ title: 'Mis Alertas' }} component={MyAlerts} />
      <AlertsStack.Screen name="editAlert" options={{ title: 'Modificar Alerta' }} component={MyAlert} />
    </AlertsStack.Navigator>
  )
}

export default AlertsStackScreen
