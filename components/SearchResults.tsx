import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View, Image, Button, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import { Post } from '../types/models/Post'
import useTheme from '../hooks/useTheme'
import { MyTheme } from '../styles/Theme'
import Text from './MyThemedComponents/MyText'
import { LinearGradient } from 'expo-linear-gradient'
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from './icons/index'
import UserAvatar from './UserAvatar'
import { useNavigation } from '@react-navigation/native'
import PostContext from '../contexts/PostContext'
import { useMap } from '../hooks/useMap'
import MapContext from '../contexts/MapContext'
/* interface PostPageProps {
  post: Post | undefined
} */

const SearchResults: React.FC = ({}) => {
  const theme = useTheme()

  const { setPost, posts, setPosts } = useContext(PostContext)

  const { mapRef, handleNavigateToPoint } = useContext(MapContext)

  const navigation = useNavigation()

  const handleGoTopost = (post: Post) => {
    setPost(post)
    handleNavigateToPoint(post.location.lat, post.location.long)
    navigation.navigate('PostPreview')
  }

  const Card = (post: Post) => (
    <TouchableOpacity style={{ paddingHorizontal: 16, paddingVertical: 8 }} key={post.Id + 'e'} onPress={() => handleGoTopost(post)}>
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
        <View
          style={{
            height: 60,
            borderColor: theme.primary,
            /*    borderEndWidth: 0.2,
            borderBottomWidth: 0.2,
            borderStartWidth: 0.2, */
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 16,
            backgroundColor: theme.navigation,
            justifyContent: 'center'
          }}
        >
          <UserAvatar user={post.owner}></UserAvatar>
        </View>
        <Image
          key={post.Id + 'photo'}
          style={{
            width: Dimensions.get('window').width - 32,
            height: 200
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
            height: 250,
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
    <BottomSheetFlatList
      data={posts}
      showsHorizontalScrollIndicator
      /* persistentScrollbar */
      disableVirtualization={false}
      keyExtractor={(item, index) => item.description}
      renderItem={({ item }) => Card(item)}
      style={{ flex: 1 }}
    />
  )
}

const styles = (theme: MyTheme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.navigation,
      paddingHorizontal: 16
    },
    tittle: {
      fontSize: 20,
      /*  width: '80%', */
      alignSelf: 'flex-start',
      overflow: 'scroll',
      paddingBottom: 4
    },
    imageContainer: {
      /*  flex: 1, */
      /*      flexDirection: 'row',
      alignSelf: 'flex-start',
      height: 120 */
      flexGrow: 1,
      overflow: 'scroll'
    },
    image: {
      width: 130,
      height: 120,
      borderRadius: 20,
      marginRight: 8
    },
    container: {
      flex: 1,
      paddingTop: 200
    },
    contentContainer: {
      backgroundColor: 'white'
    },
    itemContainer: {
      padding: 6,
      margin: 6,
      backgroundColor: '#eee'
    },
    description: {
      fontSize: 16,
      paddingBottom: 8,
      paddingLeft: 48
    },
    description2: {
      fontSize: 16

      /*  paddingLeft: 48, */
      /* borderBottomWidth: 0.5, */
    },

    tinyDescription: {
      paddingBottom: 4
    },
    icon: {
      fontSize: 16,
      color: theme.text,
      paddingRight: 8
    },
    tinyDescriptionContainer: {
      /*   flex: 1, */
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 0
    },
    carousel: {
      /*  paddingBottom: 12, */

      /*   marginBottom: 16, */
      paddingVertical: 8,
      /*   borderTopWidth: 1, */
      /*    borderBottomWidth: 0.5, */
      borderTopColor: '#E0E0E0',
      borderBottomColor: '#E0E0E0'
    },
    descriptionsContainer: {
      paddingBottom: 8,
      flexDirection: 'row',
      alignItems: 'center'
    }
  })

export default SearchResults
