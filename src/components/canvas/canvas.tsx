import { useRef, useState, useCallback, useEffect } from 'react'
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
}

export const Canvas = ({
  background = '#ffffff',
  initialColor = '#111827',
  initialSize = 8,
  className = '',
  height = 520,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
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
    [background, height]
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

      <div className="mt-3 text-xs text-muted-foreground flex flex-wrap gap-x-6 gap-y-1">
        <span>
          Tip: Hold <kbd className="px-1 border rounded">Ctrl</kbd>/
          <kbd className="px-1 border rounded">⌘</kbd> +{' '}
          <kbd className="px-1 border rounded">Z</kbd> to undo.
        </span>
      </div>

      <SaveDialog open={saveOpen} onOpenChange={setSaveOpen} onConfirm={handleConfirmSave} />
    </div>
  )
}
