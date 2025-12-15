export type EmnistModelResult = {
  ready: boolean
  loadingModel: boolean
  predicting: boolean
  prediction: string | null
  predictFromCanvas: (canvas: HTMLCanvasElement | null) => Promise<string | null>
}
