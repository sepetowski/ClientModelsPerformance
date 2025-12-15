export interface PreprocessedDigitCanvas {
  width: number
  height: number
  data: Float32Array
}

export const preprocessDigitCanvas = (
  canvas: HTMLCanvasElement | null
): PreprocessedDigitCanvas | null => {
  if (!canvas) return null

  const srcCtx = canvas.getContext('2d')
  if (!srcCtx) return null

  const srcW = canvas.width
  const srcH = canvas.height

  const srcImage = srcCtx.getImageData(0, 0, srcW, srcH)
  const data = srcImage.data // RGBA

  let minX = srcW
  let minY = srcH
  let maxX = -1
  let maxY = -1

  for (let y = 0; y < srcH; y++) {
    for (let x = 0; x < srcW; x++) {
      const idx = (y * srcW + x) * 4
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]

      const gray = (r + g + b) / (3 * 255)
      if (gray < 0.9) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }

  if (maxX < 0 || maxY < 0) {
    return null
  }

  const margin = 10
  minX = Math.max(minX - margin, 0)
  minY = Math.max(minY - margin, 0)
  maxX = Math.min(maxX + margin, srcW - 1)
  maxY = Math.min(maxY + margin, srcH - 1)

  const boxW = maxX - minX + 1
  const boxH = maxY - minY + 1

  const TMP_SIZE = 28
  const tmp = document.createElement('canvas')
  tmp.width = TMP_SIZE
  tmp.height = TMP_SIZE
  const tctx = tmp.getContext('2d')
  if (!tctx) return null

  tctx.fillStyle = '#ffffff'
  tctx.fillRect(0, 0, TMP_SIZE, TMP_SIZE)

  const maxDigitSize = 20
  const scale = maxDigitSize / Math.max(boxW, boxH)
  const dstW = boxW * scale
  const dstH = boxH * scale
  const dx = (TMP_SIZE - dstW) / 2
  const dy = (TMP_SIZE - dstH) / 2

  tctx.drawImage(canvas, minX, minY, boxW, boxH, dx, dy, dstW, dstH)

  const imgData = tctx.getImageData(0, 0, TMP_SIZE, TMP_SIZE)
  const out = new Float32Array(TMP_SIZE * TMP_SIZE)
  const d = imgData.data

  for (let y = 0; y < TMP_SIZE; y++) {
    for (let x = 0; x < TMP_SIZE; x++) {
      const idx = (y * TMP_SIZE + x) * 4
      const r = d[idx]
      const g = d[idx + 1]
      const b = d[idx + 2]

      const gray = (r + g + b) / (3 * 255)
      const inv = 1 - gray
      out[y * TMP_SIZE + x] = inv
    }
  }

  return {
    width: TMP_SIZE,
    height: TMP_SIZE,
    data: out,
  }
}
