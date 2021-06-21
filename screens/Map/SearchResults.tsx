import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View, Button, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import { Post } from '../../types/models/Post'
import useTheme from '../../hooks/useTheme'
import { MyTheme } from '../../styles/Theme'
import Text from '../../components/MyThemedComponents/Text'
import { LinearGradient } from 'expo-linear-gradient'
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from '../../components/icon/index'
import UserAvatar from '../../components/UserAvatar'
import { useNavigation } from '@react-navigation/native'
import PostContext from '../../contexts/PostContext'
import { useMap } from '../../hooks/useMap'
/* interface PostPageProps {
  post: Post | undefined
} */

const SearchResults: React.FC = ({}) => {
  const theme = useTheme()

  const { setPost, posts, setPosts } = useContext(PostContext)

  const { mapRef, selectedMarker, handleNavigateToPoint, handelResetInitialPosition } = useMap()

  const navigation = useNavigation()

  const handleGoTopost = (post: Post) => {
    setPost(post)
    console.log(post.location)
    handleNavigateToPoint(post.Id, post.location.lat, post.location.long)
    navigation.navigate('PostPreview')
  }

  const Card = (post: Post) => (
    <TouchableOpacity style={{ paddingVertical: 4, paddingHorizontal: 16 }} key={post.Id + 'e'} onPress={() => handleGoTopost(post)}>
      <ImageBackground
        key={post.Id + 'photo'}
        imageStyle={{ borderRadius: 12, width: '100%' }}
        style={{
          /*    width: Dimensions.get('window').width / 2, */
          height: 220,
          borderRadius: 20
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
          height: 220,

          /* width: Dimensions.get('window').width / 2, */
          borderRadius: 12
        }}
        start={{ x: 0, y: 1.0 }}
        end={{ x: 0, y: 0 }}
      />
    </TouchableOpacity>
  )

  return (
    <BottomSheetFlatList
      data={posts}
      showsHorizontalScrollIndicator
      persistentScrollbar
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
