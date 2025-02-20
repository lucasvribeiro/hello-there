import { Modal as RNModal, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { ReactNode, useEffect, useRef } from 'react'
import { DEFAULT_SHADOW } from '@/constants'
import { useSelector } from 'react-redux'
import { Colors } from '@/constants'
import useTheme from '@/hooks/useTheme'
type ModalProps = {
  visible: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = ({ visible, onClose, children }: ModalProps) => {
  const theme = useTheme()
  const backgroundOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(backgroundOpacity, {
      toValue: visible ? 1 : 0,
      duration: 700,
      useNativeDriver: false
    }).start()
  }, [visible])

  const animatedStyle = {
    backgroundColor: backgroundOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
    })
  }

  return (
    <RNModal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <Animated.View style={[styles.overlay, animatedStyle]}>
        <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.overlayTouchable}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={[styles.modalContent, { backgroundColor: Colors[theme].backgroundLight }]}
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
    flex: 1
  },
  overlayTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  modalContent: {
    width: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    ...DEFAULT_SHADOW
  }
})

export default Modal
