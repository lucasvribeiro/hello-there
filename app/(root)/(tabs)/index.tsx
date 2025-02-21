import ColorCard from '@/components/ColorCard'
import ScreenWrapper from '@/components/ScreenWrapper'
import ColorsHistory from '@/components/ColorsHistory'

const Home = () => {
  return (
    <ScreenWrapper>
      <ColorCard />

      <ColorsHistory />
    </ScreenWrapper>
  )
}

export default Home
