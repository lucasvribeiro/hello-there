import { DEFAULT_SHADOW } from '@/constants'
import { Colors } from '@/constants'
import { useToastContext } from '@/contexts/ToastContext'
import { useEffect, useRef } from 'react'
import { StyleSheet, Animated, Text } from 'react-native'
import useTheme from '@/hooks/useTheme'

const Toast = () => {
  const theme = useTheme()
  const { toast, hideToast } = useToastContext()
  const { message, visible, time, offset } = toast

  const translateY = useRef(new Animated.Value(-100)).current

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.spring(translateY, {
          speed: 10,
          bounciness: 5,
          toValue: offset || 50,
          useNativeDriver: true
        }),
        Animated.delay(time || 500),
        Animated.spring(translateY, {
          speed: 50,
          toValue: -100,
          useNativeDriver: true
        })
      ]).start(() => {
        hideToast()
      })
    }
  }, [visible])

  if (!visible) return null

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY }], backgroundColor: Colors[theme].backgroundLight }
      ]}
    >
      <Text style={[styles.message, { color: Colors[theme].text }]}>{message}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 14,
    ...DEFAULT_SHADOW
  },
  message: {
    fontSize: 14,
    color: '#222222',
    textAlign: 'center',
    fontFamily: 'Nunito-Bold'
  }
})

export default Toast
