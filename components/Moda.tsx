import React, { useState } from 'react'
import { Alert, Modal as DefaultModal, StyleSheet, Text, Pressable, View } from 'react-native'
import SendBar from './SendBar'

interface ModalProps {
  modalVisible: boolean
  setModalVisible: (val: boolean) => void
  text: string
  setText: (val: string) => void
}

const MyModal: React.FC<ModalProps> = (props) => {
  const { modalVisible, setModalVisible, text, setText } = props
  return (
    <View style={styles.centeredView}>
      <DefaultModal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <SendBar text={text} setText={setText} onPress={() => setModalVisible(false)}></SendBar>
        </View>
      </DefaultModal>
      {/*       <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(false)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})

export default MyModal
