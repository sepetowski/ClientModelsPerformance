import type { PredictResult } from './PredictResult'

export interface EmnistModelResult {
  ready: boolean
  loadingModel: boolean
  predicting: boolean
  prediction: string | null
  predictFromCanvas: (canvas: HTMLCanvasElement | null) => Promise<PredictFromCanvasResult>
}

export interface PredictFromCanvasResult extends PredictResult {}
