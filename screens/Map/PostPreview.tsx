import React, { useEffect, useMemo, useRef, useState } from 'react'
import { View, StyleSheet, Image, ImageBackground, FlatList, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import { Post } from '../../types/models/Post'
import useTheme from '../../hooks/useTheme'
import { MyTheme } from '../../styles/Theme'
import Text from '../../components/MyThemedComponents/Text'
import { LinearGradient } from 'expo-linear-gradient'
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { ScrollView } from 'react-native-gesture-handler'

interface PostPageProps {
  post: Post | undefined
}

const PostPreview: React.FC<PostPageProps> = ({ post }) => {
  const theme = useTheme()

  return (
    <View>
      <View style={styles(theme).root}>
        <Text>asd</Text>

        <ScrollView horizontal>
          {post?.pictures.map((picture, index) => (
            <View>
              <ImageBackground key={picture.url + 34} imageStyle={{ borderRadius: 12 }} style={styles(theme).image} source={{ uri: picture.url }} />
              <LinearGradient
                colors={['rgba(0,0,0,0.5)', 'transparent']}
                style={{ position: 'absolute', height: 120, width: 130, borderRadius: 12 }}
                start={{ x: 0, y: 1.0 }}
                end={{ x: 0, y: 0 }}
              />
            </View>
          ))}
        </ScrollView>
        {/* <BottomSheetFlatList
          data={post?.pictures}
          keyExtractor={(i) => i.url}
          renderItem={({ item }) => (
            <View>
              {console.log(item)}
              <ImageBackground key={item.url + 34} imageStyle={{ borderRadius: 12 }} style={styles(theme).image} source={{ uri: item.url }} />
              <LinearGradient
                colors={['rgba(0,0,0,0.5)', 'transparent']}
                style={{ position: 'absolute', height: 120, width: 130, borderRadius: 12 }}
                start={{ x: 0, y: 1.0 }}
                end={{ x: 0, y: 0 }}
              />
            </View>
          )}
        /> */}
      </View>
    </View>
  )
}

const styles = (theme: MyTheme) =>
  StyleSheet.create({
    root: {
      /*     justifyContent: 'flex-start',
      alignItems: 'flex-start', */
      backgroundColor: theme.navigation,
      paddingHorizontal: 16
    },
    tittle: {
      fontSize: 18,
      /*  width: '80%', */
      alignSelf: 'flex-start',
      overflow: 'scroll',
      paddingBottom: 8
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
    }
  })

export default PostPreview
