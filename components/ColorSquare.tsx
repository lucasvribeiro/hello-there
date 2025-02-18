import React, { useEffect, useState } from 'react'
import { StyleSheet, Animated, Pressable } from 'react-native'

import { DEFAULT_SHADOW } from '@/constants'

type ColorSquareProps = {
  color: string
  onPress: () => void
}

const ColorSquare = ({ color, onPress }: ColorSquareProps) => {
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
      <Pressable onPress={onPress} style={styles.pressable}>
        <Animated.View style={[styles.square, { backgroundColor: `#${color}` }]} />
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  pressable: {
    width: 60,
    height: 60,
    padding: 6,
    borderRadius: 12,
    marginHorizontal: 4,
    backgroundColor: '#FFFFFF',
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
