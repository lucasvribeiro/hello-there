import { useSelector } from 'react-redux'

import Toast from '@/components/Toast'
import ColorCard from '@/components/ColorCard'
import ColorsList from '@/components/ColorsList'
import ScreenWrapper from '@/components/ScreenWrapper'
import { View } from 'react-native'

const Home = () => {
  const history = useSelector((state: any) => state.color.history)
  const color = useSelector((state: any) => state.color.color)

  return (
    <ScreenWrapper>
      <ColorCard />

      <View style={{ marginVertical: 5 }}>
        <ColorsList data={history} highlightColor={color.hex} />
      </View>
    </ScreenWrapper>
  )
}

export default Home
