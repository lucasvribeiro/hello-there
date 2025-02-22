export interface Color {
  hex: string
  contrast: 'light' | 'dark'
  luminance: number
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

export interface ColorDataQuery {
  colorData: ColorData | null | undefined
  isError: boolean
  isLoading: boolean
}

export interface ColorPaletteQuery {
  colorPalette: ColorPalette | null | undefined
  isError: boolean
  isLoading: boolean
}

export interface ColorPalette {
  mode: string
  count: number
  colors: Color[]
  links: object
}

export interface Achievement {
  id: number
  icon: string
  title: string
  trigger: number
  unlocked?: boolean
}

export interface Toast {
  message: string
  visible: boolean
  time?: number
  offset?: number
}

export interface ToastContext {
  toast: Toast
  hideToast: () => void
  showToast: (message: string, time?: number, offset?: number) => void
}

export type History = Color[]

export type Favorites = Color[]

export type Theme = 'light' | 'dark'

export type ThemePreference = 'device' | Theme

export type AchievementState = { achievement: Achievement; shown: boolean }

export interface UserState {
  achievements: AchievementState[]
  preferences: { theme: ThemePreference }
}

export interface ColorState {
  color: Color
  history: History
  favorites: Favorites
  currentIndex: number
}

export type HistoryAction = 'new' | 'prev' | 'next' | 'index'
