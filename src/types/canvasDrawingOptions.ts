export interface UseCanvasDrawingOptions {
  brushSize: number
  brushColor: string
  isEraser: boolean
  onBeginStroke?: () => void
  onEndStroke?: () => void
}
