import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

import { Colors } from '@/constants'
import useTheme from '@/hooks/useTheme'
import useColorPalette from '@/hooks/useColorPalette'
import { ColorPalette as ColorPaletteType } from '@/types'
import { DEFAULT_SHADOW, ColorPalettes } from '@/constants'
import { useToastContext } from '@/contexts/ToastContext'

import Loading from './Loading'
import SegmentedControl from './SegmentedControl'

interface PaletteColorsProps {
  colorPalette: ColorPaletteType | null | undefined
  loading: boolean
}

const PaletteColors = ({ colorPalette, loading }: PaletteColorsProps) => {
  const theme = useTheme()

  return (
    <View
      style={[
        styles.colorPalette,
        !loading && { ...DEFAULT_SHADOW },
        { backgroundColor: !loading ? Colors[theme].background : 'transparent' }
      ]}
    >
      {loading ? (
        <View style={{ minHeight: 48, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Loading />
        </View>
      ) : (
        <>
          {colorPalette &&
            colorPalette.colors.map((color, index) => (
              <View
                key={color.hex}
                style={[
                  styles.colorItem,
                  { backgroundColor: `${color.hex}` },
                  index === 0 && {
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8
                  },
                  index === colorPalette.colors.length - 1 && {
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8
                  }
                ]}
              />
            ))}
        </>
      )}
    </View>
  )
}

const ColorPalette = () => {
  const theme = useTheme()
  const { showToast } = useToastContext()

  const [selectedPalette, setSelectedPalette] = useState(ColorPalettes[0].value)
  const { colorPalette, isError, isLoading } = useColorPalette(selectedPalette)

  const changePalette = (paletteId: string) => {
    setSelectedPalette(paletteId as typeof selectedPalette)
  }

  if (isError) {
    showToast('Error fetching color palette. Try again!')
  }

  return (
    <View>
      <Text style={[styles.colorPaletteLabel, { color: Colors[theme].textLight }]}>
        Color Palettes
      </Text>
      <SegmentedControl data={ColorPalettes} selected={selectedPalette} onChange={changePalette} />

      {!isError && <PaletteColors colorPalette={colorPalette} loading={isLoading} />}
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
    justifyContent: 'flex-start'
  },
  colorItem: {
    width: 48,
    height: 48
  }
})

export default ColorPalette
