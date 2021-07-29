import React, { useContext } from 'react'
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
import { justifyContent } from 'styled-system'

const Alerts: React.FC = () => {
  const { setPost } = useContext(PostContext)

  const { user } = useContext(UserContext)

  const { notifications, setNotifications } = useContext(NotificationsContext)

  const theme = useTheme()

  const navigation = useNavigation()

  const goToMyAlerts = () => navigation.navigate('myAlerts')

  //TODO trys
  const handleRejectNotification = async (notification: NotificationDTO) => {
    await alertService.reject(notification.postId, notification.alertId)
    if (user) setNotifications([...(await alertService.getAllActiveAlerts(user?.Id))])
  }

  const handlePressAlert = async (notification: NotificationDTO) => {
    setPost(await postService.get(notification.postId))
    await alertService.read(notification.postId)
    navigation.navigate('Mapa', {
      screen: 'Main'
    })
  }

  const hasNotifications = notifications.length !== 0

  if (!user) return null

  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={goToMyAlerts}
        style={{ paddingVertical: 16, borderBottomWidth: 0.5, borderColor: 'grey', flexDirection: 'row', alignItems: 'center' }}
      >
        <Ionicons style={{ marginRight: 8 }} size={22} color="#8E8E93" name="notifications" />
        <MyText numberOfLines={1} style={{ flex: 1, fontSize: 18 }}>
          Administrar alertas personalizadas
        </MyText>
      </TouchableOpacity>

      {!hasNotifications && (
        <View>
          <View style={{ marginTop: 64, alignItems: 'center' }}>
            <Ionicons style={{ marginBottom: 16 }} size={44} color={theme.primary} name="paw" />
            <MyText style={{ fontSize: 17, textAlign: 'center' }}>Crea una alerta asi te avisaremos cuando haya alguna concidencia</MyText>
          </View>
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.map((notification, index) => (
          <TouchableOpacity onPress={() => handlePressAlert(notification)} key={notification.alertId + notification.url} style={styles.notification}>
            <Image source={{ uri: notification.url }} style={styles.image} />
            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 8 }}>
              <MyText style={{ fontSize: 16, fontWeight: 'bold' }}>Alerta sobre mascota</MyText>
              <MyText style={{ fontSize: 16 }}>{user.firstName} esta mascota que podría ser la tuya</MyText>
            </View>
            <View style={{ justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={async () => handleRejectNotification(notification)}>
                <Ionicons size={24} color="#8E8E93" name="close" />
              </TouchableOpacity>

              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: notification.hasBeenRead ? 'transparent' : '#0A84FF',
                  width: 8,
                  height: 8,
                  borderRadius: 50
                }}
              />
            </View>
          </TouchableOpacity>
        ))}
        {/*         <MyButton onPress={goToNewAlert} title="Crear Alerta"></MyButton>
        <MyButton onPress={goToMyAlerts} title="Mis Alertas"></MyButton> */}
      </ScrollView>
    </View>
  )
}

export default Alerts

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
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
    borderBottomWidth: 0.5,

    borderColor: 'grey',
    flex: 1,
    alignSelf: 'flex-start',
    /*  alignItems: 'center', */
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
