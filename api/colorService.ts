import { ColorData, ColorPalette } from '@/types'
import { mapColorData, mapColorPalette } from '@/utils/colors'

const API_BASE_URL = 'https://www.thecolorapi.com/'
const COLOR_DATA_PATH = 'id?format=json&hex='
const COLOR_PALETTE_PATH = 'scheme?format=json&count=6&hex='

class ColorApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message)
    this.name = 'ColorApiError'
  }
}

let currentAbortController: AbortController | null = null
let currentAbortControllerPalette: AbortController | null = null

export const fetchColorData = async (hex: string): Promise<ColorData | null> => {
  currentAbortController?.abort()
  currentAbortController = new AbortController()

  try {
    const response: Response = await fetch(`${API_BASE_URL}${COLOR_DATA_PATH}${hex}`, {
      signal: currentAbortController.signal,
      headers: {
        Accept: 'application/json'
      }
    })

    if (!response.ok) {
      throw new ColorApiError(`Error fetching color: ${response.statusText}`, response.status)
    }

    const data = await response.json()

    if (!data) {
      throw new ColorApiError('No color data was found in the response')
    }

    return mapColorData(data)
  } catch (error: any) {
    if (error instanceof ColorApiError) {
      console.error('[ERROR] fetchColorData:', error)
      return null
    }

    if (error.name === 'AbortError') {
      console.log('[ERROR] fetchColorData: Request was aborted')
      return null
    }

    console.error('[ERROR] fetchColorData:', error)
    return null
  }
}

export const fetchColorPalette = async (hex: string, paletteType: string): Promise<ColorPalette | null> => {
  currentAbortControllerPalette?.abort()
  currentAbortControllerPalette = new AbortController()

  try {
    const response: Response = await fetch(
      `${API_BASE_URL}${COLOR_PALETTE_PATH}${hex}&mode=${paletteType}`,
      {
        signal: currentAbortControllerPalette.signal,
        headers: {
          Accept: 'application/json'
      }
    })

    if (!response.ok) {
      throw new ColorApiError(`Error fetching color: ${response.statusText}`, response.status)
    }

    const data = await response.json()

    if (!data) {
      throw new ColorApiError('No color data was found in the response')
    }

    return mapColorPalette(data)
  } catch (error: any) {
    if (error instanceof ColorApiError) {
      console.error('[ERROR] fetchColorPalette:', error)
      return null
    }

    if (error.name === 'AbortError') {
      console.log('[ERROR] fetchColorPalette: Request was aborted')
      return null
    }

    console.error('[ERROR] fetchColorPalette:', error)
    return null
  }
}
