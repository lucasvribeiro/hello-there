import { ColorData } from '@/types'
import { mapColorData } from '@/utils/colors'

const API_BASE_URL = 'https://www.thecolorapi.com/'
const API_PARAMS = 'id?format=json&hex='

class ColorApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message)
    this.name = 'ColorApiError'
  }
}

let currentAbortController: AbortController | null = null

export const fetchColorData = async (hex: string): Promise<ColorData | null> => {
  currentAbortController?.abort()
  currentAbortController = new AbortController()

  try {
    const response: Response = await fetch(`${API_BASE_URL}${API_PARAMS}${hex}`, {
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
