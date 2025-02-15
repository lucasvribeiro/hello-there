import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent
} from 'react-native'
import * as Clipboard from 'expo-clipboard'

interface ColorTextProps {
  text: string | null
  textColor: string
}

const ColorText = ({ text, textColor }: ColorTextProps) => {
  const handleCopy = async (e: GestureResponderEvent) => {
    await Clipboard.setStringAsync(text ?? '')
  }

  const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    text: {
      fontSize: 24,
      color: textColor,
      fontFamily: 'Nunito-ExtraBold'
    }
  })

  return (
    <TouchableOpacity style={styles.container} onPress={handleCopy}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default ColorText
