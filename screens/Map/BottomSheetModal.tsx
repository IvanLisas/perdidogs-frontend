import React, { useCallback, useMemo, useRef } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { BottomSheetModal as DefaultBottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'

interface BottomSheetModalProps {
  ref: React.Ref<DefaultBottomSheetModal>
  children: React.ReactNode
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = (props) => {
  // ref
  const { ref, children } = props
  // variables
  const snapPoints = useMemo(() => ['10%', '80%'], [])

  // callbacks
  /*   const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
    bottomSheetModalRef.current?.close()
  }, []) */
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  // renders
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        {/*    <Button onPress={handlePresentModalPress} title="Present Modal" color="black" /> */}
        <DefaultBottomSheetModal ref={ref} style={{ overflow: 'scroll' }} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>{children}</View>
        </DefaultBottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  }
})

export default BottomSheetModal
