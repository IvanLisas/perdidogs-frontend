import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { mapStyle } from '../../styles/Map'
import { useMap } from '../../hooks/useMap'
import { Input } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Map() {
  const { colors } = useTheme()

  const navigation = useNavigation()

  const [keyword, setKeyword] = useState('')

  const { mapRef, selectedMarker, handleNavigateToPoint, handelResetInitialPosition } = useMap()

  return (
    <View style={styles.content}>
      <MapView
        ref={mapRef}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        initialRegion={{
          latitude: -34.535532,
          longitude: -58.541518,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003
        }}
        mapType="standard"
      />
      <View style={styles.content}>
        <KeyboardAwareScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}>
          <Input
            inputContainerStyle={{ borderBottomWidth: 0, alignSelf: 'center' }}
            textContentType="emailAddress"
            placeholder="Email"
            autoCompleteType="email"
            onChangeText={setKeyword}
            value={keyword}
            containerStyle={{ paddingHorizontal: 0 }}
            style={styles.input}
            /*               errorStyle={{ color: 'red' }}
              errorMessage="Email no valido" */
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapStyle: {
    width: '100%',
    height: '100%',
    padding: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  input: {
    marginVertical: 2,
    borderRadius: 15,
    padding: 16,
    backgroundColor: 'white'
    /*   alignSelf: 'center', */
  }
})
