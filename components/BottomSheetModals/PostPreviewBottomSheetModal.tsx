import React, { useContext, useState } from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import useTheme from '../../hooks/useTheme'
import { MyTheme } from '../../styles/Theme'
import Text from '../MyThemedComponents/MyText'
import { LinearGradient } from 'expo-linear-gradient'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { ScrollView } from 'react-native-gesture-handler'
import UserAvatar from '../UserAvatar'
import { Dimensions } from 'react-native'
import PostContext from '../../contexts/PostContext'
import commentService from '../../services/CommentSerive'
import userContext from '../../contexts/UserContext'
import { useNavigation } from '@react-navigation/native'
import { Message } from '../../types/models/Message'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import MyText from '../MyThemedComponents/MyText'
import { Ionicons } from '@expo/vector-icons'
interface PostPreviewProps {
  modalRef: React.RefObject<BottomSheetModalMethods>
  snapPoints: (string | number)[]
}

const PostPreview: React.FC<PostPreviewProps> = ({ modalRef, snapPoints }) => {
  const { post, setPost } = useContext(PostContext)

  const [modalVisible, setModalVisible] = useState(false)
  const { user } = useContext(userContext)
  const navigation = useNavigation()
  const theme = useTheme()

  const [text, setText] = useState('')

  const sendChatMenssage = () => {
    const messanges: Message[] = []

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

  const goToPost = () => {
    navigation.navigate('Mapa', {
      screen: 'Post'
    })
  }

  const goToEdit = () => {
    navigation.navigate('Mapa', {
      screen: 'EditPost'
    })
  }

  const handleCloseModal = () => {
    modalRef.current?.close()
  }

  const TopBar = (
    <View style={styles(theme).handleRoot}>
      {user && <UserAvatar user={post?.owner ? post?.owner : user} />}

      <TouchableOpacity onPress={handleCloseModal} style={styles(theme).iconButton}>
        <Ionicons size={24} color="#8E8E93" name="close" />
      </TouchableOpacity>
    </View>
  )
  if (!post) return <View />
  else
    return (
      <BottomSheetModal
        snapPoints={snapPoints}
        key="PostPreview"
        index={1}
        ref={modalRef}
        enableDismissOnClose={true}
        enableContentPanningGesture
        handleComponent={() => TopBar}
        stackBehavior="replace"
        backgroundComponent={() => <View style={{ backgroundColor: theme.background }}></View>}
        style={{ backgroundColor: theme.navigation, borderRadius: 5 }}
      >
        {user && (
          <BottomSheetScrollView style={{ height: '100%' }}>
            <ScrollView style={styles(theme).root}>
              {post?.postStatus?.Id !== 2 ? (
                <View>
                  <View>
                    <View>
                      <Text style={styles(theme).description2}>{post?.description}</Text>
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
                    <TouchableOpacity onPress={goToPost} style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons size={24} color="#8E8E93" name="document-text" />
                      <MyText style={{ fontSize: 16 }}> Ir a la publicacion</MyText>
                    </TouchableOpacity>

                    {post?.owner?.Id && post?.owner.Id !== user?.Id ? (
                      <TouchableOpacity onPress={sendChatMenssage} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons size={24} color="#8E8E93" name="chatbox" />
                        <MyText style={{ fontSize: 16 }}> Enviar un mensaje</MyText>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={goToEdit} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons size={24} color="#8E8E93" name="pencil" />
                        <MyText style={{ fontSize: 16, marginLeft: 4 }}>Modificar</MyText>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ) : (
                <View style={{ flex: 1, justifyContent: 'center', paddingTop: 64, height: '100%', alignItems: 'center' }}>
                  <MyText style={{ fontSize: 20, textAlign: 'center' }}>Se a eliminado tu publicacion</MyText>
                </View>
              )}
            </ScrollView>
          </BottomSheetScrollView>
        )}
      </BottomSheetModal>
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

export default PostPreview
