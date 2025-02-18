import { ColorPaletteContext } from '@/types'
import { fetchColorPalette } from '@/api/colorService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const useColorPalette = (paletteType: string = 'monochrome'): ColorPaletteContext => {
  const color = useSelector((state: any) => state.color.color)

  const { data, error, isLoading } = useQuery({
    queryKey: ['colorPalette', color?.hex, paletteType],
    queryFn: async () => {
      const palette = await fetchColorPalette(color?.hex || '', paletteType)
      return palette
    },
    enabled: !!color?.hex,
    staleTime: 60000 * 5, // 5 minutes
    gcTime: 60000 * 10 // 10 minutes
  })

  return { colorPalette: data || null, error, isLoading }
}

export default useColorPalette
