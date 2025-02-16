import { useEffect, useRef } from 'react'
import { StyleSheet, Animated, Text, View } from 'react-native'

interface ToastProps {
  message: string
  visible: boolean
  onHide?: () => void
}

const Toast = ({ message, visible, onHide }: ToastProps) => {
  const translateY = useRef(new Animated.Value(-100)).current

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.spring(translateY, {
          speed: 20,
          toValue: 60,
          bounciness: 16,
          useNativeDriver: true
        }),
        Animated.delay(5000),
        Animated.spring(translateY, {
          speed: 20,
          toValue: -100,
          useNativeDriver: true
        })
      ]).start(() => {
        onHide?.()
      })
    }
  }, [visible])

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }]
        }
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#DDDDDD',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 100
  },
  message: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    fontFamily: 'Nunito-Black'
  }
})

export default Toast
