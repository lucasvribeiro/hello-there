export const TIMING = {
  FIVE_MINUTES: 60 * 5 * 1000,
  TEN_MINUTES: 60 * 10 * 1000,
} as const

export const LIMITS = {
  MAX_FAVORITES: 50,
} as const 

export const API_CONFIG = {
  BASE_URL: 'https://www.thecolorapi.com/',
  COLOR_DATA_PATH: 'id?format=json&hex=',
  COLOR_PALETTE_PATH: 'scheme?format=json&count=6&hex=',
} as const
