export const Colors = {
  light: {
    text: '#000000',
    textLight: '#222222',
    background: '#FFFFFF',
    backgroundLight: '#EEEEEE'
  },
  dark: {
    text: '#FFFFFF',
    textLight: '#AAAAAA',
    background: '#1A1A1A',
    backgroundLight: '#333333'
  }
} as const

export const DEFAULT_SHADOW = {
  elevation: 5,
  shadowRadius: 3,
  shadowColor: '#000',
  shadowOpacity: 0.25,
  shadowOffset: { width: 0, height: 2 }
} as const

export const LUMINANCE_THRESHOLD = 0.179

export const THEMES = [
  {
    value: 'device',
    title: 'Device'
  },
  {
    value: 'light',
    title: 'Light'
  },
  {
    value: 'dark',
    title: 'Dark'
  }
]
