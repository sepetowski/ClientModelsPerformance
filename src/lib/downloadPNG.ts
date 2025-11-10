export const downloadPNG = (canvas: HTMLCanvasElement, background: string, filename?: string) => {
  const name =
    (filename && filename.trim()) || `canvas-${new Date().toISOString().replace(/[:.]/g, '-')}.png`
  const cssW = parseInt(canvas.style.width || '0', 10) || 1024
  const cssH = parseInt(canvas.style.height || '0', 10) || 768

  const tmp = document.createElement('canvas')
  tmp.width = cssW
  tmp.height = cssH
  const tctx = tmp.getContext('2d')
  if (!tctx) return

  tctx.fillStyle = background
  tctx.fillRect(0, 0, cssW, cssH)
  tctx.drawImage(canvas, 0, 0, cssW, cssH)

  const url = tmp.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = url
  a.download = name.endsWith('.png') ? name : `${name}.png`
  a.click()
}
