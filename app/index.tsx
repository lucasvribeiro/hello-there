import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import ColorCard from '@/components/ColorCard'
import ColorsHistory from '@/components/ColorsHistory'

const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar animated style="dark" />

      <SafeAreaView style={{ position: 'relative', flex: 1 }}>
        <ColorCard />

        <ColorsHistory />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#222222'
  }
})

export default Home
