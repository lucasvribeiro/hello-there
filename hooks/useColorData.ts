import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

import { ColorDataQuery } from '@/types'
import { TIMING } from '@/constants'
import { fetchColorData } from '@/api/colorService'

const useColorData = (): ColorDataQuery => {
  const color = useSelector((state: any) => state.color.color)

  const { data, isError, isLoading } = useQuery({
    queryKey: ['colorData', color.hex],
    queryFn: () => fetchColorData(color.hex),
    enabled: !!color.hex,
    staleTime: TIMING.FIVE_MINUTES,
    gcTime: TIMING.TEN_MINUTES,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  return { colorData: data, isError, isLoading }
}

export default useColorData
