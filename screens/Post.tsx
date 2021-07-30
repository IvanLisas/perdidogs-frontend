import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, Platform, Keyboard } from 'react-native'
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
import { KeyboardAvoidingView } from 'native-base'
import UserAvatarMini from '../components/UserAvatarMini'
import { Button } from 'react-native-elements'
interface PostPreviewProps {}

const Post: React.FC<PostPreviewProps> = () => {
  const { post, setPost } = useContext(PostContext)

  const { user, setUser } = useContext(UserContext)
  const navigation = useNavigation()
  const theme = useTheme()

  let isMount = true

  const [fetchFlag, setFetchFlag] = useState<boolean>(true)

  const [isLoading, setIsLoading] = useState(false)

  const [text, setText] = useState('')

  const sendChatMenssage = () => {
    navigation.navigate('Chats', {
      screen: 'Chat',
      params: { addressee: post?.owner }
    })
    /*  setModalVisible(false) */
  }

  const sendMessage = async () => {
    if (user && post && text)
      setPost(
        await commentService.save({ owner: { Id: user.Id, firstName: 'asd', lastName: 'asd', email: 'asd' }, text: text, post: { Id: post.Id } })
      )
    scrollViewRef.current?.scrollToEnd({ animated: true })
    Keyboard.dismiss()
    setText('')
  }

  const handleChangeStatus = async () => {
    setIsLoading(true)
    try {
      if (user) {
        if (post?.postStatus?.Id == 1) setPost({ ...(await postService.changeoStatusToFound(post?.Id, user?.Id)) })
        if (post?.postStatus?.Id == 4) setPost({ ...(await postService.changeoStatusToNotFound(post?.Id, user?.Id)) })
      }
    } catch (error) {
      console.log(error.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    isMount = true
    let timer1 = setTimeout(() => {
      if (!fetchFlag) setFetchFlag(true)
    }, 1000)
    const getChat = async () => {
      if (fetchFlag) {
        setFetchFlag(false)
        if (user) {
          try {
            if (post && isMount) {
              /*     console.log(postUpdate) */
              console.log((await postService.get(post?.Id)).postStatus?.Id)
              setPost({ ...(await postService.get(post?.Id)) })

              console.log(post.postStatus?.Id)
            }
          } catch (error) {
            console.log('Fetching Fail')
            console.log(error.message)
          }
        }
      }
    }
    getChat()
    return () => {
      clearTimeout(timer1)
      isMount = false
    }
  }, [fetchFlag])

  const scrollViewRef = useRef<ScrollView>(null)

  if (!post) return null
  else
    return (
      <View style={{ height: '100%', paddingBottom: post.postStatus?.Id == 2 || post.postStatus?.Id == 4 ? 48 : 0 }}>
        <ScrollView ref={scrollViewRef} style={styles(theme).root}>
          <View
            style={{
              marginHorizontal: 16,
              marginTop: 16,
              marginBottom: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <UserAvatar user={post?.owner ? post?.owner : user} />
            {post?.owner?.Id && post?.owner.Id !== user?.Id && (
              <TouchableOpacity onPress={sendChatMenssage} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons size={24} color="#8E8E93" name="chatbox" />
              </TouchableOpacity>
            )}
          </View>
          <MyText style={{ fontSize: 16, marginHorizontal: 16 }}>{post?.description}</MyText>
          {post.pictures.length > 0 ? (
            <ScrollView showsHorizontalScrollIndicator={false} style={styles(theme).carousel} horizontal>
              {post?.pictures.map((picture, index) => (
                <View key={picture.url + 'container' + Math.floor(Math.random() * 16777215)}>
                  <ImageBackground
                    key={picture.url + 'photo'}
                    imageStyle={{ borderRadius: 12, width: '100%' }}
                    style={{
                      width: post?.pictures.length > 1 ? Dimensions.get('window').width - 180 : Dimensions.get('window').width - 32,
                      height: 280,

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
                key={'photo' + Math.floor(Math.random() * 16777215)}
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
          {/*       <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 16, paddingVertical: 8 }}
              onPress={handleChangeStatus}
            >
              <MyText style={{ fontSize: 18 }}>Estado: {post.postStatus?.description}</MyText>
              {(post.postStatus?.Id == 1 || post.postStatus?.Id == 4) && <Ionicons size={28} color="#8E8E93" name="swap-horizontal-outline" />}
            </TouchableOpacity>
          </View> */}
          {(post.postStatus?.Id == 1 || post.postStatus?.Id == 4) && (post?.owner?.Id == user?.Id || !post?.owner?.Id) && (
            <Button
              buttonStyle={{
                borderWidth: 1,
                borderColor: '#6879B1',
                /*   borderColor: theme.icon, */
                padding: 8,
                margin: 16,
                paddingHorizontal: 12,
                borderRadius: 18,
                backgroundColor: theme.background
              }}
              containerStyle={{
                borderRadius: 18
              }}
              loading={isLoading}
              titleStyle={{ fontSize: 14, fontStyle: 'normal', color: 'grey' }}
              icon={<Ionicons style={{ marginRight: 4 }} size={18} color="#8E8E93" name="paw" />}
              title={post.postStatus?.Id == 4 ? 'Volver a publicar' : 'Fue encontrada'}
              loadingProps={{ color: theme.text }}
              onPress={handleChangeStatus}
            />
          )}

          <MyText style={{ fontSize: 22, fontWeight: 'bold', paddingHorizontal: 16, paddingBottom: 8 }}>Comentarios</MyText>
          {post.comments?.length !== 0 ? (
            post?.comments?.map((comment, index) => (
              <View style={{ marginBottom: 16, paddingHorizontal: 16 }} key={index + 'coments'}>
                <View style={{ paddingBottom: 4 }}>
                  <UserAvatarMini user={comment.owner} />
                </View>
                <MyText style={{ fontSize: 16, marginLeft: 38, paddingBottom: 16, borderBottomWidth: 0.5, borderColor: theme.border }}>
                  {comment.text}
                </MyText>
              </View>
            ))
          ) : (
            <MyText style={{ fontSize: 22, fontWeight: 'normal', paddingHorizontal: 16, paddingVertical: 48, alignSelf: 'center' }}>
              Sin comentarios
            </MyText>
          )}
          {/*           <View
            style={{ flexDirection: 'row', justifyContent: post?.owner?.Id && post?.owner.Id !== user?.Id ? 'space-evenly' : 'flex-start' }}
          ></View> */}
        </ScrollView>
        {/*   <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
        {post.postStatus?.Id == 1 || post.postStatus?.Id == 4 ? (
          <SendAMessageBar onPress={sendMessage} setText={setText} text={text}></SendAMessageBar>
        ) : (
          <View style={{ padding: 16, flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Ionicons size={24} color="#FF453A" name="lock-closed" />
            <MyText style={{ fontSize: 18, textAlign: 'center' }}> La publicacion aun no esta activa</MyText>
          </View>
        )}

        {/* </KeyboardAvoidingView> */}
      </View>
    )
}

{
  /* <TouchableOpacity onPress={handleChangeStatus}>
<MyText>Estado: {post.postStatus?.description}</MyText>

<Ionicons size={24} color="#8E8E93" name="swap-horizontal-outline" />
</TouchableOpacity> */
}

const styles = (theme: MyTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      marginBottom: 44
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
      borderColor: 'grey',
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
      marginLeft: 38,
      paddingBottom: 16,
      borderBottomWidth: 0.5,
      borderColor: '#E5E5EA'
    },

    description2: {
      fontSize: 16,
      paddingLeft: 48
      /*   borderBottomWidth: 0.5 */
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
