import { useState } from 'react'

export const useCanvasHistory = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  const [history, setHistory] = useState<ImageData[]>([])
  const [redoStack, setRedoStack] = useState<ImageData[]>([])

  const getCtx = () => canvasRef.current?.getContext('2d')

  const pushSnapshot = () => {
    const canvas = canvasRef.current
    const ctx = getCtx()
    if (!canvas || !ctx) return
    try {
      const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
      setHistory((h) => [...h, snapshot])
      setRedoStack([])
    } catch {}
  }

  const undo = () => {
    if (history.length === 0) return
    const canvas = canvasRef.current
    const ctx = getCtx()
    if (!canvas || !ctx) return
    const snap = history[history.length - 1]
    setHistory((h) => h.slice(0, -1))
    try {
      const current = ctx.getImageData(0, 0, canvas.width, canvas.height)
      setRedoStack((r) => [...r, current])
      ctx.putImageData(snap, 0, 0)
    } catch {}
  }

  const redo = () => {
    if (redoStack.length === 0) return
    const canvas = canvasRef.current
    const ctx = getCtx()
    if (!canvas || !ctx) return
    const snap = redoStack[redoStack.length - 1]
    setRedoStack((r) => r.slice(0, -1))
    try {
      const current = ctx.getImageData(0, 0, canvas.width, canvas.height)
      setHistory((h) => [...h, current])
      ctx.putImageData(snap, 0, 0)
    } catch {}
  }

  return {
    history,
    redoStack,
    canUndo: history.length > 0,
    canRedo: redoStack.length > 0,
    pushSnapshot,
    undo,
    redo,
  }
}
