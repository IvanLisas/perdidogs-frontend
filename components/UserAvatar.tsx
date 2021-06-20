import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import UserContext from '../contexts/UserContext'
import { User } from '../types/models/User'
import Text from './MyThemedComponents/Text'

interface UserAvatarProps {
  user: User | undefined
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  /*   const { user } = useContext(UserContext) */

  if (!user) return null
  else
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ paddingRight: 8 }}>
          <Avatar
            /*  size="medium" */
            titleStyle={{ color: 'white' }}
            size={40}
            source={{ uri: user.avatar }}
            overlayContainerStyle={{ backgroundColor: 'grey' }}
            rounded
            title={user.firstName[0] + user.lastName[0]}
          />
        </View>
        <View style={{ paddingVertical: 2 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user.firstName + ' ' + user.lastName} </Text>
          <Text style={{ fontSize: 12 }}>Activo hace 2 horas </Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'white',
    marginBottom: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#E0E0E0',
    borderBottomColor: '#E0E0E0'
  },
  title: {
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default UserAvatar