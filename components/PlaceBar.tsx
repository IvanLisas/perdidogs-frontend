import React from 'react'
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import MyIcon from './MyThemedComponents/MyIcon'
import MyText from './MyThemedComponents/MyText'
import useTheme from '../hooks/useTheme'

type PlaceBarProps = {
  primaryText: string
  secondaryText?: string
  onPress: () => void
}

const PlaceBar: React.FC<PlaceBarProps & TouchableOpacityProps> = (props) => {
  const theme = useTheme()

  const { style, primaryText, secondaryText, onPress } = props
  return (
    <TouchableOpacity style={[style, styles.predictionRow]} onPress={onPress}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
        <MyIcon style={{ marginRight: 8 }} name="compass-hand-drawn-circular-tool-outline" />
        <View>
          <MyText style={styles.result} numberOfLines={1}>
            {primaryText}
          </MyText>
          {secondaryText && (
            <MyText style={{ fontSize: 14, color: theme.textLabel }} numberOfLines={1}>
              {secondaryText}
            </MyText>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  predictionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    flexWrap: 'wrap',
    flexGrow: 1
  },
  result: {
    fontSize: 20
  }
})

export default PlaceBar
