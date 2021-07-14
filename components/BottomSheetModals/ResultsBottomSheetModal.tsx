import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import useTheme from '../../hooks/useTheme'
import { Post } from '../../types/models/Post'
import PetCard from '../PetCard'
import MyText from '../MyThemedComponents/MyText'
import TouchableIcon from '../TouchableIcon'
import MyIcon from '../MyThemedComponents/MyIcon'
import { Ionicons } from '@expo/vector-icons'
import { backgroundColor } from 'styled-system'
import PlaceBar from '../PlaceBar'

interface ResultsBottomSheetModalProps {
  modalRef: React.RefObject<BottomSheetModalMethods>
  handleGoToPost: (post: Post) => void

  snapPoints: (string | number)[]
  posts: Post[]
  currentSearchPlace: {
    primaryText: string
    secondaryText: string
  }
}

const ResultsBottomSheetModal: React.FC<ResultsBottomSheetModalProps> = ({ modalRef, handleGoToPost, snapPoints, posts, currentSearchPlace }) => {
  const theme = useTheme()

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      index={1}
      enableContentPanningGesture
      key="resultsModal"
      ref={modalRef}
      stackBehavior="replace"
      handleComponent={() => (
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: '#DEDEDE',
            flexWrap: 'wrap',
            flexGrow: 1
          }}
        >
          {/*      <MyIcon style={{ marginRight: 16 }} name="compass-hand-drawn-circular-tool-outline" />

          <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
            <MyText numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 24, fontWeight: 'bold' }}>
              {currentSearchPlace}
            </MyText>
          </View> */}
          <PlaceBar onPress={() => null} primaryText={currentSearchPlace.primaryText} secondaryText={currentSearchPlace.secondaryText}></PlaceBar>
          <TouchableOpacity
            onPress={() => modalRef.current?.dismiss()}
            style={{
              marginLeft: 8,
              backgroundColor: '#E5E5EA',
              borderRadius: 50,
              width: 28,
              height: 28,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ionicons size={24} color="#8E8E93" name="close" />
          </TouchableOpacity>
          {/*          <TouchableIcon
            style={{ marginLeft: 8 }}
            onPress={() => modalRef.current?.dismiss()}
            name="cancel-circular-button-with-a-cross-inside-hand-drawn-outlines"
          /> */}
        </View>
      )}
      backgroundComponent={() => <View style={{ backgroundColor: 'black' }}></View>}
      style={{ backgroundColor: theme.navigation, borderRadius: 12 }}
    >
      <BottomSheetFlatList
        data={posts}
        showsHorizontalScrollIndicator
        disableVirtualization={false}
        keyExtractor={(item: Post) => item.description}
        renderItem={({ item }) => <PetCard post={item} handleOnPress={handleGoToPost} />}
        style={{ flex: 1 }}
      />
    </BottomSheetModal>
  )
}
const styles = StyleSheet.create({
  predictionRow: {
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  result: {
    fontSize: 20
  }
})

export default ResultsBottomSheetModal
