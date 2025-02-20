import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import useColorPalette from '@/hooks/useColorPalette'
import { DEFAULT_SHADOW, ColorPalettes } from '@/constants'
import { Colors } from '@/constants'
import useTheme from '@/hooks/useTheme'
import SegmentedControl from './SegmentedControl'

const PaletteColors = ({ colors }: { colors: Array<{ hex: string }> }) => {
  const theme = useTheme()

  return (
    <View style={[styles.colorPalette, { backgroundColor: Colors[theme].background }]}>
      {colors.map((color, index) => (
        <View
          key={color.hex}
          style={{
            width: 48,
            height: 48,
            backgroundColor: `${color.hex}`,
            borderTopLeftRadius: index === 0 ? 8 : 0,
            borderBottomLeftRadius: index === 0 ? 8 : 0,
            borderTopRightRadius: index === colors.length - 1 ? 8 : 0,
            borderBottomRightRadius: index === colors.length - 1 ? 8 : 0
          }}
        />
      ))}
    </View>
  )
}

const ColorPalette = () => {
  const theme = useTheme()
  const [selectedPalette, setSelectedPalette] = useState(ColorPalettes[0].value)
  const { colorPalette, isError, isLoading } = useColorPalette(selectedPalette)

  const changePalette = (paletteId: string) => {
    setSelectedPalette(paletteId as typeof selectedPalette)
  }

  return (
    <View>
      <Text style={[styles.colorPaletteLabel, { color: Colors[theme].textLight }]}>
        Color Palettes
      </Text>

      <SegmentedControl data={ColorPalettes} selected={selectedPalette} onChange={changePalette} />

      {colorPalette && <PaletteColors colors={colorPalette.colors} />}
    </View>
  )
}

const styles = StyleSheet.create({
  colorPaletteLabel: {
    fontSize: 12,
    fontFamily: 'Nunito-Light'
  },
  colorPalette: {
    padding: 6,
    marginTop: 5,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    ...DEFAULT_SHADOW
  }
})

export default ColorPalette
