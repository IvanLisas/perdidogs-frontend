import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { View, StyleSheet, Image, ImageBackground, FlatList, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import { Post } from '../../types/models/Post'
import useTheme from '../../hooks/useTheme'
import { MyTheme } from '../../styles/Theme'
import Text from '../../components/MyThemedComponents/Text'
import { LinearGradient } from 'expo-linear-gradient'
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from '../../components/icon/index'
import UserAvatar from '../../components/UserAvatar'
import { Dimensions } from 'react-native'
import PostContext from '../../contexts/PostContext'
/* interface PostPageProps {
  post: Post | undefined
}
 */
const PostPreview: React.FC = () => {
  const { post } = useContext(PostContext)

  const theme = useTheme()

  if (!post) return null
  else
    return (
      <BottomSheetScrollView>
        <View>
          <ScrollView style={styles(theme).root}>
            <View>
              <View style={{ paddingBottom: 4 }}>
                <UserAvatar user={post?.owner} />
              </View>
              <View style={{ paddingLeft: 48 }}>
                <Text numberOfLines={1} style={styles(theme).description2}>
                  {post?.description}
                </Text>

                {/*      <Text numberOfLines={1} style={styles(theme).tittle}>
            {post?.description}
          </Text> */}

                {post.pictures.length > 0 ? (
                  <ScrollView showsHorizontalScrollIndicator={false} style={styles(theme).carousel} horizontal>
                    {post?.pictures.map((picture, index) => (
                      <View key={picture.url + 'container'}>
                        <ImageBackground
                          key={picture.url + 'photo'}
                          imageStyle={{ borderRadius: 12, width: '100%' }}
                          style={{
                            width: post?.pictures.length > 1 ? Dimensions.get('window').width - 180 : Dimensions.get('window').width - 90,
                            height: 130,
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
                            width: post?.pictures.length > 1 ? Dimensions.get('window').width - 180 : Dimensions.get('window').width - 90,
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

                <View style={styles(theme).descriptionsContainer}>
                  <View style={styles(theme).tinyDescriptionContainer}>
                    <Icon style={styles(theme).icon} name="compass-hand-drawn-circular-tool-outline" />
                    <Text style={styles(theme).tinyDescription}>A 5 kilometros - </Text>
                  </View>
                  <View style={styles(theme).tinyDescriptionContainer}>
                    <Icon style={styles(theme).icon} name="time-hand-drawn-interface-symbol" />
                    <Text style={styles(theme).tinyDescription}>Hace 2 horas</Text>
                  </View>
                </View>
              </View>
            </View>
            {/*        <View style={{ paddingBottom: 4 }}>
            <UserAvatar user={post?.owner} />
          </View>
          <Text style={styles(theme).description2}>Lo encontre cerca de la estacion de villa ballester. Estaba con collar</Text>
            <Text style={{ fontSize: 22, paddingBottom: 16 }}>Comentarios</Text>
            */}
            <View style={{ paddingBottom: 4 }}>
              <UserAvatar user={post?.owner} />
            </View>

            <Text style={styles(theme).description}>Lo encontre cerca de la estacion de villa ballester. Estaba con collar</Text>
            <View style={{ paddingBottom: 4 }}>
              <UserAvatar user={post?.owner} />
            </View>
            <Text style={styles(theme).description}>Lo encontre cerca de la estacion de villa ballester. Estaba con collar</Text>
            <View style={{ paddingBottom: 4 }}>
              <UserAvatar user={post?.owner} />
            </View>
            <Text style={styles(theme).description}>Lo encontre cerca de la estacion de villa ballester. Estaba con collar</Text>
            <View style={{ paddingBottom: 4 }}>
              <UserAvatar user={post?.owner} />
            </View>
            <Text style={styles(theme).description}>Lo encontre cerca de la estacion de villa ballester. Estaba con collar</Text>
            <View style={{ paddingBottom: 4 }}>
              <UserAvatar user={post?.owner} />
            </View>
            <Text style={styles(theme).description}>Lo encontre cerca de la estacion de villa ballester. Estaba con collar</Text>
          </ScrollView>
        </View>
      </BottomSheetScrollView>
    )
}

const styles = (theme: MyTheme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.navigation,
      padding: 16
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
      flex: 1
      /* paddingTop: 200 */
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

export default PostPreview
