// src/components/canvas/Canvas.tsx

import { useRef, useState, useCallback, useEffect, type RefObject } from 'react'
import { Toolbar } from './toolbar'
import { useCanvasDrawing } from '@/hooks/useCanvasDrawing'
import { useCanvasHistory } from '@/hooks/useCanvasHistory'
import { downloadPNG } from '@/lib/downloadPNG'
import { resizeCanvas } from '@/lib/resizeCanvas'
import { SaveDialog } from './saveDialog'
import { twMerge } from 'tailwind-merge'

interface Props {
  background?: string
  initialColor?: string
  initialSize?: number
  className?: string
  height?: number
  canvasRefExternal?: RefObject<HTMLCanvasElement | null>
}

export const Canvas = ({
  background = '#ffffff',
  initialColor = '#111827',
  initialSize = 8,
  className = '',
  height = 520,
  canvasRefExternal,
}: Props) => {
  const internalCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasRef = canvasRefExternal ?? internalCanvasRef

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const [brushColor, setBrushColor] = useState(initialColor)
  const [brushSize, setBrushSize] = useState(initialSize)
  const [isEraser, setIsEraser] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)

  const { pushSnapshot, undo, redo } = useCanvasHistory(canvasRef)

  const { handlePointerDown, handlePointerMove, endStroke } = useCanvasDrawing(canvasRef, {
    brushSize,
    brushColor,
    isEraser,
    onBeginStroke: () => pushSnapshot(),
  })

  const doResize = useCallback(
    (preserve = true) => {
      const canvas = canvasRef.current
      const wrapper = wrapperRef.current
      if (!canvas || !wrapper) return
      resizeCanvas(canvas, wrapper as HTMLDivElement, background, height, preserve)
    },
    [background, height, canvasRef]
  )

  useEffect(() => {
    doResize(false)
    const onResize = () => doResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [doResize])

  const clear = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    pushSnapshot()
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.restore()
    doResize(false)
  }

  const openSaveDialog = () => setSaveOpen(true)

  const handleConfirmSave = (filename: string) => {
    const canvas = canvasRef.current
    if (!canvas) return
    downloadPNG(canvas, background, filename)
  }

  return (
    <div className={twMerge('w-full', className)}>
      <Toolbar
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        brushColor={brushColor}
        setBrushColor={setBrushColor}
        isEraser={isEraser}
        setIsEraser={setIsEraser}
        onUndo={undo}
        onRedo={redo}
        onClear={clear}
        onDownload={openSaveDialog}
      />

      <div
        ref={wrapperRef as any}
        className="relative w-full rounded-2xl border bg-background overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="touch-none block cursor-crosshair"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endStroke}
          onPointerLeave={endStroke}
        />
      </div>
      <SaveDialog open={saveOpen} onOpenChange={setSaveOpen} onConfirm={handleConfirmSave} />
    </div>
  )
}
