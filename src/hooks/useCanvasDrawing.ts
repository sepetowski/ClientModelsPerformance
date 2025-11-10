import type { UseCanvasDrawingOptions } from '@/types/canvasDrawingOptions'
import type { Point } from '@/types/paint'
import { useCallback, useEffect, useRef, useState } from 'react'

export const useCanvasDrawing = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  { brushSize, brushColor, isEraser, onBeginStroke, onEndStroke }: UseCanvasDrawingOptions
) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const lastPointRef = useRef<Point | null>(null)

  const getCtx = () => canvasRef.current?.getContext('2d')

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const ctx = getCtx()
    if (!canvas || !ctx) return

    onBeginStroke?.()
    setIsDrawing(true)
    canvas.setPointerCapture(e.pointerId)

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    lastPointRef.current = { x, y }

    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.lineWidth = brushSize
    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.strokeStyle = 'rgba(0,0,0,1)'
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = brushColor
    }

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = getCtx()
    if (!canvas || !ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineWidth = brushSize
    ctx.lineTo(x, y)
    ctx.stroke()

    lastPointRef.current = { x, y }
  }

  const endStroke = useCallback(
    (e?: PointerEvent | React.PointerEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return
      setIsDrawing(false)
      try {
        if (e && 'pointerId' in e) canvas.releasePointerCapture((e as PointerEvent).pointerId)
      } catch {}
      const ctx = getCtx()
      ctx?.closePath()
      lastPointRef.current = null
      onEndStroke?.()
    },
    [onEndStroke, canvasRef]
  )

  useEffect(() => {
    const up = (e: PointerEvent) => endStroke(e)
    const cancel = (e: PointerEvent) => endStroke(e)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', cancel)
    return () => {
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', cancel)
    }
  }, [endStroke])

  return { isDrawing, handlePointerDown, handlePointerMove, endStroke }
}
