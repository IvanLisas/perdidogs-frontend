import React, { useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import UserContext from '../contexts/UserContext'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import MyText from '../components/MyThemedComponents/MyText'
import useTheme from '../hooks/useTheme'
import MyButton from '../components/MyThemedComponents/MyButton'
import alertService from '../services/AlertService'
import NotificationsContext from '../contexts/NotificationsContext'
import { Ionicons } from '@expo/vector-icons'
import PostContext from '../contexts/PostContext'
import postService from '../services/PostService'
import { NotificationDTO } from '../types/models/NotificationDTO'
import { Alert } from '../types/models/Alert'
import AlertsContext from '../contexts/AlertsContext'

const MyAlerts: React.FC = () => {
  const { user } = useContext(UserContext)

  const { alerts, setAlerts } = useContext(AlertsContext)

  const theme = useTheme()

  const navigation = useNavigation()
  /* 
  const goToNewAlert = () => navigation.navigate('newAlert')

  const goToMyAlerts = () => navigation.navigate('myAlerts') */

  //TODO trys
  const handleEditAlert = async (alert: Alert) => {
    navigation.navigate('editAlert', { alert: alert })
    /*     await alertService.reject(notification.postId, notification.alertId)
    if (user) setNotifications([...(await alertService.getAllActiveAlerts(user?.Id))]) */
  }

  const goToNewAlert = () => navigation.navigate('newAlert')

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        console.log('mis alertas')
        if (user) setAlerts([...(await alertService.getAll(user.Id))])
      } catch (error) {
        console.log(error)
      }
    }
    fetchAlerts()
  }, [])

  if (!user) return null

  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={goToNewAlert}
        style={{
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderColor: '#DEDEDE',
          flexDirection: 'row',
          paddingVertical: 20,
          alignItems: 'center'
        }}
      >
        <MyText style={{ fontSize: 18 }}>Crear nueva alerta</MyText>
        <Ionicons style={{ marginRight: 8 }} size={22} color="#8E8E93" name="add" />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        {alerts.map((alert, index) => (
          <TouchableOpacity onPress={() => handleEditAlert(alert)} key={alert.Id + 'Alert'} style={styles.notification}>
            <Ionicons style={{ marginRight: 4 }} size={28} color="#8E8E93" name="notifications" />
            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 8 }}>
              <MyText style={{ fontSize: 16, fontWeight: 'bold' }}>Titulo?</MyText>
              <MyText style={{ fontSize: 16 }}>Creada el {alert.creationDate}</MyText>
            </View>
            {/*             <TouchableOpacity onPress={async () => handleRejectNotification(notification)} style={{ alignSelf: 'flex-start' }}>
              <Ionicons size={24} color="#8E8E93" name="close" />
            </TouchableOpacity> */}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default MyAlerts

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    paddingVertical: 16
  },
  iconButton: {
    marginLeft: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 50,
    width: 28,
    height: 28,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notification: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'nowrap'
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50
  }
})
