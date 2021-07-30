import React, { useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from '../components/icons/index'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import UserContext from '../contexts/UserContext'
import useTheme from '../hooks/useTheme'
import { Post } from '../types/models/Post'
import MyText from '../components/MyThemedComponents/MyText'
import { Avatar } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { MyTheme } from '../styles/Theme'
import PostContext from '../contexts/PostContext'

const Profile: React.FC = () => {
  const { user, setUser } = useContext(UserContext)

  const { setPost } = useContext(PostContext)

  if (!user) return null

  const theme = useTheme()

  const stylesWithTheme = styles(theme)

  const navigation = useNavigation()

  const goToEditProfile = () => navigation.navigate('EditProfile')

  const goToPost = (post: Post) => {
    setPost({ ...post })
    navigation.navigate('Mapa', {
      screen: 'Post'
    })
  }

  const goToEdit = (post: Post) => {
    setPost({ ...post })
    navigation.navigate('Mapa', {
      screen: 'EditPost'
    })
  }

  const Card = (post: Post) => (
    <View>
      <View>
        <View>
          <MyText style={stylesWithTheme.description2}>{post?.description}</MyText>
          {post.pictures.length > 0 ? (
            <ScrollView showsHorizontalScrollIndicator={false} style={stylesWithTheme.carousel} horizontal>
              {post?.pictures.map((picture, index) => (
                <View key={picture.url + 'container'}>
                  <ImageBackground
                    key={picture.url + 'photo'}
                    imageStyle={{ borderRadius: 12, width: '100%' }}
                    style={{
                      width: post?.pictures.length > 1 ? Dimensions.get('window').width - 180 : Dimensions.get('window').width - 32,
                      height: 180,
                      borderRadius: 20,
                      marginRight: 8
                    }}
                    onError={() => console.log('error al cargar')}
                    source={{ uri: picture.url }}
                  />
                  <LinearGradient
                    colors={['rgba(0,0,0,0.5)', 'transparent']}
                    style={{
                      position: 'absolute',
                      height: 150,
                      width: post?.pictures.length > 1 ? Dimensions.get('window').width - 180 : Dimensions.get('window').width - 32,
                      borderRadius: 12
                    }}
                  />
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={{ paddingVertical: 8 }}>
              <ImageBackground
                key={'photo'}
                imageStyle={{ borderRadius: 12, width: '100%' }}
                style={{
                  width: Dimensions.get('window').width - 90,
                  height: 150,
                  borderRadius: 20,
                  marginRight: 8
                }}
                source={{ uri: 'https://somoswe1.com/Files/white-image.png' }}
              />
              <LinearGradient
                colors={['rgba(0,0,0,0.5)', 'transparent']}
                style={{
                  position: 'absolute',
                  height: 160,
                  width: Dimensions.get('window').width - 90,
                  borderRadius: 12
                }}
                start={{ x: 0, y: 1.0 }}
                end={{ x: 0, y: 0 }}
              />
            </View>
          )}
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <TouchableOpacity onPress={() => goToPost(post)} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons size={24} color="#8E8E93" name="document-text" />
          <MyText style={{ fontSize: 16 }}> Ir a la publicacion</MyText>
        </TouchableOpacity>

        {post?.owner?.Id && post?.owner.Id !== user?.Id ? (
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons size={24} color="#8E8E93" name="chatbox" />
            <MyText style={{ fontSize: 16 }}> Enviar un mensaje</MyText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => goToEdit(post)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons size={24} color="#8E8E93" name="pencil" />
            <MyText style={{ fontSize: 16, marginLeft: 4 }}>Modificar</MyText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )

  return (
    <View style={stylesWithTheme.root}>
      <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
        <View>
          <Avatar
            size={120}
            titleStyle={{ color: 'white' }}
            source={{ uri: user.avatar }}
            overlayContainerStyle={{ backgroundColor: 'grey' }}
            rounded
            title={user.firstName[0] + user.lastName[0]}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <MyText style={{ fontSize: 14, color: 'grey' }}> </MyText>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <MyText style={{ fontSize: 24, fontWeight: 'bold' }}>{user.firstName + ' ' + user.lastName} </MyText>
            <MyText style={{ fontSize: 24, fontWeight: 'bold' }}>{user.comments?.length} </MyText>

            {/*    <MyText style={{ fontSize: 14, color: 'grey' }}>En linea </MyText> */}
          </View>
          <MyText style={{ fontSize: 24, fontWeight: 'bold' }}>{user.comments?.length} </MyText>
          <TouchableOpacity onPress={() => goToEditProfile()}>
            <Ionicons size={24} color="#8E8E93" name="pencil" />
          </TouchableOpacity>
        </View>
      </View>
      <MyText style={{ fontSize: 24, fontWeight: 'bold' }}>Mis publicaciones </MyText>

      <FlatList
        data={user?.post}
        showsHorizontalScrollIndicator
        /* persistentScrollbar */
        disableVirtualization={false}
        keyExtractor={(item, index) => item.Id + 'Card'}
        renderItem={({ item }) => Card(item)}
        style={{ flex: 1 }}
      />
    </View>
  )
}

export default Profile

const styles = (theme: MyTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      padding: 16
      /* 
    alignItems: 'center',
    justifyContent: 'center' */
    },
    description2: {
      fontSize: 16

      /*  paddingLeft: 48, */
      /* borderBottomWidth: 0.5, */
    },
    carousel: {
      /*  paddingBottom: 12, */

      /*   marginBottom: 16, */
      paddingVertical: 8,
      /*   borderTopWidth: 1, */
      /*    borderBottomWidth: 0.5, */
      borderTopColor: '#E0E0E0',
      borderBottomColor: '#E0E0E0'
    }
  })
