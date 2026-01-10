import type { PredictResult } from './PredictResult'

export interface MobilenetTopItem {
  index: number
  label: string
  prob: number
}

export interface MobilenetModelResult {
  ready: boolean
  loadingModel: boolean
  predicting: boolean
  topK: MobilenetTopItem[]
  predictFromImage: (img: HTMLImageElement | null, k?: number) => Promise<PredictFromImageResult>
}

export interface PredictFromImageResult extends PredictResult {
  topK: MobilenetTopItem[]
}
