const getLuminance = (r: number, g: number, b: number) => {
  const normalizedColor = [r, g, b].map((color) => {
    color /= 255
    return color <= 0.03928
      ? color / 12.92
      : Math.pow((color + 0.055) / 1.055, 2.4)
  })

  return (
    0.2126 * normalizedColor[0] +
    0.7152 * normalizedColor[1] +
    0.0722 * normalizedColor[2]
  )
}

const getHexColor = (r: number, g: number, b: number) => {
  const red = r.toString(16).padStart(2, '0').toUpperCase()
  const green = g.toString(16).padStart(2, '0').toUpperCase()
  const blue = b.toString(16).padStart(2, '0').toUpperCase()

  return `#${red}${green}${blue}`
}

const generateRandomValues = (): [number, number, number] => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  return [r, g, b]
}

export { getLuminance, getHexColor, generateRandomValues }
