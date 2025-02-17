import {
  Modal as RNModal,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native'
import { ReactNode, useEffect, useRef, useMemo } from 'react'

type ModalProps = {
  visible: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = ({ visible, onClose, children }: ModalProps) => {
  const backgroundOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(backgroundOpacity, {
      toValue: visible ? 1 : 0,
      duration: visible ? 700 : 0,
      useNativeDriver: false // Changed to false since we're animating backgroundColor
    }).start()
  }, [visible])

  const animatedStyle = {
    backgroundColor: backgroundOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
    })
  }

  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.overlay, animatedStyle]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={styles.overlayTouchable}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.modalContent}
          >
            {children}
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlayTouchable: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '70%',
    minHeight: 300,
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
})

export default Modal
