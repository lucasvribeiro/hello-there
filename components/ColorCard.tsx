import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler'
import * as Clipboard from 'expo-clipboard'
import * as Haptics from 'expo-haptics'

import { Color } from '@/types'
import useTheme from '@/hooks/useTheme'
import { getColor } from '@/utils/colorUtils'
import { Colors } from '@/constants'
import { DEFAULT_SHADOW } from '@/constants'
import { addToFavorites, setColor } from '@/redux/reducers/color'
import ActionButton from './ActionButton'
import ColorActions from './ColorActions'
import { useToastContext } from '@/contexts/ToastContext'

const ColorCard = () => {
  const dispatch = useDispatch()
  const { showToast } = useToastContext()
  const theme = useTheme()

  const history = useSelector((state: any) => state.color.history)
  const color: Color = useSelector((state: any) => state.color.color)
  const favorites = useSelector((state: any) => state.color.favorites)
  const currentIndex = useSelector((state: any) => state.color.currentIndex)

  const buttonColor = Colors[color?.contrast ?? 'light'].background
  const isFavorite = favorites.some((favorite: Color) => favorite.hex === color.hex)

  const handleCopy = () => {
    Clipboard.setStringAsync(`#${color.hex}`)
  }

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      if (!isFavorite) {
        showToast(`#${color.hex} added to favorites`)
        dispatch(addToFavorites(color))
      }
    })
    .runOnJS(true)

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      const newColor = getColor()
      dispatch(setColor({ ...newColor, type: 'new' }))
    })
    .runOnJS(true)

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

      if (currentIndex === history.length - 1) {
        const newColor = getColor()
        dispatch(setColor({ ...newColor, type: 'new' }))
      } else {
        const newIndex = currentIndex + 1
        dispatch(setColor({ ...history[newIndex], type: 'next' }))
      }
    })
    .runOnJS(true)

  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

      if (currentIndex > 0) {
        const newIndex = currentIndex - 1

        dispatch(setColor({ ...history[newIndex], type: 'prev' }))
      }
    })
    .runOnJS(true)

  const tapGesture = Gesture.Tap().onTouchesDown(() => true)

  return (
    <GestureDetector gesture={Gesture.Exclusive(flingRight, flingLeft, singleTap, doubleTap)}>
      <View style={[styles.card, { backgroundColor: Colors[theme].background }]}>
        <View style={[styles.cardContent, { backgroundColor: `#${color.hex}` }]}>
          <View style={styles.actionsContainer}>
            <GestureDetector gesture={tapGesture}>
              <ColorActions.InfoButton />
            </GestureDetector>

            <View style={styles.rightButtons}>
              <GestureDetector gesture={tapGesture}>
                <ColorActions.FavoriteButton />
              </GestureDetector>
              <GestureDetector gesture={tapGesture}>
                <ColorActions.ShareButton />
              </GestureDetector>
            </View>
          </View>

          <GestureDetector gesture={tapGesture}>
            <ActionButton
              onPress={handleCopy}
              text={`#${color.hex}`}
              textStyle={{ color: buttonColor }}
              containerStyle={[styles.hexButton, { backgroundColor: `${buttonColor}22` }]}
            />
          </GestureDetector>
        </View>
      </View>
    </GestureDetector>
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
    gap: 8,
    flexDirection: 'row'
  },
  hexButton: {
    borderRadius: 14,
    paddingHorizontal: 16
  }
})

export default ColorCard
