import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import useColorPalette from '@/hooks/useColorPalette'
import { DEFAULT_SHADOW, COLOR_PALETTES } from '@/constants'
import { Colors } from '@/constants/Colors'

const PaletteColors = ({ colors }: { colors: Array<{ hex: string }> }) => {
  const colorScheme = useColorScheme() ?? 'light'

  return (
    <View style={[styles.colorPalette, { backgroundColor: Colors[colorScheme].background }]}>
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
  const [selectedPalette, setSelectedPalette] = useState(COLOR_PALETTES[0].id)
  const { colorPalette, error, isLoading } = useColorPalette(selectedPalette)
  const colorScheme = useColorScheme() ?? 'light'

  const renderColorPalette = () => {
    return <PaletteColors colors={colorPalette?.colors || []} />
  }

  const changePalette = (paletteId: string) => {
    setSelectedPalette(paletteId)
  }

  // if (error || isLoading) return null

  return (
    <View>
      <Text style={[styles.colorPaletteLabel, { color: Colors[colorScheme].textLight }]}>
        Color Palettes
      </Text>

      <View
        style={[
          styles.segmentedControl,
          {
            backgroundColor: Colors[colorScheme].backgroundLight,
            borderColor: Colors[colorScheme].background
          }
        ]}
      >
        {COLOR_PALETTES.map((palette, index) => (
          <Pressable
            key={palette.id}
            style={[
              styles.segment,
              selectedPalette === palette.id && { backgroundColor: Colors[colorScheme].text },
              index !== COLOR_PALETTES.length - 1 && {
                borderRightWidth: 1,
                borderRightColor: Colors[colorScheme].background
              }
            ]}
            onPress={() => changePalette(palette.id)}
          >
            <Text
              style={[
                styles.segmentText,
                selectedPalette === palette.id
                  ? {
                      color: Colors[colorScheme].backgroundLight,
                      fontFamily: 'Nunito-Black'
                    }
                  : {
                      color: Colors[colorScheme].textLight,
                      fontFamily: 'Nunito-Regular'
                    }
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
    alignSelf: 'flex-start',
    flexDirection: 'row',
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
    fontFamily: 'Nunito-Regular'
  },
  colorPaletteLabel: {
    fontSize: 12,
    fontFamily: 'Nunito-Light'
  },
  colorPalette: {
    overflow: 'hidden',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
    padding: 6,
    borderRadius: 12,
    ...DEFAULT_SHADOW
  }
})

export default ColorPalette
