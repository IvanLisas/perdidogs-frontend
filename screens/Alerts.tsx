import React, { useContext, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import UserContext from '../contexts/UserContext'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import MyText from '../components/MyThemedComponents/MyText'
import useTheme from '../hooks/useTheme'
import ChatContext from '../contexts/ChatsContext'
import MyButton from '../components/MyThemedComponents/MyButton'
import alertService from '../services/AlertService'
import NotificationsContext from '../contexts/NotificationsContext'
import { Ionicons } from '@expo/vector-icons'

const Alerts: React.FC = () => {
  const { user } = useContext(UserContext)

  const { notifications } = useContext(NotificationsContext)

  const theme = useTheme()

  const navigation = useNavigation()

  const goToNewAlert = () => {
    navigation.navigate('newAlert')
  }

  useEffect(() => {
    console.log('hola alertas')
  }, [])

  /*   useFocusEffect(
    React.useCallback(() => {
    const getAlerts = async () => {
      console.log('hola alertas')
    }
    getAlerts()
  })
 */
  useFocusEffect(
    React.useCallback(() => {
      const asd = async () => {
        try {
          /*     console.log(await alertService.getAll(user?.Id)) */
        } catch (error) {
          console.log(error.message)
        }
      }
      asd()
    }, [])
  )

  const labrador = require('../assets/images/golden.png')

  if (!user) return null

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.map((notification, index) => (
          <View
            key={notification.url}
            style={{
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderColor: '#DEDEDE',
              flex: 1,
              alignSelf: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              width: '100%',
              flexWrap: 'nowrap'
            }}
          >
            <Image
              /*   source={{ uri: 'https://leaderreaderjournal.com/wp-content/uploads/2021/01/dog.jpg' }} */
              source={{ uri: notification.url }}
              style={{ width: 60, height: 60, borderRadius: 50 }}
            />
            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 8 }}>
              <MyText style={{ fontSize: 16, fontWeight: 'bold' }}>Alerta sobre mascota</MyText>

              <MyText style={{ fontSize: 16 }}>{user.firstName} esta mascota que podría ser la tuya</MyText>
            </View>
            <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
              <Ionicons size={24} color="#8E8E93" name="close" />
            </TouchableOpacity>
          </View>
        ))}
        <MyButton onPress={goToNewAlert} title="Crear Alerta"></MyButton>
      </ScrollView>
    </View>
  )
}

export default Alerts

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16
    /* 
    alignItems: 'center',
    justifyContent: 'center' */
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
  }
})
