import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import useColorPalette from '@/hooks/useColorPalette'
import { DEFAULT_SHADOW, COLOR_PALETTES } from '@/constants'
import { Colors } from '@/constants/Colors'
import useTheme from '@/hooks/useTheme'

const PaletteColors = ({ colors }: { colors: Array<{ hex: string }> }) => {
  const { theme } = useTheme()

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
  const [selectedPalette, setSelectedPalette] = useState(COLOR_PALETTES[0].id)
  const { colorPalette, error, isLoading } = useColorPalette(selectedPalette)
  const { theme } = useTheme()

  const renderColorPalette = () => {
    return <PaletteColors colors={colorPalette?.colors || []} />
  }

  const changePalette = (paletteId: string) => {
    setSelectedPalette(paletteId)
  }

  // if (error || isLoading) return null

  return (
    <View>
      <Text style={[styles.colorPaletteLabel, { color: Colors[theme].textLight }]}>
        Color Palettes
      </Text>

      <View
        style={[
          styles.segmentedControl,
          {
            backgroundColor: Colors[theme].backgroundLight,
            borderColor: Colors[theme].background
          }
        ]}
      >
        {COLOR_PALETTES.map((palette, index) => (
          <Pressable
            key={palette.id}
            style={[
              styles.segment,
              selectedPalette === palette.id && { backgroundColor: Colors[theme].text },
              index !== COLOR_PALETTES.length - 1 && {
                borderRightWidth: 1,
                borderRightColor: Colors[theme].background
              }
            ]}
            onPress={() => changePalette(palette.id)}
          >
            <Text
              style={[
                styles.segmentText,
                selectedPalette === palette.id
                  ? {
                      color: Colors[theme].backgroundLight,
                      fontFamily: 'Nunito-Black'
                    }
                  : {
                      color: Colors[theme].textLight,
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
