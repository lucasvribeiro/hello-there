import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
  Animated,
  useColorScheme
} from 'react-native'
import { useSelector } from 'react-redux'
import * as Speech from 'expo-speech'
import * as Clipboard from 'expo-clipboard'

import Modal from './Modal'
import { DEFAULT_SHADOW } from '@/constants'
import useColorData from '@/hooks/useColorData'
import ActionButton from './ActionButton'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ColorData } from '@/types'
import { useState } from 'react'
import ColorPalette from './ColorPalette'
import Loading from './Loading'
import { Colors } from '@/constants/Colors'
interface InfoModalProps {
  isModalVisible: boolean
  setIsModalVisible: (visible: boolean) => void
}

const InfoModal = ({ isModalVisible, setIsModalVisible }: InfoModalProps) => {
  const colorScheme = useColorScheme() ?? 'light'
  const color = useSelector((state: any) => state.color.color)
  const { colorData, error, isLoading } = useColorData()

  console.log(colorData?.contrast)

  if (error) return null
  if (isLoading) return <Loading />

  return (
    <Modal visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
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

          <SpeakButton colorData={colorData} />
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <ColorCode label="HEX" value={colorData?.hex} />
          <ColorCode label="RGB" value={colorData?.rgb} />
          <ColorCode label="HSL" value={colorData?.hsl} />
          <ColorCode label="CMYK" value={colorData?.cmyk} />
        </View>

        <ColorPalette />
      </View>
    </Modal>
  )
}

const ColorCode = ({
  label,
  value
}: {
  label: string
  value: string | Array<number> | undefined
}) => {
  const color = useSelector((state: any) => state.color.color)
  const colorScheme = useColorScheme() ?? 'light'
  const valueString = Array.isArray(value) ? value.join(', ') : value
  const [scale] = useState(new Animated.Value(1))

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
      <Text style={[styles.colorCodeText, { color: Colors[colorScheme].textLight }]}>{label}</Text>

      <Animated.View style={animatedStyle}>
        <Pressable
          style={{ flexDirection: 'row' }}
          onPress={handleCopy}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={[styles.colorCodeValue, { color: Colors[colorScheme].text }]}>
            {`${valueString}`}
          </Text>
          <ActionButton
            onPress={handleCopy}
            containerStyle={styles.copyButton}
            icon={<Ionicons name="copy-outline" size={18} color={`#${color.hex}`} />}
          />
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
  copyButton: {
    backgroundColor: 'transparent',
    marginLeft: 2,
    borderRadius: 18,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  colorCodeContainer: {
    width: '48%',
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  colorCodeText: {
    fontSize: 12,
    fontFamily: 'Nunito-Light'
  },
  colorCodeValue: {
    lineHeight: 26,
    fontSize: 20,
    fontFamily: 'Nunito-Black'
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 72,
    width: '100%'
  },
  content: {
    zIndex: 1,
    paddingVertical: 38,
    paddingHorizontal: 20
  },
  colorNameContainer: {
    alignSelf: 'center',
    marginBottom: 10
  },
  speakContainer: {
    top: 0,
    zIndex: 10,
    right: -35,
    position: 'absolute'
  },
  speakButton: {
    borderRadius: 18,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    ...DEFAULT_SHADOW
  },
  hexColor: {
    alignSelf: 'center',
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    borderRadius: 18,
    borderWidth: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
    textAlign: 'center',
    ...DEFAULT_SHADOW
  }
})

export default InfoModal
