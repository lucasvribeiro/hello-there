import { API_CONFIG } from '@/constants'
import { ColorData, ColorPalette } from '@/types'
import { mapColorData, mapColorPalette } from '@/utils/colorUtils'

class ColorApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message)
    this.name = 'ColorApiError'
  }
}

const fetchColorApi = async <T>(
  url: string,
  abortController: AbortController,
  mapper: (data: any) => T
): Promise<T | null> => {
  try {
    const response = await fetch(url, {
      signal: abortController.signal,
      headers: { Accept: 'application/json' }
    })

    if (!response.ok) {
      throw new ColorApiError(`Error fetching color: ${response.statusText}`, response.status)
    }

    const data = await response.json()
    if (!data) {
      throw new ColorApiError('No color data was found in the response')
    }

    return mapper(data)
  } catch (error: any) {
    if (error instanceof ColorApiError) console.error('[ERROR] Color API:', error)
    
    else if (error.name === 'AbortError') console.log('[ERROR] Color API: Request was aborted')
    
    else console.error('[ERROR] Color API:', error)
    
    return null
  }
}

const controllers = {
  colorData: null as AbortController | null,
  colorPalette: null as AbortController | null
}

export const fetchColorData = async (hex: string): Promise<ColorData | null> => {
  controllers.colorData?.abort()
  controllers.colorData = new AbortController()

  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.COLOR_DATA_PATH}${hex}`
  return fetchColorApi<ColorData>(url, controllers.colorData, mapColorData)
}

export const fetchColorPalette = async (
  hex: string,
  paletteType: string
): Promise<ColorPalette | null> => {
  controllers.colorPalette?.abort()
  controllers.colorPalette = new AbortController()

  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.COLOR_PALETTE_PATH}${hex}&mode=${paletteType}`
  return fetchColorApi<ColorPalette>(url, controllers.colorPalette, mapColorPalette)
}
