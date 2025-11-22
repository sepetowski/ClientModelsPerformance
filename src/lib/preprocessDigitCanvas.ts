// src/lib/preprocessDigitCanvas.ts

export const preprocessDigitCanvas = (canvas: HTMLCanvasElement | null): ImageData | null => {
  if (!canvas) return null

  const srcCtx = canvas.getContext('2d')
  if (!srcCtx) return null

  const srcW = canvas.width
  const srcH = canvas.height

  // 1. Pobieramy piksele z dużego canvasa
  const srcImage = srcCtx.getImageData(0, 0, srcW, srcH)
  const data = srcImage.data // RGBA, 0..255

  // 2. Szukamy bounding-boxa "ciemnych" pikseli (tam jest cyfra)
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

      // jasne tło ~ białe, ciemna kreska = mniejsze wartości
      const gray = (r + g + b) / (3 * 255) // 0..1
      if (gray < 0.9) {
        // piksel "nie-biały"
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }

  // 3. Jeśli nic nie znaleziono – nie ma cyfry
  if (maxX < 0 || maxY < 0) {
    return null
  }

  // Dodajemy mały margines
  const margin = 10
  minX = Math.max(minX - margin, 0)
  minY = Math.max(minY - margin, 0)
  maxX = Math.min(maxX + margin, srcW - 1)
  maxY = Math.min(maxY + margin, srcH - 1)

  const boxW = maxX - minX + 1
  const boxH = maxY - minY + 1

  // 4. Tworzymy tymczasowy canvas 28x28
  const tmp = document.createElement('canvas')
  tmp.width = 28
  tmp.height = 28
  const tctx = tmp.getContext('2d')
  if (!tctx) return null

  // białe tło
  tctx.fillStyle = '#ffffff'
  tctx.fillRect(0, 0, 28, 28)

  // 5. Przeskalowujemy bounding box do max 20x20, wycentrowany
  const maxDigitSize = 20
  const scale = maxDigitSize / Math.max(boxW, boxH)
  const dstW = boxW * scale
  const dstH = boxH * scale
  const dx = (28 - dstW) / 2
  const dy = (28 - dstH) / 2

  tctx.drawImage(
    canvas,
    minX,
    minY,
    boxW,
    boxH, // źródło (bbox)
    dx,
    dy,
    dstW,
    dstH // cel (wycentrowane)
  )

  // 6. Zwracamy gotowe 28x28
  return tctx.getImageData(0, 0, 28, 28)
}
