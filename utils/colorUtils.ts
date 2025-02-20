import { LUMINANCE_THRESHOLD } from '@/constants'
import { Color, ColorData, ColorPalette } from '@/types'

const getRGB = (): [number, number, number] => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  return [r, g, b]
}

const getHexColor = (r: number, g: number, b: number): string => {
  const red = r.toString(16).padStart(2, '0').toUpperCase()
  const green = g.toString(16).padStart(2, '0').toUpperCase()
  const blue = b.toString(16).padStart(2, '0').toUpperCase()

  return `${red}${green}${blue}`
}

const getLuminance = (r: number, g: number, b: number): number => {
  const normalizedColor = [r, g, b].map((color) => {
    color /= 255
    return color <= 0.03928 ? color / 12.92 : Math.pow((color + 0.055) / 1.055, 2.4)
  })

  const luminance =
    0.2126 * normalizedColor[0] + 0.7152 * normalizedColor[1] + 0.0722 * normalizedColor[2]
  return Number(luminance.toFixed(2))
}

const getColor = (): Color => {
  const [r, g, b] = getRGB()
  const hex = getHexColor(r, g, b)
  const luminance = getLuminance(r, g, b)
  const contrast = luminance < LUMINANCE_THRESHOLD ? 'light' : 'dark'

  return { hex, contrast, luminance }
}

// Map the color data from the API to the ColorData type
const mapColorData = (data: any): ColorData => {
  return {
    name: data.name.value,
    hex: data.hex.value,
    image: data.image.bare,
    contrast: data.contrast.value,
    rgb: [data.rgb.r, data.rgb.g, data.rgb.b],
    hsl: [data.hsl.h, data.hsl.s, data.hsl.l],
    cmyk: [data.cmyk.c, data.cmyk.m, data.cmyk.y, data.cmyk.k]
  }
}

// Map the color palette from the API to the ColorPalette type
const mapColorPalette = (data: any): ColorPalette => {
  return {
    mode: data.mode,
    links: data._links.schemes,
    count: Number(data.count),
    colors: data.colors.map((color: any) => ({
      hex: color.hex.value
    }))
  }
}

export { getColor, mapColorData, mapColorPalette }
