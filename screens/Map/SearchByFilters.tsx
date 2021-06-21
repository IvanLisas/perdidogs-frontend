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

/* interface PostPageProps {
  post: Post | undefined
} */

const SearchByFilters: React.FC = ({}) => {
  const theme = useTheme()

  const { setPost, posts, setPosts } = useContext(PostContext)

  const navigation = useNavigation()

  const handleGoTopost = (post: Post) => {
    setPost(post)
    navigation.navigate('PostPreview')
  }

  return (
    <BottomSheetScrollView>
      <ScrollView style={styles(theme).root}>
        {/*   <Text>Pantalla de busqueda por filtros</Text> */}
        {posts.map((post, index) => {
          ;<TouchableOpacity onPress={() => handleGoTopost(post)}>
            <ImageBackground
              key={post.pictures[0].url + 'photo'}
              imageStyle={{ borderRadius: 12, width: '100%' }}
              style={{
                width: Dimensions.get('window').width / 2,
                height: 220,
                borderRadius: 20,
                marginRight: 8
              }}
              source={{ uri: post.pictures[0].url }}
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.5)', 'transparent']}
              style={{
                position: 'absolute',
                height: 220,
                width: post?.pictures.length > 1 ? Dimensions.get('window').width - 180 : Dimensions.get('window').width - 90,
                borderRadius: 12
              }}
              start={{ x: 0, y: 1.0 }}
              end={{ x: 0, y: 0 }}
            />
          </TouchableOpacity>
        })}
      </ScrollView>
    </BottomSheetScrollView>
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

export default SearchByFilters
