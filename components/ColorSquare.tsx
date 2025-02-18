import React, { useEffect, useState } from 'react'
import { StyleSheet, Animated, Pressable, useColorScheme } from 'react-native'

import { DEFAULT_SHADOW } from '@/constants'
import { Colors } from '@/constants/Colors'

type ColorSquareProps = {
  size?: number
  padding?: number
  color: string
  onPress: () => void
  withBorder?: boolean
}

const ColorSquare = ({ color, onPress, size = 60, padding = 6, withBorder = false }: ColorSquareProps) => {
  const colorScheme = useColorScheme() ?? 'light'
  const scaleValue = useState(new Animated.Value(0))[0]

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      tension: 100,
      friction: 7,
      useNativeDriver: true
    }).start()
  }, [])

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Pressable
        onPress={onPress}
        style={[
          styles.pressable,
          {
            width: size,
            height: size,
            padding,
            backgroundColor: Colors[colorScheme].background,
            borderWidth: withBorder ? 1 : 0,
            borderColor: Colors[colorScheme].textLight
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
