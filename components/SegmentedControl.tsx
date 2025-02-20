import { memo } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

import { Theme } from '@/types'
import { Colors, DEFAULT_SHADOW } from '@/constants'
import useTheme from '@/hooks/useTheme'

interface SegmentedControlProps {
  selected: string
  data: Array<{ value: string; title: string }>
  onChange: (value: string) => void
}

const SegmentedControl = ({ data, selected, onChange }: SegmentedControlProps) => {
  const theme: Theme = useTheme()

  const getSegmentStyles = (value: string, index: number) => {
    return [
      styles.segment,
      index !== data.length - 1 && { borderRightWidth: 1 },
      {
        backgroundColor: value === selected ? Colors[theme].text : 'transparent',
        borderRightColor: Colors[theme].background
      }
    ]
  }

  const getTextStyles = (value: string) => {
    return [
      styles.segmentText,
      {
        color: value === selected ? Colors[theme].backgroundLight : Colors[theme].textLight
      }
    ]
  }

  return (
    <View
      style={[
        styles.segmentedControl,
        {
          borderColor: Colors[theme].background,
          backgroundColor: Colors[theme].backgroundLight
        }
      ]}
    >
      {data.map((item, index) => (
        <Pressable
          key={item.value}
          onPress={() => onChange(item.value)}
          style={getSegmentStyles(item.value, index)}
        >
          <Text style={getTextStyles(item.value)}>{item.title}</Text>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  segmentedControl: {
    marginTop: 5,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    ...DEFAULT_SHADOW
  },
  segment: {
    minWidth: 60,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  segmentText: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Nunito-Bold'
  }
})

export default memo(SegmentedControl)
