import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

import { ColorPaletteQuery } from '@/types'
import { fetchColorPalette } from '@/api/colorService'
import { ColorPalettes, TIMING } from '@/constants'

const DEFAULT_PALETTE_TYPE = ColorPalettes[0].value

const useColorPalette = (paletteType: string = DEFAULT_PALETTE_TYPE): ColorPaletteQuery => {
  const color = useSelector((state: any) => state.color.color)

  const { data, isError, isLoading } = useQuery({
    queryKey: ['colorPalette', color.hex, paletteType],
    queryFn: () => fetchColorPalette(color.hex, paletteType),
    enabled: !!color.hex,
    staleTime: TIMING.FIVE_MINUTES,
    gcTime: TIMING.TEN_MINUTES,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  return { colorPalette: data, isError, isLoading }
}

export default useColorPalette
