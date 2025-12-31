export interface MobilenetPreprocessResult {
  data: Float32Array
  width: number
  height: number
  channels: 3
}

export const preprocessMobilenetV2FromImageData = (
  imageData: ImageData,
  targetSize = 224
): MobilenetPreprocessResult => {
  const srcCanvas = document.createElement('canvas')
  srcCanvas.width = imageData.width
  srcCanvas.height = imageData.height
  const srcCtx = srcCanvas.getContext('2d', { willReadFrequently: true })
  if (!srcCtx) throw new Error('Canvas2D not available')

  srcCtx.putImageData(imageData, 0, 0)

  const dstCanvas = document.createElement('canvas')
  dstCanvas.width = targetSize
  dstCanvas.height = targetSize
  const dstCtx = dstCanvas.getContext('2d', { willReadFrequently: true })
  if (!dstCtx) throw new Error('Canvas2D not available')

  dstCtx.imageSmoothingEnabled = true
  dstCtx.imageSmoothingQuality = 'high'

  dstCtx.drawImage(srcCanvas, 0, 0, targetSize, targetSize)

  const resized = dstCtx.getImageData(0, 0, targetSize, targetSize)
  const rgba = resized.data

  const out = new Float32Array(1 * targetSize * targetSize * 3)

  let j = 0
  for (let i = 0; i < rgba.length; i += 4) {
    const r = rgba[i]
    const g = rgba[i + 1]
    const b = rgba[i + 2]

    out[j++] = r / 127.5 - 1
    out[j++] = g / 127.5 - 1
    out[j++] = b / 127.5 - 1
  }

  return { data: out, width: targetSize, height: targetSize, channels: 3 }
}
