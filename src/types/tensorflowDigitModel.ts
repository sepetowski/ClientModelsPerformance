export interface UseTensorflowDigitModelResult {
  predicting: boolean
  prediction: number | null
  backendReady: boolean
  loadingModel: boolean
  predictFromCanvas: (canvas: HTMLCanvasElement | null) => Promise<number | null>
}
