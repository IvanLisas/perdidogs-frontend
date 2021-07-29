import React, { useContext, useRef, useState } from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import useTheme from '../hooks/useTheme'

import { LinearGradient } from 'expo-linear-gradient'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { ScrollView } from 'react-native-gesture-handler'

import { Ionicons } from '@expo/vector-icons'
import PostContext from '../contexts/PostContext'
import UserContext from '../contexts/UserContext'
import { useNavigation } from '@react-navigation/native'
import commentService from '../services/CommentSerive'
import UserAvatar from '../components/UserAvatar'
import { MyTheme } from '../styles/Theme'
import MyText from '../components/MyThemedComponents/MyText'
import SendAMessageBar from '../components/SendAMessageBar'
import postService from '../services/PostService'
import userService from '../services/UserService'
interface PostPreviewProps {}

const Post: React.FC<PostPreviewProps> = () => {
  const { post, setPost } = useContext(PostContext)

  const { user, setUser } = useContext(UserContext)
  const navigation = useNavigation()
  const theme = useTheme()

  const [text, setText] = useState('')

  const sendChatMenssage = () => {
    navigation.navigate('Chats', {
      screen: 'Chat',
      params: { addressee: post?.owner }
    })
    /*  setModalVisible(false) */
  }

  const sendMessage = async () => {
    if (user && post)
      setPost(
        await commentService.save({ owner: { Id: user.Id, firstName: 'asd', lastName: 'asd', email: 'asd' }, text: text, post: { Id: post.Id } })
      )
    setText('')
  }

  const handleChangeStatus = async () => {
    try {
      if (user) {
        if (post?.postStatus?.Id == 1) setPost({ ...(await postService.changeoStatusToFound(post?.Id, user?.Id)) })
        if (post?.postStatus?.Id == 4) setPost({ ...(await postService.changeoStatusToNotFound(post?.Id, user?.Id)) })
        setUser(await userService.getUser(user?.Id))
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const scrollViewRef = useRef<ScrollView>(null)

  if (!post) return null
  else
    return (
      <View style={{ height: '100%', paddingBottom: 48 }}>
        <ScrollView onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })} ref={scrollViewRef} style={styles(theme).root}>
          <View
            style={{
              marginHorizontal: 16,
              marginTop: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <UserAvatar user={post?.owner ? post?.owner : user} />
            {post?.owner?.Id && post?.owner.Id !== user?.Id ? (
              <TouchableOpacity onPress={sendChatMenssage} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons size={24} color="#8E8E93" name="chatbox" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleChangeStatus}>
                <MyText>{post.postStatus?.description}</MyText>
                {/* {console.log(post)} */}
                <Ionicons size={24} color="#8E8E93" name="paw" />
              </TouchableOpacity>
            )}
          </View>
          <MyText style={{ fontSize: 16, marginHorizontal: 16 }}>{post?.description}</MyText>
          {post.pictures.length > 0 ? (
            <ScrollView showsHorizontalScrollIndicator={false} style={styles(theme).carousel} horizontal>
              {post?.pictures.map((picture, index) => (
                <View key={picture.url + 'container'}>
                  <ImageBackground
                    key={picture.url + 'photo'}
                    imageStyle={{ borderRadius: 12, width: '100%' }}
                    style={{
                      width: post?.pictures.length > 1 ? Dimensions.get('window').width - 180 : Dimensions.get('window').width - 32,
                      height: 180,

                      borderRadius: 20,
                      marginRight: 8,
                      marginLeft: index == 0 ? 16 : 4
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
                      borderRadius: 12,
                      marginLeft: index == 0 ? 16 : 4
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

          {post?.comments?.map((comment, index) => (
            <View style={{ marginBottom: 16, paddingHorizontal: 16 }} key={index + 'coments'}>
              <View style={{ paddingBottom: 4 }}>
                <UserAvatar user={comment.owner} />
              </View>
              <MyText style={styles(theme).description}>{comment.text}</MyText>
            </View>
          ))}
          <View
            style={{ flexDirection: 'row', justifyContent: post?.owner?.Id && post?.owner.Id !== user?.Id ? 'space-evenly' : 'flex-start' }}
          ></View>
        </ScrollView>
        <SendAMessageBar onPress={sendMessage} setText={setText} text={text}></SendAMessageBar>
      </View>
    )
}

const styles = (theme: MyTheme) =>
  StyleSheet.create({
    root: {
      flex: 1
      /*    marginBottom: 444 */
      /* backgroundColor: theme.navigation, */
      /*   padding: 16 */
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
    handleRoot: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#DEDEDE',
      padding: 16,
      justifyContent: 'space-between'
    },
    iconButton: {
      marginLeft: 8,
      backgroundColor: '#E5E5EA',
      borderRadius: 50,
      width: 28,
      height: 28,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center'
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
      paddingBottom: 8
      /*   paddingLeft: 48 */
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

export default Post
