import React, { useState } from 'react'
import { Share } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from '@expo/vector-icons/Ionicons'

import { Color } from '@/types'
import { Colors } from '@/constants/Colors'

import InfoModal from './ColorModal'
import ActionButton from './ActionButton'
import { useToastContext } from '@/contexts/ToastContext'
import { addToFavorites, removeFromFavorites } from '@/redux/reducers/color'

const InfoButton = () => {
  const [colorInfoModal, setColorInfoModal] = useState(false)

  const color: Color = useSelector((state: any) => state.color.color)
  const buttonColor = Colors[color?.contrast ?? 'light'].background

  const handleColorInfoModal = () => {
    setColorInfoModal(!colorInfoModal)
  }

  return (
    <>
      <ActionButton
        onPress={handleColorInfoModal}
        containerStyle={{ backgroundColor: `${buttonColor}22` }}
        icon={<Ionicons name="information-circle-outline" size={24} color={buttonColor} />}
      />

      {colorInfoModal && (
        <InfoModal isModalVisible={colorInfoModal} setIsModalVisible={setColorInfoModal} />
      )}
    </>
  )
}

const FavoriteButton = () => {
  const dispatch = useDispatch()
  const { showToast } = useToastContext()

  const color: Color = useSelector((state: any) => state.color.color)
  const favorites: Color[] = useSelector((state: any) => state.color.favorites)

  const buttonColor = Colors[color?.contrast ?? 'light'].background
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
      containerStyle={{ backgroundColor: `${buttonColor}22` }}
      icon={
        <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={buttonColor} />
      }
    />
  )
}

const ShareButton = () => {
  const color: Color = useSelector((state: any) => state.color.color)
  const buttonColor = Colors[color?.contrast ?? 'light'].background

  const handleShare = async () => {
    try {
      await Share.share({
        message: `#${color.hex}`,
        url: ''
      })
    } catch (error: any) {
      console.error('[ERROR] handleShare:', error)
    }
  }

  return (
    <ActionButton
      onPress={handleShare}
      containerStyle={{ backgroundColor: `${buttonColor}22` }}
      icon={<Ionicons name="share-social-outline" size={24} color={buttonColor} />}
    />
  )
}

export default {
  InfoButton,
  FavoriteButton,
  ShareButton
}
