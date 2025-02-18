export interface Color {
  hex: string
  luminance?: number
}

export interface ColorData {
  name: string
  hex: string
  image: string
  contrast: string
  rgb: [number, number, number]
  hsl: [number, number, number]
  cmyk: [number, number, number, number]
}

export interface ColorPalette {
  mode: string
  count: number
  colors: Color[]
  links: object
}

export interface ColorContext {
  color: Color | null
  setColor: (color: Color) => void
}

export interface ColorDataContext {
  colorData: ColorData | null
  error: Error | null
  isLoading: boolean
}

export interface ColorPaletteContext {
  colorPalette: ColorPalette | null
  error: Error | null
  isLoading: boolean
}
