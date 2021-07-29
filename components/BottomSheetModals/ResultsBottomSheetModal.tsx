import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import React, { useContext, useRef } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import useTheme from '../../hooks/useTheme'
import { Post } from '../../types/models/Post'
import PetCard from '../PetCard'
import MyText from '../MyThemedComponents/MyText'
import { Ionicons } from '@expo/vector-icons'
import PlaceBar from '../PlaceBar'
import PostContext from '../../contexts/PostContext'
import { Pet } from '../../types/models/Pet'

interface PostResultsBottomSheetModalProps {
  modalRef: React.RefObject<BottomSheetModalMethods>
  handleGoToPost: (post: Post) => void
  petFilter: Pet | undefined
  handleFiltersModal: () => void
  snapPoints: (string | number)[]
  posts: Post[]
  currentSearchPlaceName: {
    primaryText: string
    secondaryText: string
  }
}

const ResultsBottomSheetModal: React.FC<PostResultsBottomSheetModalProps> = (props) => {
  const theme = useTheme()
  const { setPost } = useContext(PostContext)

  const { modalRef, petFilter, handleFiltersModal, snapPoints, posts, currentSearchPlaceName: currentSearchPlace } = props

  const TopBar = (
    <View style={styles.handleRoot}>
      <PlaceBar onPress={() => null} primaryText={currentSearchPlace.primaryText} secondaryText={currentSearchPlace.secondaryText}></PlaceBar>
      <TouchableOpacity onPress={() => modalRef.current?.dismiss()} style={styles.iconButton}>
        <Ionicons size={24} color="#8E8E93" name="close" />
      </TouchableOpacity>
    </View>
  )

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      index={2}
      enableContentPanningGesture
      key="resultsModal"
      ref={modalRef}
      stackBehavior="replace"
      enableDismissOnClose={true}
      backgroundComponent={() => <View style={{ backgroundColor: 'black' }}></View>}
      style={{ backgroundColor: theme.navigation, borderRadius: 12 }}
      handleComponent={() => TopBar}
    >
      <BottomSheetScrollView>
        <View style={styles.scrollContainer}>
          <View style={styles.filterContainer}>
            {petFilter?.color?.Id || petFilter?.breed?.Id || petFilter?.size?.Id || petFilter?.furLength?.Id ? (
              <MyText style={{ fontSize: 18 }}>Filtrar por: </MyText>
            ) : (
              <MyText style={{ fontSize: 18 }}>Aplicar filtros </MyText>
            )}
            {petFilter?.color?.Id && (
              <View style={styles.chip}>
                <MyText style={styles.chipText}>Color</MyText>
              </View>
            )}
            {petFilter?.breed?.Id && (
              <View style={styles.chip}>
                <MyText style={styles.chipText}>Raza</MyText>
              </View>
            )}
            {petFilter?.furLength?.Id && (
              <View style={styles.chip}>
                <MyText style={styles.chipText}>Pelaje</MyText>
              </View>
            )}
            {petFilter?.size?.Id && (
              <View style={styles.chip}>
                <MyText style={styles.chipText}>Tamaño</MyText>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={handleFiltersModal} style={styles.iconButton}>
            <Ionicons size={24} color="#8E8E93" name="filter-outline" />
          </TouchableOpacity>
        </View>

        {posts.map((item) => (
          <PetCard post={item} key={'keyResult' + item.Id} handleOnPress={setPost} />
        ))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}
const styles = StyleSheet.create({
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

  chip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 8,
    padding: 32,
    marginRight: 4
  },
  chipText: {
    color: 'white',
    fontSize: 11
  },
  scrollContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default ResultsBottomSheetModal
