import { ReactNode, useEffect, useRef } from 'react'
import { Modal as RNModal, StyleSheet, Animated, Pressable } from 'react-native'

import { Colors } from '@/constants'
import useTheme from '@/hooks/useTheme'
import { DEFAULT_SHADOW } from '@/constants'

type ModalProps = {
  visible: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = ({ visible, children, onClose }: ModalProps) => {
  const theme = useTheme()
  const backgroundOpacity = useRef(new Animated.Value(0)).current

  const animatedStyle = {
    backgroundColor: backgroundOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['#00000000', '#000000CC']
    })
  }

  useEffect(() => {
    Animated.timing(backgroundOpacity, {
      duration: 700,
      useNativeDriver: false,
      toValue: visible ? 1 : 0
    }).start()
  }, [visible])

  return (
    <RNModal visible={visible} onRequestClose={onClose} transparent={true} animationType="slide">
      <Animated.View style={[styles.overlay, animatedStyle]}>
        <Pressable onPress={onClose} style={styles.overlayTouchable}>
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={[styles.modalContent, { backgroundColor: Colors[theme].backgroundLight }]}
          >
            {children}
          </Pressable>
        </Pressable>
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
