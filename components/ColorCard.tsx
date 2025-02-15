import { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Share, TouchableOpacity, View, StyleSheet } from 'react-native'
import { ColorsHistory, Color as ColorType } from '@/types'
import { getLuminance, generateRandomValues, getHexColor } from '@/utils/colors'

import ColorText from './ColorText'
import ActionButton from './ActionButton'

type ColorCardProps = {
  color: ColorType
  colorsHistory: ColorsHistory
  changeColor: (color: ColorType) => void
}

const ColorCard = ({ color, colorsHistory, changeColor }: ColorCardProps) => {
  const [textColor, setTextColor] = useState('#000000')

  const handleTouch = () => {
    const [r, g, b] = generateRandomValues()
    const hexColor = getHexColor(r, g, b)

    changeColor({ hex: hexColor, luminance: getLuminance(r, g, b) })
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${color.hex}`,
        url: `https://color-generator-app.vercel.app/?color=${color.hex}`
      })
    } catch (error: any) {
      console.error('[ERROR] handleShare:', error)
    }
  }

  useEffect(
    function setTextColorBasedOnLuminance() {
      setTextColor(
        color?.luminance && color.luminance < 0.5 ? '#FFFFFF' : '#000000'
      )
    },
    [color]
  )

  const styles = StyleSheet.create({
    card: {
      flex: 1,
      marginBottom: 16,
      borderRadius: 20,
      borderWidth: 10,
      borderColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: '#FFFFFF'
    },
    cardContent: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      backgroundColor: color.hex,
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius: 12
    }
  })

  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleTouch}
        style={styles.cardContent}
      >
        <View style={{ position: 'absolute', top: 15, right: 15, zIndex: 1 }}>
          <ActionButton
            onPress={handleShare}
            icon={
              <Ionicons
                name="share-social"
                size={24}
                color={`${textColor}DD`}
              />
            }
          />
        </View>

        <ColorText
          text={colorsHistory.length > 0 ? color.hex : 'Hello there!'}
          textColor={textColor}
        />
      </TouchableOpacity>
    </View>
  )
}

export default ColorCard
