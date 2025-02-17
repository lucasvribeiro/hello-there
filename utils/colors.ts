import { Color, ColorData } from '@/types'

const getLuminance = (r: number, g: number, b: number) => {
  const normalizedColor = [r, g, b].map((color) => {
    color /= 255
    return color <= 0.03928 ? color / 12.92 : Math.pow((color + 0.055) / 1.055, 2.4)
  })

  const luminance =
    0.2126 * normalizedColor[0] + 0.7152 * normalizedColor[1] + 0.0722 * normalizedColor[2]
  return Number(luminance.toFixed(2))
}

const getHexColor = (r: number, g: number, b: number) => {
  const red = r.toString(16).padStart(2, '0').toUpperCase()
  const green = g.toString(16).padStart(2, '0').toUpperCase()
  const blue = b.toString(16).padStart(2, '0').toUpperCase()

  return `${red}${green}${blue}`
}

const generateRandomValues = (): [number, number, number] => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  return [r, g, b]
}

const getColor = (): Color => {
  const [r, g, b] = generateRandomValues()
  const hexColor = getHexColor(r, g, b)
  const colorLuminance = getLuminance(r, g, b)

  return { hex: hexColor, luminance: colorLuminance }
}

const mapColorData = (data: any): ColorData => {
  return {
    name: data.name.value,
    hex: data.hex.value,
    image: data.image.bare,
    contrast: data.contrast.value
  } as ColorData
}

export { getLuminance, getHexColor, generateRandomValues, getColor, mapColorData }
