export const resizeCanvas = (
  canvas: HTMLCanvasElement,
  wrapper: HTMLDivElement,
  background: string,
  height: number,
  preserve = true
) => {
  const ctx0 = canvas.getContext('2d')
  let snapshot: ImageData | null = null
  if (preserve && ctx0) {
    try {
      snapshot = ctx0.getImageData(0, 0, canvas.width, canvas.height)
    } catch {}
  }

  const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1))
  const rect = wrapper.getBoundingClientRect()

  const cssW = Math.max(320, rect.width)
  const cssH = Math.max(240, height)

  canvas.style.width = cssW + 'px'
  canvas.style.height = cssH + 'px'
  canvas.width = Math.floor(cssW * dpr)
  canvas.height = Math.floor(cssH * dpr)

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.save()
  ctx.fillStyle = background
  ctx.fillRect(0, 0, cssW, cssH)
  ctx.restore()

  if (snapshot) {
    try {
      ctx.putImageData(snapshot, 0, 0)
    } catch {}
  }
}
