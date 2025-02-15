import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

type ColorSquareProps = {
  hex: string | undefined
  selected: boolean
  onPress: () => void
}

const ColorSquare = ({ hex, selected, onPress }: ColorSquareProps) => {
  const styles = StyleSheet.create({
    square: {
      width: 70,
      height: 70,
      marginRight: 8,
      borderRadius: 15,
      backgroundColor: hex,
      borderWidth: 3,
      borderColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    }
  })

  return <TouchableOpacity style={styles.square} onPress={onPress} />
}

export default ColorSquare
