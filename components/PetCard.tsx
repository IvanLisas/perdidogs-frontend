import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Dimensions, TouchableOpacity, View, Image } from 'react-native'
import useTheme from '../hooks/useTheme'
import { Post } from '../types/models/Post'
import MyText from './MyThemedComponents/MyText'
import UserAvatar from './UserAvatar'
import Icon from './icons/index'

interface PetCardProps {
  post: Post
  handleOnPress: (post: Post) => void
}

const PetCard: React.FC<PetCardProps> = ({ post, handleOnPress }) => {
  const theme = useTheme()
  return (
    <TouchableOpacity style={{ paddingHorizontal: 16, paddingVertical: 8 }} key={post.Id + 'e'} onPress={() => handleOnPress(post)}>
      <View
        style={
          {
            /*           shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          borderRadius: 25,

          elevation: 7 */
          }
        }
      >
        <View
          style={{
            height: 60,
            borderColor: theme.primary,
            /*    borderEndWidth: 0.2,
            borderBottomWidth: 0.2,
            borderStartWidth: 0.2, */

            /*  padding: 16, */
            backgroundColor: theme.navigation,
            justifyContent: 'center'
          }}
        >
          <UserAvatar user={post.owner}></UserAvatar>
        </View>
        <View>
          <Image
            key={post.Id + 'photo'}
            style={{
              width: Dimensions.get('window').width - 32,
              height: 200,
              borderRadius: 20

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
              borderRadius: 20,
              borderBottomEndRadius: 20,
              width: Dimensions.get('window').width - 32
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: theme.navigation,
            justifyContent: 'center'
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              {/*        <Icon style={{ color: theme.primary, fontSize: 22 }} name="pin-hand-drawn-irregular-outline" />
               */}
              <MyText
                numberOfLines={2}
                style={{
                  fontSize: 22
                  /*  padding: 16 */
                  /*    paddingLeft: 8 */
                }}
              >
                {post.pet.breed?.description}
              </MyText>
            </View>
            {/* <Icon style={{ paddingRight: 8, color: theme.primary, fontSize: 22 }} name="arrow-point-hand-drawn-outline-pointing-to-right-direction" /> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default PetCard
