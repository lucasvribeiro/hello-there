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
    <Pressable onPress={onPress}>
      <Animated.View
        style={[
          styles.square,
          { transform: [{ scale: scaleValue }], backgroundColor: `#${color}` }
        ]}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  square: {
    width: 60,
    height: 60,
    borderWidth: 6,
    borderRadius: 15,
    marginHorizontal: 4,
    borderColor: '#FFFFFF',
    ...DEFAULT_SHADOW
  }
})

export default ColorSquare
