export const DEFAULT_COLOR = { hex: '#FFFFFF', luminance: 1 }

export const STORAGE_KEYS = {
  COLOR: 'color',
  COLORS_HISTORY: 'colorsHistory',
  FAVORITES: 'favorites'
}

export const DEFAULT_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3,
  elevation: 5
}

export const ACHIEVEMENTS = [
  {
    id: 0,
    trigger: 1,
    title: 'First Color Changed',
    icon: '🎨'
  },
  {
    id: 1,
    trigger: 10,
    title: 'Color Explorer - 10 Colors Changed',
    icon: '🖌️'
  },
  {
    id: 2,
    trigger: 30,
    title: 'Palette Master - 30 Colors Changed',
    icon: '🖼️'
  },
  {
    id: 3,
    trigger: 50,
    title: 'Color Alchemist - 50 Colors Changed',
    icon: '🔮'
  },
  {
    id: 4,
    trigger: 100,
    title: 'Chromatic Legend - 100 Colors Changed',
    icon: '🌈'
  },
  {
    id: 5,
    trigger: 200,
    title: 'Colorful Legend - 200 Colors Changed',
    icon: '🦄'
  }
]

export const COLOR_PALETTES = [
  {
    id: 'monochrome',
    title: 'Mono'
  },
  {
    id: 'analogic',
    title: 'Analog'
  },
  {
    id: 'complement',
    title: 'Compl'
  },
  {
    id: 'triad',
    title: 'Triad'
  },
  {
    id: 'quad',
    title: 'Tetrad'
  }
]
