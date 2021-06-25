import { StatusBar } from 'expo-status-bar'
import React, { useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, Alert, ImageBackground, Image, Dimensions } from 'react-native'
import UserContext from '../../contexts/UserContext'
import { Avatar } from 'react-native-elements'
import Text from '../../components/MyThemedComponents/Text'
import MyPosts from './MyPosts'
import { Post } from '../../types/models/Post'
import useTheme from '../../hooks/useTheme'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from '../../components/icon/index'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { FlatList } from 'react-native-gesture-handler'

const Profile: React.FC = () => {
  const { user } = useContext(UserContext)

  if (!user) return null

  const theme = useTheme()

  const Card = (post: Post) => (
    <TouchableOpacity style={{ paddingVertical: 8 }} key={post.Id + 'e'}>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          borderRadius: 25,

          elevation: 7
        }}
      >
        <Image
          key={post.Id + 'photo'}
          style={{
            width: Dimensions.get('window').width - 32,
            height: 200,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25
            /*     position:'absolute', */
          }}
          onError={() => console.log('error al cargar')}
          source={{
            uri: post.pictures[0]
              ? post.pictures[0].url
              : 'https://as01.epimg.net/mexico/imagenes/2019/01/19/tikitakas/1547933521_851367_1547933683_noticia_normal_recorte1.jpg'
          }}
        />
        <LinearGradient
          key={post.Id + 'gradient'}
          colors={['rgba(0,0,0,0.5)', 'transparent']}
          style={{
            position: 'absolute',
            height: 200,
            marginTop: 50,
            width: Dimensions.get('window').width - 32,
            borderRadius: 25
          }}
          start={{ x: 0, y: 1.0 }}
          end={{ x: 0, y: 0 }}
        />
        <View
          style={{
            height: 60,
            borderColor: theme.primary,
            /*    borderEndWidth: 0.2,
            borderBottomWidth: 0.2,
            borderStartWidth: 0.2, */
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: theme.navigation,
            justifyContent: 'center'
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              {/*        <Icon style={{ color: theme.primary, fontSize: 22 }} name="pin-hand-drawn-irregular-outline" />
               */}
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 22,
                  /*  padding: 16 */
                  paddingLeft: 8
                }}
              >
                {post.pet.breed.description}
              </Text>
            </View>
            <Icon style={{ paddingRight: 8, color: theme.primary, fontSize: 22 }} name="arrow-point-hand-drawn-outline-pointing-to-right-direction" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

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
      <FlatList
        data={user?.post}
        showsHorizontalScrollIndicator
        /* persistentScrollbar */
        disableVirtualization={false}
        keyExtractor={(item, index) => item.description}
        renderItem={({ item }) => Card(item)}
        style={{ flex: 1 }}
      />
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
