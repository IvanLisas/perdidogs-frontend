import React, { useContext, useState } from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import useTheme from '../hooks/useTheme'
import { MyTheme } from '../styles/Theme'
import Text from './MyThemedComponents/MyText'
import { LinearGradient } from 'expo-linear-gradient'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from './icons/index'
import UserAvatar from './UserAvatar'
import { Dimensions } from 'react-native'
import PostContext from '../contexts/PostContext'
import commentService from '../services/CommentSerive'
import userContext from '../contexts/UserContext'
import { useNavigation } from '@react-navigation/native'
import { Chat } from '../types/models/Chat'
import { Message } from '../types/models/Message'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import MyText from './MyThemedComponents/MyText'
import SendAMessageBar from './SendAMessageBar'
interface PostPreviewProps {
  modalRef: React.RefObject<BottomSheetModalMethods>
}

const PostPreview: React.FC<PostPreviewProps> = ({ modalRef }) => {
  const { post, setPost } = useContext(PostContext)
  const [modalVisible, setModalVisible] = useState(false)
  const { user, Tab } = useContext(userContext)
  const navigation = useNavigation()
  const theme = useTheme()

  const [text, setText] = useState('')

  const sendChatMenssage = () => {
    const messanges: Message[] = []
    navigation.navigate('Chat', { addressee: post?.owner })
    /*  setModalVisible(false) */
  }

  const sendMessage = async () => {
    if (user && post)
      setPost(
        await commentService.save({ owner: { Id: user.Id, firstName: 'asd', lastName: 'asd', email: 'asd' }, text: text, post: { Id: post.Id } })
      )
    setText('')
  }

  const handleCloseModal = () => {
    modalRef.current?.close()
  }

  if (!post) return null
  else
    return (
      <BottomSheetScrollView style={{ height: '100%' }}>
        {/*    <MyModal text={text} setText={setText} modalVisible={modalVisible} setModalVisible={setModalVisible} />
         */}
        <ScrollView style={styles(theme).root}>
          {/*   <TouchableWithoutFeedback onPress={() => setModalVisible(false)}> */}
          <View>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 8, paddingRight: 8 }}>
                <UserAvatar user={post?.owner} />
                <TouchableOpacity onPress={sendChatMenssage}>
                  <Icon style={{ color: theme.primary, fontSize: 28 }} name="mail-envelope-back-hand-drawn-outline" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCloseModal}>
                  <Icon style={{ color: theme.primary, fontSize: 28 }} name="cancel-circular-button-with-a-cross-inside-hand-drawn-outlines" />
                </TouchableOpacity>
              </View>
              <View style={{ paddingLeft: 48 }}>
                <Text style={styles(theme).description2}>{post?.description}</Text>
                <MyText>{post?.pet?.color?.description}</MyText>
                <MyText>{post?.pet?.furLength?.description}</MyText>
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
                            height: 200,
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
            {post?.comments?.map((comment, index) => (
              <View style={{ marginBottom: 16 }} key={index + 'coments'}>
                <View style={{ paddingBottom: 4 }}>
                  <UserAvatar user={comment.owner} />
                </View>
                <Text style={styles(theme).description}>{comment.text}</Text>
              </View>
            ))}
          </View>
          {/*  </TouchableWithoutFeedback> */}
        </ScrollView>
        {/*         <View style={{ position: 'absolute', bottom: 0 }}>
          <SendAMessageBar text={text} setText={setText} onPress={sendMessage}></SendAMessageBar>
        </View> */}
      </BottomSheetScrollView>
    )
}

const styles = (theme: MyTheme) =>
  StyleSheet.create({
    root: {
      /* backgroundColor: theme.navigation, */
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
