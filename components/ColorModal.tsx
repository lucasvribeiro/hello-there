import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { View, StyleSheet, Pressable, Text, Animated } from 'react-native'
import * as Speech from 'expo-speech'
import * as Clipboard from 'expo-clipboard'
import Ionicons from '@expo/vector-icons/Ionicons'

import { ColorData } from '@/types'
import { Colors } from '@/constants'
import useTheme from '@/hooks/useTheme'
import { DEFAULT_SHADOW } from '@/constants'
import useColorData from '@/hooks/useColorData'
import { useToastContext } from '@/contexts/ToastContext'

import Modal from './Modal'
import Loading from './Loading'
import ActionButton from './ActionButton'
import ColorPalette from './ColorPalette'
interface ColorModalProps {
  isModalVisible: boolean
  setIsModalVisible: (visible: boolean) => void
}

const ColorModal = ({ isModalVisible, setIsModalVisible }: ColorModalProps) => {
  const { showToast } = useToastContext()
  const { colorData, isError, isLoading } = useColorData()
  const color = useSelector((state: any) => state.color.color)

  if (isError) {
    showToast('Error fetching color data. Try again!')
    return null
  }

  return (
    <Modal visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Loading />
        </View>
      ) : (
        <>
          <View style={[styles.border, { backgroundColor: `#${color.hex}` }]} />

          <View style={styles.content}>
            <View style={styles.colorNameContainer}>
              <Text
                style={[
                  styles.hexColor,
                  {
                    backgroundColor: `#${color.hex}`,
                    borderColor: `${colorData?.contrast}CC`,
                    color: `${colorData?.contrast}EE`
                  }
                ]}
              >{`${colorData?.name}`}</Text>

              {colorData && <SpeakButton colorData={colorData} />}
            </View>

            <View
              style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <ColorCode label="HEX" value={colorData?.hex} />
              <ColorCode label="RGB" value={colorData?.rgb} />
              <ColorCode label="HSL" value={colorData?.hsl} />
              <ColorCode label="CMYK" value={colorData?.cmyk} />
            </View>

            <ColorPalette />
          </View>
        </>
      )}
    </Modal>
  )
}

interface ColorCodeProps {
  label: string
  value: string | Array<number> | undefined
}

const ColorCode = ({ label, value }: ColorCodeProps) => {
  const theme = useTheme()
  const [scale] = useState(new Animated.Value(1))
  const color = useSelector((state: any) => state.color.color)
  const valueString = Array.isArray(value) ? value.join(', ') : value

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true
    }).start()
  }

  const animatedStyle = {
    transform: [{ scale }]
  }

  const handleCopy = () => {
    Clipboard.setStringAsync(`${valueString}`)
  }

  return (
    <View style={styles.colorCodeContainer}>
      <Text style={[styles.colorCodeText, { color: Colors[theme].textLight }]}>{label}</Text>

      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={handleCopy}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={{ flexDirection: 'row' }}
        >
          <Text style={[styles.colorCodeValue, { color: Colors[theme].text }]}>
            {`${valueString}`}
          </Text>

          <Ionicons style={styles.copyIcon} name="copy-outline" size={18} color={`#${color.hex}`} />
        </Pressable>
      </Animated.View>
    </View>
  )
}

const SpeakButton = ({ colorData }: { colorData: ColorData | null }) => {
  const speakColorName = async () => {
    if (colorData?.name && !(await Speech.isSpeakingAsync())) {
      Speech.speak(`${colorData.name}`, { language: 'en' })
    }
  }

  return (
    <View style={styles.speakContainer}>
      <ActionButton
        onPress={speakColorName}
        containerStyle={[styles.speakButton, { backgroundColor: `${colorData?.contrast}EE` }]}
        icon={<Ionicons name="mic-outline" size={18} color={`${colorData?.hex}`} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  copyIcon: {
    marginLeft: 5,
    alignSelf: 'center'
  },
  colorCodeContainer: {
    width: '48%',
    marginBottom: 10,
    alignSelf: 'flex-start'
  },
  colorCodeText: {
    fontSize: 12,
    fontFamily: 'Nunito-Light'
  },
  colorCodeValue: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: 'Nunito-Black'
  },
  border: {
    top: 0,
    left: 0,
    right: 0,
    height: 72,
    width: '100%',
    position: 'absolute'
  },
  content: {
    zIndex: 1,
    minHeight: 400,
    paddingVertical: 38,
    paddingHorizontal: 20
  },
  colorNameContainer: {
    marginBottom: 10,
    alignSelf: 'center'
  },
  speakContainer: {
    top: 0,
    zIndex: 10,
    right: -35,
    position: 'absolute'
  },
  speakButton: {
    padding: 5,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...DEFAULT_SHADOW
  },
  hexColor: {
    fontSize: 24,
    borderWidth: 4,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
    ...DEFAULT_SHADOW
  },
  loadingContainer: {
    minHeight: 400,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ColorModal
