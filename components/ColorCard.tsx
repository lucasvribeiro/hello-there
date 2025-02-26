import { useEffect } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import * as Clipboard from 'expo-clipboard'

import { Color } from '@/types'
import useTheme from '@/hooks/useTheme'
import { Colors } from '@/constants'
import { DEFAULT_SHADOW } from '@/constants'
import { addToFavorites, removeFromFavorites } from '@/redux/reducers/color'
import ActionButton from './ActionButton'
import ColorCardButtons from './ColorCardButtons'
import { useToastContext } from '@/contexts/ToastContext'
import { memo, useCallback, useMemo, useRef } from 'react'
import useColorGestures from '@/hooks/useColorGestures'
import useAchievement from '@/hooks/useAchievement'

const ColorCard = memo(() => {
  useAchievement()

  const theme = useTheme()
  const dispatch = useDispatch()
  const { showToast } = useToastContext()
  const { singleTap, doubleTap, flingLeft, flingRight } = useColorGestures()

  const color: Color = useSelector((state: any) => state.color.color)
  const favorites = useSelector((state: any) => state.color.favorites)

  const buttonColor = Colors[color?.contrast ?? 'light'].background
  const isFavorite = favorites.some((favorite: Color) => favorite.hex === color.hex)

  const handleCopy = useCallback(() => {
    Clipboard.setStringAsync(`#${color.hex}`)
  }, [color.hex])

  const handleFavorite = useCallback(() => {
    if (isFavorite) {
      dispatch(removeFromFavorites(color))
    } else {
      dispatch(addToFavorites(color))
      showToast(`#${color.hex} added to favorites`)
    }
  }, [isFavorite, color, dispatch, showToast])

  const tapGesture = useMemo(() => Gesture.Tap().onTouchesDown(() => {}), [])

  return (
    <GestureDetector gesture={Gesture.Exclusive(flingLeft, flingRight, doubleTap, singleTap)}>
      <View style={[styles.card, { backgroundColor: Colors[theme].background }]}>
        <ColorCardContent
          color={color}
          buttonColor={buttonColor}
          handleCopy={handleCopy}
          handleFavorite={handleFavorite}
          tapGesture={tapGesture}
        />
      </View>
    </GestureDetector>
  )
})

interface ColorCardContentProps {
  color: Color
  buttonColor: string
  handleCopy: () => void
  handleFavorite: () => void
  tapGesture: any
}

const ColorCardContent = memo(
  ({ color, buttonColor, handleCopy, handleFavorite, tapGesture }: ColorCardContentProps) => {
    const progress = useRef(new Animated.Value(0)).current
    const prevColor = useSelector((state: any) => state.color.prevColor)

    useEffect(() => {
      progress.setValue(0)
      Animated.timing(progress, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }).start()
    }, [color.hex])

    const backgroundColor = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [`#${prevColor.hex}`, `#${color.hex}`]
    })

    return (
      <Animated.View style={[styles.cardContent, { backgroundColor }]}>
        <View style={styles.actionsContainer}>
          <GestureDetector gesture={tapGesture}>
            <ColorCardButtons.InfoButton />
          </GestureDetector>

          <View style={styles.rightButtons}>
            <GestureDetector gesture={tapGesture}>
              <ColorCardButtons.FavoriteButton handleFavorite={handleFavorite} />
            </GestureDetector>

            <GestureDetector gesture={tapGesture}>
              <ColorCardButtons.ShareButton />
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
      </Animated.View>
    )
  }
)

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
