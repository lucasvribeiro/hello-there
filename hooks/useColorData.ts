import { ColorDataContext } from '@/types'
import { fetchColorData } from '@/api/colorService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const useColorData = (): ColorDataContext => {
  const color = useSelector((state: any) => state.color.color)

  const { data, error, isLoading } = useQuery({
    queryKey: ['colorData', color?.hex],
    queryFn: () => fetchColorData(color?.hex || ''),
    enabled: !!color?.hex,
    staleTime: 60000 * 5, // 5 minutes
    gcTime: 60000 * 10 // 10 minutes
  })

  return { colorData: data || null, error, isLoading }
}

export default useColorData
