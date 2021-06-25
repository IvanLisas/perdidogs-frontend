import { StatusBar } from 'expo-status-bar'
import React, { useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import UserContext from '../../contexts/UserContext'
import { Avatar } from 'react-native-elements'
import Text from '../../components/MyThemedComponents/Text'
import MyPosts from './MyPosts'

const Profile: React.FC = () => {
  const { user } = useContext(UserContext)

  if (!user) return null

  return (
    <View style={styles.root}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <View style={{ paddingRight: 8 }}>
            <Avatar
              size="medium"
              titleStyle={{ color: 'white' }}
              source={{ uri: user.avatar }}
              overlayContainerStyle={{ backgroundColor: 'grey' }}
              rounded
              title={user.firstName[0] + user.lastName[0]}
            />
          </View>

          <View style={{ paddingVertical: 2 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold' }}>{user.firstName + ' ' + user.lastName} </Text>
            <Text style={{ fontSize: 11, color: 'grey' }}>Creando el {user.creationDate} </Text>
          </View>
        </View>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Mis publicaciones </Text>
      </View>

      {/*    <MyPosts posts={myPosts}></MyPosts> */}
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16
    /* 
    alignItems: 'center',
    justifyContent: 'center' */
  }
})
