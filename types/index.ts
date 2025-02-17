export interface Color {
  hex: string
  name?: string
  luminance: number
}

export interface ColorData {
  name: string
  hex: string
  image: string
  contrast: string
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
