import React, { useEffect, useMemo, useRef, useState } from 'react'
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
/* interface PostPageProps {
  post: Post | undefined
} */

const SearchResults: React.FC = ({}) => {
  const theme = useTheme()

  return (
    <BottomSheetScrollView>
      <ScrollView style={styles(theme).root}>
        <Text>Pantalla de resultados de busqueda</Text>
      </ScrollView>
    </BottomSheetScrollView>
  )
}

const styles = (theme: MyTheme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.navigation,
      paddingHorizontal: 16
    }
  })

export default SearchResults
