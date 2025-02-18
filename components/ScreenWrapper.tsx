import { Colors } from '@/constants/Colors'
import { StyleSheet, View, Text, ScrollView, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ScreenWrapperProps {
  title?: string
  scrollable?: boolean
  backgroundColor?: string
  children: React.ReactNode
}

const ScreenWrapper = ({ title, children, scrollable = false }: ScreenWrapperProps) => {
  const colorScheme = useColorScheme() ?? 'light'

  return (
    <SafeAreaView
      style={[styles.safeContainer, { backgroundColor: Colors[colorScheme].backgroundLight }]}
    >
      {title && (
        <View style={styles.header}>
          <Text style={[styles.title, { color: Colors[colorScheme].text }]}>{title}</Text>
        </View>
      )}

      {scrollable ? (
        <ScrollView style={styles.contentContainer}>{children}</ScrollView>
      ) : (
        <View style={styles.contentContainer}>{children}</View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 12
  },
  header: {
    paddingBottom: 24
  },
  title: {
    fontSize: 28,
    fontFamily: 'Nunito-Black'
  },
  contentContainer: {
    flex: 1
  }
})

export default ScreenWrapper
