import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import UserContext from '../contexts/UserContext'
import { User } from '../types/models/User'
import Text from './MyThemedComponents/MyText'
import { format } from 'date-fns'
import moment from 'moment'
import useTheme from '../hooks/useTheme'

interface UserAvatarMiniProps {
  user: User | undefined
}

const UserAvatarMini: React.FC<UserAvatarMiniProps> = ({ user }) => {
  /*   const { user } = useContext(UserContext) */

  const theme = useTheme()

  if (!user) return null
  else
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ paddingRight: 8 }}>
          <Avatar
            /*  size="medium" */
            titleStyle={{ color: 'white' }}
            size={30}
            source={{ uri: user.avatar }}
            overlayContainerStyle={{ backgroundColor: 'grey' }}
            rounded
            title={user.firstName[0] + user.lastName[0]}
          />
        </View>
        <View style={{ paddingVertical: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{user.firstName + ' ' + user.lastName} </Text>
          <Text style={{ color: theme.textLabel, fontSize: 13 }}>Conectado</Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  row: {
    /*     backgroundColor: 'white',
    marginBottom: 16, */
    /*     paddingVertical: 16, */
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

export default UserAvatarMini
