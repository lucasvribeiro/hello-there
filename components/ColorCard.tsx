import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Share, View, StyleSheet, Pressable, useColorScheme } from 'react-native'
import * as Haptics from 'expo-haptics'
import * as Clipboard from 'expo-clipboard'
import Ionicons from '@expo/vector-icons/Ionicons'
import { setColor, addToHistory, addToFavorites, removeFromFavorites } from '@/redux/reducers/color'

import { Color } from '@/types'
import InfoModal from './ColorModal'
import { getColor } from '@/utils/colors'
import { DEFAULT_SHADOW } from '@/constants'
import ActionButton from './ActionButton'
import { useToastContext } from '@/contexts/ToastContext'
import { Colors } from '@/constants/Colors'
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler'

const ColorCard = () => {
  const dispatch = useDispatch()
  const colorScheme = useColorScheme() ?? 'light'

  const color = useSelector((state: any) => state.color.color)
  const history = useSelector((state: any) => state.color.history)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const contrastColor = color?.luminance
    ? color?.luminance < 0.179
      ? '#EEEEEE'
      : '#111111'
    : Colors[colorScheme].text

  const handleCopy = () => {
    Clipboard.setStringAsync(`#${color.hex}`)
  }

  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

      let newColor = getColor()

      console.log('newColor', newColor)
      dispatch(setColor(newColor))
      dispatch(addToHistory(newColor))
    })
    .runOnJS(true)

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

      const prevColor = history[history.length - 2]

      dispatch(setColor(prevColor))
    })
    .runOnJS(true)

  return (
    <GestureDetector gesture={Gesture.Simultaneous(flingRight, flingLeft)}>
      <View style={[styles.card, { backgroundColor: Colors[colorScheme].background }]}>
        <View style={[styles.cardContent, { backgroundColor: `#${color.hex}` }]}>
          <View style={styles.actionsContainer}>
            <InfoButton
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              color={contrastColor}
            />

            <View style={styles.rightButtons}>
              <FavoriteButton contrastColor={contrastColor} />
              <ShareButton contrastColor={contrastColor} />
            </View>
          </View>

          <ActionButton
            onPress={handleCopy}
            containerStyle={[styles.hexButton, { backgroundColor: `${contrastColor}22` }]}
            textStyle={{ color: contrastColor }}
            text={`#${color.hex}`}
          />
        </View>

        {isModalVisible && (
          <InfoModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
        )}
      </View>
    </GestureDetector>
  )
}

interface InfoButtonProps {
  isModalVisible: boolean
  color: string
  setIsModalVisible: (visible: boolean) => void
}

const InfoButton = ({ isModalVisible, setIsModalVisible, color }: InfoButtonProps) => {
  const handleInfoModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <ActionButton
      onPress={handleInfoModal}
      containerStyle={{ backgroundColor: `${color}22` }}
      icon={<Ionicons name="information-circle-outline" size={24} color={color} />}
    />
  )
}
const FavoriteButton = ({ contrastColor }: { contrastColor: string }) => {
  const dispatch = useDispatch()
  const { showToast } = useToastContext()

  const color = useSelector((state: any) => state.color.color)
  const favorites = useSelector((state: any) => state.color.favorites)

  const isFavorite = favorites.some((favorite: Color) => favorite.hex === color.hex)

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(color))
    } else {
      showToast(`#${color.hex} added to favorites`)
      dispatch(addToFavorites(color))
    }
  }

  return (
    <ActionButton
      onPress={handleFavorite}
      containerStyle={{ backgroundColor: `${contrastColor}22` }}
      icon={
        <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={contrastColor} />
      }
    />
  )
}

const ShareButton = ({ contrastColor }: { contrastColor: string }) => {
  const color = useSelector((state: any) => state.color)

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

  return (
    <ActionButton
      onPress={handleShare}
      containerStyle={{ backgroundColor: `${contrastColor}22` }}
      icon={<Ionicons name="share-social-outline" size={24} color={contrastColor} />}
    />
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 14,
    borderRadius: 20,
    ...DEFAULT_SHADOW
  },
  cardContent: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...DEFAULT_SHADOW
  },
  actionsContainer: {
    top: 10,
    zIndex: 1,
    width: '100%',
    paddingHorizontal: 12,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 8
  },
  hexButton: {
    borderRadius: 14,
    paddingHorizontal: 16
  }
})

export default ColorCard
