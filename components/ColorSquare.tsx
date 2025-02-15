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
      marginRight: 10,
      borderRadius: 15,
      shadowColor: hex,
      backgroundColor: hex,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderWidth: selected ? 2 : 0,
      borderColor: selected ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
    }
  })

  return <TouchableOpacity style={styles.square} onPress={onPress} />
}

export default ColorSquare
