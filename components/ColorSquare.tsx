import React, { useEffect, useRef } from 'react'
import { StyleSheet, Animated, Pressable } from 'react-native'

import { DEFAULT_SHADOW } from '@/constants'
import { Colors } from '@/constants/Colors'
import useTheme from '@/hooks/useTheme'

type ColorSquareProps = {
  width?: number
  height?: number
  padding?: number
  color: string
  onPress?: () => void
  withBorder?: boolean
}

const ColorSquare = ({
  color,
  onPress,
  width = 60,
  height = 60,
  padding = 6,
  withBorder = false
}: ColorSquareProps) => {
  const { theme } = useTheme()
  const scaleValue = useRef(new Animated.Value(0)).current

  const animate = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      tension: 100,
      friction: 7,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    animate()
  }, [])

  useEffect(() => {
    if (withBorder) {
      scaleValue.setValue(0.8)
      animate()
    }
  }, [withBorder])

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Pressable
        onPress={onPress}
        style={[
          styles.pressable,
          {
            width,
            height,
            padding,
            backgroundColor: Colors[theme].background,
            borderWidth: withBorder ? 1 : 0,
            borderColor: Colors[theme].textLight
          }
        ]}
      >
        <Animated.View style={[styles.square, { backgroundColor: `#${color}` }]} />
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 12,
    ...DEFAULT_SHADOW
  },
  square: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    ...DEFAULT_SHADOW
  }
})

export default ColorSquare
