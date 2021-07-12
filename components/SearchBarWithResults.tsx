import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { IInputProps } from 'native-base'
import React, { FunctionComponent, useState } from 'react'
import { StyleSheet, View, ViewStyle, TouchableOpacity, Keyboard } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Prediction } from '../types/models/Prediction'
import MyInput from './MyThemedComponents/MyInput'
import MyText from './MyThemedComponents/MyText'
type SearchBarWithResultsProps = {
  value: string
  style?: ViewStyle | ViewStyle[]
  onChangeText: (text: string) => void
  showPredictions: boolean
  onPredictionTapped: (placeId: string, description: string) => void
  predictions: Prediction[]
}
const SearchBarWithResults: FunctionComponent<SearchBarWithResultsProps & IInputProps> = (props) => {
  const { value, style, onChangeText, onPredictionTapped, predictions, showPredictions, ...otherProps } = props

  return (
    <View>
      <MyInput
        /*   style={[inputStyle, inputBottomRadius]} */
        placeholder="Search by address"
        placeholderTextColor="rgb(0, 0, 0)"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
      />

      {showPredictions && (
        <BottomSheetFlatList
          data={predictions}
          scrollEnabled
          onScroll={() => Keyboard.dismiss}
          onTouchStart={() => Keyboard.dismiss}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.predictionRow} onPress={() => onPredictionTapped(item.place_id, item.description)}>
                <MyText style={styles.result} numberOfLines={1}>
                  {item.description}
                </MyText>
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item) => item.place_id}

          /* style={[predictionsContainer, calculatedStyle]} */
        />
      )}
    </View>
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
export default SearchBarWithResults
