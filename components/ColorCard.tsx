import { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import {
  Share,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated
} from 'react-native'
import { ColorsHistory, Color as ColorType, Favorites } from '@/types'
import { getLuminance, generateRandomValues, getHexColor } from '@/utils/colors'

import ColorText from './ColorText'
import ActionButton from './ActionButton'

type ColorCardProps = {
  color: ColorType
  favorites: Favorites
  colorsHistory: ColorsHistory
  changeColor: (color: ColorType) => void
  addFavorite: (color: ColorType) => void
  removeFavorite: (color: ColorType) => void
}

const ColorCard = ({
  color,
  colorsHistory,
  changeColor,
  favorites,
  addFavorite,
  removeFavorite
}: ColorCardProps) => {
  const [textColor, setTextColor] = useState('#000000')
  const isFavorite = favorites.some((c) => c.hex === color.hex)

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

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(color)
    } else {
      addFavorite(color)
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
      marginBottom: 4,
      borderRadius: 16,
      borderWidth: 5,
      borderColor: '#EEEEEE',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: '#EEEEEE'
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
      borderRadius: 12,
      overflow: 'hidden'
    },
    actionButtons: {
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 12,
      paddingVertical: 12,
      gap: 7,
      top: 0,
      zIndex: 1
    },
    rightButtons: {
      flexDirection: 'row',
      gap: 7
    }
  })

  return (
    <Animated.View style={styles.card}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleTouch}
        style={styles.cardContent}
      >
        <View style={styles.actionButtons}>
          <ActionButton
            onPress={handleFavorite}
            icon={<Ionicons name="ellipsis-horizontal" size={24} color={`${textColor}DD`} />}
          />

          <View style={styles.rightButtons}>
            <ActionButton
              onPress={handleFavorite}
              icon={
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={24}
                  color={`${textColor}DD`}
                />
              }
            />

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
        </View>

        <ColorText
          text={colorsHistory.length > 0 ? color.hex : 'Hello there!'}
          textColor={textColor}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default ColorCard
