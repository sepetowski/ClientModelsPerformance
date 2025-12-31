export const imageElementToImageData = (img: HTMLImageElement): ImageData => {
  const w = img.naturalWidth
  const h = img.naturalHeight
  if (!w || !h) throw new Error('Image not loaded')

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h

  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) throw new Error('Canvas2D not available')

  ctx.drawImage(img, 0, 0)
  return ctx.getImageData(0, 0, w, h)
}
