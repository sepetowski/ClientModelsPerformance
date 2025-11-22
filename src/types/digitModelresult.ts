export interface DigitModelResult {
  ready: boolean
  loadingModel: boolean
  predicting: boolean
  prediction: number | null
  predictFromCanvas: (canvas: HTMLCanvasElement | null) => Promise<number | null>
}
