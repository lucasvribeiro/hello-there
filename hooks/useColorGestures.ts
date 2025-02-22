import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Directions, Gesture } from 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'

import { Color } from '@/types'
import { getColor } from '@/utils/colorUtils'
import { useToastContext } from '@/contexts/ToastContext'
import { addToFavorites, removeFromFavorites, setColor } from '@/redux/reducers/color'

const useColorGestures = () => {
  const dispatch = useDispatch()
  const { showToast } = useToastContext()
  const history = useSelector((state: any) => state.color.history)
  const currentIndex = useSelector((state: any) => state.color.currentIndex)
  const favorites = useSelector((state: any) => state.color.favorites)
  const color: Color = useSelector((state: any) => state.color.color)

  const doubleTap = useCallback(
    () =>
      Gesture.Tap()
        .maxDelay(150)
        .maxDuration(150)
        .numberOfTaps(2)
        .onEnd(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          const isFavorite = favorites.some((favorite: Color) => favorite.hex === color.hex)
          if (isFavorite) {
            dispatch(removeFromFavorites(color))
          } else {
            dispatch(addToFavorites(color))
            showToast(`#${color.hex} added to favorites`)
          }
        })
        .runOnJS(true),
    [dispatch, color, favorites]
  )

  const singleTap = useCallback(
    () =>
      Gesture.Tap()
        .maxDuration(200)
        .onStart(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          const newColor = getColor()
          dispatch(setColor({ color: newColor, type: 'new' }))
        })
        .runOnJS(true),
    [dispatch, history]
  )

  const flingLeft = useCallback(
    () =>
      Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

          if (currentIndex === history.length - 1) {
            const newColor = getColor()
            dispatch(setColor({ color: newColor, type: 'new' }))
          } else {
            const newIndex = currentIndex + 1
            dispatch(setColor({ color: history[newIndex], type: 'next' }))
          }
        })
        .runOnJS(true),
    [dispatch, currentIndex, history]
  )

  const flingRight = useCallback(
    () =>
      Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

          if (currentIndex > 0) {
            const newIndex = currentIndex - 1

            dispatch(setColor({ color: history[newIndex], type: 'prev' }))
          }
        })
        .runOnJS(true),
    [dispatch, currentIndex, history]
  )

  return {
    doubleTap: doubleTap(),
    singleTap: singleTap(),
    flingLeft: flingLeft(),
    flingRight: flingRight()
  }
}

export default useColorGestures
