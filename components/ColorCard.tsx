import { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Share, TouchableOpacity, View } from 'react-native'
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

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: 15, right: 15, zIndex: 1 }}>
        <ActionButton
          onPress={handleShare}
          icon={
            <Ionicons name="share-social" size={24} color={`${textColor}DD`} />
          }
        />
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleTouch}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: color.hex
        }}
      >
        <ColorText
          text={colorsHistory.length > 0 ? color.hex : 'Hello there!'}
          textColor={textColor}
        />
      </TouchableOpacity>
    </View>
  )
}

export default ColorCard
