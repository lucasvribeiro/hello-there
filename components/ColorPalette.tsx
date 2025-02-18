import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import useColorPalette from '@/hooks/useColorPalette'
import { DEFAULT_SHADOW, COLOR_PALETTES } from '@/constants'

const PaletteColors = ({ colors }: { colors: Array<{ hex: string }> }) => (
  <View style={styles.colorPalette}>
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

const ColorPalette = () => {
  const [selectedPalette, setSelectedPalette] = useState(COLOR_PALETTES[0].id)
  const { colorPalette, error, isLoading } = useColorPalette(selectedPalette)

  const renderColorPalette = () => {
    return <PaletteColors colors={colorPalette?.colors || []} />
  }

  const changePalette = (paletteId: string) => {
    console.log('change palette', paletteId)
    setSelectedPalette(paletteId)
  }

  console.log('color palette', colorPalette)

  // if (error || isLoading) return null

  return (
    <View>
      <Text style={styles.colorPaletteLabel}>Color Palettes</Text>

      <View style={[styles.segmentedControl]}>
        {COLOR_PALETTES.map((palette, index) => (
          <Pressable
            key={palette.id}
            style={[
              styles.segment,
              selectedPalette === palette.id && { backgroundColor: '#222222' },
              index !== COLOR_PALETTES.length - 1 && {
                borderRightWidth: 1,
                borderRightColor: '#CCCCCC'
              }
            ]}
            onPress={() => changePalette(palette.id)}
          >
            <Text
              style={[
                styles.segmentText,
                selectedPalette === palette.id && { color: '#FFFFFF', fontFamily: 'Nunito-Black' }
              ]}
            >
              {palette.title}
            </Text>
          </Pressable>
        ))}
      </View>

      {renderColorPalette()}
    </View>
  )
}

const styles = StyleSheet.create({
  segmentedControl: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 5
    // ...DEFAULT_SHADOW
  },
  segment: {
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  segmentText: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#999999'
  },
  colorPaletteLabel: {
    fontSize: 12,
    fontFamily: 'Nunito-Light',
    color: '#999999'
  },
  colorPalette: {
    overflow: 'hidden',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
    padding: 6,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    ...DEFAULT_SHADOW
  }
})

export default ColorPalette
