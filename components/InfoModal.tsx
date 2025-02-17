import { Modal, View, StyleSheet, Pressable } from 'react-native'
import { useSelector } from 'react-redux'
import * as Haptics from 'expo-haptics'

interface InfoModalProps {
  isModalVisible: boolean
  setIsModalVisible: (visible: boolean) => void
}

const InfoModal = ({ isModalVisible, setIsModalVisible }: InfoModalProps) => {
  const color = useSelector((state: any) => state.color.color)

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <Pressable
        style={styles.modalContainer}
        onPress={() => setIsModalVisible(false)}
        onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
      >
        <View style={styles.modalContent}>
          <View style={[styles.colorBorder, { backgroundColor: `#${color.hex}` }]} />
          {/* Modal content will be added here */}
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '50%'
  },
  colorBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  }
})

export default InfoModal
