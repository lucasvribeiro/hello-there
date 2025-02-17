import { useState } from 'react'
import { Share, View, StyleSheet, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as Haptics from 'expo-haptics'
import * as Clipboard from 'expo-clipboard'

import { Color } from '@/types'
import ActionButton from './ActionButton'
import { getColor } from '@/utils/colors'
import { DEFAULT_SHADOW } from '@/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setColor, addToHistory, addToFavorites, removeFromFavorites } from '@/redux/reducers/color'
import InfoModal from './InfoModal'

const ColorCard = () => {
  const dispatch = useDispatch()
  const color = useSelector((state: any) => state.color.color)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleTouch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    const newColor = getColor()
    dispatch(setColor(newColor))
    dispatch(addToHistory(newColor))
  }

  const handleCopy = () => {
    Clipboard.setStringAsync(`#${color.hex}`)
  }

  return (
    <View style={styles.card}>
      <Pressable
        onPress={handleTouch}
        style={[styles.cardPressable, { backgroundColor: `#${color.hex}` }]}
      >
        <View style={styles.actionsContainer}>
          <InfoButton isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />

          <View style={styles.rightButtons}>
            <FavoriteButton />
            <ShareButton />
          </View>
        </View>

        <ActionButton
          onPress={handleCopy}
          containerStyle={styles.hexButton}
          text={`#${color.hex}`}
        />
      </Pressable>

      <InfoModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </View>
  )
}

interface InfoButtonProps {
  isModalVisible: boolean
  setIsModalVisible: (visible: boolean) => void
}

const InfoButton = ({ isModalVisible, setIsModalVisible }: InfoButtonProps) => {
  const handleInfoModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <ActionButton
      onPress={handleInfoModal}
      icon={<Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />}
    />
  )
}
const FavoriteButton = () => {
  const dispatch = useDispatch()
  const color = useSelector((state: any) => state.color.color)
  const favorites = useSelector((state: any) => state.color.favorites)

  const isFavorite = favorites.some((favorite: Color) => favorite.hex === color.hex)

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(color))
    } else {
      dispatch(addToFavorites(color))
    }
  }

  return (
    <ActionButton
      onPress={handleFavorite}
      icon={<Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color="#FFFFFF" />}
    />
  )
}

const ShareButton = () => {
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
      icon={<Ionicons name="share-social-outline" size={24} color="#FFFFFF" />}
    />
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 14,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    ...DEFAULT_SHADOW
  },
  cardPressable: {
    flex: 1,
    borderRadius: 12,
    position: 'relative',
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
